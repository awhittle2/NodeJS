// First implementation of adding collections using the mongodb driver

const MongoClient = require("mongodb").MongoClient; // Allows for the use of the mongo driver
const assert = require("assert"); // Also required for the mongo driver

const url = "mongodb://localhost:27017"; // MongoDB server

const dbName = "Fruits-MongoDB"; // Name of the database, if it doesnt already exist, it will create a new one

const client = new MongoClient(url, { useNewUrlParser: true }); // Creates a new instance of the server

client.connect(function(err) { // Connects to the mongodb server
    assert.equal(null, err); // Makes sure there are no errors
    console.log("Connected successfully to server"); // Console logs successfully connected

    const db = client.db(dbName);

    //insertDocuments(db, function() { // Inserts the documents in the database
    findDocuments(db, function() { // Finds the documents in the database
        client.close(); // Closes the database
    });
    //});
});

const insertDocuments = function(db, callback) { // Function to insert things into the database
    const collection = db.collection("fruits"); // Stores the current collection of fruits in a var called collection

    collection.insertMany([ // Inserts multiple items into the data base
        {
            name: "Apple", // Inserts an apple
            score: 8,
            review: "Great fruit"
        }, 
        {
            name: "Orange", // Inserts an orange
            score: 6,
            review: "Kinda sour"
        }, 
        {
            name: "Banana", // Inserts a banana
            score: 9,
            review: "Great stuff!"
        }
    ], function(err, result) {
        assert.equal(err, null); // Makes sure there are no errors
        assert.equal(3, result.result.n); // Makes sure that 3 items are being inserted
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection"); // Console log adding was successful
        callback(result); // End of function
    });
}

const findDocuments = function(db, callback) { // Function to search for things within the database
    const collection = db.collection("fruits"); // Says its in the fruits collection

    collection.find({}).toArray(function(err, fruits) { // Function to perform the search and give back data
        assert.equal(err, null); // Makes sure there are no errors
        console.log("Found the following records"); // Console log search successful
        console.log(fruits) // Log out all items in the fruits collection
        callback(fruits); // End of function
    });
}