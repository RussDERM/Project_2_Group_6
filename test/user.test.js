var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/users", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all users", function(done) {
    // Add some examples to the db to test with
    db.User.bulkCreate([
      {
        firstname: "Jim",
        lastname: "Bob",
        username: "jim27",
        about: "I am a farmer who tweets",
        email: "jimmyboy@yahoo.com",
        password: "jBob21!"
        // last_login: "2019-06-10 04:26:48",
        // createdAt: "2019-06-09 04:26:48",
        // updatedAt: "2019-06-10 04:26:48",
        // status: "active"
      },
      {
        firstname: "test",
        lastname: "two",
        username: "test123",
        about: "testing testing 123",
        email: "test123@yahoo.com",
        password: "testPW"
        // last_login: "2019-06-10 04:26:48",
        // createdAt: "2019-06-09 04:26:48",
        // updatedAt: "2019-06-10 04:26:48",
        // status: "active"
      }
      // { text: "Second Example", description: "Second Description" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/users").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;
        console.log(responseStatus);
        console.log(responseBody);

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            firstname: "Jim",
            lastname: "Bob",
            username: "jim27",
            about: "I am a farmer who tweets",
            email: "jimmyboy@yahoo.com",
            password: "jBob21!"
            // last_login: "2019-06-10 04:26:48",
            // createdAt: "2019-06-09 04:26:48",
            // updatedAt: "2019-06-10 04:26:48",
            // status: "active"
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            firstname: "test",
            lastname: "two",
            username: "test123",
            about: "testing testing 123",
            email: "test123@yahoo.com",
            password: "testPW"
            // last_login: "2019-06-10 04:26:48",
            // createdAt: "2019-06-09 04:26:48",
            // updatedAt: "2019-06-10 04:26:48",
            // status: "active"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
