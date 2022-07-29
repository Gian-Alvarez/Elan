const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DietSchema = new Schema({
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
})

const DiarySchema = new Schema({
    UserID: {
        type: String
    },
    Diet: [
        DietSchema
    ]
}, {collection: 'Diary'});
module.exports = Diary = mongoose.model("Diary", DiarySchema);