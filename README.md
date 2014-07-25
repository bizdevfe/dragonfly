#Dragonfly
Dragonfly 是一个灵活轻便的UI框架。

##安装
Dragonfly 依赖于：

* [underscorejs](http://underscorejs.org/) 1.6.x 及之后的版本

请确保在加载 Dragonfly 之前加载 underscorejs，例如：

    <script src="http://underscorejs.org/underscore-min.js"></script>
    <script src="https://github.com/bizdevfe/Dragonfly/raw/master/output/dragonfly.js"></script>

并且在 &lt;head&gt; 里引入 dragonfly.css：

    <link type="text/css" rel="stylesheet" href="https://github.com/bizdevfe/Dragonfly/raw/master/output/css/dragonfly.css" />

##API
请参考：[Dragonfly API Reference](https://github.com/bizdevfe/Dragonfly)

##编译
Dragonfly 遵循 [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) 标准，使用 [almond](https://github.com/jrburke/almond) 作为内部模块加载器，使用 [r.js](https://github.com/jrburke/r.js) 作为 build 工具。

1.首先安装 requirejs（假设你已经安装了node.js）

    npm install -g requirejs

2.将 r.js 拷贝到 tool 文件夹下，并执行

    node r.js -o build-js.js
    node r.js -o build-css.js

3.dragonfly.js 和 dragonfly.css 将在 output 文件中生成

详细的参数设置请见：[example.build.js](https://github.com/jrburke/r.js/blob/master/build/example.build.js)

##命名空间
Dragonfly 默认的命名空间是 d，如果你想修改此命名空间，可以在 src/loader/start.frag 中修改：

    root.d = factory();