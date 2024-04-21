const express = require("express");
const UserController = require("../controllers/users");
const router = express.Router();

//for user
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.get("/adminlogout", UserController.adminlogout);
//for admin
router.post("/admin", UserController.admin);


module.exports = router;