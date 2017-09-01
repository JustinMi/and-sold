/**
 @fileoverview This file stores the configurations for the various login methods for the app
 */

module.exports = {
  'facebookAuth' : {
    'clientID'      : '256953324819547', // your App ID
    'clientSecret'  : 'b52b5f6b685fdc91bff25eb0a0489b9d', // your App Secret
    'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
  },
  'googleAuth' : {
    'clientID'      : 'your-secret-clientID-here',
    'clientSecret'  : 'your-client-secret-here',
    'callbackURL'   : 'http://localhost:3000/auth/google/callback'
  }
};