// Second implementation of manipulating data using mongoose

const mongoose = require(mongoose) // Allows for the use of the mongoose library

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true}); // Connects to the server and the fruitsDB database, if it does not exist then it creates a new one

const fruitSchema = new mongoose.Schema({ // Schema for how data will be represented  for fruits
    name: { // Additional validation checks for name
        type: String, // Requires a string data type
        required: [true, "All fruits need and have a name"] // Name field is required and if it doesnt have it, print out that string
    },
    rating: { // Additional validation checks for rating
        type: Number, // Requires a number data type
        min: 1, // Minimum number
        max: 10 // Maximum number
    }, // Stores a number called rating
    review: String // Stores a string called review
});

const Fruit = mongoose.model("Fruit", fruitSchema); // Creates a model for the schema

const apple = new Fruit({ // Implements the Fruit model on var called fruit
    name: "Apple", // Name
    rating: 7, // Rating
    review: "Pretty solid as a fruit." // Review
});

//apple.save(); // Saves the new fruit to the database in the Fruits collection

const personSchema = new mongoose.Schema({ // Schema for how data will be represented for people
    name: String, // Stores a string called name
    age: Number, // Stores a number called age
    favoriteFruit: fruitSchema // Establishes a relationship between people and fruits
});

const Person = mongoose.model("Person", personSchema); // Creates a model for the schema

const john = new Person({ // Implements the Person model on var called person
    name: "John", // Name
    age: 37 // Age
});

const pineapple = new Fruit({ // Creates an object of the Fruit model
    name: "Pineapple", // Name
    rating: 9, // Rating
    review: "Great fruit." // Review
});

pineapple.save(); // Saves the pineapple to the fruits collection

const amy = new Person({ // Creates an object of the Person model
    name: "Amy", // Name
    age: 12, // Age
    favoriteFruit: pineapple // Which fruit she has a relationship with
});

//john.save(); // Saves the new person to the database in the People collection
amy.save(); // Saves the new person to the database in the People collection

Person.updateOne({name: "John"}, {favoriteFruit: pineapple}, function(err) { // Updates John's favoriteFruit to pineapple
    if(err) { // If error occurs
        console.log(err); // Log the error
    } else { // If no error occurs
        console.log("Successfully updated") // Log that it was successfully updated
    }
});

// const kiwi = new Fruit({ // Implements the Fruit model with kiwi
//     name: "Kiwi", // Name
//     rating: 10, // Rating
//     review: "The best fruit" // Review
// });

// const orange = new Fruit({ // Implements the Fruit model with Orange
//     name: "Orange", // Name
//     rating: 4, // Rating
//     review: "Too sour for me" // Review
// });

// const banana = new Fruit({ // Implements the Fruit model with Banana
//     name: "Banana", // Name
//     rating: 3, // Rating
//     review: "Weird texture" // Review
// });

// Fruit.insertMany([kiwi, orange, banana], function(err) { // Inserts the kiwi, orange, and banana into the Fruits collection
//     if(err) { // If an error occurs
//         console.log(err); // Log the error
//     } else { // If an error doesnt occur
//         console.log("Succussfully saved new data to the database"); // Data was saved successfully
//     }
// });

Fruit.updateOne({name: "Apple"}, {name: "Peach"}, function(err) { // Updates the fruit with the name of apple to the name of Peach
    if(err) { // If error occurs
        console.log(err); // Print the error
    } else { // If no error occurs
        console.log("Successfully updated"); // Log that it has been successfully updated
    }
})

Fruit.deleteOne({name: "Peach"}, function(err) { // Function to delete one element
    if(err) { // If an error occurs
        console.log(err); // Log the error
    } else { // If no error occurs
        console.log("Successfully deleted"); // Log that it was successfully deleted
    }
});

Person.deleteMany({name: "John"}, function(err) { // Function to delete many
    if(err) { // If an error occurs
        console.log(err); // Log the error
    } else { // If no error occurs
        console.log("Successfully deleted many") // Log that the items were successfully deleted
    }
})

Fruit.find(function(err, fruits) { // Finds objects of the Fruit model
    if(err) { // If an error occurs
        console.log(err); // Log the error
    } else { // If no error occurs
        fruits.forEach(function(fruit) { // Loops through all fruits in the collection
            console.log(fruit.name); // Outputs the name of each fruit
            mongoose.connection.close(); // Closes the connection
        })
        //console.log(fruits); // Print the all of the items in the Fruits collection
    }
});