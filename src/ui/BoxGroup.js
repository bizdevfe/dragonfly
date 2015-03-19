/**
 * 单选/复选组
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Box = require('ui/Box');

    /**
     * 单选/复选组
     *
     * @constructor
     * @param {Object} options 初始化参数
     */
    function BoxGroup(options) {
        this.options = options;
    }

    BoxGroup.prototype = {
        /**
         * 渲染
         *
         * @param {HTMLElement|String} [target] HTML元素或其id
         */
        render: function(target) {
            var container = base.g(target) || document.body,
                name = this.options.name,
                type = this.options.type;

            this.ctrls = []; //实例
            _.each(this.options.group, function(option) {
                option.type = type;
                option.name = name;
                var ctrl = new Box(option, this);
                ctrl.appendTo(target);
                this.ctrls.push(ctrl);
            }, this);
        },

        /**
         * 获取控件
         *
         * @param {String} id 控件id
         * @return {Widget} 控件
         */
        get: function(id) {
            return _.find(this.ctrls, function(ctrl) {
                return ctrl.options ? ctrl.options.id === id : false;
            });
        },

        /**
         * 获取处于选中状态的控件值
         *
         * @return {String} 控件值（以","分割）
         */
        getValue: function() {
            var value = [];
            _.each(this.ctrls, function(ctrl) {
                if (ctrl.isChecked()) {
                    value.push(ctrl.getValue());
                }
            });

            return value.join(',');
        },

        /**
         * 批量调用方法
         *
         * @param {String} method 方法名
         * @protected
         */
        batchCall: function(method) {
            _.each(this.ctrls, function(ctrl) {
                ctrl[method]();
            });
        },

        /**
         * 选中组
         */
        check: function() {
            this.batchCall('check');
        },

        /**
         * 不选组
         */
        uncheck: function() {
            this.batchCall('uncheck');
        },

        /**
         * 显示组
         */
        show: function() {
            this.batchCall('show');
        },

        /**
         * 隐藏组
         */
        hide: function() {
            this.batchCall('hide');
        },

        /**
         * 启用组
         */
        enable: function() {
            this.batchCall('enable');
        },

        /**
         * 禁用组
         */
        disable: function() {
            this.batchCall('disable');
        },

        /**
         * 销毁组
         */
        destroy: function() {
            this.batchCall('destroy');
        }
    };

    return BoxGroup;
});
