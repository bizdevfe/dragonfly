/**
 * 控件基类
 * 
 * @ignore
 * @author Ricky
 */
define(function (require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Event = require('Event'),
        EventTarget = require('EventTarget');
    
    /**
     * 控件基类
     * 
     * @extends EventTarget
     * @constructor
     * @param {Object} [options] 初始化参数
     */
    function Widget(options) {
        //生命阶段
        this.inited = false;
        this.rendered = false;
        this.destroyed = false;
        
        //主元素
        this.main = this.createMain();
        
        //初始化状态
        this.initStates(options);
        
        //初始化参数
        this.initOptions(options);
        
        this.inited = true;
    }
    
    Widget.prototype = {
        /**
         * 创建主元素（子类重写）
         * 
         * @protected
         */
        createMain: function() {
            return document.addElement('div');
        },
        
        /**
         * 初始化控件状态
         * 
         * @param {Object} [options] 初始化参数
         * @protected
         */
        initStates: function(options) {
            this.states = {};
            if (options && typeof options.disabled != 'undefined') {
                this.states.disabled = options.disabled;
            }
            if (options && typeof options.hidden != 'undefined') {
                this.states.hidden = options.hidden;
            }
        },
        
        /**
         * 初始化参数（子类重写）
         * 
         * @param {Object} [options] 初始化参数
         * @protected
         */
        initOptions: function(options) {
            this.options = _.extend({}, options || {});
        },
        
        /**
         * 渲染
         * 
         * @param {HTMLElement|String} [target] HTML元素或其id
         * @fires beforerender
         * @fires afterrender
         */
        render: function(target) {
            if (!this.rendered) {
                /**
                 * 初次渲染前
                 * @event beforerender
                 */
                this.fire('beforerender');
                
                //将主元素插入文档
                this.appendMain(target);
                //创建其他元素
                this.initElements();
                //绑定事件
                this.initEvents();
                
                this.rendered = true;
                
                /**
                 * 初次渲染后
                 * @event afterrender
                 */
                this.fire('afterrender');
            }
        },
        
        /**
         * 将主元素插入文档
         * 
         * @param {HTMLElement|String} [target] HTML元素或其id
         * @protected
         */
        appendMain: function(target) {
            var container = base.g(target) || document.body;
            container.appendChild(this.main);
        },
        
        /**
         * 创建其他元素（子类实现）
         * 
         * @protected
         * @abstract
         */
        initElements: function() {},
        
        /**
         * 绑定事件（子类实现）
         * 
         * @protected
         * @abstract
         */
        initEvents: function() {},
        
        /**
         * 重绘
         * 
         * @protected
         */
        repaint: function() {
            console.log("repaint");
        },
        
        /**
         * 设置参数
         * 
         * @param {Object} options 参数
         * @protected
         */
        setOptions: function(options) {
            this.repaint();
        },
        
        /**
         * 获取控件参数值
         *
         * @param {String} name 参数名
         * @return {Mixed}
         */
        get: function(name) {
            return this.options[name];
        },
        
        /**
         * 设置控件参数值
         *
         * @param {String} name 参数名
         * @param {Mixed} value 参数值
         */
        set: function(name, value) {
            var option = {};
            option[name] = value;
            this.setOptions(option);
        },
        
        /**
         * 是否处于某状态
         * 
         * @param {String} state 状态名
         * @return {Boolean}
         * @protected
         */
        hasState: function (state) {
            return !!this.states[state];
        },
        
        /**
         * 添加控件状态
         * 
         * @param {String} state 状态名
         * @protected
         */
        addState: function (state) {
            if (!this.hasState(state)) {
                this.states[state] = true;
                var option = {};
                option[state] = true;
                this.setOptions(option);
            }
        },
        
        /**
         * 移除控件状态
         * 
         * @param {String} state 状态名
         * @protected
         */
        removeState: function (state) {
            if (this.hasState(state)) {
                this.states[state] = false;
                var option = {};
                option[state] = false;
                this.setOptions(option);
            }
        },
        
        /**
         * 启用控件
         */
        enable: function() {
            this.removeState('disabled');
        },
        
        /**
         * 禁用控件
         */
        disable: function() {
            this.addState('disabled');
        },
        
        /**
         * 控件是否禁用
         * 
         * @return {Boolean}
         */
        isDisabled: function () {
            return this.hasState('disabled');
        },
        
        /**
         * 显示控件
         */
        show: function() {
            this.removeState('hidden');
        },
        
        /**
         * 隐藏控件
         */
        hide: function() {
            this.addState('hidden');
        },
        
        /**
         * 切换控件显隐状态
         */
        toggle: function() {
            this[this.isHidden() ? 'show' : 'hide']();
        },
        
        /**
         * 控件是否隐藏
         * 
         * @return {Boolean}
         */
        isHidden: function() {
            return this.hasState('hidden');
        },
        
        /**
         * 销毁
         * 
         * @fires beforedestroy
         * @fires afterdestroy
         */
        destroy: function() {
            if (!this.destroyed) {
                /**
                 * 销毁前
                 * @event beforedestroy
                 */
                this.fire('beforedestroy');
                
                //解绑事件
                this.destroyEvents();
                //移除主元素
                this.removeMain();
                //移除其他元素
                this.removeElements();
                //删除属性
                delete this.options;
                delete this.states;
                delete this.main;
                
                this.destroyed = true;
                
                /**
                 * 销毁后
                 * @event afterdestroy
                 */
                this.fire('afterdestroy');
                
                //销毁事件队列
                this.off();
                
                //清除直接挂载的事件
                _.each(this, function(prop, key) {
                    if (_.isFunction(prop)) {
                        this[key] = null;
                        delete this[key];
                    }
                }, this);
            }
        },
        
        /**
         * 移除主元素
         * 
         * @protected
         */
        removeMain: function() {
            var parent = this.main.parentNode;
            if (parent) {
                parent.removeChild(this.main);
            }
        },
        
        /**
         * 移除其他元素（子类实现）
         * 
         * @protected
         * @abstract
         */
        removeElements: function() {},
        
        /**
         * 解绑事件（子类实现）
         * 
         * @protected
         * @abstract
         */
        destroyEvents: function() {}
    };
    
    //获得事件处理功能
    base.inherit(Widget, EventTarget);
    
    return Widget;
});