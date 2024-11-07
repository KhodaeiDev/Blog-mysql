const jwtSterategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const configs = require("../configs");
const { User } = require("../db");

module.exports = new jwtSterategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configs.auth.accessTokenSecret,
  },
  async (payload, done) => {
    const user = await User.findOne(
      { id: payload.id },
      {
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      }
    );

    if (!user) return done(null, false);

    done(null, user);
  }
);
