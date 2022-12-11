const express = require('express');
const mongoose = require('mongoose');
const { userRouter, cardRouter } = require('./routes');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

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
