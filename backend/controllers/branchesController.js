const { v4: uuidv4 } = require("uuid");
const Branch = require("../models/branches");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create Branch (C - Create)
exports.createBranch = catchAsyncErrors(async (req, res) => {
  const trackingId = uuidv4();
  try {
    const { bankId, address } = req.body;

    // Create a new branch
    const newBranch = await Branch.create({
      bankId,
      address,
    });

    console.log(`Tracking ID [${trackingId}]: Branch created successfully`);
    return res.status(201).json(newBranch);
  } catch (error) {
    console.error(`Tracking ID [${trackingId}]: Error creating branch:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Branch by ID (R - Read)
exports.getBranchById = catchAsyncErrors(async (req, res) => {
  const trackingId = uuidv4();
  try {
    const branchId = req.params.id;
    const branch = await Branch.findById(branchId);

    if (!branch) {
      console.warn(`Tracking ID [${trackingId}]: Branch not found`);
      return res.status(404).json({ error: "Branch not found" });
    }

    console.log(
      `Tracking ID [${trackingId}]: Branch fetched successfully`,
      branch
    );
    return res.json(branch);
  } catch (error) {
    console.error(`Tracking ID [${trackingId}]: Error fetching branch:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Branch by ID (U - Update)
exports.updateBranch = catchAsyncErrors(async (req, res) => {
  const trackingId = uuidv4();
  try {
    const branchId = req.params.id;
    const { bankId, address } = req.body;

    const updatedBranch = await Branch.findByIdAndUpdate(
      branchId,
      { bankId, address },
      { new: true, runValidators: true }
    );

    if (!updatedBranch) {
      console.warn(`Tracking ID [${trackingId}]: Branch not found`);
      return res.status(404).json({ error: "Branch not found" });
    }

    console.log(
      `Tracking ID [${trackingId}]: Branch updated successfully`,
      updatedBranch
    );
    return res.json(updatedBranch);
  } catch (error) {
    console.error(`Tracking ID [${trackingId}]: Error updating branch:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Branch by ID (D - Delete)
exports.deleteBranch = catchAsyncErrors(async (req, res) => {
  const trackingId = uuidv4();
  try {
    const branchId = req.params.id;
    const deletedBranch = await Branch.findByIdAndDelete(branchId);

    if (!deletedBranch) {
      console.warn(`Tracking ID [${trackingId}]: Branch not found`);
      return res.status(404).json({ error: "Branch not found" });
    }

    console.log(`Tracking ID [${trackingId}]: Branch deleted successfully`);
    return res.json({ message: "Branch deleted successfully" });
  } catch (error) {
    console.error(`Tracking ID [${trackingId}]: Error deleting branch:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
