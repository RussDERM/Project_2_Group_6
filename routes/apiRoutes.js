// NOT USED CONVERTED TO TWEET-API AND USER-API

// var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
// };

var Twit = require("twit");
require("dotenv").config();

var trendTopics = [];
var tweetIds = [];
var T = new Twit({
  consumer_key: process.env.API_CONSUMER_KEY,
  consumer_secret: process.env.API_CONSUMER_SECRET,
  access_token: process.env.API_ACCESS_TOKEN,
  access_token_secret: process.env.API_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true // optional - requires SSL certificates to be valid.
});

// This function will query Twitter and return 50 trending topics (just the name of those topics)
function trendSearch() {
  T.get("trends/place", { id: "2490383" }, function(err, data, response) {
    for (var i = 0; i < data[0].trends.length; i++) {
      trendTopics.push(data[0].trends[i].name);
    }
    for (var j = 0; j < 2; j++) {
      topicSearch(trendTopics[j]);
    }
  });
}

// This function will input a single topic search and output the Tweet ID associated with that specific topic
function topicSearch(topic) {
  T.get(
    "search/tweets",
    { q: topic, count: 2, result_type: "popular" },
    function(err, data, response) {
      for (var i = 0; i < data.statuses.length; i++) {
        tweetIds.push(data.statuses[i].id_str);
      }
      idSearch(tweetIds);
    }
  );
}

// This function will input a list of Tweet IDs and output the Twitter objects associated to the Tweet IDs
function idSearch(input) {
  T.get("statuses/lookup", { id: input }, function(err, data, response) {
    console.log(data);
  });
}

// Test to pass in array of topics
// var testId = ['1138464467501457408',
// '1138531404713791488',
// '1138071411845750785']
// idSearch(testId)

// This test will run the trending search and return
trendSearch();

// Test for single topic
// topicSearch('World cup');

// Test for logic if there is a user search or auto search for trending topics
// if (!userInput === null) {
//   topicSearch(userInput);
// } else {
//   trendSearch();
// }
