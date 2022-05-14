const express = require("express"); // Allows for the use of express
const bodyParser = require("body-parser"); // Allows for the use of body parser
const request = require("request"); // Allows for the use of request *Note: this mode is depreciated
const https = require("https"); // Allows for the use of the node module https

const { response } = require("express"); // Request required
const app = express(); // Express required
app.use(bodyParser.urlencoded({ extended: true })); // Body parser required and specifies that it will be html input
app.use(express.static("public")); // Allows for the use of static files such as css styles and images which will be in the public folder

app.get("/", function (req, res) { // Creates the home route
  res.sendFile(__dirname + "/signup.html"); // Sends the home route file
});

app.post("/", function (req, res) { // Deals with posts on the home route
  const firstName = req.body.fName; // Stores the user inputted name
  const lastName = req.body.lName; // Stores the user inputted last name
  const myEmail = req.body.email; // Stores the user inputted email

  const data = { // Creates a js object to hold all the data
    members: [ // Mail chimp specified way of storing data
      {
        email_address: myEmail,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data); // Turns the js object into a JSON
  const listId = "4ad39010e4"; // My list id for mailchimp
  const apiKey = "e7518b57cf7bf18aa964db648d441b67-us12"; // My mail api for mailchimp
  const url = "https://us12.api.mailchimp.com/3.0/lists/" + listId; // My url to send api requests to
  
  const options = { // Mailchimp specified way of making requests
    method: "POST", // Post request
    auth: "awhittle2:" + apiKey, // Api key
  };

  const request = https.request(url, options, function (response) { // Sends the request to the mailchimp api
    if (response.statusCode === 200) { // If the request was successful
      res.sendFile(__dirname + "/success.html"); // Send the successful page
    } else { // If the request wasnt successful
      res.sendFile(__dirname + "/failure.html"); // Send the failure page
    }

    response.on("data", function (data) { // Mailchimp data sent back
      console.log(JSON.parse(data)); // Logs the data sent back
    });
  });

  request.write(jsonData); // ??
  request.end(); // Ends the request
});

app.post("/failure", function(req, res) { // Deals with post requests to the failure route
    res.redirect("/"); // Redirects to the home route
  });

app.listen(process.env.PORT || 3000, function () { // Server port used
  console.log("Server is running on port 3000"); // Console log server successfully started
});
