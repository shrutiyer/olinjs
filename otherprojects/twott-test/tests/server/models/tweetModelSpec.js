require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var Tweet = require('./../../../models/tweetModel');

describe('Tweet Model', function() {
  it('should create a new tweet', function(done) {
    var tweet = new Tweet({
      name: 'lilia',
      tweet: 'Feed me'
    });
    tweet.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it('should remove tweet by name', function(done) {
    Tweet.remove({ tweet: 'I am a tester' }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});
