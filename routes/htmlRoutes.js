var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Tweet.findAll({}).then(function(dbTweets) {
      console.log(dbTweets);
      res.render("index", {
        msg: "Welcome!",
        tweets: dbTweets
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/tweet/:id", function(req, res) {
    db.Tweet.findOne({ where: { id: req.params.id } }).then(function(dbTweet) {
      console.log(dbTweet);
      res.render("example", {
        tweet: dbTweet
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
