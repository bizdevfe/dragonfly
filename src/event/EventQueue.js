/**
 * 事件队列
 * 
 * @ignore
 * @author Ricky
 */
define(function (require) {
    var _ = require('underscore').noConflict();
    
    /**
     * 事件队列
     * 
     * @constructor
     */
    function EventQueue() {
        this.queue = [];
    }
    
    EventQueue.prototype = {
        /**
         * 添加事件
         * 
         * @param {Function} handler 事件处理函数
         * @param {Boolean} once 仅执行一次
         */
        add: function(handler, once) {
            this.queue.push({
                handler: handler,
                once: once
            });
        },
        
        /**
         * 移除事件
         * 
         * @param {Function} handler 事件处理函数
         */
        remove: function(handler) {
            if (!handler) {
                this.queue.length = 0;
                return;
            }
            
            _.each(this.queue, function(element, index) {
                if (element && element.handler === handler) {
                    this.queue[index] = null;
                }
            }, this);
        },
        
        /**
         * 依次执行事件处理函数
         * 
         * @param {EventTarget} target 控件实例
         * @param {Event|Object} event 事件对象或事件参数
         */
        execute: function(target, event) {
            _.each(this.queue, function(element, index) {
                if (element) {
                    element.handler.call(target, event);
                    if (element.once) {
                        this.queue[index] = null;
                    }
                }
            }, this);
        },
        
        /**
         * 销毁队列
         */
        destroy: function() {
            this.queue.length = 0;
            this.queue = null;
        }
    };
    
    return EventQueue;
});
