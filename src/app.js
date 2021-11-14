// loading the path library
const path = require("path");
// loading the express library
const express = require("express");

const hbs = require("hbs");
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

// weather route
app.get("/weather", (req, res) => {
  res.send("this is weather page");
});

app.get("/help/*", (req, res) => {
  res.render("404-page", {
    title: "404",
    name: "Mohamed Shaaban",
    errorMessage: "page not found",
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
