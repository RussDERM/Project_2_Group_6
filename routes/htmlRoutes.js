var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Tweet.findAll({ attributes: ["tweetId"] }).then(function(dbTweets) {
      console.log(dbTweets);
      res.render("index", {
        msg: "Welcome!",
        examples: dbTweets
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:tweetId", function(req, res) {
    db.Tweet.findOne({ where: { tweetId: req.params.tweetId } }).then(function(dbTweets) {
      console.log(dbTweets);
      // res.render("example", {
      //   example: dbTweets
      // });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
