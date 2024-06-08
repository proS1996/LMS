const Loan = require("../models/loan");
const LoanOfficer = require("../models/loanOfficer");
const Account = require("../models/account");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create a new loan
exports.createLoan = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id, amount, loanOfficerId, accountId } = req.body;

    // Check if the referenced loan officer and account exist
    const loanOfficer = await LoanOfficer.findById(loanOfficerId);
    if (!loanOfficer) {
      return res.status(404).json({ message: "Loan Officer not found" });
    }

    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const newLoan = new Loan({ id, amount, loanOfficerId, accountId });
    const savedLoan = await newLoan.save();
    res.status(201).json(savedLoan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get loan by ID
exports.getLoanById = catchAsyncErrors(async (req, res, next) => {
  try {
    const loanId = req.params.id;
    const foundLoan = await Loan.findById(loanId)
      .populate("loanOfficerId")
      .populate("accountId");

    if (!foundLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json(foundLoan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update loan
exports.updateLoan = catchAsyncErrors(async (req, res, next) => {
  try {
    const loanId = req.params.id;
    const updates = req.body;

    // Check if the updated loan officer and account exist
    if (updates.loanOfficerId) {
      const loanOfficer = await LoanOfficer.findById(updates.loanOfficerId);
      if (!loanOfficer) {
        return res.status(404).json({ message: "Loan Officer not found" });
      }
    }

    if (updates.accountId) {
      const account = await Account.findById(updates.accountId);
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
    }

    const updatedLoan = await Loan.findByIdAndUpdate(loanId, updates, {
      new: true, // return the updated document
      runValidators: true, // validate the updated data
    });

    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json(updatedLoan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete loan
exports.deleteLoan = catchAsyncErrors(async (req, res, next) => {
  try {
    const loanId = req.params.id;
    const deletedLoan = await Loan.findByIdAndDelete(loanId);

    if (!deletedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
