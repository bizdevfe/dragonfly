/**
 * 侧边面板
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        lang = require('lang/i18n'),
        Widget = require('ui/Widget'),
        Button = require('ui/Button');

    var tpl = [
        '<div class="df-mask"></div>',
        '<div class="df-sidepanel">',
        '<div class="df-sidepanel-margin"></div>',
        '<div class="df-sidepanel-body">',
        '<h1 class="df-sidepanel-title"><%= title %></h1>',
        '<div class="df-sidepanel-content"><%= content %></div>',
        '<div class="df-sidepanel-bottom">',
        '<% _.each(buttons, function(button, index) { %>',
        '<button><%= button.text %></button>',
        '<% }); %>',
        '</div>',
        '</div>',
        '</div>'
    ].join('');

    /**
     * 侧边面板
     *
     * @extends Widget
     * @constructor
     * @param {Object} [options] 初始化参数
     *
     *     @example
     *     //默认参数
     *     {
     *         hidden: false,   //Boolean, 渲染后是否隐藏
     *         title: '',       //String, 标题
     *         content: '',     //String, 内容
     *         buttons: [       //Array, 按钮组：{text: String, click: Function, skin: String}
     *             {text: lang.OKButtonText, click: this.hide},
     *             {text: lang.CancelButtonText, click: this.hide, skin: 'dark'}
     *         ],
     *         'z-index': 1000, //Number, 层叠级别
     *         padding: 60,     //Number, 内容左右padding
     *         duration: 300    //Number, 动画时间
     *     }
     */
    function SidePanel(options) {
        Widget.call(this, options);
    }

    SidePanel.prototype = {
        /**
         * 初始化参数
         *
         * @param {Object} [options] 初始化参数
         * @protected
         * @override
         */
        initOptions: function(options) {
            this.options = _.extend({
                hidden: false,
                title: '',
                content: '',
                buttons: [{
                    text: lang.OKButtonText,
                    click: this.hide
                }, {
                    text: lang.CancelButtonText,
                    click: this.hide,
                    skin: 'dark'
                }],
                'z-index': 1000,
                padding: 60,
                duration: 300
            }, options || {});
        },

        /**
         * 创建其他元素
         *
         * @protected
         * @override
         */
        initElements: function() {
            base.css(this.main, {
                display: 'none'
            });
            this.main.innerHTML = _.template(tpl)({
                title: this.options.title,
                content: this.options.content,
                buttons: this.options.buttons
            });

            //内部元素
            this.mask = base.children(this.main, '.df-mask')[0];
            this.panel = base.children(this.main, '.df-sidepanel')[0];
            this.panelBody = base.children(this.main, '.df-sidepanel-body')[0];
            this.panelContent = base.children(this.main, '.df-sidepanel-content')[0];
            this.panelBottom = base.children(this.main, '.df-sidepanel-bottom')[0];

            //创建按钮组
            this.buttons = [];
            _.each(this.options.buttons, function(item, index) {
                var panel = this,
                    button = new Button({
                        target: base.children(this.panelBottom, 'button')[index],
                        skin: item.skin || 'default'
                    });
                if (item.click) {
                    button.on('click', function(e) {
                        item.click.call(panel, e);
                    });
                }

                this.buttons.push(button);
            }, this);

            //设置样式
            base.css(this.mask, {
                'z-index': this.options['z-index']
            });
            base.css(this.panel, {
                'z-index': this.options['z-index'] + 1
            });
            base.css(this.panelContent, {
                'padding-left': this.options.padding + 'px',
                'padding-right': this.options.padding + 'px'
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
                    var htmlElement = base.parent(document.body),
                        panel = this;

                    if (!hidden) {
                        if (base.badie) {
                            base.css(htmlElement, {
                                overflow: 'visible'
                            });
                        }
                        base.css(document.body, {
                            overflow: 'hidden'
                        });

                        var scrollTop = Math.max(
                            document.body.scrollTop,
                            document.documentElement.scrollTop
                        );
                        base.css(this.mask, {
                            top: scrollTop + 'px'
                        });
                        base.css(this.panel, {
                            top: scrollTop + 'px'
                        });

                        base.css(this.main, {
                            display: 'block'
                        });
                        base.transform(this.panel, {
                            left: 0
                        }, this.options.duration, function() {
                            if (!base.badie) {
                                panel.panelBody.scrollTop = 0;
                            }
                        });
                    } else {
                        var pageWidth = Math.max(
                            document.body.offsetWidth,
                            document.documentElement.offsetWidth
                        );
                        base.transform(this.panel, {
                            left: pageWidth
                        }, this.options.duration, function() {
                            base.css(panel.main, {
                                display: 'none'
                            });
                            base.css(document.body, {
                                overflow: 'visible'
                            });
                            if (base.badie) {
                                base.css(htmlElement, {
                                    overflow: 'auto'
                                });
                            }
                        });
                    }
                },

                title: function(title) {
                    base.children(this.main, '.df-sidepanel-title')[0].innerHTML = title;
                }
            };
        },

        /**
         * 获取内容容器
         *
         * @return {HTMLElement} 内容容器
         */
        getContent: function() {
            return this.panelContent;
        },

        /**
         * 设置标题
         *
         * @param {String} title 标题
         */
        setTitle: function(title) {
            this.set('title', title);
        },

        /**
         * 显示面板
         *
         * @fires onopen
         */
        open: function() {
            if (this.states) {
                this.removeState('hidden');

                /**
                 * 显示后触发（等同于onaftershow）
                 * @event onopen
                 * @param {Event} e 事件对象
                 */
                this.fire('open');
            }
        },

        /**
         * 关闭面板
         *
         * @fires onclose
         */
        close: function() {
            if (this.states) {
                this.addState('hidden');

                /**
                 * 隐藏后触发（等同于onafterhide）
                 * @event onclose
                 * @param {Event} e 事件对象
                 */
                this.fire('close');
            }
        },

        /**
         * 解绑事件
         *
         * @protected
         * @override
         */
        destroyEvents: function() {
            _.each(this.buttons, function(button) {
                button.destroy();
            });
        },

        /**
         * 清除属性
         *
         * @protected
         * @override
         */
        removeProp: function() {
            this.mask = null;
            this.panel = null;
            this.panelBody = null;
            this.panelContent = null;
            this.panelBottom = null;
            this.buttons = null;
            delete this.mask;
            delete this.panel;
            delete this.panelBody;
            delete this.panelContent;
            delete this.panelBottom;
            delete this.buttons;
        }
    };

    base.inherit(SidePanel, Widget);

    return SidePanel;
});
