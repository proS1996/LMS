const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balanceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Balance",
    required: true,
  },
});

// Create and export the Account model
const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
