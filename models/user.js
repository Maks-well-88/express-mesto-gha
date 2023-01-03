const mongoose = require('mongoose');
const { regexp } = require('../utils/regex');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return regexp.emailCheck.test(v);
      },
      message: 'Email is not correct',
    },
  },
  password: {
    type: String,
    select: false,
    minlength: 6,
    maxlength: 60,
    required: true,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return regexp.urlCheck.test(v);
      },
      message: 'URL is not correct',
    },
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

module.exports = mongoose.model('user', userSchema);
