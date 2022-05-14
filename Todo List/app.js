const express = require("express"); // Allows for the use of express
const bodyParser = require("body-parser"); // Allows for the use of body parser to read user input
const ejs = require("ejs"); // Allows for the use of ejs
const date = require(__dirname + "/date.js"); // Allows for the use of my date module which was created in this folder

const app = express(); // Express required
app.use(bodyParser.urlencoded({ extended: true })); // Body parser required
app.set("view engine", "ejs"); // Ejs required
app.use(express.static("public")); // Allows for the use of static files which will be in the public folder

const items = []; //
const workItems = [];

app.get("/", function (req, res) {
  const day = date();

  res.render("list", { day: day, items: items });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { day: "Work List", items: workItems });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
