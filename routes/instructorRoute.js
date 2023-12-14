const express = require("express");
const { getInstructors } = require("../controllers/instructorControllers");
const { Authenticated, AuthorizeAdminRole } = require("../helpers/Authorization");
const router = express.Router();

router.get("/", Authenticated, AuthorizeAdminRole, getInstructors);

module.exports = router;
