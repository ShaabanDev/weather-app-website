const { error } = require("console");
const https = require("https");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibW9zaDNiYW4iLCJhIjoiY2t2d2sxeGk5YzZ0YjMwczdicjNreWh2YiJ9.QW28twiHjivNMMEkOglXAw&limit=1`;
  const request = https.request(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data = data + chunk.toString();
    });

    response.on("end", () => {
      const body = JSON.parse(data);
      if (body.features.length === 0) {
        return callback(undefined, "Please Provide a Right Place");
      }
      callback(
        {
          longitude: body.features[0].center[0],
          latitude: body.features[0].center[1],
          location: body.features[0].place_name,
        },
        undefined
      );
    });
  });

  request.end();
};

module.exports = geocode;
