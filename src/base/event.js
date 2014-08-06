/**
 * 事件系统
 * 
 * @ignore
 */
define(function (require) {
    /**
     * 事件系统
     * 
     * @class event
     * @extends base
     * @singleton
     */
    var event = {};
    
    /**
     * 绑定事件
     * 
     * @param {HTMLElement} element
     * @param {String} type
     * @param {Function} callback
     * @return {HTMLElement}
     */
    event.on = function(element, type, callback) {
        
        return element;
    };
    
    /**
     * 移除事件
     * 
     * @param {HTMLElement} element
     * @param {String} type (optional)
     * @param {Function} callback (optional)
     * @return {HTMLElement}
     */
    event.off = function(element, type, callback) {
        
        return element;
    };
    
    /**
     * 触发事件
     * 
     * @param {HTMLElement} element
     * @param {String} type
     * @return {HTMLElement}
     */
    event.fire = function(element, type) {
        
        return element;
    };
    
    return event;
});
