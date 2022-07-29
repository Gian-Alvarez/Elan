const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealsSchema = new Schema({
    UserID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Foods: [{
        FoodIDs: {
            type: String
        }
    }]
}, {collection: 'Meals'});
module.exports = Meal = mongoose.model("Meals", MealsSchema);