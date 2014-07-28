#Dragonfly
Dragonfly is a flexible and light ui framework.

<img src="examples/img/logo.png" />

##Installation
Dragonfly has some dependencies:

* [underscore](http://underscorejs.org/) (the alternative is [lodash](http://lodash.com/))
* to add

just ensure that you load them before dragonfly, for example:

    <script src="http://underscorejs.org/underscore-min.js"></script>
    <script src="https://github.com/bizdevfe/dragonfly/raw/master/output/dragonfly.js"></script>

and include dragonfly.css before the &lt;/head&gt; tag:

    <link type="text/css" rel="stylesheet" href="https://github.com/bizdevfe/dragonfly/raw/master/output/css/dragonfly.css" />

##API Reference
see: [Dragonfly API Reference](http://bizdevfe.github.io/api/dragonfly)

##Build
Dragonfly follows the [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) specification, and use [almond](https://github.com/jrburke/almond) as internal module loader, also use [r.js](https://github.com/jrburke/r.js) as build tool.

1.install requirejs (suppose you have installed node.js already)

    npm install -g requirejs

2.copy r.js to ./tool, then

    node r.js -o build-js.js
    node r.js -o build-css.js

3.dragonfly.js and dragonfly.css will be generated in the ./output folder

for more settings about build, see：[example.build.js](https://github.com/jrburke/r.js/blob/master/build/example.build.js)

##Namespace
Dragonfly's default namespace is d, change the [start.frag](https://github.com/bizdevfe/dragonfly/blob/master/src/loader/start.frag) if you want to define your own:

    root.d = factory();
