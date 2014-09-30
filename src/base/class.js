/**
 * classList操作
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        dom = require('base/dom');

    /**
     * classList操作
     *
     * @class base.clazz
     * @extends base
     * @singleton
     */
    var clazz = {};

    function getClassList(element) {
        return element.className ? element.className.split(/\s+/) : [];
    }

    /**
     * 是否有指定class
     *
     * @param {HTMLElement|String} element DOM元素或其id
     * @param {String} className 类名
     * @return {Boolean} 是否有指定class
     */
    clazz.hasClass = function(element, className) {
        element = dom.$(element);

        if (!element || !className) {
            return false;
        }

        if (element.classList) { //for HTML5
            return element.classList.contains(className);
        }

        return _.contains(getClassList(element), className);
    };

    /**
     * 添加class
     *
     * @param {HTMLElement|String} element DOM元素或其id
     * @param {String} className 类名
     * @return {HTMLElement} 目标元素
     */
    clazz.addClass = function(element, className) {
        element = dom.$(element);

        if (!element || !className) {
            return element;
        }

        if (element.classList) { //for HTML5
            element.classList.add(className);
            return element;
        }

        var classList = getClassList(element);
        if (_.contains(classList, className)) {
            return element;
        }

        classList.push(className);
        element.className = classList.join(' ');

        return element;
    };

    /**
     * 移除class
     *
     * @param {HTMLElement|String} element DOM元素或其id
     * @param {String} className 类名
     * @return {HTMLElement} 目标元素
     */
    clazz.removeClass = function(element, className) {
        element = dom.$(element);

        if (!element || !className) {
            return element;
        }

        if (element.classList) { //for HTML5
            element.classList.remove(className);
            return element;
        }

        var classList = _.without(getClassList(element), className);
        element.className = classList.join(' ');

        return element;
    };

    /**
     * 切换class
     *
     * @param {HTMLElement|String} element DOM元素或其id
     * @param {String} className 类名
     * @return {HTMLElement} 目标元素
     */
    clazz.toggleClass = function(element, className) {
        element = dom.$(element);

        if (!element || !className) {
            return element;
        }

        if (element.classList) { //for HTML5
            element.classList.toggle(className);
            return element;
        }

        if (clazz.hasClass(element, className)) {
            return clazz.removeClass(element, className);
        } else {
            return clazz.addClass(element, className);
        }
    };

    return clazz;
});
