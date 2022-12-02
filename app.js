/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const { userRouter, cardRouter } = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use((req, res, next) => {
  req.user = { _id: '6385b11b9b79e1eeb57b58ff' };
  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.patch('*', (req, res) => {
  res.status(404).send({ message: 'This page does not exist' });
});

mongoose.connect('mongodb://localhost:27017/mestodb', (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`Server OK, port ${PORT}`);
});
