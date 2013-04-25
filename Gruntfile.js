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
          appDir: "app",
          baseUrl: "js",
          dir: "public",
          mainConfigFile: "app/js/main.js",
          modules: [
              {
                  name: "main.build",
                  include: ["main"],
                  create: true
              }
          ]
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
          port: 8877,
          base: '.',
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },
    // Configuration to be run (and then tested) - not works yet
    exec: {
      jasmine: {
        command: 'phantomjs test/lib/run-jasmine.js http://localhost:9123/test',
        stdout: true
      }
    },
    //--------------------------------------

    less: {
      all: {
        src: 'app/styles/less/app.less',
        dest: 'app/styles/css/app.css',
        options: {
          compress: true
        }
      }
    },

    regarde: {    
      js: {
        files: ['test/spec/**/*.js', 'app/js/**/*.js', 'test/SpecRunner.js', '!node_modules/**/*.js', '!app/components/**/*.js'],
        tasks: ['livereload']
      },
      css: {
        files: ['app/styles/less/app.less', 'app/styles/less/**/**.less'],
        tasks: ['less', 'livereload']
      }
    }

    
    

  });

/*
  grunt.registerTask('default', 'server exec watch');
  grunt.registerTask('s', 'server watch');
  */

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-exec');

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('e', ['livereload-start', 'connect', 'exec']);

  /* build tasks */
  //grunt.registerTask('less', ['less']);
  grunt.registerTask('rcompile', ['requirejs']);

}
