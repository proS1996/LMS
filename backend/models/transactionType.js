const mongoose = require("mongoose");

const transactionTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Other transaction type-related attributes...
});

module.exports = mongoose.model("TransactionType", transactionTypeSchema);
