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
    
    var ua = navigator.userAgent;
    
    /**
     * 是否为Quirks模式
     * 
     * @property {Boolean} isQuirks
     */
    browser.isQuirks = document.compatMode === 'BackCompat';
    
    /**
     * 是否为Gecko内核
     * 
     * @property {Boolean} isGecko
     */
    browser.isGecko = /gecko/i.test(ua) && !/like gecko/i.test(ua);
    
    /**
     * 是否为Webkit内核
     * 
     * @property {Boolean} isWebkit
     */
    browser.isWebkit = /webkit/i.test(ua);
    
    /**
     * IE版本
     * 
     * @property {Number} ie
     */
    browser.ie = document.documentMode;
    
    /**
     * Chrome版本
     * 
     * @property {Number} chrome
     */
    browser.chrome = /chrome\/(\d+\.\d+)/i.test(ua) ? + RegExp.$1 : undefined;
    
    /**
     * Firefox版本
     * 
     * @property {Number} firefox
     */
    browser.firefox = /firefox\/(\d+\.\d+)/i.test(ua) ? + RegExp.$1 : undefined;
    
    /**
     * Safari版本
     * 
     * @property {Number} safari
     */
    browser.safari = /(\d+\.\d+)(\.\d)?\ssafari/i.test(ua) ? + RegExp.$1 : undefined;
    
    /**
     * Opera版本
     * 
     * @property {Number} opera
     */
    browser.opera = /opr\/(\d+\.\d+)/i.test(ua) ? + RegExp.$1 : undefined;
    
    return browser;
});
