# Backbone.js + Marionette, RequireJS, Jasmine, PhantomJS, and Grunt

## Запуск проекта

Порядок установки и запуска:

1. Установите node.js
2. git clone https://github.com/designeng/marionette-base.git
3. cd marionette-base && npm install - автоматическая установка зависимостей (описывается в package.json в полях `dependencies` и `devDependencies`).
4. grunt   - эта команда запустит дефолтную задачу, описанную в Gruntfile.js, сейчас это grunt.registerTask('default', ['livereload-start', 'connect', 'regarde'])

## Краткое описание задач (grunt tasks)

1. `livereload` - позволяет вести разработку без перезагрузки окна браузера, port может быть переопределен в grunt config (по умолчанию 35729). В стартовую страницу (index.html) автоматически встраивается livereloadSnippet, с кодом прослушивания порта livereload.
2. `connect` - запускает отладочный сервер по адресу localhost:8877 (устанавливается в livereload.options.port)
3. `regarde` - отслеживает изменения в целевых файлах, и передает управление livereload.

Приложение доступно по адресу http://localhost:8877/app/. Jasmine-тесты здесь: http://localhost:8877/test/

## Работа с локалью

Локаль задается в поле объекта 'require.config' locale в main.js самовызывающейся анонимной функцией, которая возвращает значение локали, полученное непосредственно из url-а, либо каким-то другим способом (будет явно указано при отладке).

В папке nls находится general.js с дефолтными значениями (на английском языке). Значения для конкретной локали в директориях, соответствующих языкам (ru, fr etc).

Локаль должна быть явным образом активизирована в general.js(например, "ru": true)

Поскольку в проекте используется rejuireJS, для отображения на странице конкретных полей из general.js в зависимостях и аргументах определяющей модуль функции
нужно прописать местоположение general.js в качестве аргумента для плагина i18n (т.е. после восклицательного знака), например:

```js
require(['app', 'i18n!nls/general'], function(App, generalText) {
	//какой-то код
	console.log(generalText.body)
}
```
