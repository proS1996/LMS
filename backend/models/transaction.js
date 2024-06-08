const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  transaction_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TransactionType",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
