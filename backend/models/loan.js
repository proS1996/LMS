const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  // id: { type: String, required: true, unique: true },
  amount: { type: mongoose.Types.Decimal128, required: true },
  loanOfficerId: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanOfficer', required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
});

// Create and export the Loan model
const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan;
