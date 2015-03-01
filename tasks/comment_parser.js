/*
 * grunt-comment-parser
 * https://github.com/Calum/grunt-comment-parser
 *
 * Copyright (c) 2015 Calum Moore
 * Licensed under the MIT license.
 */

'use strict';

var parser = require('comment-parser');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('comment_parser', 'Grunt task for comment-parser lib.', function() {

    // Merge task-specific and/or target-specific options with defaults
    var options = this.options({});

    // Output options if --verbose cl option is passed
    grunt.verbose.writeflags(options, 'Options');

    //Get all files for parsing
    this.files.forEach(function(f){

      // Filter files based on their existence
      var src = f.src.filter(function(filepath) {

        // Warn on and remove invalid source files (if nonull was set).
        if(!grunt.file.exists(filepath)){
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }

      }).map(function(filepath){
        // Read and return the file's source.
        return grunt.file.read(filepath);
      }).join('\n');

      var output = parser(src, options);

      grunt.file.write(f.dest, JSON.stringify(output, undefined, 2));

    });

  });

};
