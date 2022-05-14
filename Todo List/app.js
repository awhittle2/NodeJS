const express = require("express"); // Allows for the use of express
const bodyParser = require("body-parser"); // Allows for the use of body parser to read user input
const ejs = require("ejs"); // Allows for the use of ejs
const date = require(__dirname + "/date.js"); // Allows for the use of my date module which was created in this folder

const app = express(); // Express required
app.use(bodyParser.urlencoded({ extended: true })); // Body parser required
app.set("view engine", "ejs"); // Ejs required
app.use(express.static("public")); // Allows for the use of static files which will be in the public folder

const items = []; // Array to hold regular to do list items
const workItems = []; // Array to hold work to do list items

app.get("/", function (req, res) { // Creates the home route
  const day = date(); // Gets the current date from the in-house date module, which I created

  res.render("list", { day: day, items: items }); // Uses ejs to render the home route page
});

app.post("/", function (req, res) { // Post methods on the home route
  const item = req.body.newItem; // Creates a variable to hold the item created

  if (req.body.list === "Work") { // If on the work route
    workItems.push(item); // Push the item to the work todo list
    res.redirect("/work"); // Redirect to the work route (with the updated information)
  } else { // If on the home route
    items.push(item); // Push the item to the regular todo list
    res.redirect("/"); // Redirect to the home route (with the updated information)
  }
});

app.get("/work", function (req, res) { // Creates the work route
  res.render("list", { day: "Work List", items: workItems }); // Uses ejs to render the work route page
});

app.get("/about", function(req, res) { // Creates the about route
  res.render("about"); // Uses ejs to render the about route page
});

app.listen(3000, function () { // Server port used
  console.log("Server started on port 3000"); // Console log that the server was successfully started
});
