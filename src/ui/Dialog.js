/**
 * 对话框
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        lang = require('lang/i18n'),
        Event = require('event/Event'),
        Widget = require('ui/Widget'),
        Button = require('ui/Button');

    var tpl = [
        '<div class="df-mask"></div>',
        '<div class="df-dialog">',
        '<h1 class="df-dialog-title"><span><%= title %></span><span class="close"></span></h1>',
        '<div class="df-dialog-content"><%= content %></div>',
        '<div class="df-dialog-bottom">',
        '<% _.each(buttons, function(button, index) { %>',
        '<button><%= button.text %></button>',
        '<% }); %>',
        '</div>',
        '</div>'
    ].join('');

    /**
     * 对话框
     *
     * @extends Widget
     * @constructor
     * @param {Object} [options] 初始化参数
     *
     *     @example
     *     //默认值
     *     {
     *         hidden: false,   //Boolean, 渲染后是否隐藏
     *         title: '',       //String, 标题
     *         content: '',     //String, 内容
     *         buttons: [       //Array, 按钮组：{text: String, click: Function, skin: String}
     *             {text: lang.OKButtonText, click: this.hide},
     *             {text: lang.CancelButtonText, click: this.hide, skin: 'dark'}
     *         ],
     *         width: 480,      //Number, 宽度
     *         height: 240,     //Number, 高度
     *         'z-index': 1000, //Number, 层叠级别
     *         fixed: true      //Boolean, 位置是否固定
     *     }
     */
    function Dialog(options) {
        Widget.call(this, options);
    }

    Dialog.prototype = {
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
                width: 480,
                height: 240,
                'z-index': 1000,
                fixed: true
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
            this.dialog = base.children(this.main, '.df-dialog')[0];
            this.dialogContent = base.children(this.main, '.df-dialog-content')[0];
            this.dialogBottom = base.children(this.main, '.df-dialog-bottom')[0];

            //创建按钮组
            this.buttons = [];
            _.each(this.options.buttons, function(item, index) {
                var panel = this,
                    button = new Button({
                        target: base.children(this.dialogBottom, 'button')[index],
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
            base.css(this.dialog, {
                position: this.options.fixed ? 'fixed' : 'absolute',
                width: this.options.width + 'px',
                height: this.options.height + 'px',
                'margin-left': -Math.floor(this.options.width / 2) + 'px',
                'margin-top': -Math.floor(this.options.height / 2) + 'px',
                'z-index': this.options['z-index'] + 1
            });
            base.css(this.dialogContent, {
                height: this.options.height - 150 + 'px'
            });
        },

        /**
         * 绑定事件
         *
         * @protected
         * @override
         */
        initEvents: function() {
            this.delegateDOMEvent(this.main, 'click', '.close', this.close);

            this.onresie = _.bind(this.setMaskHeight, this);
            Event.on(window, 'resize', this.onresie);
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
                    if (!hidden) {
                        base.css(this.main, {
                            display: 'block'
                        });
                        this.setMaskHeight();
                    } else {
                        base.css(this.main, {
                            display: 'none'
                        });
                    }
                },
                title: function(title) {
                    base.children(this.main, '.df-dialog-title span')[0].innerHTML = title;
                }
            };
        },

        /**
         * 获取页面高度
         *
         * @return {Number} 页面高度
         * @protected
         */
        getPageHeight: function() {
            return Math.max(
                document.body.clientHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.offsetHeight
            );
        },

        /**
         * 设置遮罩高度
         *
         * @protected
         */
        setMaskHeight: function() {
            base.css(this.mask, {
                height: this.getPageHeight() + 'px'
            });
        },

        /**
         * 获取内容容器
         *
         * @return {HTMLElement} 内容容器
         */
        getContent: function() {
            return this.dialogContent;
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
         * 显示对话框
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
         * 关闭对话框
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
            this.removeDOMEvent(this.main);

            _.each(this.buttons, function(button) {
                button.destroy();
            });

            Event.off(window, 'resize', this.onresie);
        },

        /**
         * 清除属性
         *
         * @protected
         * @override
         */
        removeProp: function() {
            this.mask = null;
            this.dialog = null;
            this.dialogContent = null;
            this.dialogBottom = null;
            this.buttons = null;
            delete this.mask;
            delete this.dialog;
            delete this.dialogContent;
            delete this.dialogBottom;
            delete this.buttons;
        }
    };

    /**
     * 提示对话框
     *
     * @param {Object} options 初始化参数
     *
     *     @example
     *     //默认值
     *     {
     *         title: '',                //标题
     *         content: '',              //内容
     *         okText: lang.OKButtonText //确定按钮文字
     *     }
     *
     * @static
     */
    Dialog.alert = function(options) {
        var alertDialog;

        function onHide() {
            alertDialog.hide();
        }

        alertDialog = new Dialog({
            title: options.title || '',
            content: options.content || '',
            buttons: [{
                text: options.okText || lang.OKButtonText,
                click: onHide
            }],
            width: 360,
            height: 180,
            'z-index': 2000
        });

        alertDialog.on('afterhide', alertDialog.destroy);

        alertDialog.appendTo();
    };

    /**
     * 确认对话框
     *
     * @param {Object} options 初始化参数
     *
     *     @example
     *     //默认值
     *     {
     *         title: '',                         //标题
     *         content: '',                       //内容
     *         okText: lang.OKButtonText,         //确定按钮文字
     *         cancelText: lang.CancelButtonText, //取消按钮文字
     *         onOK: this.hide                    //确定回调
     *     }
     *
     * @static
     */
    Dialog.confirm = function(options) {
        var confirmDialog;

        function onHide() {
            confirmDialog.hide();
        }

        function onOK() {
            confirmDialog.hide();
            if (options.onOK) {
                options.onOK();
            }
        }

        confirmDialog = new Dialog({
            title: options.title || '',
            content: options.content || '',
            buttons: [{
                text: options.okText || lang.OKButtonText,
                click: onOK
            }, {
                text: options.cancelText || lang.CancelButtonText,
                click: onHide,
                skin: 'dark'
            }],
            width: 360,
            height: 180,
            'z-index': 2000
        });

        confirmDialog.on('afterhide', confirmDialog.destroy);

        confirmDialog.appendTo();
    };

    base.inherit(Dialog, Widget);

    return Dialog;
});
