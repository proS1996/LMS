const express = require("express");
const {
  createBalance,
  getAllBalances,
  updateBalance,
} = require("../controllers/balanceController");

const router = express.Router();

router.route("/balances").post(createBalance);

router.route("/allbalances").get(getAllBalances);

router.route("/balances/:id").put(updateBalance);

module.exports = router;
