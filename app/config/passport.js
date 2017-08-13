/**
 *@fileoverview: This module handles login and signup through Passport, and configures the 
 *     Strategy for local, Facebook, and Google
 * Strategies are various authentication mechanisms (OAuth, local, etc.)
 * @doc passport-local: https://github.com/jaredhanson/passport-local
 * @doc Passport: http://passportjs.org/docs
 */

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

/**
 * Configures the Passport object passed in
 * @param {Object} passport: the Passport object
 */
module.exports = function(passport) {

  /**
   * `serializeUser()` determines which essential data of the user object should be stored
   *     in the session. 
   *  The result of `serializeUser` is stored in session as `req.session.passport.user`
   */
  passport.serializeUser(function(user, done) {
    done(null, user.id); // user.id is used to retrieve the user Object when deserializing 
  });

  /**
    * `deserializeUser()` uses the user.id passed in and retrieves the corresponding user object
    *     from the session. 
   */
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ===========================================================
  // =========================================================================
  // configure passport to use LocalStrategy, namespace strategy 'local-signup'
  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email', // overwrite default 'username' with 'email'
      passwordField : 'password',
      passReqToCallback : true // passes the entire request to the callback
    },
    function(req, email, password, done) {
      process.nextTick(function() {  // async, so User.findOne will wait one tick for data to be sent back before firing
        User.findOne({'local.email' : email}, function(err, user) { // attempts to find User with matching email
          if (err) {
            return done(err);
          } else if (user) { // flash message if user already exists
            return done(null, false, req.flash('signupMessage', 'That email is already taken'));
          } else { // else, create a new User instance i.e. a new Mongo document
            var newUser = new User(); 
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.save(function(err) {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      });
    })
  );

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // configure passport to use LocalStrategy, namespace strategy 'local-login'
  passport.use('local-login', new LocalStrategy({
      usernameField : 'email', // overwrite default 'username' with 'email'
      passwordField : 'password',
      passReqToCallback : true // passes the entire request to the callback
    },
    function(req, email, password, done) {
      User.findOne({'local.email' : email}, function(err, user) {
        if (err) {
          return done(err);
        } else if (!user) { // flash message if no user exists
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        } else if (!user.validPassword(password)) { // flash message if user exists but the password is wrong
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        } else { // else, return the user
          return done(null, user);
        }
      });
    })
  );
};
