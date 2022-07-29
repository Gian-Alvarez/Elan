const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeightSchema = new Schema(
{
    Curr_Weight: {
        type: Number
    },
    Date: {
        type: Date, 
        default: Date.now
    }
}, {collection: 'Weight'});
module.exports = Weight = mongoose.model("Weight", WeightSchema);