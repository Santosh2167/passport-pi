const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("./../database/models/user_ model");

passport.use(new LocalStrategy(
  {
    usernameField: "email"

  },
  (email, password, done) => {

  }
));