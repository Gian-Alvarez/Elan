const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeightSchema = new Schema({
    Date: {
        type: Date, 
        default: Date.now
    },
    Weight: {
        type: Number
    }  
})

const HealthSchema = new Schema({
    UserID: {
        type: String,
        required: true
    },
    Weight: [
        WeightSchema
    ],
    Curr_Weight: {
        type: Number
    },
    Goal_Weight: {
        type:Number
    },
    Calorie_Goal: {
        type: Number
    },
    Height: {
        type: String
    },
    Age: {
        type:Number
    },
    Activity_Level: { 
        type: Number
    },
    Timeline: {
        type: Date,
        default: Date.now
    }
}, {collection: 'Health'});
module.exports = Health = mongoose.model("Health", HealthSchema);