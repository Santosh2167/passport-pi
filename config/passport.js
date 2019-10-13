const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("./../database/models/user_ model");

passport.use(new LocalStrategy(
  {
    usernameField: "email"

  },
  (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });

      if (!user || !user.verifyPasswordSync(password)) {
        return done(null, false)
      }

      return done(null, user);
    }

  } catch (error) {
  done(error);
}
));