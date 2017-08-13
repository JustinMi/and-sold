/**
 @fileoverview This file stores the configurations for the various login methods for the app
 */

module.exports = {
  'facebookAuth' : {
    'clientID'      : '458768811145529', // your App ID
    'clientSecret'  : 'af6787f8e382505c650e59e4f113e2e7', // your App Secret
    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
  },
  'googleAuth' : {
    'clientID'      : 'your-secret-clientID-here',
    'clientSecret'  : 'your-client-secret-here',
    'callbackURL'   : 'http://localhost:8080/auth/google/callback'
  }
}