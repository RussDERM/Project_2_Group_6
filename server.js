require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport"); // Require passport


// Require cookie packages
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");

// Require our models
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Setup passport
require("./config/passport-setup")(passport);


// var authRoutes = require("./routes/auth-routes"); //route for auth
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(express.static("public"));
// Register cookie packages as middleware
app.use(
  cookieSession({
    name: "session", // key name for our cookie to reference later for our logged in user foreign id
    keys: ["123"], // key encryption
    // maxAge: 24 * 60 * 60 * 1000, //encrypt cookie make sure it is a day long
  })
);
app.use(cookieParser()); // Lets us easily get cookie data as request

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// app.use("/auth", authRoutes);
//home route user to determine in views which user login/ out button needs to display
// app.get("/",(req, res) =>{
//   res.render("index",{user:req.user});
// });
// Routes
require("./routes/auth-routes")(app);
require("./routes/tweet-api-routes")(app);
require("./routes/htmlRoutes")(app);
// require("./routes/apiRoutes");
// require("./routes/user-api-routes")(app);

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
