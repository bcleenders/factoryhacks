/*
Require all files in the current directory (excludes index.js) and return them as an object.
The key is the filename (minus .js)
 */
module.exports = require('require-dir')();
