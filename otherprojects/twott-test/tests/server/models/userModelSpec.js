require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var User = require('./../../../models/userModel');

// you might want to have the document you create and delete be the same
// the delete test probably doesn't do anything because .remove doesn't
// err when there are no documents found to delete
describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      name: 'Naomi',
      online: true
    });
    user.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it('should remove user by name', function(done) {
    User.remove({name: 'Morgan'}, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});
