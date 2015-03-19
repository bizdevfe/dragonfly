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
     * @param {HTMLElement|String} target 目标元素
     */
    function Input(target) {
        this.main = base.g(target);
        if (this.main) {
            Widget.call(this, target);
            this.renderMain();
        }
    }

    Input.prototype = {
        /**
         * 初始化参数
         *
         * @protected
         * @override
         */
        initOptions: function() {
            this.options = {
                disabled: this.main.disabled,
                hidden: this.main.style.display === '' ? false : (this.main.style.display === 'none' ? true : false)
            };
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
         * 初始化元素
         *
         * @protected
         * @override
         */
        initElements: function() {
            base.addClass(this.main, 'df-input');
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
         * 获取trim文本
         *
         * @return {String} trim文本
         */
        getTrimValue: function() {
            return this.main ? base.trim(this.main.value) : null;
        },

        /**
         * 获取文本长度
         *
         * @return {Number} 文本长度
         */
        getLength: function() {
            return this.main ? this.main.value.length : null;
        },

        /**
         * 获取trim文本长度
         *
         * @return {Number} trim文本长度
         */
        getTrimLength: function() {
            return this.main ? base.trim(this.main.value).length : null;
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
            base.removeClass(this.main, 'df-input');
            base.removeClass(this.main, 'df-input-disable');
            this.main.removeAttribute('did');
        }
    };

    base.inherit(Input, Widget);

    return Input;
});
