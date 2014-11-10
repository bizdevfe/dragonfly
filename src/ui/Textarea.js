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
     * @param {Object} [options] 初始化参数
     *
     *     @example
     *     //默认值
     *     {
     *         disabled: false, //是否禁用
     *         hidden: false,   //是否隐藏
     *         width: 400,      //宽度
     *         height: 200,     //高度
     *         value: ''        //默认值
     *     }
     */
    function Textarea(options) {
        Widget.call(this, options);
    }

    Textarea.prototype = {
        /**
         * 初始化参数
         *
         * @param {Object} [options] 初始化参数
         * @protected
         * @override
         */
        initOptions: function(options) {
            this.options = _.extend({
                disabled: false,
                hidden: false,
                width: 400,
                height: 200,
                value: ''
            }, options || {});
        },

        /**
         * 创建主元素
         *
         * @protected
         * @override
         */
        createMain: function() {
            return document.createElement('textarea');
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
         * 创建其他元素
         *
         * @protected
         * @override
         */
        initElements: function() {
            base.addClass(this.main, 'df-textarea');
            base.css(this.main, {
                width: this.options.width + 'px',
                height: this.options.height + 'px'
            });
            this.main.value = this.options.value;
        },

        /**
         * 绑定事件
         *
         * @protected
         * @override
         */
        initEvents: function() {
            /**
             * 获得焦点
             * @event focus
             */
            this.addDOMEvent(this.main, 'focus', function(e) {
                base.addClass(this.main, 'df-textarea-focus');
                this.fire('focus', e);
            });

            /**
             * 失去焦点
             * @event blur
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
         * 解绑事件
         *
         * @protected
         * @override
         */
        destroyEvents: function() {
            this.removeDOMEvent(this.main);
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
        }
    };

    base.inherit(Textarea, Widget);

    return Textarea;
});
