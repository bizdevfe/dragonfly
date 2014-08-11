/**
 * 事件相关
 * 
 * @ignore
 * @author Ricky
 */
define(function (require) {
    var _ = require('underscore').noConflict();
    
    //通用属性
    var commonProps = ['type', 'altKey', 'ctrlKey', 'shiftKey'];
    //其他属性
    var fixer = [
        { //键盘事件
            reg: /key/i,
            fix: function (domEvent, newEvent, type) {
                newEvent.keyCode = domEvent.keyCode || domEvent.which;
            }
        },
        { //鼠标事件
            reg: /click|mouse(?!(.*wheel|scroll))|menu/i,
            fix: function (domEvent, newEvent, type) {
                newEvent.rightClick = domEvent.which === 3 || domEvent.button === 2;
                
                //兼容
                newEvent.clientX = domEvent.clientX;
                newEvent.clientY = domEvent.clientY;
                newEvent.screenX = domEvent.screenX;
                newEvent.screenY = domEvent.screenY;
                
                var doc = domEvent.target.ownerDocument || document,
                    root = document.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
                newEvent.pageX = domEvent.pageX || domEvent.clientX + (box && box.scrollLeft || 0) - (box && box.clientLeft || 0);
                newEvent.pageY = domEvent.pageY || domEvent.clientY + (box && box.scrollTop || 0) - (box && box.clientTop || 0);
            }
        }
    ];
    var fixerMap = {};
    
    /**
     * 事件对象
     * 
     * @constructor
     * @param {HTMLDOMEvent} domEvent 原生DOM事件对象
     */
    function Event(domEvent) {
        domEvent = domEvent || window.event;
        
        /**
         * @property {HTMLDOMEvent} originalEvent 原生DOM事件对象
         * @readonly
         */
        this.originalEvent = domEvent;
        
        //复制通用属性
        /**
         * @property {String} type 事件类型
         * @readonly
         */
        /**
         * @property {Boolean} altKey Alt键是否按下
         * @readonly
         */
        /**
         * @property {Boolean} ctrlKey Ctrl键是否按下
         * @readonly
         */
        /**
         * @property {Boolean} shiftKey Shift键是否按下
         * @readonly
         */
        _.each(commonProps, function(prop, index) {
            this[prop] = domEvent[prop];
        }, this);
        
        /**
         * @property {HTMLElement} target 当前事件的目标对象
         * @readonly
         */
        var target = domEvent.target || domEvent.srcElement;
        this.target = target.nodeType === 3 ? target.parentNode : target;
        
        /**
         * @property {Boolean} metaKey Meta键是否按下（如Mac的Command键）
         * @readonly
         */
        this.metaKey = !!domEvent.metaKey;
        
        //修复其他属性
        /**
         * @property {Number} keyCode 键码
         * @readonly
         */
        /**
         * @property {Boolean} rightClick 鼠标右键是否按下
         * @readonly
         */
        /**
         * @property {Number} clientX 浏览器X坐标
         * @readonly
         */
        /**
         * @property {Number} clientY 浏览器Y坐标
         * @readonly
         */
        /**
         * @property {Number} screenX 屏幕X坐标
         * @readonly
         */
        /**
         * @property {Number} screenY 屏幕Y坐标
         * @readonly
         */
        /**
         * @property {Number} pageX 文档X坐标
         * @readonly
         */
        /**
         * @property {Number} pageY 文档Y坐标
         * @readonly
         */
        var type = this.type;
        if (!fixerMap[type]) {
            fixerMap[type] = _.find(fixer, function(element) {
                return element.reg.test(type);
            }).fix;
            fixerMap[type](domEvent, this, type);
        }
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
     * 事件队列
     * 
     * @ignore
     * @constructor
     */
    function EventQueue() {
        this.queue = [];
    }
    
    EventQueue.prototype = {
        /**
         * 添加事件
         * 
         * @param {Function} handler 事件处理函数
         * @param {Object} [args] 附加参数
         */
        add: function(handler, args) {
            this.queue.push({
                handler: handler,
                args: args
            });
        },
        
        /**
         * 移除事件
         * 
         * @param {Function} handler 事件处理函数
         */
        remove: function(handler) {
            if (!handler) {
                this.clear();
                return;
            }
            
            _.each(this.queue, function(element, index) {
                if (element && element.handler === handler) {
                    element = null;
                }
            });
        },
        
        /**
         * 依次执行事件处理函数
         * 
         * @param {EventTarget} target 函数执行时的this
         * @param {Event} event 事件对象
         */
        execute: function(target, event) {
            _.each(this.queue, function(element, index) {
                if (element) {
                    element.handler.call(target, event, element.args);
                }
            });
        },
        
        /**
         * 清空事件
         */
        clear: function() {
            this.queue.length = 0;
        },
        
        /**
         * 销毁队列
         */
        destroy: function() {
            this.clear();
            this.queue = null;
        }
    };
    
    /**
     * 接收事件的对象
     * 
     * 控件基类`Widget`继承此类，也可以通过静态方法`enableEvent`使一个普通对象拥有事件处理功能：
     * 
     *     @example
     *     var obj = {};
     *     EventTarget.enableEvent(obj);
     *     obj.on('greeting', handler, args);
     *     obj.fire('greeting');
     * 
     * `handler(e, args)`参数：
     * `e`为事件对象，参见{@link Event}；
     * `arg`为附加参数，参见{@link EventTarget#on}；
     * 其中的`this`为注册事件的对象
     * 
     * @constructor
     */
    function EventTarget() {}
    
    EventTarget.prototype = {
        /**
         * 注册事件
         * 
         * @param {String} type 事件类型
         * @param {Function} handler 事件处理函数
         * @param {Object} [args] 附加参数
         */
        on: function(type, handler, args) {
            if (!this.eventQueue) {
                this.eventQueue = {};
            }
            if (!this.eventQueue.hasOwnProperty(type)) {
                this.eventQueue[type] = new EventQueue();
            }
            
            var queue = this.eventQueue[type];
            queue.add(handler, _.extend({}, args));
        },
        
        /**
         * 注销事件
         * 
         * @param {String} [type] 事件类型
         * @param {Function} [handler] 事件处理函数
         */
        off: function(type, handler) {
            if (arguments.length == 0) {
                //注销所有事件
                if (!this.eventQueue) {
                    return;
                }
                
                for (var type in this.eventQueue) {
                    var queue = this.eventQueue[type];
                    queue.destroy();
                }
                
                this.eventQueue = null;
            } else if (_isString(type)) {
                //注销指定类型事件
                if (!this.eventQueue || !this.eventQueue.hasOwnProperty(type)) {
                    return;
                }
                
                var queue = this.eventQueue[type];
                queue.remove(handler);
            }
        },
        
        /**
         * 触发事件
         * 
         * @param {String} type 事件类型
         * @param {Event} [event] 事件对象
         */
        fire: function(type, event) {
            //触发直接挂载的事件
            var inlineHandler = this['on' + type];
            if (typeof inlineHandler === 'function') {
                inlineHandler.call(this, event);
            }
            
            if (this.eventQueue && this.eventQueue.hasOwnProperty(type)) {
                var queue = this.eventQueue[type];
                queue.execute(this, event);
            }
        }
    };
    
    /**
     * 使一个普通对象拥有事件处理功能
     * 
     * @param {Object} obj 普通对象
     * @static
     */
    EventTarget.enableEvent = function (obj) {
        _.extend(obj, EventTarget.prototype);
    };
    
    return {
        Event: Event,
        EventTarget: EventTarget
    };
});
