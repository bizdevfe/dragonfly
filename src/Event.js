/**
 * 事件基类
 * 
 * @ignore
 */
define(function (require) {
    /**
     * 事件基类
     * 
     * @constructor
     */
    function Event() {}
    
    Event.prototype = {
        /**
         * 注册事件
         * 
         * @param {String} type 事件类型
         * @param {Function} handler 事件处理函数
         * @param {Object} [data] 附加参数
         */
        on: function(type, handler, data) {
            
            
        },
        
        /**
         * 注销事件
         * 
         * @param {String} [type] 事件类型
         * @param {Function} [handler] 事件处理函数
         */
        off: function(type, handler) {
            
            
        },
        
        /**
         * 触发事件
         * 
         * @param {String} type 事件类型
         */
        fire: function(type) {
            
            
        }
    };
    
    return Event;
});
