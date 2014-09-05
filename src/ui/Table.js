/**
 * 表格
 * 
 * @ignore
 * @author Ricky
 */
define(function (require) {
    var base = require('base/base'),
        Widget = require('ui/Widget');
    
    /**
     * 表格
     * 
     * @extends Widget
     * @constructor
     */
    function Table() {
        
    }
    
    base.inherit(Table, Widget);
    
    return Table;
});
