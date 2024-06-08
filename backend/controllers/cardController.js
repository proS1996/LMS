const mongoose = require("mongoose");
const Card = require("../models/card"); // Adjust the path as needed
const Account = require("../models/account"); // Adjust the path as needed
const CardType = require("../models/cardType"); // Adjust the path as needed
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create a new card
const createCard = catchAsyncErrors(async (req, res) => {
  try {
    const { account_id, card_type_id, card_number } = req.body;

    // Validate the existence of account and card type
    const account = await Account.findById(account_id);
    const cardType = await CardType.findById(card_type_id);
    if (!account || !cardType) {
      return res.status(400).json({ error: "Invalid account or card type ID" });
    }

    const card = new Card({
      account_id,
      card_type_id,
      card_number,
    });

    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a card by ID
const getCardById = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id).populate("account_id card_type_id");
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a card by ID
const updateCard = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const { account_id, card_type_id, card_number } = req.body;

    const card = await Card.findByIdAndUpdate(
      id,
      { account_id, card_type_id, card_number },
      { new: true }
    );

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a card by ID
const deleteCard = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createCard,
  getCardById,
  updateCard,
  deleteCard,
};
