/**
 * @fileoverview creates a new Room based on the form upload at `/create-room`
 * Uses `formidable` instead of `body-parser` to parse incoming form data because the form 
 *     has encoding type "multipart/form-data" to support image uploads, and `body-parser` is not 
 *     equipped to do that.
 * Uses mongoose-gridfs to store the image in the Mongo database
 * @docs formidable: https://github.com/felixge/node-formidable
 * @docs mongoose-gridfs: https://github.com/lykmapipo/mongoose-gridfs
 */
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var app = require('../app');
var mongoose = require('mongoose');

var Room = require('../models/room');


function create_room_post(req, res, next, connection) {
  var gridfs = require('mongoose-gridfs')({
    collection:'attachments',
    model:'Attachment',
    connection: app.connection
  });

  var form = new formidable.IncomingForm();
  var newRoom = Room();

  // set up a temporary directory for the upload to be stored
  form.uploadDir = path.join(__dirname, '../public/tmp/');

  // configure the `form` to update the newRoom's field value whenever a field / value pair has been received
  form.on('field', function(field, value) {
    newRoom[field] = value;
  });

  // configure the `form` to update the newRoom's `image_ids` whenever a field / file pair has been received
  form.on('file', function(field, file) {
    var File = gridfs.model;
    console.log(file);
    File.write(
      {
        filename: file.name,
        contentType: 'image/png'
      },
      fs.createReadStream(file.path),
      function(error, createdFile) {
        newRoom.image_ids.push(createdFile.id);
      }
    );
  });

  // parse and perform validation on the `form`. `form.parse` runs after all the `form.on` emissions are finished
  form.parse(req, function(err, fields, files) {
    console.log(newRoom);

    // validate the form inputs for the room
    var checkedRoom = newRoom.validateSync();

    // If user input does not follow the schema validation rules, add to the flash message/provide end_date
    if (checkedRoom) {
      if (checkedRoom.errors.item_name) {
        req.flash('inputError', ' ' + checkedRoom.errors.item_name.message);
      }
      if (checkedRoom.errors.starting_bid) {
        req.flash('inputError', ' ' + checkedRoom.errors.starting_bid.message);
      }
      if (checkedRoom.errors.end_date) {
        newRoom.end_date = newRoom.nextweek();
      }
      console.log(newRoom);
      res.redirect('/create-room'); 
    } 
    else {
      console.log(newRoom);
      fs.unlink(form.uploadDir);
      res.redirect('/');
    }
  });
}

exports.create_room_post = create_room_post;