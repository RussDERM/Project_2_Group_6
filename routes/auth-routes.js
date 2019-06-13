const router = require("express").Router();

// authentication login
router.get("/login", (req, res) => {
    res.render("login");
});

//authentication logout
router.get("/logout", (req, res) => {
    //handle with passport
    res.send("logging out");
});

//authentication with google
router.get("/google", (req, res) => {
    //handle with passport
    res.send("logging in with google");
});

//export the route to be imported in the server.js
module.exports = router;