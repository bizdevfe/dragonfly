/**
 * 扩展基类
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict();

    /**
     * 扩展基类
     *
     * @constructor
     * @param {Object} [options] 初始化参数
     */
    function Extension(options) {
        this.options = _.extend({}, options || {});
    }

    Extension.prototype = {
        /**
         * @property {Widget} main 控件实例
         */
        target: null,

        /**
         * 初始化扩展
         *
         * @protected
         * @abstract
         */
        init: function() {},

        /**
         * 销毁扩展
         *
         * @protected
         * @abstract
         */
        destroy: function() {}
    };

    return Extension;
});
