var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');

module.exports = function(passport) {
  // passport needs to be able to serialize and deserialize users to support persistent Login Session
  passport.serializeUser(function(user, done) {
    console.log('serializing user: ', user);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('deserializing user:', user);
      done(err, user);
    });
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  login(passport);
  signup(passport);
}
