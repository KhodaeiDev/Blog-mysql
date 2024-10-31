const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

const localStrategy = require("./strategies/local");

const captchaController = require("./controller/captcha");
const authRouter = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

//* Just for Login and test captcha logic
app.set("view engine", "ejs");

//* Passport package strategy middlewares
app.use(localStrategy);

//* Routes
app.get("/captcha", captchaController.get);
app.use("/auth", authRouter);

module.exports = app;
