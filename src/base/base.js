/**
 * 基础模块
 * 
 * @ignore
 */
define(function (require) {
    var _ = require('underscore').noConflict();
    
    /**
     * 基础模块
     * 
     * @class base
     * @singleton
     */
    var base = {};
    
    _.extend(
        base,
        require('base/string'),
        require('base/browser'),
        require('base/class'),
        require('base/dom')
    );
    
    return base;
});