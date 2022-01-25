const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/usercontroller");
//Define endpoints
router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login)
router.patch("/activate", AuthController.Activate)
router.patch("/forgot", AuthController.ForgotPassword);
router.patch("/reset", AuthController.ResetPassword);
module.exports = router;