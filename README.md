#Dragonfly

[![Build Status](https://travis-ci.org/bizdevfe/dragonfly.svg?branch=master)](https://travis-ci.org/bizdevfe/dragonfly)
[![Code Climate](https://codeclimate.com/github/bizdevfe/dragonfly/badges/gpa.svg)](https://codeclimate.com/github/bizdevfe/dragonfly)

<img src="examples/asset/img/logo.png" />

Dragonfly is a flexible and light ui framework.

##Features

##Browser Support

##API Documentation

see: [Dragonfly API Documentation](http://bizdevfe.github.io/api/dragonfly)

##Modular Development

###Dynamic Loading

Dragonfly follows the [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) specification, you can use any js file as a AMD module and load it with a AMD loader, for example:

    require(['Button'], function(Button) {
        var button = new Button();
        button.render();
    });

###Optimization

If you want to optimize all the modules into one file, follow the steps below:

step1. install [RequireJS](http://requirejs.org/)

    npm install -g requirejs

step2. copy `r.js` to the `./tool` folder, and then

    node r.js -o build-js.js
    node r.js -o build-css.js

The optimized files will be created in the `./output` folder. For more settings about optimization, see：[example.build.js](https://github.com/jrburke/r.js/blob/master/build/example.build.js).

###Namespace
You can use the optimized file as a AMD module like before.

If you don't have an AMD loader like RequireJS, Dragonfly will export a global API entry called "D", change the [start.frag](https://github.com/bizdevfe/dragonfly/blob/master/src/loader/start.frag) if you want to define your own namespace:

    root.D = factory();

or call the noConflic() method to get the reference to the Dragonfly object:

    var myD = D.noConflict();
