const express = require('express');
const mongoose = require('mongoose');
const { userRouter, cardRouter } = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use((req, res, next) => {
  req.user = { _id: '63947eed407d29785acf0851' };
  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.patch('*', (req, res) => {
  res.status(404).send({ message: 'This page does not exist' });
});

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  },
);

app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`Server OK, port ${PORT}`);
});
