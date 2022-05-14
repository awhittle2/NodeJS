const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const appId = "31c3f4c56fd4e8669cf78e0ee04dc7d4";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appId + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const myTemp = weatherData.main.temp;
            const myDescription = weatherData.weather[0].description;
            const myIcon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + myIcon + "@2x.png";  

            res.write("<h1>The temperature in " + query + " is " + myTemp + " degrees.</h1>");
            res.write(" The weather is currently " + myDescription);
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
    });

});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});