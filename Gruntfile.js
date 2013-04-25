'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {
  grunt.initConfig({

    requirejs: {
      compile: {
        options: {
          mainConfigFile: "app/build/build.js"
        }
      }
    },


    //--------------
    livereload: {
      port: 35730 // Default livereload listening port.
    },
    connect: {
      livereload: {
        options: {
          port: 9125,
          base: '.',
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },
    // Configuration to be run (and then tested)
    exec: {
      jasmine: {
        command: 'phantomjs test/lib/run-jasmine.js http://localhost:9123/test',
        stdout: true
      }
    },

    regarde: {    
      js: {
        files: ['test/spec/**/*.js', 'app/js/**/*.js', 'test/SpecRunner.js', '!node_modules/**/*.js', '!app/components/**/*.js'],
        tasks: ['livereload', 'exec']
      }
    }

    

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
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('e', ['livereload-start', 'connect', 'exec']);
  grunt.registerTask('r', ['requirejs']);

}
