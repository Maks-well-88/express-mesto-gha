const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.listen(3000, (err) => {
  if (err) {
    console.log(`${err.name}, ${err.message}`);
    return;
  }
  console.log(`Server OK, port ${PORT}`);
});
