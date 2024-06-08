const express = require("express");
const {
  createBank,
  getBankById,
  updateBank,
  deleteBank,
} = require("../controllers/bankController");

const router = express.Router();

// Create Bank (C - Create)
router.route("/banks").post(createBank);

// Get Bank by ID (R - Read)
router.route("/banks/:id").get(getBankById);

// Update Bank by ID (U - Update)
router.route("/banks/:id").put(updateBank);

// Delete Bank by ID (D - Delete)
router.route("/banks/:id").delete(deleteBank);

module.exports = router;
