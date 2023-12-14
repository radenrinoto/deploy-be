const express = require("express");
const SendResponse = require("../helpers/SendResponse");

const {
  getCourseCategories,
  getCourseCategory,
  createCourseCategory,
  updateCourseCategory,
  deleteCategory,
} = require("../controllers/courseCategoryControllers");
const { Authenticated, AuthorizeAdminRole } = require("../helpers/Authorization");

const router = express.Router();

router.get("/", getCourseCategories);

router.get("/:id", getCourseCategory);

router.post("/", Authenticated, AuthorizeAdminRole, createCourseCategory);

router.put("/:id", Authenticated, AuthorizeAdminRole, updateCourseCategory);

router.delete("/:id", Authenticated, AuthorizeAdminRole, deleteCategory);

module.exports = router;
