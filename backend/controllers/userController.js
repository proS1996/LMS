const { v4: uuidv4 } = require("uuid");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create User (C - Create)
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  console.log("req.body", req.body);
  const trackingId = uuidv4();
  try {
    const { name, email, branchId } = req.body;
    const savedUser = await User.create({
      name,
      email,
      branchId,
    });
    console.log(
      `Tracking ID [${trackingId}]: User created successfully`,
      savedUser
    );
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(`Tracking ID [${trackingId}]: Error creating user:`, err);
    res.status(500).json({ error: err.message });
  }
});

// Get User by ID (R - Read)
exports.getUserById = catchAsyncErrors(async (req, res, next) => {
  const trackingId = uuidv4();
  try {
    const userId = req.params.id;
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      console.warn(`Tracking ID [${trackingId}]: User not found`);
      return res.status(404).json({ message: "User not found" });
    }

    console.log(
      `Tracking ID [${trackingId}]: User fetched successfully`,
      foundUser
    );
    res.status(200).json(foundUser);
  } catch (err) {
    console.error(`Tracking ID [${trackingId}]: Error fetching user:`, err);
    res.status(500).json({ error: err.message });
  }
});

// Update User by ID (U - Update)
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const trackingId = uuidv4();
  try {
    const userId = req.params.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true, // return the updated document
      runValidators: true, // validate the updated data
    });

    if (!updatedUser) {
      console.warn(`Tracking ID [${trackingId}]: User not found`);
      return res.status(404).json({ message: "User not found" });
    }

    console.log(
      `Tracking ID [${trackingId}]: User updated successfully`,
      updatedUser
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(`Tracking ID [${trackingId}]: Error updating user:`, err);
    res.status(500).json({ error: err.message });
  }
});

// Delete User by ID (D - Delete)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const trackingId = uuidv4();
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      console.warn(`Tracking ID [${trackingId}]: User not found`);
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`Tracking ID [${trackingId}]: User deleted successfully`);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(`Tracking ID [${trackingId}]: Error deleting user:`, err);
    res.status(500).json({ error: err.message });
  }
});
