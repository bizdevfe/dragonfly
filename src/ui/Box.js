/**
 * 单选/复选
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Widget = require('ui/Widget');

    /**
     * 单选/复选
     *
     * @extends Widget
     * @constructor
     * @param {Object} options 初始化参数
     * 
     *     @example
     *     //默认值
     *     {
     *         disabled: false, //Boolean, 是否禁用
     *         hidden: false,   //Boolean, 是否隐藏
     *         checked: false,  //Boolean, 是否选中
     *         type: '',        //String, type属性
     *         value: '',       //String, value属性
     *         name: ''         //String, name属性
     *         title: '',       //String, label文字
     *         id: ''           //String, 内部id, 用于get()
     *     }
     */
    function Box(options, group) {
        Widget.call(this, options);
        this.group = group;
    }

    Box.prototype = {
        /**
         * 初始化参数
         *
         * @param {Object} options 初始化参数
         * @protected
         * @override
         */
        initOptions: function(options) {
            this.options = _.extend({
                disabled: false,
                hidden: false,
                checked: false,
                type: '',
                value: '',
                name: '',
                title: '',
                id: ''
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
            this.ie8 = base.ie && base.ie <= 8;
            //IE8以下不允许修改type属性
            return this.ie8 ? document.createElement('<input type="' + this.options.type + '" />') : document.createElement('input');
        },

        /**
         * 创建其他元素
         *
         * @protected
         * @override
         */
        initElements: function() {
            //input元素
            if (!this.ie8) {
                this.main.type = this.options.type;
            }
            this.main.name = this.options.name;
            this.main.value = this.options.value;
            this.main.checked = this.options.checked;
            base.css(this.main, {
                display: 'none'
            });

            //label元素
            this.label = document.createElement('label');
            this.label.innerHTML = this.options.title;
            base.addClass(this.label, 'df-label');
            base.attr(this.label, {
                'for': this.id
            });
            base.insertAfter(this.label, this.main);

            //6种状态的class名称
            this.unchecked = 'df-' + this.main.type + '-unchecked';
            this.uncheckedHover = 'df-' + this.main.type + '-unchecked-hover';
            this.checked = 'df-' + this.main.type + '-checked';
            this.checkedHover = 'df-' + this.main.type + '-checked-hover';
            this.uncheckedDisabled = 'df-' + this.main.type + '-unchecked-disabled';
            this.checkedDisabled = 'df-' + this.main.type + '-checked-disabled';

            var className;
            if (this.main.checked) {
                className = this.options.disabled ? this.checkedDisabled : this.checked;
            } else {
                className = this.options.disabled ? this.uncheckedDisabled : this.unchecked;
            }
            base.addClass(this.label, className);
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

            this.addDOMEvent(this.label, 'mouseover', function() {
                if (!this.isDisabled()) {
                    base.addClass(this.label, this.isChecked() ? this.checkedHover : this.uncheckedHover);
                }
            });

            this.addDOMEvent(this.label, 'mouseout', function() {
                if (!this.isDisabled()) {
                    base.removeClass(this.label, this.isChecked() ? this.checkedHover : this.uncheckedHover);
                }
            });

            this.addDOMEvent(this.label, 'click', function() {
                if (!this.isDisabled()) {
                    if (this.options.type === 'radio') {
                        this.group.uncheck();
                        this.label.className = 'df-label ' + this.checked + ' ' + this.checkedHover;
                    } else {
                        if (this.isChecked()) { //label的click先于main的click
                            this.label.className = 'df-label ' + this.unchecked + ' ' + this.uncheckedHover;
                        } else {
                            this.label.className = 'df-label ' + this.checked + ' ' + this.checkedHover;
                        }
                    }
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
                    base.css(this.label, {
                        display: hidden ? 'none' : ''
                    });
                },
                disabled: function(disabled) {
                    this.main.disabled = disabled;
                    if (this.isChecked()) {
                        this.label.className = 'df-label ' + (disabled ? this.checkedDisabled : this.checked);
                    } else {
                        this.label.className = 'df-label ' + (disabled ? this.uncheckedDisabled : this.unchecked);
                    }
                }
            };
        },

        /**
         * 获取控件值
         */
        getValue: function() {
            return this.main ? this.main.value : null;
        },

        /**
         * 获取label文字
         */
        getTitle: function() {
            return this.get('title');
        },

        /**
         * 设置选择状态
         *
         * @param {Boolean} checked 是否选中
         * @protected
         */
        setChecked: function(checked) {
            if (this.main) {
                this.main.checked = checked;
                if (checked) {
                    this.label.className = 'df-label ' + (this.isDisabled() ? this.checkedDisabled : this.checked);
                } else {
                    this.label.className = 'df-label ' + (this.isDisabled() ? this.uncheckedDisabled : this.unchecked);
                }
            }
        },

        /**
         * 选中
         */
        check: function() {
            if (this.options.type === 'radio') {
                this.group.uncheck();
            }
            this.setChecked(true);
        },

        /**
         * 反选
         */
        uncheck: function() {
            this.setChecked(false);
        },

        /**
         * 是否选中
         *
         * @return {Boolean}
         */
        isChecked: function() {
            return this.main ? this.main.checked : false;
        },

        /**
         * 解绑事件
         *
         * @protected
         * @override
         */
        destroyEvents: function() {
            this.removeDOMEvent(this.main);
            this.removeDOMEvent(this.label);
        },

        /**
         * 移除其他元素
         *
         * @protected
         * @override
         */
        removeElements: function() {
            base.remove(this.label);
        },

        /**
         * 清除属性
         *
         * @protected
         * @override
         */
        removeProp: function() {
            delete this.ie8;
            this.label = null;
            delete this.label;
            delete this.unchecked;
            delete this.uncheckedHover;
            delete this.checked;
            delete this.checkedHover;
            delete this.uncheckedDisabled;
            delete this.checkedDisabled;
            this.group = null;
            delete this.group;
        }
    };

    base.inherit(Box, Widget);

    return Box;
});
