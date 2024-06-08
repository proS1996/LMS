const express = require("express");
const {
  createBranch,
  getBranchById,
  updateBranch,
  deleteBranch,
} = require("../controllers/branchesController");

const router = express.Router();

// Create Branch (C - Create)
router.route("/branches").post(createBranch);

// Get Branch by ID (R - Read)
router.route("/branches/:id").get(getBranchById);

// Update Branch by ID (U - Update)
router.route("/branches/:id").put(updateBranch);

// Delete Branch by ID (D - Delete)
router.route("/branches/:id").delete(deleteBranch);

module.exports = router;
