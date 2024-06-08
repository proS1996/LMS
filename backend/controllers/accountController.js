const Account = require("../models/account");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create Account (C - Create)
exports.createAccount = catchAsyncErrors(async (req, res) => {
  const trackingId = req.trackingId;
  try {
    const { userId, balanceId } = req.body;

    // Create a new account
    const newAccount = await Account.create({
      userId,
      balanceId,
    });

    console.log(`Tracking ID [${trackingId}]: Account created successfully`);
    return res.status(201).json(newAccount);
  } catch (error) {
    console.error(
      `Tracking ID [${trackingId}]: Error creating account:`,
      error
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Account by ID (R - Read)
exports.getAccountById = catchAsyncErrors(async (req, res) => {
  const trackingId = req.trackingId;
  try {
    const accountId = req.params.id;
    const account = await Account.findById(accountId);

    if (!account) {
      console.warn(`Tracking ID [${trackingId}]: Account not found`);
      return res.status(404).json({ error: "Account not found" });
    }

    console.log(
      `Tracking ID [${trackingId}]: Account fetched successfully`,
      account
    );
    return res.json(account);
  } catch (error) {
    console.error(
      `Tracking ID [${trackingId}]: Error fetching account:`,
      error
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Account by ID (D - Delete)
exports.deleteAccount = catchAsyncErrors(async (req, res) => {
  const trackingId = req.trackingId;
  try {
    const accountId = req.params.id;
    const deletedAccount = await Account.findByIdAndDelete(accountId);

    if (!deletedAccount) {
      console.warn(`Tracking ID [${trackingId}]: Account not found`);
      return res.status(404).json({ error: "Account not found" });
    }

    console.log(`Tracking ID [${trackingId}]: Account deleted successfully`);
    return res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(
      `Tracking ID [${trackingId}]: Error deleting account:`,
      error
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
