/**
 * 按钮
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Widget = require('ui/Widget');

    /**
     * 按钮
     *
     * @extends Widget
     * @constructor
     * @param {Object} options 初始化参数
     */
    function Button(options) {
        this.main = base.g(options.target);
        if (this.main) {
            Widget.call(this, options);
            this.renderMain();
        }
    }

    Button.prototype = {
        /**
         * 初始化参数
         *
         * @param {Object} options 初始化参数
         * @protected
         * @override
         */
        initOptions: function(options) {
            this.options = _.extend({
                disabled: this.main.disabled,
                hidden: this.main.style.display === '' ? false : (this.main.style.display === 'none' ? true : false),
                skin: 'default'
            }, options);
        },

        /**
         * 创建主元素
         *
         * @return {HTMLElement} HTML元素
         * @protected
         * @override
         */
        createMain: function() {
            return this.main;
        },

        /**
         * 创建其他元素
         *
         * @protected
         * @override
         */
        initElements: function() {
            base.addClass(this.main, 'df-button');
            base.addClass(this.main, 'df-button-' + this.options.skin);
        },

        /**
         * 绑定事件
         *
         * @protected
         * @override
         */
        initEvents: function() {
            /**
             * 点击时触发
             * @event onclick
             * @param {Event} e 事件对象
             */
            this.addFiredDOMEvent(this.main, 'click');

            this.addDOMEvent(this.main, 'mouseover', function() {
                base.addClass(this.main, 'df-button-' + this.options.skin + '-hover');
            });

            this.addDOMEvent(this.main, 'mouseout', function() {
                base.removeClass(this.main, 'df-button-' + this.options.skin + '-hover');
                base.removeClass(this.main, 'df-button-' + this.options.skin + '-active');
            });

            this.addDOMEvent(this.main, 'mousedown', function() {
                base.addClass(this.main, 'df-button-' + this.options.skin + '-active');
            });

            this.addDOMEvent(this.main, 'mouseup', function() {
                base.removeClass(this.main, 'df-button-' + this.options.skin + '-active');
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
                },
                disabled: function(disabled) {
                    this.main.disabled = disabled;
                    if (disabled) {
                        base.addClass(this.main, 'df-button-disable');
                    } else {
                        base.removeClass(this.main, 'df-button-disable');
                    }
                }
            };
        },

        /**
         * 设置按钮文字
         *
         * @param {String} text 按钮文字
         */
        setText: function(text) {
            this.main.innerHTML = text;
        },

        /**
         * 获取按钮文字
         *
         * @return {String} 按钮文字
         */
        getText: function() {
            return this.main.innerHTML;
        },

        /**
         * 解绑事件
         *
         * @protected
         * @override
         */
        destroyEvents: function() {
            this.removeDOMEvent(this.main);
        },

        /**
         * 移除主元素属性
         *
         * @protected
         */
        removeMain: function() {
            base.removeClass(this.main, 'df-widget');
            base.removeClass(this.main, 'df-button');
            base.removeClass(this.main, 'df-button-' + this.options.skin);
            base.removeClass(this.main, 'df-button-disable');
            this.main.removeAttribute('did');
        }
    };

    base.inherit(Button, Widget);

    return Button;
});
