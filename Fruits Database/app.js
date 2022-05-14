// Second implementation of manipulating data using mongoose

const mongoose = require(mongoose) // Allows for the use of the mongoose library

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true}); // Connects to the server and the fruitsDB database, if it does not exist then it creates a new one

const fruitSchema = new mongoose.Schema({ // Schema for how data will be represented  for fruits
    name: String, // Stores a string called name
    rating: Number, // Stores a number called rating
    review: String // Stores a string called review
});

const Fruit = mongoose.model("Fruit", fruitSchema); // Creates a model for the schema

const fruit = new Fruit({ // Implements the Fruit model on var called fruit
    name: "Apple", // Name
    rating: 7, // Rating
    review: "Pretty solid as a fruit." // Review
});

//fruit.save(); // Saves the new fruit to the database in the Fruits collection

const personSchema = new mongoose.Schema({ // Schema for how data will be represented for people
    name: String, // Stores a string called name
    age: Number // Stores a number called age
});

const Person = mongoose.model("Person", personSchema); // Creates a model for the schema

const person = new Person({ // Implements the Person model on var called person
    name: "John", // Name
    age: 37 // Age
});

person.save(); // Saves the new person to the database in the People collection