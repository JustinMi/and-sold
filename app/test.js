
function generate_filepath(path, curr_path, depth) {
  if (depth === 6) { // number arbitrarily chosen; the max number of child directories for a given image directory
    return curr_path + '/' + path + '.png';
  } else {
    return generate_filepath(path, curr_path + '/' + path.substring(0, depth), depth+1);
  }
   // 12345678 => 12/1234/1234/123456/12345678
   // 598f9f6939e9f3187642a6b4
}

console.log(generate_filepath('598f9f6939e9f3187642a6b4', '', 1));