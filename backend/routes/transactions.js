const express = require("express");
const {
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionsController"); // Adjust the path as needed

const router = express.Router();

router.route("/transactions").post(createTransaction);

router.route("/transactions/:id").get(getTransactionById);

router.route("/transactions/:id").put(updateTransaction);

router.route("/transactions/:id").delete(deleteTransaction);

module.exports = router;
