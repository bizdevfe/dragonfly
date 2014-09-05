/**
 * 侧边面板
 * 
 * @ignore
 * @author Ricky
 */
define(function (require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Widget = require('ui/Widget');
    
    var tpl = [
        '<div class="df-mask"></div>',
        '<div class="df-sidepanel">',
            '<div class="df-sidepanel-margin"></div>',
            '<div class="df-sidepanel-body">',
                '<h1><%= title %></h1>',
                '<div class="df-sidepanel-content"><%= content %></div>',
                '<div class="bottom"></div>',
            '</div>',
        '</div>'
    ].join('');
    
    /**
     * 侧边面板
     * 
     * @extends Widget
     * @constructor
     * @param {Object} [options] 初始化参数
     * 
     *     @example
     *     //默认参数
     *     {
     *         title: '',      //标题
     *         content: '',    //内容
     *         hidden: false   //渲染后是否隐藏
     *     }
     */
    function SidePanel(options) {
        Widget.call(this, options);
    }
    
    SidePanel.prototype = {
        /**
         * 初始化参数
         * 
         * @param {Object} [options] 初始化参数
         * @protected
         * @override
         */
        initOptions: function(options) {
            this.options = _.extend({
                title: '',
                content: '',
                hidden: false
            }, options || {});
        },
        
        /**
         * 创建其他元素
         * 
         * @protected
         * @override
         */
        initElements: function() {
            this.main.style.display = 'none';
            this.main.innerHTML = _.template(tpl)({
                title: this.options.title,
                content: this.options.content
            });
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
                    var mask = this.main.firstChild;
                        panel = this.main.lastChild;
                        panelBody = panel.lastChild;
                    if (!hidden) {
                        if (base.badie) {
                            document.body.parentNode.style.overflow = 'visible';
                        }
                        document.body.style.overflow = 'hidden';
                        
                        var scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
                        mask.style.top = panel.style.top = scrollTop + 'px';
                        
                        this.main.style.display = 'block';
                        panel.style.left = 0; //TODO:动画
                        
                        if (!base.badie) {
                            panelBody.scrollTop = 0;
                        }
                    } else {
                        panel.style.left = '100%'; //TODO:动画
                        this.main.style.display = 'none';
                        document.body.style.overflow = 'visible';
                        if (base.badie) {
                            document.body.parentNode.style.overflow = 'auto';
                        }
                    }
                }
            };
        }
    };
    
    base.inherit(SidePanel, Widget);
    
    return SidePanel;
});
