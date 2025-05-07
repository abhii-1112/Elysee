const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {type:String},
  description:{type:String}
});

module.exports = mongoose.model("Menu", menuSchema);
