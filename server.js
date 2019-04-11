const express = require("express");
const path = require("path");
var cors = require("cors");

const app = express();

app.use(cors());
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
