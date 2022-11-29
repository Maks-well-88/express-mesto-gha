const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = { _id: '6385b11b9b79e1eeb57b58ff' };
  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

mongoose.connect('mongodb://localhost:27017/mestodb', () => {
  console.log('Connected to MongoDB');
  app.listen(3000, (err) => {
    if (err) throw err;
    console.log(`Server OK, port ${PORT}`);
  });
});
