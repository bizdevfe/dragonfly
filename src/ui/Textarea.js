/**
 * 文本框
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Widget = require('ui/Widget');

    /**
     * 文本框
     *
     * @extends Widget
     * @constructor
     * @param {Object} options 初始化参数
     */
    function Textarea(options) {
        this.main = base.g(options.target);
        if (this.main) {
            Widget.call(this, options);
            this.renderMain();
        }
    }

    Textarea.prototype = {
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
                hidden: this.main.style.display === '' ? false : (this.main.style.display === 'none' ? true : false)
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
            base.addClass(this.main, 'df-textarea');
        },

        /**
         * 绑定事件
         *
         * @protected
         * @override
         */
        initEvents: function() {
            /**
             * 获得焦点时触发
             * @event onfocus
             * @param {Event} e 事件对象
             */
            this.addDOMEvent(this.main, 'focus', function(e) {
                base.addClass(this.main, 'df-textarea-focus');
                this.fire('focus', e);
            });

            /**
             * 失去焦点时触发
             * @event onblur
             * @param {Event} e 事件对象
             */
            this.addDOMEvent(this.main, 'blur', function(e) {
                base.removeClass(this.main, 'df-textarea-focus');
                this.fire('blur', e);
            });

            this.addDOMEvent(this.main, 'mouseover', function() {
                base.addClass(this.main, 'df-textarea-hover');
            });

            this.addDOMEvent(this.main, 'mouseout', function() {
                base.removeClass(this.main, 'df-textarea-hover');
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
                        base.addClass(this.main, 'df-textarea-disable');
                    } else {
                        base.removeClass(this.main, 'df-textarea-disable');
                    }
                }
            };
        },

        /**
         * 设置文本
         *
         * @param {String} value 文本
         */
        setValue: function(value) {
            if (this.main) {
                this.main.value = value;
            }
        },

        /**
         * 清空文本
         */
        empty: function() {
            this.setValue('');
        },

        /**
         * 获取文本（已trim）
         *
         * @return {String} 文本
         */
        getValue: function() {
            return this.main ? base.trim(this.main.value) : null;
        },

        /**
         * 获取文本长度（不计回车）
         *
         * @return {Number} 文本文本长度
         */
        getLength: function() {
            //IE7,8回车为\r\n
            return this.main ? this.main.value.replace(/\r?\n/g, '').length : null;
        },

        /**
         * 获得焦点
         *
         */
        focus: function() {
            this.main.focus();
        },

        /**
         * 失去焦点
         *
         */
        blur: function() {
            this.main.blur();
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
            base.removeClass(this.main, 'df-textarea');
            base.removeClass(this.main, 'df-textarea-disable');
            this.main.removeAttribute('did');
        }
    };

    base.inherit(Textarea, Widget);

    return Textarea;
});
