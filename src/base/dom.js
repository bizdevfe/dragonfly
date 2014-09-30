/**
 * DOM操作
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        $dom = require('dollardom'),
        count = 0;

    /**
     * DOM操作
     *
     * @class base.dom
     * @extends base
     * @singleton
     */
    var dom = {};

    /**
     * 生成guid
     *
     * @return {String} guid
     */
    dom.guid = function() {
        return 'DRAGONFLY' + count++;
    };

    /**
     * 获取单个元素
     *
     * @param {HTMLElement|String} elm 目标元素或id
     * @return {HTMLElement|null} 目标元素
     */
    dom.$ = function(elm) {
        if (!elm) {
            return null;
        }
        return _.isString(elm) ? document.getElementById(elm) : elm;
    };

    /**
     * 移除元素
     *
     * @param {HTMLElement|String} elm 目标元素或id
     */
    dom.remove = function(elm) {
        var parent = dom.$(elm).parentNode;
        if (parent) {
            parent.removeChild(elm);
        }
    };

    /**
     * 创建元素
     *
     * @param {String} selector 选择器
     * @param {HTMLDocument} [doc] 所在文档
     * @return {HTMLElement} 元素
     *
     *     @example
     *     dom.create('div');
     *     dom.create('div#a');
     *     dom.create('div.b');
     *     dom.create('div#a.b');
     *     dom.create('div#a.b.c');
     */
    dom.create = $dom.create;

    /**
     * 获取元素集合
     *
     * @param {String} [selector] 选择器
     * @param {HTMLDocument} [doc] 所在文档
     * @return {HTMLElement[]} 元素集合
     *
     *     @example
     *     dom.get();
     *     dom.get('#a');
     *     dom.get('#a.b');
     *     dom.get('div p');
     *     dom.get('div > p');
     *     dom.get('div ~ p');
     *     dom.get('div + p');
     */
    dom.get = $dom.get;

    /**
     * 获取紧邻的祖先结点
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String} [selector] 选择器
     * @return {HTMLElement|null} 祖先结点
     *
     *     @example
     *     dom.parent(element);
     *     dom.parent(element, 'ul');
     */
    dom.parent = $dom.ancestor;

    /**
     * 获取子孙结点
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String} [selector] 选择器
     * @return {HTMLElement[]} 子孙结点
     *
     *     @example
     *     dom.children(element);
     *     dom.children(element, 'div.tabs > ul ~ .tab');
     */
    dom.children = $dom.descendants;

    /**
     * 获取第一个子节点
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String} [selector] 选择器
     * @return {HTMLElement|null} 第一个子节点
     *
     *     @example
     *     dom.first(element);
     *     dom.first(element, 'li');
     */
    dom.first = $dom.first;

    /**
     * 获取最后一个子节点
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String} [selector] 选择器
     * @return {HTMLElement|null} 最后一个子节点
     *
     *     @example
     *     dom.last(element);
     *     dom.last(element, 'li');
     */
    dom.last = $dom.last;

    /**
     * 获取下一个兄弟节点
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String} [selector] 选择器
     * @return {HTMLElement|null} 下一个兄弟节点
     *
     *     @example
     *     dom.next(element);
     *     dom.next(element, 'li');
     */
    dom.next = $dom.next;

    /**
     * 获取前一个兄弟节点
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String} [selector] 选择器
     * @return {HTMLElement|null} 前一个兄弟节点
     *
     *     @example
     *     dom.prev(element);
     *     dom.prev(element, 'li');
     */
    dom.prev = $dom.previous;

    /**
     * 清空元素
     *
     * @param {HTMLElement} elm 目标元素
     */
    dom.empty = $dom.empty;

    /**
     * 获取/设置样式
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String|Object} property 属性名
     * @param {*} [value] 属性值
     * @return {*} 属性值
     *
     *     @example
     *     dom.css(element, 'background-color'); //get
     *     dom.css(element, 'background-color', '#ff0000'); //set
     *     dom.css(element, {'background-color': '#ff0000', color: '#ffff00', opacity: 0.5}); //set multiple
     */
    dom.css = $dom.style;

    /**
     * 获取/设置属性
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String|Object} property 属性名
     * @param {*} [value] 属性值
     * @return {*} 属性值
     *
     *     @example
     *     dom.attr(element, 'name'); //get
     *     dom.attr(element, 'name', 'name'); //set
     *     dom.attr(element, {name: 'name', title: 'title'}); //set multiple
     */
    dom.attr = $dom.attr;

    /**
     * 动画
     *
     * @param {HTMLElement} elm 目标元素
     * @param {Object} properties css属性
     * @param {Number} [duration] 时间
     * @param {Function} [callback] 回调
     */
    dom.transform = $dom.transform;

    return dom;
});
