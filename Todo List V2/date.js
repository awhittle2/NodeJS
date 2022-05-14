exports.getDate = function() { // Exports this unspecified function as getDate
    const date = new Date(); // Gets the current dae

    const options = { // Creates a js object to store the format we want the date
    weekday: "long", // Include the weekday
    day: "numeric", // Include the date number
    month: "long", // Include the month
    };

    return date.toLocaleDateString("en-US", options); // Return the current date with the weekday, date number, and month
};