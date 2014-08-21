/**
 * 接收事件的对象
 * 
 * @ignore
 * @author Ricky
 */
define(function (require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Event = require('Event'),
        EventQueue = require('EventQueue');
    
    var EVENT_GUID = 'df-event-guid';
    
    /**
     * 接收事件的对象
     * 
     * @constructor
     */
    function EventTarget() {}
    
    EventTarget.prototype = {
        /**
         * 添加自定义事件
         * 
         * @param {String} type 事件类型
         * @param {Function} handler 事件处理函数
         * @param {Boolean} [once] 仅执行一次
         * @return {EventTarget} 控件实例
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
         * 添加仅执行一次的自定义事件
         * 
         * @param {String} type 事件类型
         * @param {Function} handler 事件处理函数
         * @return {EventTarget} 控件实例
         * @chainable
         */
        once: function(type, handler) {
            return this.on(type, handler, true);
        },
        
        /**
         * 移除自定义事件
         * 
         * @param {String} [type] 事件类型
         * @param {Function} [handler] 事件处理函数
         * @return {EventTarget} 控件实例
         */
        off: function(type, handler) {
            if (arguments.length == 0) {
                //移除所有事件
                if (this.eventQueue) {
                    _.each(this.eventQueue, function(queue, eventType) {
                        queue.destroy();
                    });
                    delete this.eventQueue;
                }
            } else if (_.isString(type)) {
                //移除指定类型事件
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
         * 添加DOM事件
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
            
            var guid = element[EVENT_GUID];
            if (!guid) {
                guid = element[EVENT_GUID] = base.guid();
            }
            
            var events = this.domEventQueue[guid];
            if (!events) {
                events = this.domEventQueue[guid] = {};
            }
            
            var queue = events[type];
            if (!queue) {
                queue = events[type] = new EventQueue();
                
                /*
                 * 每个元素的每类DOM事件只有一个事件处理函数executor，负责执行events队列
                 * 此处屏蔽添加事件和事件对象的浏览器兼容性，并指定回调中的this为控件实例
                 */
                queue.executor = _.bind(function(element, e) {
                    var event = new Event(e),
                        myQueue = this.domEventQueue[element[EVENT_GUID]][event.type];
                    myQueue.execute(this, event);
                }, this, element);
                
                Event.on(element, type, queue.executor);
            }
            
            queue.add(handler);
        },
        
        /**
         * 添加DOM事件（触发同类型自定义事件）
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
         * 移除DOM事件
         * 
         * @param {HTMLElement} element DOM元素
         * @param {String} [type] 事件类型
         * @param {Function} [handler] 事件处理函数
         * @protected
         */
        removeDOMEvent: function(element, type, handler) {
            if (!this.domEventQueue) {
                return;
            }
            var guid = element[EVENT_GUID];
            if (!guid) {
                return;
            }
            var events = this.domEventQueue[guid];
            if (!events) {
                return;
            }
            
            if (arguments.length == 1) {
                //移除所有事件
                _.each(events, function(queue, eventType) {
                    Event.off(element, eventType, queue.executor);
                    queue.destroy();
                    queue.executor = null;
                });
                delete this.domEventQueue[guid];
            } else if (_.isString(type)) {
                //移除指定类型事件
                if (events[type]) {
                    var queue = events[type];
                    queue.remove(handler);
                }
            }
        }
    };
    
    return EventTarget;
});
