/**
 * 工具模块
 * 
 * @ignore
 */
define(function (require) {
    var _ = require('underscore').noConflict();
    
    /**
     * 工具模块
     * 
     * @class util
     * @singleton
     */
    var util = {};
    
    _.extend(
        util,
        require('util/cookie')
    );
    
    return util;
});
