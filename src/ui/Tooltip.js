/**
 * 气泡提示
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Event = require('event/Event'),
        Widget = require('ui/Widget');

    var tpl = [
        '<% if (title) { %>',
        '<h1 class="df-tooltip-title"><%= title %>',
        '<% if (closeBtn) { %><span class="close"></span><% } %>',
        '</h1>',
        '<% } %>',
        '<div class="df-tooltip-content<%= icon %>"><%= content %></div>'
    ].join('');

    /**
     * 气泡提示
     *
     * @extends Widget
     * @constructor
     * @param {Object} [options] 初始化参数
     *
     *     @example
     *     //默认值
     *     {
     *         id: '',            //String, 触发Tooltip的元素id
     *         content: '',       //String, 内容
     *         icon: false,       //Boolean|String, 内容图标：'!', '?'
     *         title: false,      //Boolean|String, 标题
     *         closeBtn: true,    //Boolean, 是否显示关闭按钮, 有title时生效
     *         delay: 300         //Number, 消失延时毫秒数
     *     }
     */
    function Tooltip(options) {
        Widget.call(this, options);
    }

    Tooltip.prototype = {
        /**
         * 初始化参数
         *
         * @param {Object} options 初始化参数
         * @protected
         * @override
         */
        initOptions: function(options) {
            this.options = _.extend({
                hidden: true,
                id: '',
                content: '',
                icon: false,
                title: false,
                closeBtn: true,
                delay: 300
            }, options || {});
        },

        /**
         * 创建其他元素
         *
         * @protected
         * @override
         */
        initElements: function() {
            base.css(this.main, {
                display: 'none'
            });
            this.main.innerHTML = _.template(tpl)({
                content: this.options.content,
                icon: !!this.options.icon ? (this.options.icon == '!' ? ' df-tooltip-alert' : ' df-tooltip-help') : '',
                title: this.options.title,
                closeBtn: this.options.closeBtn
            });
            base.addClass(this.main, 'df-tooltip');
        },

        /**
         * 事件绑定初始化
         *
         * @protected
         * @override
         */
        initEvents: function() {
            this.delegateDOMEvent(this.main, 'click', '.close', this.hide);

            this.host = base.g(this.options.id);
            this.toShow = _.bind(this.setPosition, this);
            this.toHide = _.bind(this.delay, this);
            Event.on(this.host, 'mouseover', this.toShow);
            Event.on(this.host, 'mouseout', this.toHide);

            this.addDOMEvent(this.main, 'mouseover', function() {
                clearTimeout(this.timer);
            });
            this.addDOMEvent(this.main, 'mouseout', this.delay);
        },

        /**
         * 初始化绘制函数
         *
         * @protected
         * @override
         */
        initPainters: function() {
            this.painters = {
                hidden: function(hidden) {
                    base.css(this.main, {
                        display: hidden ? 'none' : ''
                    });
                }
            };
        },

        /**
         * 设置Tooltip位置
         *
         * @protected
         */
        setPosition: function(e) {
            var targetPosition = base.offset(e.target),
                mySize = this.getSize(),
                left,
                top;

            if (targetPosition.left + mySize.width <= document.body.clientWidth) {
                left = targetPosition.left;
            } else {
                left = targetPosition.left + e.target.offsetWidth - mySize.width;
            }
            if (targetPosition.top + 3 >= mySize.height) {
                top = targetPosition.top - mySize.height - 3;
            } else {
                top = targetPosition.top + e.target.offsetHeight + 3;
            }
            base.css(this.main, {
                left: left + 'px',
                top: top + 'px'
            });
            this.show();
        },

        /**
         * 获取Tooltip尺寸
         *
         * @protected
         */
        getSize: function() {
            this.show();
            var size = {
                width: this.main.offsetWidth,
                height: this.main.offsetHeight
            };
            this.hide();
            return size;
        },

        delay: function() {
            this.timer = setTimeout(_.bind(function() {
                this.hide();
            }, this), this.options.delay);
        },

        /**
         * 解绑事件
         *
         * @protected
         * @override
         */
        destroyEvents: function() {
            this.removeDOMEvent(this.main);
            Event.off(this.host, 'mouseover', this.toShow);
            Event.off(this.host, 'mouseout', this.toHide);
        }
    };

    base.inherit(Tooltip, Widget);

    return Tooltip;
});
