const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  card_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CardType",
    required: true,
  },
  card_number: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other card related fields here (PIN, CVV etc.)
});

module.exports = mongoose.model("Card", cardSchema);
