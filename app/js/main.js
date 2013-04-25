// Filename: main.js
// requireJS bootloader file typically included in the index.html
require.config({
    baseURL: 'app/js',

    paths: {
        jquery: 'lib/jquery.min',  // amd version
        underscore: 'lib/underscore', // amd version
        backbone: 'lib/backbone', // amd version        
        'backbone.eventbinder': 'lib/backbone.eventbinder', // amd version
        'backbone.babysitter': 'lib/backbone.babysitter', // amd version
        marionette: 'lib/backbone.marionette',  // amd version
        'backbone.wreqr': 'lib/backbone.wreqr', // amd version
        text: 'lib/requirejs-text/text',
        i18n: 'lib/i18n'
    },

    // load the 'non AMD' versions of backbone, underscore and Marionette
    shim: {        
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        marionette: ['backbone']
    },
    locale: function(){
        return "ru";
    }()
});

require(['app', 'i18n!nls/general'], function(App, generalText) {
    'use strict';

    var options = {
        /*
            libraryController: libraryController,
            libraryRouter: libraryRouter,
            secondApp: secondApp
            */
    };
    
    App.start(options);

    console.log("generalText123 ", generalText.body);
});