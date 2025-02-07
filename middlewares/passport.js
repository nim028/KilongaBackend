const { user } = require("../models");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.key,
    },
    async (jwtPayload, done) => {
      await user
        .findOne({ where: { id: jwtPayload.id } })
        .then((u) => {
          if (!u) {
            return done(null, false);
          } else {
            return done(null, u);
          }
        })
        .catch((error) => {
          return done(error, false);
        });
    }
  )
);
