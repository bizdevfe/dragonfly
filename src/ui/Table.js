/**
 * 表格
 *
 * @ignore
 */
define(function(require) {
    var base = require('base/base'),
        Widget = require('ui/Widget');

    /**
     * 表格
     *
     * @extends Widget
     * @constructor
     */
    function Table() {
        Widget.call(this, options);
    }

    base.inherit(Table, Widget);

    return Table;
});
