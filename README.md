# Backbone.js + Marionette, RequireJS, Jasmine, PhantomJS, and Grunt

## Запуск проекта

Порядок установки и запуска:
1. Установите node.js
2. git clone https://github.com/designeng/marionette-base.git
3. cd marionette-base && npm install - автоматическая установка зависимостей (описывается в package.json в полях "dependencies" и "devDependencies").
4. grunt   - эта команда запустит дефолтную задачу, описанную в Gruntfile.js, сейчас это grunt.registerTask('default', ['livereload-start', 'connect', 'regarde'])


## Работа с локалью

Локаль задается в поле объекта 'require.config' locale в main.js самовызывающейся анонимной функцией, которая возвращает значение локали полученное непосредственно из url-а, либо каким-то другим способом (явно указывается при отладке).
