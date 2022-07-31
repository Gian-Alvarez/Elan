const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiarySchema = new Schema({
    UserID: {
        type: String
    },
    Diet: [{
        DietID: {
            type: String
        },
        Date: {
            type: Date, 
            default: Date.now
        }
    }]
}, {collection: 'Diary'});
module.exports = Diary = mongoose.model("Diary", DiarySchema);