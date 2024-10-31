const express = require("express");
const controller = require("./../controller/auth");
const validator = require("./../middlewares/validators");
const { registerValidatorSchema } = require("../validators/auth");

const router = express.Router();

router
  .route("/register")
  .post(validator(registerValidatorSchema), controller.register);

module.exports = router;
