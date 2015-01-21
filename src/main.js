/*
 * Dragonfly 0.1.0
 * A Flat UI framework designed for modern web applications.
 * (c) 2015 Sogou Inc. All rights reserved.
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
         * Input构造器，参见{@link Input}
         * @method Input
         */
        Input: require('ui/Input'),

        /**
         * Textarea构造器，参见{@link Textarea}
         * @method Textarea
         */
        Textarea: require('ui/Textarea'),

        /**
         * TextLine构造器，参见{@link TextLine}
         * @method TextLine
         */
        TextLine: require('extension/TextLine'),

        /**
         * Tooltip构造器，参见{@link Tooltip}
         * @method Tooltip
         */
        Tooltip: require('ui/Tooltip'),

        /**
         * Radio构造器，参见{@link Radio}
         * @method Radio
         */
        Radio: require('ui/Radio'),

        /**
         * Checkbox构造器，参见{@link Checkbox}
         * @method Checkbox
         */
        Checkbox: require('ui/Checkbox'),

        /**
         * Tab构造器，参见{@link Tab}
         * @method Tab
         */
        Tab: require('ui/Tab'),

        /**
         * Dialog构造器，参见{@link Dialog}
         * @method Dialog
         */
        Dialog: require('ui/Dialog'),

        /**
         * SidePanel构造器，参见{@link SidePanel}
         * @method SidePanel
         */
        SidePanel: require('ui/SidePanel')
    });

    return main;
});
