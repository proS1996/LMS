const mongoose = require("mongoose");

const cardTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("CardType", cardTypeSchema);
