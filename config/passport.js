const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("./../database/models/user_ model");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
})

passport.use(new LocalStrategy(
  {
    usernameField: "email"

  },
  async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });

      if (!user || !user.verifyPasswordSync(password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      done(error);
    }

  }
));