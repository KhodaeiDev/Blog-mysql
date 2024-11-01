const express = require("express");
const controller = require("./../controller/article");
const validator = require("./../middlewares/validators");
const createArticleSchema = require("../validators/createArticle");

const router = express.Router();

router.route("/").post(validator(createArticleSchema), controller.create);

module.exports = router;
