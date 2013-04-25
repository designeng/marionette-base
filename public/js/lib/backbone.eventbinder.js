// Backbone.EventBinder, v1.0.2
// Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
// http://github.com/marionettejs/backbone.eventbinder
// EventBinder
// -----------
//
// The event binder facilitates the binding and unbinding of events
// from objects that extend `Backbone.Events`. It makes
// unbinding events, even with anonymous callback functions,
// easy. 
//
// Inspired by [Johnny Oshika](http://stackoverflow.com/questions/7567404/backbone-js-repopulate-or-recreate-the-view/7607853#7607853)

Backbone.EventBinder=function(e,t){function r(e){if(t.isUndefined(e)||t.isNull(e))throw new Error("Can't bindTo undefined");return e.jquery?n.jquery:n["default"]}var n={"default":{bindTo:function(e,t,n,r){r=r||this,e.on(t,n,r);var i={type:"default",obj:e,eventName:t,callback:n,context:r};return i},unbindFrom:function(e){e.obj.off(e.eventName,e.callback,e.context)}},jquery:{bindTo:function(e,n,r,i){i=i||this,r=t(r).bind(i),e.on(n,r);var s={type:"jquery",obj:e,eventName:n,callback:r,context:i};return s},unbindFrom:function(e){e.obj.off(e.eventName,e.callback)}}},i=function(){this._eventBindings=[]};return i.extend=e.View.extend,t.extend(i.prototype,{bindTo:function(){var e=arguments[0],t=r(e),n=Array.prototype.slice.apply(arguments),i=t.bindTo.apply(this,n);return this._eventBindings.push(i),i},unbindFrom:function(e){var r=Array.prototype.slice.apply(arguments);n[e.type].unbindFrom.apply(this,r),this._eventBindings=t.reject(this._eventBindings,function(t){return t===e})},unbindAll:function(){var e=t.map(this._eventBindings,t.identity);t.each(e,this.unbindFrom,this)}}),i}(Backbone,_);