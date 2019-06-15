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



var request = require('request');
var Twit = require('twit');
var trendTopics = [];
var trendTopicsList = [];
var tweetIds = [];
var created_at = [];
var content = [];
var hashtags = [];
var name = [];
var handle = [];
var id_strings = [];
var T = new Twit({
  consumer_key: 'q0FiTHT26bJxIjldXF8g2EDVw',
  consumer_secret: 'WEBBW8erGtCBKA1gCDp8YCNpqTBLSkx3zwek0M0gdSE6gs3dYQ',
  access_token: '1136480334088814592-KHSFeLe6UTjEuavcNvrtZHTCZBEMfM',
  access_token_secret: 'zSpivL6RbF9pjCOisQqB5klBpB8fLC1S5iu27Sai1m1mv',
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
})


// This function will query Twitter and return 50 trending topics (just the name of those topics)
function trendSearch() {
  T.get('trends/place', { id: '2490383' }, function (err, data, response) {
    for (let i = 0; i < data[0].trends.length; i++) {
      trendTopics.push(data[0].trends[i].name);
    }
    for (let j = 0; j < 3; j++) {
      topicSearch(trendTopics[j]);
    }
  })
}

// This function will input a single topic search and output the Tweet ID associated with that specific topic
function topicSearch(topic) {
  T.get('search/tweets', { q: topic, count: 2, result_type: 'popular' }, function (err, data, response) {
    console.log(topic)
    for (let i = 0; i < data.statuses.length; i++) {
      tweetIds.push(data.statuses[i].id_str);
    }
    idSearch(tweetIds.toString());
  })
}

// This function will input a list of Tweet IDs and output the Twitter objects associated to the Tweet IDs
function idSearch(input) {
  T.get('statuses/lookup', { id: input }, function (err, data, response) {

    // Variables for important data to be sent to handlebar template
    for (let i = 0; i < 2; i++) {
      id_strings[i] = data[i].id_str;
      created_at[i] = data[i].created_at;
      content[i] = data[i].text;
      hashtags[i] = data[i].entities.hashtags;
      name[i] = data[i].user.name;
      handle[i] = data[i].user.screen_name;

    }
    for (let i = 0; i < 2; i++) {
      console.log("ID:")
      console.log(id_strings[i])
      console.log("Created at:")
      console.log(created_at[i])
      console.log("Content:")
      console.log(content[i])
      console.log("Author")
      console.log(name[i])
    }

    // Other info about tweet if needed
    var id = data[0].id_str;
    var mentions = data[0].entities.user_mentions;
    var urls = data[0].entities.urls;
    var media = data[0].entities.media;
    var extended_entities = data[0].extended_entities;
    var source = data[0].source;

    // Log important information for handlebar template
    // for (let i = 0; i < 1; i++) {
    //   // console.log("Created at: ")
    //   // console.log(created_at[i])
    //   console.log("id: " )
    //   console.log(id_strings[i])
    //   console.log("Text: ")
    //   console.log(content[i])
    //   // console.log("hashtags: ")
    //   // console.log(hashtags[i])
    //   console.log("Name:")
    //   console.log(name[i])
    //   // console.log(handle[i])
    // }
    // console.log("id")
    // console.log(id_strings)
    // console.log("text:")
    // console.log(content)
    // console.log("Name")
    // console.log(name)
    // tweetIds = [];


    // Log other info about tweet if needed
    // console.log("Tweet ID: " + id)
    // console.log("Mentions: ")
    // console.log(mentions)
    // console.log("URLs: " + urls)
    // console.log("Media: ")
    // console.log(media);
    // console.log("Extended Entities " + extended_entities)
    // console.log("Source: " + source)

    // for (var i = 0; i < data.length; i++) {
    //   console.log(data[i])

    // }
  })
  tweetIds = [];
}






// Test to pass in array of topics
// var testId = ['1138464467501457408',
// '1138531404713791488']
// idSearch(testId)

// This test will run the trending search and return 
trendSearch();
// test()

// Test for single topic
// topicSearch('World cup');

// Test for logic if there is a user search or auto search for trending topics
// if (!userInput === null) {
//   topicSearch(userInput);
// } else {
//   trendSearch();
// }