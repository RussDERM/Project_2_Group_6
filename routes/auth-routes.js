var router = require("express").Router();
var passport = require("passport");

// authentication login
router.get("/login", (req, res) => {
    res.render("login", {user: req.user});
});

//authentication logout
router.get("/logout", (req, res) => {
    //handle with passport
    res.logout();
    res.redirect("/");
});

//authentication with google
router.get("/google".passport.authenticate("google", {
    scope: ["profile"]
}));

//callback route for google to redirect 
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.send("you've reached the callback URI")
});

//export the route to be imported in the server.js
module.exports = router;