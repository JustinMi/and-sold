/**
 * @fileoverview Defines the makeup of Room documents in the Mongo database. 
 * Room documents contain an array of Image subdocuments.
 * 
 * Image subdocuments are not saved individually, rather they are saved whenever the 
 * parent Room document is saved
 */
var mongoose = require('mongoose');
var UserSchema = require('./user').schema;

/**
 * @return {Date}: returns a Date object of a date 1 week from the current date.
 */
function nextweek(){
    var today = new Date(Date.now());
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7, today.getHours(), today.getMinutes());
    return nextweek;
}

// Note: the names for the roomSchema must match the names in /views/create-room.pug
var roomSchema = new mongoose.Schema({ 
  item_name : { 
    type: String, 
    required: [true, 'Item name required']
  },
  item_description : { 
    type: String, 
    default: ''
  },
  orig_post : {  // a link to the original post e.g. in Free and For Sale
    type: String, 
    default: ''
  },
  starting_bid : { 
    type: String, // type is String rather than Number to account for commas, periods, etc.
    validate: [
      function(input) { // uses regex to check that input is a price
        return /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(input);
      },
      'Starting bid must be a valid price'
    ],
    required: [true, 'Starting bid required']
  },
  image_ids : { 
    type: [String]
  },
  start_date : { // date the auction begins
    type: Date,
    default: new Date(Date.now())
  },
  end_date : { // date the auction ends
    type: Date,
    required: [true]
  },
  user : { // the user that created the room, if available
    type: UserSchema
  }
});

roomSchema.methods.nextweek = function() {
    var today = new Date(Date.now());
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7, today.getHours(), today.getMinutes());
    return nextweek;
};

module.exports = mongoose.model('Room', roomSchema);
