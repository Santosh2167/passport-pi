const UserModel = require("./../database/models/user_ model");

function loginForm(req, res) {
  res.render("auth/login");

}

async function loginVerify(req, res) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.redirect("/login");
  }

  const verifyPassword = await user.verifyPassword(password);

  if (!verifyPassword) {
    return res.redirect("/login");
  }

  req.session.user = user;
  res.redirect("/dashboard");
}

function make(req, res) {
  res.render("auth/make");

}

function logout(req, res) {
  // req.session.user = "";
  // res.redirect("/");


  req.session.destroy(() => {
    res.redirect("/");
  })

}
async function create(req, res) {
  //res.send(req.body);
  const user = await UserModel.create(req.body);

  console.log("user", user);
  req.session.user = user;
  res.redirect("/dashboard");
}


module.exports = {
  loginForm,
  loginVerify,
  make,
  create,
  logout

}