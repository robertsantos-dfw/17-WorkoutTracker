const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(
    process.env.MONGODB_URI || 'mongodb+srv://robertsantos_dfw:Hello123@cluster0.9ntmj.mongodb.net/workout_tracker?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

// routes
app.use(require("api.js"));
app.use(require("view.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});