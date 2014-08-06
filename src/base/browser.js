/**
 * 浏览器检测
 * 
 * @ignore
 */
define(function (require) {
    /**
     * 浏览器检测 
     *
     * @class browser
     * @extends base
     * @singleton
     */
    var browser = {};
    
    /**
     * IE版本
     * 
     * @property {Number} ie
     */
    browser.ie = document.documentMode;
    
    return browser;
});
