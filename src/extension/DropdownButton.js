/**
 * 下拉按钮
 * 
 * @ignore
 * @author Ricky
 */
define(function (require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Extension = require('Extension');
    
    /**
     * 下拉按钮
     * 
     * @extends Extension
     * @constructor
     * @param {Object} [options] 初始化参数
     */
    function DropdownButton(options) {
        Extension.call(this, options);
    }
    
    DropdownButton.prototype = {
        /**
         * 初始化扩展 
         * 
         * @protected
         * @override
         */
        init: function() {
            console.log(this.target);
        },
        
        /**
         * 销毁扩展 
         * 
         * @protected
         * @override
         */
        destroy: function() {
            
        }
    };
    
    base.inherit(DropdownButton, Extension);
    
    return DropdownButton;
});
