/**
 * 带行号文本框
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Extension = require('extension/Extension');

    /**
     * 带行号文本框
     *
     * @extends Extension
     * @constructor
     */
    function TextLine() {
        Extension.call(this);
    }

    TextLine.prototype = {
        /**
         * 初始化扩展
         *
         * @protected
         * @override
         */
        init: function() {
            base.css(this.main, {
                'padding-left': 30 + 'px'
            });
            var offset = base.offset(this.main);

            //创建行号容器
            this.line = document.createElement('div');
            document.body.appendChild(this.line);
            base.addClass(this.line, 'df-textarea-line');
            base.css(this.line, {
                height: this.target.options.height + 'px',
                top: offset.top + 'px',
                left: offset.left + 'px'
            });

            //创建行号
            this.ie8 = base.ie && base.ie <= 8;
            if (this.ie8) {
                this.line.innerHTML = '<div class="pre"></div>';
                this.enter = '<br>';
            } else {
                this.line.innerHTML = '<pre></pre>';
                this.enter = '\n';
            }
            this.lineNumber = this.line.firstChild;

            //绘制行号
            this.renderLine(0);

            //绑定事件
            var me = this;
            this.target.addDOMEvent(this.main, 'keyup', function(e) {
                me.renderLine(this.main.scrollTop);
            });
            this.target.addDOMEvent(this.main, 'scroll', function(e) {
                me.scrollLine(this.main.scrollTop);
            });
            this.target.on('afterhide', function() {
                base.css(me.line, {
                    display: 'none'
                });
            });
            this.target.on('aftershow', function() {
                base.css(me.line, {
                    display: ''
                });
            });

            //重写setValue
            this.target.setValue = function(value) {
                if (this.main) {
                    this.main.value = value;
                }
                me.renderLine(0);
            };

            /**
             * 获取分行value数组（每行已trim）
             *
             * @return {Array} value数组
             */
            this.target.getValueArray = function() {
                if (this.main) {
                    var values = this.main.value.split(me.ie8 ? '\r\n' : '\n');
                    return _.map(values, function(value, index) {
                        return base.trim(value);
                    });
                } else {
                    return null;
                }
            };
        },

        /**
         * 绘制行号
         *
         * @param {Number} scrollTop 滚动高度
         * @protected
         */
        renderLine: function(scrollTop) {
            var lineCount = this.main.value.split(this.ie8 ? '\r\n' : '\n').length,
                numbers = '1';
            for (var i = 2; i <= lineCount; i++) {
                numbers += this.enter + i;
            }

            this.lineNumber.innerHTML = numbers;

            this.scrollLine(scrollTop);
        },

        /**
         * 滚动行号
         *
         * @param {Number} scrollTop 滚动高度
         * @protected
         */
        scrollLine: function(scrollTop) {
            base.css(this.lineNumber, {
                top: 5 - scrollTop + 'px'
            });
        },

        /**
         * 销毁扩展
         *
         * @protected
         * @override
         */
        destroy: function() {
            base.remove(this.line);
        }
    };

    base.inherit(TextLine, Extension);

    return TextLine;
});
