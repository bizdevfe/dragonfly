/**
 * 控件基类
 * 
 * @ignore
 * @author Ricky
 */
define(function (require) {
    var base = require('base/base'),
        EventTarget = require('Event').EventTarget;
    
    /**
     * 控件基类
     * 
     * @extends EventTarget
     * @constructor
     */
    function Widget() {
        
    }
    
    Widget.prototype = {
        /**
         * 初始化
         * 
         */
        init: function() {
            
        },
        
        /**
         * 渲染
         * 
         */
        render: function() {
            
        },
        
        /**
         * 销毁
         * 
         */
        destroy: function() {
            
        }
    };
    
    //获得事件处理功能
    base.inherit(Widget, EventTarget);
    
    return Widget;
});
