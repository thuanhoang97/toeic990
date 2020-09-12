const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = require('../models/user.model');

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY,
  };

  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            const { firstName, lastName, username, _id } = user;
            return done(null, {
              firstName, 
              lastName,
              username,
              _id
            });
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
};
