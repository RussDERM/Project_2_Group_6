require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var authRoutes = require("./routes/auth-routes");
var passportSetup = require("./config/passport-setup");
var keys = require("./config/keys");
var cookieSession = require("cookie-session");
var passport = require("passport");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
// require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/tweet-api-routes")(app);
require("./routes/user-api-routes")(app);

//route for auth
app.use("/auth", authRoutes);
// create cookie session
app.use(
  cookieSession({
    //encrypt cookie make sure it is a day long
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.Cookiekey]
  })
);

//initialize passport
app.use(passport.initialize);
//use session to utilize session cookies
app.use(passport.session);
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
