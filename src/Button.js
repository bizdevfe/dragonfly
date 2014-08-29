/**
 * 按钮
 * 
 * @ignore
 * @author Ricky
 */
define(function (require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Widget = require('Widget');
    
    /**
     * 按钮
     * 
     * @extends Widget
     * @constructor
     * @param {Object} [options] 初始化参数
     * 
     *     @example
     *     //默认参数
     *     {
     *         content: '',     //按钮文字
     *         disabled: false  //是否禁用
     *     }
     */
    function Button(options) {
        Widget.call(this, options);
    }
    
    Button.prototype = {
        /**
         * 创建主元素
         * 
         * @protected
         * @override
         */
        createMain: function() {
            var div = document.createElement('div');
                div.innerHTML = '<button type="button"></button>';
            return div.firstChild;
        },
        
        /**
         * 初始化参数
         * 
         * @param {Object} [options] 初始化参数
         * @protected
         * @override
         */
        initOptions: function(options) {
            this.options = _.extend({
                content: '',
                disabled: false
            }, options || {});
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
                    this.main.style.display = hidden ? 'none' : '';
                },
                disabled: function(disabled) {
                    this.main.disabled = disabled;
                },
                content: function(content) {
                    this.main.innerHTML = content;
                }
            };
        },
        
        /**
         * 绑定事件
         * 
         * @protected
         * @override
         */
        initEvents: function() {
            /**
             * 点击
             * @event click
             */
            this.addFiredDOMEvent(this.main, 'click');
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
         * 设置按钮文字
         * 
         * @param {String} content 按钮文字
         */
        setContent: function(content) {
            this.set('content', content);
        },
        
        /**
         * 获取按钮文字
         * 
         * @return {String} 按钮文字
         */
        getContent: function() {
            return this.get('content');
        }
    };
    
    base.inherit(Button, Widget);
    
    return Button;
});
