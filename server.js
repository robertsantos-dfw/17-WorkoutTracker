const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();
app.use(logger("dev"));
app.use(compression());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.set('view engine', 'html');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }

);

// routes
require("./routes/api-routes.js")(app);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});