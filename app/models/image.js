/**
 * @fileoverview Defines the makeup of Image documents in the Mongo database. 
 * Image documents are embedded in Room documents as subdocuments. 
 * 
 * As subdocuments, Images are not saved individually, rather they are saved whenever 
 *   the parent Room document is saved.
 */
 var mongoose = require('mongoose');

/**
 * Images have an upload time, and a path in the file tree designating its location. 
 * It is assumed that the path will be predicated with the directory of all static files, eg. /static/
 */
 var imageSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: new Date(Date.now())
  },
  filepath: {
    type: String,
    default: generate_filepath(this._id.toString(), 1)
  }
 });

/**
 * Generates a file path to store the image by storing the image in a series of directories with increasingly more 
 * specific prefix names of the original file path.
 */
function generate_filepath(original_path, curr_path, depth) {
   if (depth === 6) { // number arbitrarily chosen; the max number of child directories for a given image directory
     return curr_path + '/' + original_path + '.png';
   } else {
     return generate_filepath(original_path, curr_path + '/' + original_path.substring(0, depth), depth+1);
   }
    // 12345678 => 12/1234/1234/123456/12345678
    // 598f9f6939e9f3187642a6b4
 }