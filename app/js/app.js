define(['backbone', 'underscore', 'marionette', 'vent'], function(Backbone, _, Marionette, vent) {
    'use strict';

    var app = new Marionette.Application();
    

    // these regions correspond to #ID's in the index.html 
    app.addRegions({
        content: "#content",
        menu: "#menu"
    });

    // marionette app events...
    app.on("initialize:after", function() {
        console.log('initialize:after');
        Backbone.history.start();
    });

    
    // pass in router/controller via options
    app.addInitializer(function(options) {
        // configure for loading templates stored externally...
        Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
            // Marionette expects "templateId" to be the ID of a DOM element.
            // But with RequireJS, templateId is actually the full text of the template.
            var template = templateId;

            // Make sure we have a template before trying to compile it
            if (!template || template.length === 0) {
                var msg = "Could not find template: '" + templateId + "'";
                var err = new Error(msg);
                err.name = "NoTemplateError";
                throw err;
            }

            return template;
        };

/*
        // init library router/controller
        new options.libraryRouter.Router({
            controller: options.libraryController // controller implements search and defaultsearch
        });
        
        // init secondApp's router/controller
        new options.secondApp.Router({
            controller: options.secondApp // wire-up the start method
        });
*/
    });  
    

    // export the app
    return app;
});