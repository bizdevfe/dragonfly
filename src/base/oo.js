/**
 * 类支持
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict();

    /**
     * 类支持
     *
     * @class base.oo
     * @extends base
     * @singleton
     */
    var oo = {};

    /**
     * 继承
     *
     * @param {Function} subclass 子类构造器
     * @param {Function} superclass 父类构造器
     * @return {Function} 子类
     */
    oo.inherit = function(subclass, superclass) {
        function Empty() {}
        Empty.prototype = superclass.prototype;

        var originalProto = subclass.prototype,
            newProto = subclass.prototype = new Empty();

        _.extend(newProto, originalProto);

        subclass.prototype.constructor = subclass;
        subclass.superclass = superclass.prototype;

        return subclass;
    };

    return oo;
});
