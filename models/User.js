const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4
  },
  Password: {
    type: String,
    required: true
  },
  First_Name: {
    type: String,
    required: true
  },
  Last_Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Health: {
    type: Schema.Types.ObjectId,
    ref: "Health"
  },
  History: [{
    type: Schema.Types.ObjectId, 
    ref: "Diary"
  }],
  Meals: [{
    type: Schema.Types.ObjectId,
    ref: "Meals"
  }]
}, {collection: 'Users'});
module.exports = User = mongoose.model("Users", UserSchema);
