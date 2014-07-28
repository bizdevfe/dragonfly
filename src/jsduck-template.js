/**
 * 模块描述
 * 
 * @ignore
 * @author Ricky
 */
define(function () {
    /**
     * 单例
     * 
     * @class main
     * @singleton
     */
    var main = {};
    
    /**
     * 版本号
     *
     * @property {String} version
     * @readonly
     */
    main.version = '0.1.0';
    
    return main;
});

/**
 * 模块描述
 * 
 * @ignore
 * @author Ricky
 */
define(function () {
    /**
     * 基类
     * 
     * @constructor
     */
    function Base() {
        
    }
    
    return Base;
});

/**
 * 模块描述
 * 
 * @ignore
 * @author Ricky
 */
define('moduleName', ['require', './Base'], function (require) {
    /**
     * 子类
     * 
     * @extends Base
     * @constructor
     */
    function Control(name) {
        /**
         * 初始化标志
         * 
         * @property {Boolean} loaded
         */
        this.loaded = false;
    }
    
    /**
     * 公有方法
     * 
     * @param {Number} number 参数
     * @return {Boolean} 结果
     */
    Control.prototype.pubMethod = function (number) {
        
    };
    
    /**
     * 私有方法
     * 
     * @private
     * @param {Number} number 参数
     * @return void
     */
    Control.prototype.priMethod = function (number) {
        
    };
    
    /**
     * 点击时触发
     * 
     * @event onclick
     */
    Control.prototype.onclick = function () {
        
    };
    
    return Control;
});
