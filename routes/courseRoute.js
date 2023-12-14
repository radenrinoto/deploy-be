const express = require("express");
const {
  getCourses,
  getCourse,
  createCourse,
  updateImageCourse,
  updateCourse,
  updateCountParticipantCourse,
  getMyCourse,
  deleteCourse,
} = require("../controllers/courseControllers");
const uploadMiddleware = require("../middleware/UploadMiddleware");
const {
  Authenticated,
  AuthorizeUserRole,
  AuthorizeAdminRole,
} = require("../helpers/Authorization");
const router = express.Router();

router.get("/my-course", Authenticated, AuthorizeUserRole, getMyCourse);
router.get("/", getCourses);
router.get("/:id", getCourse);

router.post("/", Authenticated, AuthorizeAdminRole, uploadMiddleware, createCourse);

router.put("/update-course/:id", Authenticated, AuthorizeAdminRole, updateCourse);
router.put(
  "/update-image/:id",
  Authenticated,
  AuthorizeAdminRole,
  uploadMiddleware,
  updateImageCourse
);

router.post(
  "/register-participant/:id",
  Authenticated,
  AuthorizeUserRole,
  updateCountParticipantCourse
);

router.delete("/:id", Authenticated, AuthorizeAdminRole, deleteCourse);

module.exports = router;
