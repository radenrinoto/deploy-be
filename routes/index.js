const express = require("express");
const courseCategoryRoute = require("./courseCategoryRoute");
const transactionRoute = require("./transactionRoute");
const coursesRoute = require("./courseRoute");
const userRoute = require("./userRoute");
const instructorRoute = require("./instructorRoute");
const router = express.Router();

router.use("/transaction", transactionRoute);
router.use("/course-category", courseCategoryRoute);
router.use("/courses", coursesRoute);
router.use("/user", userRoute);
router.use("/instructor", instructorRoute);

module.exports = router;
