#开发规范（内部版）

##协作流程
1. Fork `bizdevfe/dragonfly` 到各自的代码仓库，如 `rickyleung/dragonfly`
2. 在各自的分支上开发，如 `rickyleung/dragonfly/tree/v0.3`
3. Pull Request `rickyleung/dragonfly/tree/v0.3` 到 `bizdevfe/dragonfly/tree/v0.3`
4. Code Review & Merge Pull Request
5. 同步 `bizdevfe/dragonfly/tree/v0.3` 的修改到自己的分支：将第3步反向操作
6. 分支稳定后，Merge `bizdevfe/dragonfly/tree/v0.3` 到 `bizdevfe/dragonfly`

##命名规范
1. *.js：类模块文件名与类名一致，如 `Button.js`；单例模块文件名与单例名一致，如 `browser.js`
3. *.css：小写
4. css前缀：`df-`
3. 文件夹：小写

##目录结构规范
3. `./examples`：示例
4. `./output`：编译输出
5. `./src`：源码
6. `./src/asset`：静态资源
7. `./src/base`：基础类库
8. `./src/dep`：依赖类库
9. `./src/event`：事件类
10. `./src/extesion`：扩展类
11. `./src/loader`：加载器
12. `./src/ui`：控件类
13. `./src/util`：工具类
6. `./test`：单元测试
7. `./tool`：编译工具

##开发流程

###前期准备：

1. 安装 [NodeJs](http://nodejs.org/download/)
2. 安装 [JSDuck](https://github.com/senchalabs/jsduck/releases)，配置环境变量，熟悉[JSDuck注释语法](https://github.com/senchalabs/jsduck/wiki)
3. 安装 RequireJS：`npm install -g requirejs`，将 `r.js` 拷贝到 `./tool` 下
3. 安装 JS Beautifier：`$ npm install -g js-beautify`
4. 安装 JSHint：`$ npm install -g jshint`

###1) 开发控件

1. 继承 `Widget` 基类
3. 重写 `initOptions`：初始化参数
4. 重写 `createMain`：创建主元素
4. 重写 `initPainters`：初始化绘制函数
5. 重写 `initElements`：初始化元素
6. 重写 `initEvents`：绑定事件
7. 重写 `removeElements`：移除其他元素
8. 重写 `destroyEvents`：解绑事件
9. 新增方法，如 `getXXX`、`setXXX`

###2) 编写示例
以开发 `Button` 控件为例，开发的同时在 `./example` 目录下新建 `Button.html`，`require Button.js` 即可。

示例中应该包含该控件的如下几个生命周期：创建、渲染、方法调用、销毁。

最后在 `index.html` 中增加 `Button` 的索引。

###3) 生成API文档
Clone [bizdevfe/api](https://github.com/bizdevfe/api/tree/gh-pages)，并保证它与 `./dragonfly` 在同一目录下。

    $ cd api
    $ jsduck --config dragonfly-conf.json

> API文档用来校验接口注释完整性，不做提交，最后根据分支代码统一生成。

###4) 编写单测
以 `Button` 控件为例，在 `./test/spec` 下新建一个 `Button.js`，并在 `SpecRunner.html` 中增加控件容器，同时 `require test/spec/Button.js`。

> 代码覆盖率至少为80%

###5) 格式化源码
以 `Button` 控件为例：

    $ js-beautify -r src/ui/Button.js
    $ css-beautify -r src/asset/default/button.css

###6) 代码检查
提交代码前，必须在本地做代码检查，保证无错误后再提交：

    $ jshint src

###7) 编译

    $ cd tool
    $ node r.js -o build-js.js
    $ node r.js -o build-css.js

> 编译代码不提交，最后根据分支代码统一生成。