require("./user-models.test");
var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/tweets", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: false });
  });

  it("should find all tweets", function(done) {
    // Add some examples to the db to test with
    db.Tweet.bulkCreate([
      { tweetId: "7543876237543", UserId: 1 },
      { tweetId: "6743735985344", UserId: 2 },
      { tweetId: "2333734546341", UserId: 1 },
      { tweetId: "1111111111111", UserId: 2 }
      // { text: "Second Example", description: "Second Description" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/tweets").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;
        console.log(responseStatus);
        console.log(responseBody);

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(4);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ tweetId: "7543876237543" });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ tweetId: "6743735985344" });

        expect(responseBody[2])
          .to.be.an("object")
          .that.includes({ tweetId: "2333734546341" });

        expect(responseBody[3])
          .to.be.an("object")
          .that.includes({ tweetId: "1111111111111" });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
