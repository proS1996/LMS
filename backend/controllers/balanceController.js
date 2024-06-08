const Balance = require("../models/balance");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create Balance (C - Create)
exports.createBalance = catchAsyncErrors(async (req, res) => {
  try {
    const { amount } = req.body;

    // Create a new balance
    const newBalance = await Balance.create({
      amount,
    });

    return res.status(201).json(newBalance);
  } catch (error) {
    console.error("Error creating balance:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Balance by ID (R - Read)
exports.getAllBalances = catchAsyncErrors(async (req, res) => {
  try {
    const balances = await Balance.find();

    return res.json(balances);
  } catch (error) {
    console.error("Error fetching balances:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Balance by ID (U - Update)
exports.updateBalance = catchAsyncErrors(async (req, res) => {
  try {
    const balanceId = req.params.id;
    console.log("balanceId", balanceId);
    const { amount } = req.body;

    // Find balance by ID and update
    const updatedBalance = await Balance.findByIdAndUpdate(
      balanceId,
      { $set: { amount } },
      { new: true }
    );

    if (!updatedBalance) {
      return res.status(404).json({ error: "Balance not found" });
    }

    return res.json(updatedBalance);
  } catch (error) {
    console.error("Error updating balance:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
