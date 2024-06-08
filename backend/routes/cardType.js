const express = require("express");
const router = express.Router();
const {
  deleteCard,
  getCardById,
  createCard,
  updateCard,
} = require("../controllers/cardTypeController");

// Get a single card type by ID

router.route("/cardtypes/:id").get(getCardById);

// Create a new card type
router.route("/cardtypes").post(createCard);

// Update a card type
router.route("/cardtypes/:id").put(updateCard);

// Delete a card type
router.route("/cardtypes/:id").delete(deleteCard);

module.exports = router;
