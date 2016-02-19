var request = require('supertest');
var app = require('./../../app.js');

describe("The app", function() {
  it('should return 200 OK on GET /', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should redirect to /', function(done) {
    request(app)
      .get('/alltweets')
      .expect('location','/')
      .expect(302, done);
  });

  it('should return 404 on GET /notaroute', function(done) {
    request(app)
      .get('/notaroute')
      .expect(404, done);
  });
});
