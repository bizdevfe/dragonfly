/**
 * Checkbox
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Widget = require('ui/Widget');

    var CHECKED         = "checked",
        UNCHECKED       = "bold",  // default css
        SEMI_CHECKED    = "tag";

    /**
     * Checkbox
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
     *         text: '',        //按钮文字
     *         skin: 'default'  //皮肤：'spring', 'dark'
     *     }
     */
    function Checkbox(options) {
        Widget.call(this, options);
    }

    Checkbox.prototype = {
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
                text: ''
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
            var div = document.createElement('div');
            div.className = "df-checkbox";
            div.innerHTML = '<span></span>';
            return div;
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
                    base.css(this.main, {display: hidden ? 'none' : ''});
                },
                disabled: function(disabled) {
                },
                text: function(text) {
                }
            };
        },
        initEvents: function() {
            var _this = this;
            /**
             * 点击时触发
             * @event onclick
             * @param {Event} e 事件对象
             */
            this.addDOMEvent(this.main.firstChild, 'click', function(){
                var element = _this.main.firstChild;
                if(element.className == CHECKED){
                    element.className = UNCHECKED;
                    _this.selected = false;
                } else {
                    element.className = CHECKED;
                    _this.selected = true;
                }
            });

            this.addDOMEvent(this.main, 'mouseover', function() {
                //nothing to do
            });

            this.addDOMEvent(this.main, 'mouseout', function() {
            });

            this.addDOMEvent(this.main, 'mousedown', function() {
            });

            this.addDOMEvent(this.main, 'mouseup', function() {
            });
        },
        /**
         * 创建其他元素
         *
         * @protected
         * @override
         */
        initElements: function() {

        }
    };


    base.inherit(Checkbox, Widget);

    return Checkbox;
});
