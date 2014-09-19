/*
 * Dragonfly 0.1.0
 * A flexible and light ui framework
 * (c) 2014 Sogou Inc. All rights reserved.
 * https://github.com/bizdevfe/dragonfly
 */

/**
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict();

    /**
     * 种子模块
     *
     * @class main
     * @singleton
     */
    var main = {};

    /**
     * @property {String} version 版本号
     * @readonly
     */
    main.version = '0.1.0';

    var previousD = window.D;

    /**
     * 无冲突处理
     *
     * @return {Object} Dragonfly
     */
    main.noConflict = function() {
        window.D = previousD;
        return this;
    };

    _.extend(main, {
        /**
         * Button构造器，参见{@link Button}
         * @method Button
         */
        Button: require('ui/Button'),

        /**
         * Table构造器，参见{@link Table}
         * @method Table
         */
        Table: require('ui/Table'),

        /**
         * DropdownButton构造器，参见{@link DropdownButton}
         * @method DropdownButton
         */
        DropdownButton: require('extension/DropdownButton')
    });

    return main;
});
