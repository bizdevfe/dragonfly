/**
 * 标签
 *
 * @ignore
 * @author ChenZhen
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Widget = require('ui/Widget');

    var tpl = [
        '<div class="df-tab-nav">',
        '<% _.each(tabs, function(tab, index) { %>',
        '<li index="<%= index %>"><%= tab.title %></li>',
        '<% }); %>',
        '</div>',
        '<div class="df-tab-content">',
        '<% _.each(tabs, function(tab, index) { %>',
        '<div index="<%= index %>" style="display:none"><%= tab.content %></div>',
        '<% }); %>',
        '</div>'
    ].join('');

    /**
     * 标签
     *
     * @extends Widget
     * @constructor
     * @param {Object} [options] 初始化参数
     *
     *     @example
     *     //默认值
     *     {
     *         hidden: false,  //Boolean, 是否隐藏
     *         tabs: [],       //Array, 标题和内容数组：{title: String, content: String}
     *         active: 0,      //Number, 默认序列号
     *         width: 400,     //Number, 内容宽度
     *         height: 200,    //Number, 内容高度
     *         event: 'click'  //String, 切换方式：'click', 'mouseover'
     *     }
     */
    function Tab(options) {
        Widget.call(this, options);
    }

    Tab.prototype = {
        /**
         * 初始化参数
         *
         * @param {Object} options 初始化参数
         * @protected
         * @override
         */
        initOptions: function(options) {
            this.options = _.extend({
                hidden: false,
                tabs: [],
                active: 0,
                width: 400,
                height: 200,
                event: 'click'
            }, options || {});
        },

        /**
         * 创建其他元素
         *
         * @protected
         * @override
         */
        initElements: function() {
            base.addClass(this.main, 'df-tab');
            base.css(this.main, {
                width: this.options.width + 'px'
            });
            this.main.innerHTML = _.template(tpl)({
                tabs: this.options.tabs
            });

            var activeTab = base.children(this.main, '.df-tab-nav li')[this.options.active];
            base.addClass(activeTab, 'active');

            var activeContent = base.children(this.main, '.df-tab-content div')[this.options.active];
            base.css(activeContent, {
                display: ''
            });

            var content = base.children(this.main, '.df-tab-content')[0];
            base.css(content, {
                height: this.options.height + 'px'
            });
        },

        /**
         * 事件绑定初始化
         *
         * @protected
         * @override
         */
        initEvents: function() {
            this.delegateDOMEvent(this.main, this.options.event, '.df-tab-nav li', function(e) {
                var elem = e.target;
                if (!base.hasClass(elem, 'active')) {
                    this.clearStyle();

                    //tab
                    base.addClass(elem, 'active');

                    //content
                    var index = parseInt(base.attr(elem, 'index'), 10),
                        content = base.children(this.main, '.df-tab-content div')[index];
                    base.css(content, {
                        display: ''
                    });

                    /**
                     * 切换时触发
                     * @event onchange
                     * @param {Event} e 事件对象
                     */
                    this.fire('change', {
                        title: elem.innerHTML,
                        content: content.innerHTML,
                        index: index
                    });
                }
            });
        },

        /**
         * 初始化绘制函数
         *
         * @protected
         * @override
         */
        initPainters: function() {
            this.painters = {
                hidden: function(hidden) {
                    base.css(this.main, {
                        display: hidden ? 'none' : ''
                    });
                }
            };
        },

        /**
         * 清除样式
         *
         * @protected
         */
        clearStyle: function() {
            var tabs = base.children(this.main, '.df-tab-nav li');
            _.each(tabs, function(tab) {
                base.removeClass(tab, 'active');
            });

            var contents = base.children(this.main, '.df-tab-content div');
            _.each(contents, function(content) {
                base.css(content, {
                    display: 'none'
                });
            });
        },

        /**
         * 解绑事件
         *
         * @protected
         * @override
         */
        destroyEvents: function() {
            this.removeDOMEvent(this.main);
        }
    };

    base.inherit(Tab, Widget);

    return Tab;
});
