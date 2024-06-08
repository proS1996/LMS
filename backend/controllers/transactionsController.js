const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Transaction = require("../models/transaction"); // Adjust the path as needed
const Account = require("../models/account"); // Ensure this path is correct
const TransactionType = require("../models/transactionType"); // Ensure this path is correct
const catchAsyncErrors = require("../middleware/catchAsyncError");
// Create a new transaction
const createTransaction = catchAsyncErrors(async (req, res) => {
  try {
    const { account_id, transaction_type_id, amount } = req.body;

    // Validate the existence of account and transaction type
    const account = await Account.findById(account_id);
    const transactionType = await TransactionType.findById(transaction_type_id);
    if (!account || !transactionType) {
      return res
        .status(400)
        .json({ error: "Invalid account or transaction type ID" });
    }

    const transaction = new Transaction({
      _id: uuidv4(),
      account_id,
      transaction_type_id,
      amount,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a transaction by ID
const getTransactionById = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id).populate(
      "account_id transaction_type_id"
    );
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a transaction by ID
const updateTransaction = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const { account_id, transaction_type_id, amount } = req.body;

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { account_id, transaction_type_id, amount },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a transaction by ID
const deleteTransaction = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
