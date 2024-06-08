const { v4: uuidv4 } = require("uuid");
const LoanOfficer = require("../models/loanOfficer");
const Branch = require("../models/branches");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create a new loan officer
exports.createLoanOfficer = catchAsyncErrors(async (req, res, next) => {
  const trackingId = uuidv4();
  try {
    const { name, branchId } = req.body;

    // Check if the referenced branch exists
    const branch = await Branch.findById(branchId);
    if (!branch) {
      console.warn(`Tracking ID [${trackingId}]: Branch not found`);
      return res.status(404).json({ message: "Branch not found" });
    }

    const newLoanOfficer = new LoanOfficer({ name, branchId });
    const savedLoanOfficer = await newLoanOfficer.save();
    console.log(
      `Tracking ID [${trackingId}]: Loan Officer created successfully`
    );
    res.status(201).json(savedLoanOfficer);
  } catch (err) {
    console.error(
      `Tracking ID [${trackingId}]: Error creating Loan Officer:`,
      err
    );
    res.status(500).json({ error: err.message });
  }
});

// Get loan officer by ID
exports.getLoanOfficerById = catchAsyncErrors(async (req, res, next) => {
  const trackingId = uuidv4();
  try {
    const loanOfficerId = req.params.id;
    const foundLoanOfficer = await LoanOfficer.findById(loanOfficerId).populate(
      "branchId"
    );

    if (!foundLoanOfficer) {
      console.warn(`Tracking ID [${trackingId}]: Loan Officer not found`);
      return res.status(404).json({ message: "Loan Officer not found" });
    }

    console.log(
      `Tracking ID [${trackingId}]: Loan Officer fetched successfully`
    );
    res.status(200).json(foundLoanOfficer);
  } catch (err) {
    console.error(
      `Tracking ID [${trackingId}]: Error fetching Loan Officer:`,
      err
    );
    res.status(500).json({ error: err.message });
  }
});

// Update loan officer
exports.updateLoanOfficer = catchAsyncErrors(async (req, res, next) => {
  const trackingId = uuidv4();
  try {
    const loanOfficerId = req.params.id;
    const updates = req.body;

    // Check if the updated branch exists
    if (updates.branchId) {
      const branch = await Branch.findById(updates.branchId);
      if (!branch) {
        console.warn(`Tracking ID [${trackingId}]: Branch not found`);
        return res.status(404).json({ message: "Branch not found" });
      }
    }

    const updatedLoanOfficer = await LoanOfficer.findByIdAndUpdate(
      loanOfficerId,
      updates,
      {
        new: true, // return the updated document
        runValidators: true, // validate the updated data
      }
    );

    if (!updatedLoanOfficer) {
      console.warn(`Tracking ID [${trackingId}]: Loan Officer not found`);
      return res.status(404).json({ message: "Loan Officer not found" });
    }

    console.log(
      `Tracking ID [${trackingId}]: Loan Officer updated successfully`,
      updatedLoanOfficer
    );
    res.status(200).json(updatedLoanOfficer);
  } catch (err) {
    console.error(
      `Tracking ID [${trackingId}]: Error updating Loan Officer:`,
      err
    );
    res.status(500).json({ error: err.message });
  }
});

// Delete loan officer
exports.deleteLoanOfficer = catchAsyncErrors(async (req, res, next) => {
  const trackingId = uuidv4();
  try {
    const loanOfficerId = req.params.id;
    const deletedLoanOfficer = await LoanOfficer.findByIdAndDelete(
      loanOfficerId
    );

    if (!deletedLoanOfficer) {
      console.warn(`Tracking ID [${trackingId}]: Loan Officer not found`);
      return res.status(404).json({ message: "Loan Officer not found" });
    }

    console.log(
      `Tracking ID [${trackingId}]: Loan Officer deleted successfully`
    );
    res.status(200).json({ message: "Loan Officer deleted successfully" });
  } catch (err) {
    console.error(
      `Tracking ID [${trackingId}]: Error deleting Loan Officer:`,
      err
    );
    res.status(500).json({ error: err.message });
  }
});
