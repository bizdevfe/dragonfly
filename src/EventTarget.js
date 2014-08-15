/**
 * 接收事件的对象
 * 
 * @ignore
 * @author Ricky
 */
define(function (require) {
    var _ = require('underscore').noConflict(),
        Event = require('Event'),
        EventQueue = require('EventQueue');
    
    /**
     * 接收事件的对象
     * 
     * @constructor
     */
    function EventTarget() {}
    
    EventTarget.prototype = {
        /**
         * 注册自定义事件
         * 
         * @param {String} type 事件类型
         * @param {Function} handler 事件处理函数
         * @param {Boolean} [once] 仅执行一次
         * @return {EventTarget} 组件实例
         */
        on: function(type, handler, once) {
            if (!this.eventQueue) {
                this.eventQueue = {};
            }
            if (!this.eventQueue[type]) {
                this.eventQueue[type] = new EventQueue();
            }
            
            var queue = this.eventQueue[type];
            queue.add(handler, once);
            
            return this;
        },
        
        /**
         * 注册仅执行一次的自定义事件
         * 
         * @param {String} type 事件类型
         * @param {Function} handler 事件处理函数
         * @return {EventTarget} 组件实例
         * @chainable
         */
        once: function(type, handler) {
            return this.on(type, handler, true);
        },
        
        /**
         * 注销自定义事件
         * 
         * @param {String} [type] 事件类型
         * @param {Function} [handler] 事件处理函数
         * @return {EventTarget} 组件实例
         */
        off: function(type, handler) {
            if (arguments.length == 0) {
                //注销所有事件
                if (this.eventQueue) {
                    _.each(this.eventQueue, function(queue, type) {
                        queue.destroy();
                    });
                    delete this.eventQueue;
                }
            } else if (_.isString(type)) {
                //注销指定类型事件
                if (this.eventQueue && this.eventQueue[type]) {
                    var queue = this.eventQueue[type];
                    queue.remove(handler);
                }
            }
            
            return this;
        },
        
        /**
         * 触发自定义事件
         * 
         * @param {String} type 事件类型
         * @param {Event|Object} [args] 事件对象或事件参数
         */
        fire: function(type, args) {
            var event = args || {};
            
            //触发直接挂载的事件
            var inlineHandler = this['on' + type];
            if (_.isFunction(inlineHandler)) {
                inlineHandler.call(this, event);
            }
            
            //触发事件队列
            if (this.eventQueue && this.eventQueue[type]) {
                var queue = this.eventQueue[type];
                queue.execute(this, event);
            }
        },
        
        /**
         * 注册DOM事件
         * 
         * @param {HTMLElement} element DOM元素
         * @param {String} type 事件类型
         * @param {Function} handler 事件处理函数
         * @protected
         */
        addDOMEvent: function(element, type, handler) {
            if (!this.domEventQueue) {
                this.domEventQueue = {};
            }
            
            var queue = this.domEventQueue[type];
            if (!queue) {
                queue = this.domEventQueue[type] = new EventQueue();
                
                /*
                 * 每类DOM事件只有一个事件处理函数executor，负责执行domEventQueue
                 * 此处屏蔽绑定事件和事件对象的浏览器兼容性，并指定回调中的this为控件实例
                 */
                queue.executor = _.bind(function(e) {
                    var event = new Event(e);
                    this.domEventQueue[event.type].execute(this, event);
                }, this);
                Event.on(element, type, queue.executor);
            }
            
            queue.add(handler);
        },
        
        /**
         * 注册DOM事件（触发同类型自定义事件）
         * 
         * @param {HTMLElement} element DOM元素
         * @param {String} type 事件类型
         * @protected
         */
        addFiredDOMEvent: function(element, type) {
            this.addDOMEvent(element, type, function(e) {
                this.fire(type, e);
            });
        },
        
        /**
         * 注销DOM事件
         * 
         * @param {HTMLElement} element DOM元素
         * @param {String} [type] 事件类型
         * @param {Function} [handler] 事件处理函数
         * @protected
         */
        removeDOMEvent: function(element, type, handler) {
            if (arguments.length == 1) {
                //注销所有事件
                if (this.domEventQueue) {
                    _.each(this.domEventQueue, function(queue, eventType) {
                        queue.destroy();
                        Event.off(element, eventType, queue.executor);
                    });
                    delete this.domEventQueue;
                }
            } else if (_.isString(type)) {
                //注销指定类型事件
                if (this.domEventQueue && this.domEventQueue[type]) {
                    var queue = this.domEventQueue[type];
                    queue.remove(handler);
                }
            }
        }
    };
    
    return EventTarget;
});
