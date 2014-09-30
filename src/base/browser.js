/**
 * 浏览器检测
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    /**
     * 浏览器检测
     *
     * @class base.browser
     * @extends base
     * @singleton
     */
    var browser = {};

    var ua = navigator.userAgent;

    /**
     * @property {Boolean} isQuirks 是否为Quirks模式
     */
    browser.isQuirks = document.compatMode === 'BackCompat';

    /**
     * @property {Boolean} isGecko 是否为Gecko内核
     */
    browser.isGecko = /gecko/i.test(ua) && !/like gecko/i.test(ua);

    /**
     * @property {Boolean} isWebkit 是否为Webkit内核
     */
    browser.isWebkit = /webkit/i.test(ua);

    /**
     * @property {Number|undefined} ie IE版本
     */
    browser.ie = document.documentMode;

    /**
     * @property {Boolean} badie IE6/7
     */
    browser.badie = browser.ie === 6 || browser.ie === 7;

    /**
     * @property {Number|undefined} chrome Chrome版本
     */
    browser.chrome = /chrome\/(\d+\.\d+)/i.test(ua) ? +RegExp.$1 : undefined;

    /**
     * Firefox版本
     *
     * @property {Number|undefined} firefox
     */
    browser.firefox = /firefox\/(\d+\.\d+)/i.test(ua) ? +RegExp.$1 : undefined;

    /**
     * @property {Number|undefined} safari Safari版本
     */
    browser.safari = /(\d+\.\d+)(\.\d)?\ssafari/i.test(ua) ? +RegExp.$1 : undefined;

    /**
     * @property {Number|undefined} opera Opera版本
     */
    browser.opera = /opr\/(\d+\.\d+)/i.test(ua) ? +RegExp.$1 : undefined;

    return browser;
});
