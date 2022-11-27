const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/mestodb");

app.listen(3000, (err) =>
  err
    ? console.log(`${err.name}, ${err.message}`)
    : console.log(`Server OK, port ${PORT}`)
);
