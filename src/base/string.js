/**
 * 字符串扩展
 *
 * @ignore
 */
define(function (require) {
    /**
     * 字符串扩展
     *
     * @class string
     * @extends base
     * @singleton
     */
    var string = {};

    /**
     * 字符串两端去空
     *
     */
    string.trim = function(str) {
        if (str.trim) {
            return str.trim();
        }
        return str.replace(/^\s*|\s*$/, '');
    };

    /*
     * 字符串左端去空
     *
     */
    string.trimLeft = function(str) {
        if (str.trimLeft) {
            return str.trimLeft();
        }
        return str.replace(/^\s*/, '');
    };

    /**
     * 字符串右端去空
     *
     */
    string.trimRight = function(str) {
        if (str.trimRight) {
            return str.trimRight();
        }
        return str.replace(/\s*$/, '');
    };

    return string;
});
