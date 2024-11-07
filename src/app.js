const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

const localStrategy = require("./strategies/local");

const captchaController = require("./controller/captcha");
const authRouter = require("./routes/auth");
const articleRouter = require("./routes/article");
const jwtAccessTokenSterategy = require("./strategies/jwtAccessTokenSterategy");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

//* Just for Login and test captcha logic
app.set("view engine", "ejs");

//* Passport package strategy middlewares
passport.use(localStrategy);
passport.use("accessToken", jwtAccessTokenSterategy);

//* Routes
app.get("/captcha", captchaController.get);
app.use("/auth", authRouter);
app.use("/article", articleRouter);

module.exports = app;
