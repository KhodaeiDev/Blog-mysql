const express = require("express");
const controller = require("./../controller/article");
const validator = require("./../middlewares/validators");
const createArticleSchema = require("../validators/createArticle");
const passport = require("passport");
const path = require("path");
const { multerStorage } = require("../middlewares/uploader");

const uploader = multerStorage(
  path.resolve(__dirname, "../../public/images/covers"),
  /webp/
);

const router = express.Router();

router
  .route("/")
  .post(
    passport.authenticate("accessToken", { session: false }),
    validator(createArticleSchema),
    uploader.single("cover"),
    controller.create
  );

module.exports = router;
