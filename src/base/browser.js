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
     * @property {Number|undefined} ie
     */
    browser.ie = document.documentMode;

    /**
     * IE6/7
     *
     * @property {Boolean} badie
     */
    browser.badie = browser.ie === 6 || browser.ie === 7;

    /**
     * Chrome版本
     *
     * @property {Number|undefined} chrome
     */
    browser.chrome = /chrome\/(\d+\.\d+)/i.test(ua) ? +RegExp.$1 : undefined;

    /**
     * Firefox版本
     *
     * @property {Number|undefined} firefox
     */
    browser.firefox = /firefox\/(\d+\.\d+)/i.test(ua) ? +RegExp.$1 : undefined;

    /**
     * Safari版本
     *
     * @property {Number|undefined} safari
     */
    browser.safari = /(\d+\.\d+)(\.\d)?\ssafari/i.test(ua) ? +RegExp.$1 : undefined;

    /**
     * Opera版本
     *
     * @property {Number|undefined} opera
     */
    browser.opera = /opr\/(\d+\.\d+)/i.test(ua) ? +RegExp.$1 : undefined;

    return browser;
});
