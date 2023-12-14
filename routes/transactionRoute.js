const express = require("express");
const router = express.Router();
const {
  createTransaction,
  updateStatusTransaction,
} = require("../controllers/transactionControllers");
const { AuthorizeUserRole, Authenticated } = require("../helpers/Authorization");

router.post("/:id", Authenticated, AuthorizeUserRole, createTransaction);
router.put("/:token", Authenticated, AuthorizeUserRole, updateStatusTransaction);

module.exports = router;
