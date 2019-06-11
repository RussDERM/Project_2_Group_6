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

var Twit = require('twit');

var trendTopic = '';
var tweetId = 0;
var T = new Twit({
  consumer_key: 'q0FiTHT26bJxIjldXF8g2EDVw',
  consumer_secret: 'WEBBW8erGtCBKA1gCDp8YCNpqTBLSkx3zwek0M0gdSE6gs3dYQ',
  access_token: '1136480334088814592-KHSFeLe6UTjEuavcNvrtZHTCZBEMfM',
  access_token_secret: 'zSpivL6RbF9pjCOisQqB5klBpB8fLC1S5iu27Sai1m1mv',
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
})

T.get('trends/place', { id: '2490383', count: 1 }, function (err, data, response) {
  // console.log(data.statuses[0].text)
  console.log(data[0].trends[0].name)
  trendTopic = data[0].trends[0].name;
  // console.log(trendTopic)
  topicSearch(trendTopic)
})

function topicSearch(topic) {
  T.get('search/tweets', { q: topic, count: 1 }, function (err, data, response) {
    tweetId = data.statuses[0].id_str;
    console.log(data)
    // console.log(tweetId);
    idSearch(tweetId)
  })
}

function idSearch(input) {
  T.get('statuses/lookup', { id: input , count: 1 }, function (err, data, response) {
    console.log(data);
  })
}