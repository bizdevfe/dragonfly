/**
 * DOM操作
 * 
 * @ignore
 */
define(function (require) {
    var _ = require('underscore').noConflict();
    
    /**
     * DOM操作
     * 
     * @class dom
     * @extends base
     * @singleton
     */
    var dom = {};
    
    /**
     * 生成guid
     * 
     * @return {String} guid
     */
    var count = 0;
    dom.guid = function() {
        return 'DRAGONFLY' + count++;
    };
    
    /**
     * 获取元素
     * 
     * @param {HTMLElement|String} DOM元素或其id
     * @return {HTMLElement|null} 获取的元素
     */
    dom.$ = function(id) {
        if (!id) {
            return null;
        }
        return _.isString(id) ? document.getElementById(id) : id;
    };
    
    /**
     * 移除元素
     * 
     * @param {HTMLElement|String} DOM元素或其id
     */
    dom.remove = function(element) {
        var parent = dom.$(element).parentNode;
        if (parent) {
            parent.removeChild(element);
        }
    };
    
    return dom;
});
