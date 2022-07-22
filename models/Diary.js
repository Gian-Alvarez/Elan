const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiarySchema = new Schema(
{
    Breakfast: {
        type: Schema.Types.ObjectID, 
        ref: "Food"
    },
    Lunch: {
        type: Schema.Types.ObjectID,
        ref: "Food"
    },
    Dinner: {
        type : Schema.Types.ObjectID, 
        ref : "Food"
    },
    Date: {
        type : Date, 
        default : Date.now
    }
}, {collection: 'Diary'});
module.exports = Diary = mongoose.model("Diary", DiarySchema);