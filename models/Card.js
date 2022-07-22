const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CardSchema = new Schema({
	UserID: {
		type: String
	},
	Card: {
		type: String,
		required: true
	}
}, {collection: 'Cards'});
module.exports = Card = mongoose.model('Cards', CardSchema);
