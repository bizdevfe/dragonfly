/**
 * 侧边面板
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Widget = require('ui/Widget'),
        Button = require('ui/Button');

    var tpl = [
        '<div class="df-mask"></div>',
        '<div class="df-sidepanel">',
        '<div class="df-sidepanel-margin"></div>',
        '<div class="df-sidepanel-body">',
        '<h1><%= title %></h1>',
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
     *         title: '',      //标题
     *         content: '',    //内容
     *         hidden: false,  //渲染后是否隐藏
     *         buttons: [      //按钮组
                   {content: 'OK', handler: this.hide},
                   {content: 'Cancel', skin: 'dark', handler: this.hide}
               ],
               duration: 300
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
                title: '',
                content: '',
                hidden: false,
                buttons: [{
                    content: 'OK',
                    handler: this.hide
                }, {
                    content: 'Cancel',
                    skin: 'dark',
                    handler: this.hide
                }],
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
            this.main.style.display = 'none';
            this.main.innerHTML = _.template(tpl)({
                title: this.options.title,
                content: this.options.content
            });

            //内部元素
            this.mask = base.children(this.main, '.df-mask')[0];
            this.panel = base.children(this.main, '.df-sidepanel')[0];
            this.panelBody = base.children(this.main, '.df-sidepanel-body')[0];
            this.panelBottom = base.children(this.main, '.df-sidepanel-bottom')[0];

            //创建按钮组
            this.buttons = [];
            _.each(this.options.buttons, function(item) {
                var panel = this;
                var button = new Button({
                    content: item.content,
                    skin: item.skin || 'default'
                });
                button.on('click', function(e) {
                    item.handler.call(panel, e);
                });
                button.render(this.panelBottom);

                this.buttons.push(button);
            }, this);
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

                        var scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
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
                        var pageWidth = Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
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
            this.panelBottom = null;
            this.buttons = null;
        }
    };

    base.inherit(SidePanel, Widget);

    return SidePanel;
});
