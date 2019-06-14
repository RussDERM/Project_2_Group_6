// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // Still need to set up public js files to handle user signup/login data to link User ID here and replace author_id.
  // GET route for getting all of the posts
  app.get("/api/tweets", function(req, res) {
    db.Tweet.findAll({}).then(function(dbTweets) {
      res.json(dbTweets);
    });
  });

  // Create a new tweet
  app.post("/api/tweets", function(req, res) {
    db.Tweet.create(req.body).then(function(dbTweet) {
      res.json(dbTweet);
    });
  });

  // app.get("/api/tweets", function(req, res) {
  //   var query = {};
  //   if (req.query.author_id) {
  //     query.AuthorId = req.query.author_id;
  //   }
  //   // Here we add an "include" property to our options in our findAll query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.User
  //   db.Tweet.findAll({
  //     where: query,
  //     include: [db.User]
  //   }).then(function(dbTweet) {
  //     res.json(dbTweet);
  //   });
  // });

  // Get route for retrieving a single post
  // app.get("/api/tweets/:id", function(req, res) {
  //   // Here we add an "include" property to our options in our findOne query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.User
  //   db.Tweet.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.User]
  //   }).then(function(dbTweet) {
  //     res.json(dbTweet);
  //   });
  // });

  // POST route for saving a new post
  // app.post("/api/tweets", function(req, res) {
  //   db.Tweet.create(req.body).then(function(dbTweet) {
  //     res.json(dbTweet);
  //   });
  // });

  // DELETE route for deleting posts
  app.delete("/api/tweets/:id", function(req, res) {
    db.Tweet.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTweet) {
      res.json(dbTweet);
    });
  });

  // PUT route for updating posts
  // app.put("/api/tweets", function(req, res) {
  //   db.Tweet.update(req.body, {
  //     // where: {
  //     //   id: req.body.id
  //     // }
  //   }).then(function(dbTweet) {
  //     res.json(dbTweet);
  //   });
  // });
};
