# Backbone.js + Marionette, RequireJS, Jasmine, PhantomJS, and Grunt

с поддержкой i18n

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
4. `rcompile` - сборка js-файлов с помощью r.js
5. `less` - компиляция *.less-файлов в css и сборка их в результирующий css

Приложение доступно по адресу http://localhost:8877/app/. Jasmine-тесты здесь: http://localhost:8877/test/

## Работа с локалью

Локаль задается в поле объекта 'require.config' locale в main.js самовызывающейся анонимной функцией, которая возвращает значение локали, полученное непосредственно из url-а, либо каким-то другим способом (будет явно указано при отладке).

В папке nls находится general.js с дефолтными значениями (на английском языке). Значения для конкретной локали в директориях, соответствующих языкам (ru, fr etc).

Локаль должна быть явным образом активизирована в general.js (например, "ru": true)

Поскольку в проекте используется rejuireJS, для отображения на странице конкретных полей из general.js в зависимостях и аргументах определяющей модуль функции
нужно прописать местоположение general.js в качестве аргумента для плагина i18n (т.е. после восклицательного знака), например:

```js
require(['app', 'i18n!nls/general'], function(App, generalText) {
	//какой-то код
	console.log(generalText.body)
}
```

## Настройки RejuireJS

За подробной информацией по RejuireJS следует обратиться к [документации](http://requirejs.org/docs/api.html)

Примерная конфигурация

```js
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
```

## Оптимизация js-файлов и сборка проекта с использование r.js

Что касается сборки проекта с использованием r.js, на этот счет в Gruntfile есть специальная команда `rcompile` (usage: $ grunt rcompile - она запускает задание
`requirejs`. Информация о настройках оптимизатора r.js находится, в частности, [здесь](http://requirejs.org/docs/faq-advanced.html). Пример настройки:

```js
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
    }
```

Результатом сборки будет js-файл, который будет называться в соответствии с options.modules.name для requirejs в Gruntfile (т.е. main.build.js).
Все, что требуется, это указать "точку входа" в index.html:

```js
<script type="text/javascript" data-main="js/main.build" src="js/lib/require.js"></script>
```

Также вместо r.js можно использовать задания concat и min (будет позже)

## Компиляция Handlebars-templates

(будет позже)


## Сборка css из less-файлов

Производится посредством выполнения задачи `less`. В настоящее время данная задача выполняется по мере сохранения изменений в .less-файлах (является подзадачей `regarde`)

## Тестирование

Тестирование производится с помощью JasmineJS.

Результаты тестов можно просматривать в браузере по адресу http://localhost:8877/test/

Для того, чтобы результаты тестов выводились в терминале, поставьте значение пременной `showTestsInTerminal` true в Gruntfile.js
(это добавит в настройки задач для regarde.js `exec:jasmine`) :

```js
var showTestsInTerminal = true;

// . . . . . . . . . . . 
//идентично

regarde: {    
      js: {
        files: ['test/spec/**/*.js', 'app/js/**/*.js', 'test/SpecRunner.js', '!node_modules/**/*.js', '!app/components/**/*.js'],
        tasks: ['livereload', 'exec:jasmine']
      }
      // обработка css 
    }
```



