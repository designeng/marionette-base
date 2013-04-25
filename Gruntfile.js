'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

var showTestsInTerminal = false;

module.exports = function(grunt) {
  var configOptions = {

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

    exec: {
      jasmine: {
        command: 'phantomjs test/lib/run-jasmine.js http://localhost:8877/test',
        stdout: true
      }
    },

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
    },

    handlebars:{
      compile:{
        options:{
          wrapped:true,
          namespace:"agent.Templates.FORM.TEMPLATES",
          processName:function (filename) {
            var name = filename.split('/');
            name = name[name.length - 1];
            name = name.substr(0, name.length - 5);
            return name;
          }
        },
        //changes need
        files:{
          "app/js_compile/compilate_tpl_forms.js":["app/templates/tpl_forms/*.html"]
        }
      }
    }    

  };

  if(showTestsInTerminal) configOptions.regarde.js.tasks.push('exec:jasmine');

  grunt.initConfig(configOptions);

  //----------------- TOOLS ---------------------------//
  //watch, connect, livereload  tools
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-exec');

  //testing tools
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  //build tools
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  //----------------- TASKS ---------------------------//
  //grunt.registerTask('less', ['less']);

  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('rcompile', ['requirejs']);

  grunt.registerTask('production', 'handlebars concat:production  min:production');
}
