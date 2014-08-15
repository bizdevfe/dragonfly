/**
 * 事件对象
 * 
 * @ignore
 * @author Ricky
 */
define(function (require) {
    var _ = require('underscore').noConflict();
    
    /**
     * 事件对象
     * 
     * @constructor
     * @param {HTMLEvent} domEvent DOM事件对象
     */
    function Event(domEvent) {
        domEvent = domEvent || window.event;
        
        //复制属性
        _.each(domEvent, function(prop, key) {
            if (!_.isFunction(prop)) {
                this[key] = prop;
            };
        }, this);
        
        /**
         * @property {HTMLEvent} originalEvent DOM事件对象
         * @readonly
         */
        this.originalEvent = domEvent;
        
        /**
         * @property {HTMLElement} target 当前事件的目标对象
         * @readonly
         */
        var target = domEvent.target || domEvent.srcElement;
        this.target = target.nodeType === 3 ? target.parentNode : target;
        
        /**
         * @property {HTMLElement} relatedTarget target关联结点
         * @readonly
         */
        this.relatedTarget = domEvent.relatedTarget || domEvent[(this.type == 'mouseover' ? 'from' : 'to') + 'Element'];
        
        /**
         * @property {Number} keyCode 键码
         * @readonly
         */
        this.keyCode = domEvent.keyCode || domEvent.which;
        
        /**
         * @property {Boolean} rightClick 鼠标右键是否按下
         * @readonly
         */
        this.rightClick = domEvent.which === 3 || domEvent.button === 2;
        
        /**
         * @property {Number} pageX 文档X坐标
         * @readonly
         */
        /**
         * @property {Number} pageY 文档Y坐标
         * @readonly
         */
        var doc = domEvent.target.ownerDocument || document,
            root = document.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
        this.pageX = domEvent.pageX || domEvent.clientX + (root && root.scrollLeft || 0) - (root && root.clientLeft || 0);
        this.pageY = domEvent.pageY || domEvent.clientY + (root && root.scrollTop || 0) - (root && root.clientTop || 0);
    }
    
    Event.prototype = {
        /**
         * 阻止默认操作 
         */
        preventDefault: function() {
            var e = this.originalEvent;
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        
        /**
         * 阻止冒泡 
         */
        stopPropagation: function() {
            var e = this.originalEvent;
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        }
    };
    
    /**
     * 绑定事件
     * 
     * @param {HTMLElement} element DOM元素
     * @param {String} type 事件类型
     * @param {Function} listener 事件处理函数
     * @static
     */
    Event.on = function (element, type, listener) {
        if (element.addEventListener) {
            element.addEventListener(type, listener, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, listener);
        }
    };
    
    /**
     * 解绑事件
     * 
     * @param {HTMLElement} element DOM元素
     * @param {String} type 事件类型
     * @param {Function} listener 事件处理函数
     * @static
     */
    Event.off = function (element, type, listener) {
        if (element.addEventListener) {
            element.removeEventListener(type, listener, false);
        } else if (element.attachEvent) {
            element.detachEvent('on' + type, listener);
        }
    };
    
    return Event;
});
