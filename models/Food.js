const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodsSchema = new Schema({
    UserID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Protein: {
        type: Number
    },
    Carbohydrates: {
        type: Number
    },
    Sugar: {
        type:Number
    },
    Fat: {
        type: Number
    },
    Sodium: {
        type: Number
    },
    Calories: {
        type: Number,
        required: true
    },
    Food_Type: {
        type: String
    },
    Serving_Size: {
        type: Number
    },
    SS_Type: {
        type: String
    },
    Phase: {
        type: Boolean
    }
}, {collection: "Foods"});
module.exports = Food = mongoose.model("Foods", FoodsSchema);