const { v4: uuidv4 } = require("uuid");
const Bank = require("../models/bank");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create Bank (C - Create)
exports.createBank = catchAsyncErrors(async (req, res) => {
  const trackingId = uuidv4();
  try {
    const { name, address } = req.body;

    // Create a new bank
    const newBank = await Bank.create({
      name,
      address,
    });

    console.log(
      `Tracking ID [${trackingId}]: Bank created successfully`,
      newBank
    );
    return res.status(201).json(newBank);
  } catch (error) {
    console.error(`Tracking ID [${trackingId}]: Error creating bank:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Bank by ID (R - Read)
exports.getBankById = catchAsyncErrors(async (req, res) => {
  const trackingId = uuidv4();
  try {
    const bankId = req.params.id;
    const bank = await Bank.findById(bankId);

    if (!bank) {
      console.warn(`Tracking ID [${trackingId}]: Bank not found`);
      return res.status(404).json({ error: "Bank not found" });
    }

    console.log(`Tracking ID [${trackingId}]: Bank fetched successfully`, bank);
    return res.json(bank);
  } catch (error) {
    console.error(`Tracking ID [${trackingId}]: Error fetching bank:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Bank by ID (U - Update)
exports.updateBank = catchAsyncErrors(async (req, res) => {
  const trackingId = uuidv4();
  try {
    const bankId = req.params.id;
    const { name, address } = req.body;

    const updatedBank = await Bank.findByIdAndUpdate(
      bankId,
      { name, address },
      { new: true, runValidators: true }
    );

    if (!updatedBank) {
      console.warn(`Tracking ID [${trackingId}]: Bank not found`);
      return res.status(404).json({ error: "Bank not found" });
    }

    console.log(
      `Tracking ID [${trackingId}]: Bank updated successfully`,
      updatedBank
    );
    return res.json(updatedBank);
  } catch (error) {
    console.error(`Tracking ID [${trackingId}]: Error updating bank:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Bank by ID (D - Delete)
exports.deleteBank = catchAsyncErrors(async (req, res) => {
  const trackingId = uuidv4();
  try {
    const bankId = req.params.id;
    const deletedBank = await Bank.findByIdAndDelete(bankId);

    if (!deletedBank) {
      console.warn(`Tracking ID [${trackingId}]: Bank not found`);
      return res.status(404).json({ error: "Bank not found" });
    }

    console.log(`Tracking ID [${trackingId}]: Bank deleted successfully`);
    return res.json({ message: "Bank deleted successfully" });
  } catch (error) {
    console.error(`Tracking ID [${trackingId}]: Error deleting bank:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
