const request = require("postman-request");
const http = require("http");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c396b526cc5d10637e0ff83d64435203&query=${longitude},${latitude}&units=m`;
  const request = http.request(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data = data + chunk.toString();
    });

    response.on("end", () => {
      const body = JSON.parse(data);
      const current = body.current;
      const forecast = `The Current Temp is ${current.temperature} and it feal like ${current.feelslike} and the Weather Desctiption is ${current.weather_descriptions[0]}`;
      callback(forecast, undefined);
    });

    response.on("error", (error) => {
      callback(undefined, error);
    });
  });

  request.end();
};

module.exports = forecast;
//      `The Current Temp is ${current.temperature} and it feal like ${current.feelslike} and the Weather Desctiption is ${current.weather_descriptions[0]}`,
