const { User } = require("../db");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({
    where: {
      username,
    },
    raw: true,
  });

  if (!user) return done(null, false);

  const acceptPassword = await bcrypt.compare(password, user.password);
  if (!acceptPassword) return done(null, false);

  return done(null, user);
});
