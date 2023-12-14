const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUserRole,
  deleteUser,
  updateUserProfile,
  updateUserPassword,
  loginUser,
  logoutUser,
  forgotPassword,
} = require("../controllers/userControllers");
const {
  Authenticated,
  AuthorizeAdminRole,
  AuthorizeUserRole,
} = require("../helpers/Authorization");

router.get("/", Authenticated, AuthorizeAdminRole, getUsers);
router.get("/:id", Authenticated, AuthorizeAdminRole, getUser);
router.put("/user-role/:id", Authenticated, AuthorizeAdminRole, updateUserRole);
router.delete("/:id", Authenticated, AuthorizeAdminRole, deleteUser);

router.put("/user-profile/:id", Authenticated, AuthorizeUserRole, updateUserProfile);
router.put("/user-password/:token", updateUserPassword);
router.post("/forgot-password", forgotPassword);

router.post("/register", createUser);
router.post("/user-login", loginUser);
router.post("/user-logout", Authenticated, logoutUser);

module.exports = router;
