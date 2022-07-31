const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DietSchema = new Schema({
    UserID: {
        type: String
    },
    Date: {
        type: Date, 
        default: Date.now
    },
    Total_Calories:{
        type: Number
    },
    Meals: [{
        MealID: {
            type: String
        }
    }]
}, {collection: 'Diet'});
module.exports = Diet = mongoose.model("Diet", DietSchema);