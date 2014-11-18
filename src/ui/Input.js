/**
 * 输入框
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Widget = require('ui/Widget');

    /**
     * 输入框
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
     *         width: 200,      //宽度
     *         type: 'text',    //类型
     *         value: ''        //默认值
     *     }
     */
    function Input(options) {
        Widget.call(this, options);
    }

    Input.prototype = {
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
                width: 200,
                type: 'text',
                value: ''
            }, options || {});
        },

        /**
         * 创建主元素
         *
         * @return {HTMLElement} HTML元素
         * @protected
         * @override
         */
        createMain: function() {
            return document.createElement('input');
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
                        base.addClass(this.main, 'df-input-disable');
                    } else {
                        base.removeClass(this.main, 'df-input-disable');
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
            base.addClass(this.main, 'df-input');
            base.css(this.main, {
                width: this.options.width + 'px'
            });
            this.main.type = this.options.type;
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
             * 获得焦点时触发
             * @event onfocus
             * @param {Event} e 事件对象
             */
            this.addDOMEvent(this.main, 'focus', function(e) {
                base.addClass(this.main, 'df-input-focus');
                this.fire('focus', e);
            });

            /**
             * 失去焦点时触发
             * @event onblur
             * @param {Event} e 事件对象
             */
            this.addDOMEvent(this.main, 'blur', function(e) {
                base.removeClass(this.main, 'df-input-focus');
                this.fire('blur', e);
            });

            /**
             * 按下回车时触发
             * @event onenter
             * @param {Event} e 事件对象
             */
            this.addDOMEvent(this.main, 'keydown', function(e) {
                if (e.keyCode === 13) {
                    this.fire('enter', e);
                }
            });

            this.addDOMEvent(this.main, 'mouseover', function() {
                base.addClass(this.main, 'df-input-hover');
            });

            this.addDOMEvent(this.main, 'mouseout', function() {
                base.removeClass(this.main, 'df-input-hover');
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
         * 获取文本
         *
         * @return {String} 文本
         */
        getValue: function() {
            return this.main ? this.main.value : null;
        },

        /**
         * 获取文本长度
         *
         * @return {Number} 文本文本长度
         */
        getLength: function() {
            return this.main ? this.main.value.length : null;
        }
    };

    base.inherit(Input, Widget);

    return Input;
});
