/**
 * @fileoverview Defines the makeup of User documents in the Mongo database. 
 * Uses Mongoose as the ODM
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// design the userSchema
var userSchema = mongoose.Schema({
  local : { 
    email : String,
    password : String,
  }, 
  facebook : {
    id : String,
    token : String,
    email : String,
    name : String,
  }, 
  google : {
    id : String,
    token : String,
    email : String,
    name : String,
  }
});

/**
 * Synchronously hashes the input password.
 * The last argument to `bcrypt.hash()` is the "progress report" callback function. We do not have one.
 * `bcrypt.genSaltSync()`  generates the random salt for the bcrypt algorithm after 10 rounds.
 * @param {String} password: The input password
 * @return {String}: The hashed password
 */
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Synchronously checks whether the input password and the encrypted password match. 
 * @param {String} password: The input password
 * @return {boolean}: True if the input password and encrypted password match, false otherwise 
 */
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for Users and expose it to our app
module.exports = mongoose.model('User', userSchema);

