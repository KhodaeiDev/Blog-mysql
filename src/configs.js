const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "./.env"),
});

module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
    pool: process.env.POOL_SIZE,
    dialect: process.env.dialect,
  },

  port: parseInt(process.env.PORT) || 4000,

  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    resreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiresInSecond: process.env.ACCESS_TOKEN_EXPIRES_IN_SECOND,
    resreshTokenExpiresInSecond: process.env.RESRESH_TOKEN_EXPIRES_IN_SECOND,

    google: {},
  },

  redis: {},

  domain: process.env.DAMAIN,

  isProductions: process.env.NODE_ENV === "production",
};
