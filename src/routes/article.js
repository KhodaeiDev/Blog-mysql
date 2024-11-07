const express = require("express");
const controller = require("./../controller/article");
const validator = require("./../middlewares/validators");
const createArticleSchema = require("../validators/createArticle");
const passport = require("passport");

const router = express.Router();

router
  .route("/")
  .post(
    validator(createArticleSchema),
    passport.authenticate("accessToken", { session: false }),
    controller.create
  );

module.exports = router;
