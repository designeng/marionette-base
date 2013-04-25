# Backbone.js + Marionette, RequireJS, Jasmine, PhantomJS, and Grunt

( after reading [blog post](http://hdnrnzk.me/2013/01/10/backbone-requirejs-jasmine-phantomjs-and-grunt/).



## Работа с локалью

Локаль задается в поле объекта 'require.config' locale в main.js самовызывающейся анонимной функцией, которая возвращает значение локали полученное непосредственно из url-а, либо каким-то другим способом (явно указывается при отладке).
