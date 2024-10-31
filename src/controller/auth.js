const bcrypt = require("bcrypt");
const { User } = require("./../db");
const jwt = require("jsonwebtoken");
const configs = require("../configs");
const Redis = require("../redis");

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const hasedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      username,
      email,
      password: hasedPassword,
    });

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.accessTokenSecret,
      {
        expiresIn: configs.auth.accessTokenExpiresInSecond + "s",
      }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      configs.auth.resreshTokenSecret,
      {
        expiresIn: configs.auth.resreshTokenExpiresInSecond + "s",
      }
    );

    const refreshTokenHashed = await bcrypt.hash(refreshToken, 12);

    await Redis.set(
      `RefreshToken${user.id}`,
      refreshTokenHashed,
      "EX",
      configs.auth.resreshTokenExpiresInSecond
    );

    return res.status(201).json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const user = req.user;

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    configs.auth.accessTokenSecret,
    {
      expiresIn: configs.auth.accessTokenExpiresInSecond + "s",
    }
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    configs.auth.resreshTokenSecret,
    {
      expiresIn: configs.auth.resreshTokenExpiresInSecond + "s",
    }
  );

  const refreshTokenHashed = await bcrypt.hash(refreshToken, 12);

  await Redis.set(
    `RefreshToken${user.id}`,
    refreshTokenHashed,
    "EX",
    configs.auth.resreshTokenExpiresInSecond
  );

  return res.json({
    accessToken,
    refreshToken,
  });
};
