const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) { // I am a comment
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const myEmail = req.body.email;

  const data = {
    members: [
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

  const jsonData = JSON.stringify(data);
  const listId = "4ad39010e4";
  const apiKey = "e7518b57cf7bf18aa964db648d441b67-us12";
  const url = "https://us12.api.mailchimp.com/3.0/lists/" + listId;
  const options = {
    method: "POST",
    auth: "awhittle2:" + apiKey,
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
  });

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});
