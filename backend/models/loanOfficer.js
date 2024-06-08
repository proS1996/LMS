const mongoose = require("mongoose");

const loanOfficerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branches",
    required: true,
  },
});

// Create and export the LoanOfficer model
const LoanOfficer = mongoose.model("LoanOfficer", loanOfficerSchema);
module.exports = LoanOfficer;
