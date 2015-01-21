/**
 * 复选
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var base = require('base/base'),
        BoxGroup = require('ui/BoxGroup');

    /**
     * 复选
     *
     * @extends BoxGroup
     * @constructor
     * @param {Object} options 初始化参数
     *
     *     @example
     *     //默认值
     *     {
     *         name: ''  //String, name属性
     *         group: [  //Array, {@link Box}数组
     *             {
     *                 disabled: false, //Boolean, 是否禁用
     *                 hidden: false,   //Boolean, 是否隐藏
     *                 checked: false,  //Boolean, 是否选中
     *                 type: '',        //String, type属性
     *                 value: '',       //String, value属性
     *                 title: '',       //String, label文字
     *                 id: ''           //String, 内部id, 用于get()
     *             }
     *         ]
     *     }
     */
    function Checkbox(options) {
        BoxGroup.call(this, options);
        this.options.type = 'checkbox';
    }

    base.inherit(Checkbox, BoxGroup);

    return Checkbox;
});
