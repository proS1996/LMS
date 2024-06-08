const express = require("express");
const {
  createAccount,
  getAccountById,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");

const router = express.Router();

router.route("/accounts").post(createAccount);

router.route("/accounts/:id").get(getAccountById);

router.route("/accounts/:id").delete(deleteAccount);

module.exports = router;
