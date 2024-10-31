const express = require("express");
const controller = require("./../controller/auth");
const validator = require("./../middlewares/validators");
const {
  registerValidatorSchema,
  loginValidatorSchema,
} = require("../validators/auth");
const passport = require("passport");

const router = express.Router();

router
  .route("/register")
  .post(validator(registerValidatorSchema), controller.register);

router
  .route("/login")
  .post(
    validator(loginValidatorSchema),
    passport.authenticate("local", { session: false }),
    controller.login
  );

module.exports = router;
