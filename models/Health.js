const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HealthSchema = new Schema({
    Weight: [{
        type : Schema.Types.ObjectId, 
        ref : "Weight"
    }],
    Activity_Level: { 
        type: Number
    },
    Height: {
        type: Number
    },
    Age: {
        type:Number
    },
    Goal: {
        type:Number
    },
    Timeline: {
        type: Date,
        default: Date.now
    },
    Calories: {
        type: Number
    }
}, {collection: 'Health'});
module.exports = Health = mongoose.model("Health", HealthSchema);