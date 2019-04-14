const express = require("express");
const path = require("path");
// const request = require("request");
const cors = require("cors");

const app = express();

app.use(cors());
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// get words will revisit when plugging into production
// app.get("/words", function(req, res) {
//     request("http://app.linkedin-reach.io/words", function(error, response, body) {
//         console.error("error:", error); // Print the error if one occurred
//         console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
//         console.log("body", body);
//     });
// });
