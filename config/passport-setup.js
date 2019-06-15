const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys_google");
const User = require("../models/user-models");

//serialize user cookie set up
passport.serializeUser((user,done) =>{
    //use the user id created in sequelize table to display if user is already logged in 
    //stores this user in a cookie
    done(err, user.id)
});

//deserialize take in an id to retrieve from cookie and see what user the id belongs to
passport.deserializeUser((id,done) =>{
    User.findById(id).then((user) =>{
        done(err, user.id);
    }); 
   
});

//set up passport to use a google strategy
passport.use(new GoogleStrategy({
    //options for the google strategy

    //callback URL added for the passport redirect after authenticating client
    callbackURL: "/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function goes here 
    //console.log("Passport callback function fired");
    //console.log(profile);

    //check if the user already exists in our database to prevent duplicate accounts in db
    User.findOne({ gooogleId: profile.id }).then((currentUser) => {
        if (currentUser) {
            //already have a user inside user collection with matching profile id returned from google
            console.log("user is" + currentUser);
            done(err, currentUser);
        } else {
            // if not, create user in our db

            //create new user
            new User({
                username: profile.displayName,
                gooogleId: profile.id
            }).save().then((newUser) => {
                console.log("new user created" + newUser);
                done(err, newUser);
                
            });
        };
    });


}));