const express = require("express"); // Allows for the use of express
const bodyParser = require("body-parser"); // Allows for the use of body parser to read user input
const ejs = require("ejs"); // Allows for the use of ejs
const mongoose = require("mongoose"); // Allows for the use of the mongoose library
const _ = require("lodash");

const app = express(); // Express required
app.use(bodyParser.urlencoded({ extended: true })); // Body parser required
app.set("view engine", "ejs"); // Ejs required
app.use(express.static("public")); // Allows for the use of static files which will be in the public folder

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
}); // Connects to the mongodb server and creates a new database called todolistDB

const itemsSchema = new mongoose.Schema({
  // Creates a new schema called itemsSchema
  name: String, // Name
});

const Item = mongoose.model("Item", itemsSchema); // Creates a new collection called items using the itemsSchema

const item1 = new Item({
  // Creates a new object from the Item model
  name: "Welcome to your todo list!", // Name
});

const item2 = new Item({
  // Creates a new object from the Item model
  name: "Click the + button to add new items", // Name
});

const item3 = new Item({
  // Creates a new object from the Item model
  name: "Click the checkbox to delete items", // Name
});

const defaultItems = [item1, item2, item3]; // Creates a array to store the new items

app.get("/", function (req, res) {
  // Creates the home route
  Item.find({}, function (err, foundItems) {
    // Finds all documents in the Items collection
    if (foundItems.length === 0) {
      // If there are no items in the database
      Item.insertMany(defaultItems, function (err) {
        // Inserts all new items into the database
        if (err) {
          // If an error occurs
          console.log(err); // Print the error
        } else {
          // If no error occurs
          console.log("Successfully added the documents"); // Print successful
        }
      });
      res.redirect("/"); // Redirect and go through the check again
    } else {
      res.render("list", { day: "Today", items: foundItems }); // Uses ejs to render the home route page
    }
  });
});

app.post("/", function (req, res) {
  // Post methods on the home route
  const itemName = req.body.newItem; // Creates a variable to hold the item created
  const listName = req.body.list;

  const newItem = new Item({
    // Creates a new object from the Item model
    name: itemName, // Name is the text that the user typed into the form
  });

  if (listName === "Today") {
    newItem.save(); // Adds to the collection
    res.redirect("/"); // Goes back to the home route
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  // Function to delete items from the database
  const checkedItemId = req.body.checkbox; // Saves the value of the checkbox (which was the item id)
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      // Function to find an item by its id and then remove it
      if (!err) {
        // If no errors happen
        console.log("Successfully deleted item"); // Say that it was successful
        res.redirect("/"); // Redirect to the home route to show the change
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      function (err, foundList) {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/:listName", function (req, res) {
  const listName = _.capitalize(req.params.listName);

  List.findOne({ name: listName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: listName,
          items: defaultItems,
        });

        list.save();

        res.redirect("/" + listName);
      } else {
        res.render("list", { day: foundList.name, items: foundList.items });
      }
    }
  });
});

app.listen(3000, function () {
  // Server port used
  console.log("Server started on port 3000"); // Console log that the server was successfully started
});
