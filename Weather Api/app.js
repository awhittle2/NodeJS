const express = require("express"); // Allows for the use of express
const bodyParser = require("body-parser"); // Allows for the use of body parser
const https = require("https"); // Requires https a module which is already bundled with node

const app = express(); // Express required
app.use(bodyParser.urlencoded({extended: true})); // Body parser required to specify its html input

app.get("/", function(req, res) { // Creates the home route
    res.sendFile(__dirname + "/index.html"); // Uses specified file at the home route
});

app.post("/", function(req, res) { // Post function to take in html post requests
    const query = req.body.cityName; // Stores the name of the location that the user wants weather data from
    const appId = "31c3f4c56fd4e8669cf78e0ee04dc7d4"; // My openweathermap api id
    const unit = "imperial"; // Stores what kind of units I want the data back in
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appId + "&units=" + unit; // Url which combines all the data specified above

    https.get(url, function(response) { // Sends a request to open weather map
        console.log(response.statusCode); // Console logs the status code from the request

        response.on("data", function(data) { // Gathers all data sent from open weather map
            const weatherData = JSON.parse(data); // Turns the data that we get back into a JSON object
            const myTemp = weatherData.main.temp; // Stores the temperature from the data
            const myDescription = weatherData.weather[0].description; // Stores the weather description from the data
            const myIcon = weatherData.weather[0].icon; // Stores the weather icon from the data
            const imageUrl = "http://openweathermap.org/img/wn/" + myIcon + "@2x.png"; // Gets the weather icon from this location

            res.write("<h1>The temperature in " + query + " is " + myTemp + " degrees.</h1>"); // Writes to the home route the temperature
            res.write(" The weather is currently " + myDescription); // Writes to the home route the weather description
            res.write("<img src=" + imageUrl + ">"); // Writes to the home route the weather image
            res.send(); // Sends all of it to the home route and shows the data
        });
    });

});

app.listen(3000, function() { // The server port this application uses
    console.log("Server is running on port 3000"); // Console logs successful server start
});