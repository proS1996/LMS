const express = require("express");
const {
  createCard,
  getCardById,
  updateCard,
  deleteCard,
} = require("../controllers/cardController"); // Adjust the path as needed

const router = express.Router();

router.route("/cards").post(createCard);
router.route("/cards/:id").get(getCardById);
router.route("/cards/:id").put(updateCard);
router.route("/cards/:id").delete(deleteCard);

module.exports = router;
