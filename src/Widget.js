/**
 * 控件基类
 * 
 * @ignore
 */
define(function (require) {
    var base = require('base/base'),
        Event = require('Event');
    
    /**
     * 控件基类
     * 
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
    
    //获取事件功能
    base.inherit(Widget, Event);
    
    return Widget;
});
