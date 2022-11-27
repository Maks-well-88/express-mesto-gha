const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 30,
		validate: {
			validator(v) {
				return v >= 2 && v <= 30;
			},
			message: 'Name must be more than 2 and less than 30 characters',
		},
	},
	link: {
		type: String,
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	likes: {
		type: [{ type: ObjectId, ref: 'user' }], // тут нужно точно проверить правильность типа
		default: [],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('card', cardSchema);
