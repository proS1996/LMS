const express = require("express");
const { createLoan, getLoanById } = require("../controllers/loansController");

const router = express.Router();

router.route("/loans").post(createLoan);
router.route("/loans/:userId").get(getLoanById);

module.exports = router;
