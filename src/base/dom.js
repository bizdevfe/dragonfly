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
    dom.g = function(elm) {
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
        var parent = dom.g(elm).parentNode;
        if (parent) {
            parent.removeChild(elm);
        }
    };

    /**
     * 添加子节点
     *
     * @param {HTMLElement} element 父元素
     * @param {HTMLElement} child 子元素
     */
    dom.append = function(element, child) {
        if (!element || !child) {
            return;
        }
        element.appendChild(child);
    };

    /**
     * 设置/获取
     *
     * @param {HTMLElement} element 元素
     * @param {String} html HTML
     */
    dom.html = function(element, html) {
        if (element) {
            if (html == void 0) {
                return element.innerHTML;
            } else {
                element.innerHTML = html;
            }
        }
    };

    /**
     * 获得/设置元素的位置
     *
     * @param {HTMLElement} elm 目标元素
     * @param {Object} pos 位置数据
     *
     *     @example
     *     dom.offset(element); //get
     *     dom.offset(element, {top: 10, left: 30}); //set
     */
    dom.offset = function(element, pos) {
        var offset = {
            left: 0,
            top: 0
        };
        if (!element) {
            return offset;
        }
        //如果传了pos，则认为是需要设置offset
        if (pos && pos !== void 0) {
            dom.setOffset(element, pos);
        }
        var doc = element.ownerDocument,
            win,
            docElem;
        if (!doc) {
            return;
        }
        docElem = doc.documentElement;
        if (typeof element.getBoundingClientRect !== 'undefined') {
            offset = element.getBoundingClientRect();
        }
        win = doc.defaultView || doc.parentWindow;
        return {
            top: offset.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
            left: offset.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
        };
    };

    /**
     * 设置元素的位置
     *
     * @param {HTMLElement} element 目标元素
     * @param {Object} pos 位置数据
     * @protected
     */
    dom.setOffset = function(element, pos) {
        if (!element) {
            return;
        }
        var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
            position = dom.css(element, "position"),
            props = {};
        if (position === "static") {
            element.style.position = "relative";
        }
        curOffset = dom.offset(element);
        curCSSTop = dom.css(element, "top");
        curCSSLeft = dom.css(element, "left");
        //position是经过计算得到的
        calculatePosition = (position === "absolute" || position === "fixed") && (_.indexOf([curCSSTop, curCSSLeft], "auto") > -1);
        if (calculatePosition) {
            curPosition = dom.position(element);
            curTop = curPosition.top;
            curLeft = curPosition.left;
        } else {
            curTop = parseFloat(curCSSTop) || 0;
            curLeft = parseFloat(curCSSLeft) || 0;
        }
        if (pos.top !== null) {
            props.top = ((pos.top - curOffset.top) + curTop) + 'px';
        }
        if (pos.left !== null) {
            props.left = ((pos.left - curOffset.left) + curLeft) + 'px';
        }
        dom.css(element, props);
    };

    /**
     * 将指定元素插入目标元素后面
     *
     * @param {HTMLElement} newElement 指定待插入元素
     * @param {HTMLElement} targetElement 目标元素
     */
    dom.insertAfter = function(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            // 如果最后的节点是目标元素，则直接添加。因为默认是最后
            parent.appendChild(newElement);
        } else {
            //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
            parent.insertBefore(newElement, targetElement.nextSibling);
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
     *     dom.$();
     *     dom.$('#a');
     *     dom.$('#a.b');
     *     dom.$('div p');
     *     dom.$('div > p');
     *     dom.$('div ~ p');
     *     dom.$('div + p');
     */
    dom.$ = $dom.get;

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

    /**
     * Wrap map from jquery.
     */
    var map = {
        legend: [1, '<fieldset>', '</fieldset>'],
        tr: [2, '<table><tbody>', '</tbody></table>'],
        col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
        _default: [0, '', '']
    };

    map.td =
        map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

    map.option =
        map.optgroup = [1, '<select multiple="multiple">', '</select>'];

    map.thead =
        map.tbody =
        map.colgroup =
        map.caption =
        map.tfoot = [1, '<table>', '</table>'];

    map.text =
        map.circle =
        map.ellipse =
        map.line =
        map.path =
        map.polygon =
        map.polyline =
        map.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', '</svg>'];

    /**
     * Parse `html` and return the children.
     *
     * @param {String} html
     * @return {Array}
     */
    dom.parse = function(html) {
        if ('string' != typeof html) {
            throw new TypeError('String expected');
        }

        // tag name
        var m = /<([\w:]+)/.exec(html);
        if (!m) {
            return document.createTextNode(html);
        }

        html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

        var tag = m[1];

        // body support
        if (tag == 'body') {
            var elem = document.createElement('html');
            elem.innerHTML = html;
            return elem.removeChild(elem.lastChild);
        }

        // wrap map
        var wrap = map[tag] || map._default;
        var depth = wrap[0];
        var prefix = wrap[1];
        var suffix = wrap[2];
        var el = document.createElement('div');
        el.innerHTML = prefix + html + suffix;
        while (depth--) {
            el = el.lastChild;
        }

        // one element
        if (el.firstChild == el.lastChild) {
            return el.removeChild(el.firstChild);
        }

        // several elements
        var fragment = document.createDocumentFragment();
        while (el.firstChild) {
            fragment.appendChild(el.removeChild(el.firstChild));
        }

        return fragment;
    };

    return dom;
});
