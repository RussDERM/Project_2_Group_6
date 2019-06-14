const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys")

//set up passport to use a google strategy
passport.use (new GoogleStrategy({
    //options for the google strategy

    //callback URL added for the passport redirect after authenticating client
    callbackURL: "/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, () => {
    // passport callback function goes here 
}));