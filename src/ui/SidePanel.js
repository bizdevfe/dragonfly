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
        '<div class="df-sidepanel-bottom"></div>',
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
     *         hidden: false,   //渲染后是否隐藏
     *         title: '',       //标题
     *         content: '',     //内容
     *         buttons: [       //按钮组
     *             {text: lang.OKButtonText, click: this.hide},
     *             {text: lang.CancelButtonText, click: this.hide, skin: 'dark'}
     *         ],
     *         'z-index': 1000, //层叠级别
     *         padding: 0,      //内容左右padding
     *         duration: 300    //动画时间
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
                    skin: 'dark',
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
                content: this.options.content
            });

            //内部元素
            this.mask = base.children(this.main, '.df-mask')[0];
            this.panel = base.children(this.main, '.df-sidepanel')[0];
            this.panelBody = base.children(this.main, '.df-sidepanel-body')[0];
            this.panelContent = base.children(this.main, '.df-sidepanel-content')[0];
            this.panelBottom = base.children(this.main, '.df-sidepanel-bottom')[0];

            //创建按钮组
            this.buttons = [];
            _.each(this.options.buttons, function(item) {
                var panel = this,
                    button = new Button({
                        text: item.text,
                        skin: item.skin || 'default'
                    });
                button.on('click', function(e) {
                    item.click.call(panel, e);
                });
                button.render(this.panelBottom);

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
                }
            };
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
                this.fire('onopen');
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
                 * 隐藏后触发（等同于onafterhdie）
                 * @event onclose
                 * @param {Event} e 事件对象
                 */
                this.fire('onclose');
            }
        }
    };

    base.inherit(SidePanel, Widget);

    return SidePanel;
});
