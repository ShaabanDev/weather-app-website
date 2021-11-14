// loading the path library
const path = require("path");
// loading the express library
const express = require("express");

const hbs = require("hbs");
const geocode = require("./utils/geocode");
// import forecast function from forecast module
const forecast = require("./utils/forecast");
// create our app
const app = express();

// define the public 'folder contains our static pages' path
const dirPath = path.join(__dirname, "../public");

// define the views path
const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");
// changing the views directory
app.set("views", viewsPath);
// setting view engine to hbs
app.set("view engine", "hbs");

hbs.registerPartials(partialsPath);

//serving static directory
app.use(express.static(dirPath));

//root route
app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Mohamed Shaaban",
    age: 27,
  });
});

// help route
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Mohamed Shaaban",
  });
});

// about route
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mohamed Shaaban",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you have to provide a search",
    });
  }
  res.send({
    products: [],
  });
});
// weather route

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you have to provide an Address",
    });
  }

  geocode(req.query.address, (data, error) => {
    if (data) {
      forecast(data.longitude, data.latitude, (forecastData, error) => {
        if (forecastData) {
          res.send({
            forecast: forecastData,
            location: data.location,
            address: req.query.address,
          });
        }
        if (error) {
          res.send({
            error: error,
          });
        }
      });
    }
    if (error) {
      res.send({
        error: error,
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("404-page", {
    title: "404",
    name: "Mohamed Shaaban",
    errorMessage: "Article is not found",
  });
});
app.get("/*", (req, res) => {
  res.render("404-page", {
    title: "404",
    name: "Mohamed Shaaban",
    errorMessage: "page not found",
  });
});

const port = 4000;
app.listen(port, () => {
  console.log("server is on at port " + port);
});
