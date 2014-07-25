/**
 * Dragonfly
 * © 2014 Sogou Inc. All rights reserved.
 * 
 * @file 按钮样式
 * @author Ricky
 */

define('Button', ['require'], function (require) {
    
    function Button() {
        this.name = 'Button';
    };
    
    Button.prototype.init = function() {
        console.log('Button.init');
    };
    
    return Button;
});
