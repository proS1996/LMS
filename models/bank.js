const mongoose = require("mongoose");

// Define the bank schema
const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  address: {
    type: String,
  },
});

// Create a model from the schema
const Bank = mongoose.model("Bank", bankSchema);

module.exports = Bank;
