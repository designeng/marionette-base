'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {
  grunt.initConfig({


    //--------------
    livereload: {
      port: 35729 // Default livereload listening port.
    },
    connect: {
      livereload: {
        options: {
          port: 1227,
          base: 'app',
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },
    // Configuration to be run (and then tested)
    regarde: {    
      js: {
        files: ['test/spec/**/*.js', 'app/js/**/*.js', 'test/SpecRunner.js', '!node_modules/**/*.js', '!app/components/**/*.js'],
        tasks: ['livereload']
      }
    },

    exec: {
      jasmine: {
        command: 'phantomjs test/lib/run-jasmine.js http://localhost:9123/test',
        stdout: true
      }
    },

  });

/*
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', 'server exec watch');
  grunt.registerTask('s', 'server watch');
  */

  grunt.loadNpmTasks('grunt-contrib-jasmine');  


  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
  grunt.registerTask('test', ['jasmine']);

}
