const mongoose = require("mongoose");

// Define the branches schema
const branchesSchema = new mongoose.Schema({
  bankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bank",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const Branches = mongoose.model("Branches", branchesSchema);

module.exports = Branches;
