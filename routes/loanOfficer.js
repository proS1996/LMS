const express = require("express");
const {
  createLoanOfficer,
  getLoanOfficerById,
  updateLoanOfficer,
  deleteLoanOfficer,
} = require("../controllers/loanOfficerController");

const router = express.Router();

router.route("/loan-officers").post(createLoanOfficer);

router.route("/loan-officers/:id").get(getLoanOfficerById);

router.route("/loan-officers/:id").put(updateLoanOfficer);

router.route("/loan-officers/:id").delete(deleteLoanOfficer);

module.exports = router;
