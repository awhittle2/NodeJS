const express = require("express"); // Allows for the use of express
const bodyParser = require("body-parser"); // Allows for the use of body parser

const app = express(); // Express required
app.use(bodyParser.urlencoded({extended: true})); // Body parser required and says that the input will be html

app.get("/", function(req, res) { // Creates the home route
    res.sendFile(__dirname + "/index.html"); // Sends the home page to the route
});

app.post("/", function(req, res) { // Creates a post method on the home route
    var n1 = Number(req.body.num1); // Stores the first number the user typed
    var n2 = Number(req.body.num2); // Stores the second number the user typed
    var result = n1+n2; // Stores the result of adding the two numbers

    res.send("The result of the calculation is " + result); // Sends the result to the home route
});

app.listen(3000, function() { // Server port used
    console.log("Server is running on port 3000"); // Console logs server successfully started
});