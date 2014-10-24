// $dom library (v0.9.2b)

(function (window)
/* options for jshint are here because uglifyjs needs a real piece of code between the comments
 * it keeps and the comments it removes */
/*jshint bitwise: true, curly: true, eqeqeq: true, immed: true, latedef: true, newcap: true, noarg: true, nonew: true, undef: true, boss: true, regexdash: true, smarttabs: true */
{
    var 
    /* these references exist to reduce size in minifiers */
        _document = window.document,
        _docElt = _document.documentElement,
        _true = true,
        _false = false,
        _undefined,
        time,

    /* dom vars */
        re_selector_fragment = /^\s*([>+~])?\s*([*\w-]+)?(?:#([\w-]+))?(?:\.([\w.-]+))?\s*/,
        re_get_alias = /-(\w)/g,
        loadHandlers = [],
        ieEvents = [],

    // styleAlias is a css-name to camelCaseName lookup that's automatically populated when calling
    // the _getStyle() and _setStyle() methods. It's pre-populated with the float css lookup.

        styleAlias = { "float": "cssFloat" in _docElt.style ? "cssFloat" : "styleFloat" },


    // style handers are used to extend or override existing css properties. When calling _getStyle()
    // or _setStyle() this object is checked first to see if a get/set handler exists for the passed 
    // propertyName. Handlers are camelCase.

    // Standards based style handlers

        styleHandlers = {
            borderWidth: {
                    get: function (e) {
                        return _getStyle(e, "border-left-width");
                    }
                },
            padding: {
                    get: function (e) {
                        return _getStyle(e, "padding-left");
                    }
                },
            margin: {
                    get: function (e) {
                        return _getStyle(e, "margin-left");
                    }
                }
            };

    // Internet Explorer style handlers
        if (! ("opacity" in _docElt.style) && ("filters" in _docElt)) {
            styleHandlers.opacity = {
                    set: function (e, v) {
                        var f = e.filters.alpha;

                        if (!f) {
                            e.style.filter += " Alpha(opacity=" + (v * 100) + ")";
                        } else {
                            f.opacity = v * 100;
                        }
                    },
                    get: function (e) {
                        var f = e.filters.alpha;
                        return f ? f.opacity / 100 : 1;
                    }
                };
        }
        // should trigger in IE and in some recent clients
        // TODO : this is just plain wrong
        if ("clientWidth" in _docElt) {
            styleHandlers.width = {
                get: function (e) { return e.style.width || e.clientWidth || e.offsetWidth; }
            };
        }
        if ("clientHeight" in _docElt) {
            styleHandlers.height = {
                get: function (e) { return e.style.height || e.clientHeight || e.offsetHeight; }
            };
        }
     var _addEvent = window.addEventListener ?
            function (elm, name, handler) {
                elm.addEventListener(name, handler, false);
            }
        : 
            function (elm, name, handler) {
                var eventKey = elm.uniqueID + name + handler;
                ieEvents[eventKey] = function() {
                    var e = window.event;
                    e.target = e.srcElement || _document;
                    e.currentTarget = elm;
                    e.preventDefault = function() {
                        e.returnValue = false;
                    };
                    e.stopPropagation = function() {
                        e.cancelBubble = true;
                    };
                    return handler.call(elm, e);
                };
                elm.attachEvent("on" + name, ieEvents[eventKey]);
            },

     _removeEvent = window.removeEventListener ?
            function (elm, name, handler)
            {
                elm.removeEventListener(name, handler, false);
            }
        :
            function (elm, name, handler)
            {
                var eventKey = elm.uniqueID + name + handler;
                elm.detachEvent("on" + name, ieEvents[eventKey]);
                delete (ieEvents[eventKey]);
            },

    _getStyle = (_document.defaultView && _document.defaultView.getComputedStyle) ?
            function (elm, property)
            {
                var prop = _getAlias(property), handler = styleHandlers[prop];
                return handler && handler.get ?
                    handler.get(elm) :
                    elm.ownerDocument.defaultView.getComputedStyle(elm, null).getPropertyValue(property);
            }
        :
            function (elm, property)
            {
                var prop = _getAlias(property), handler = styleHandlers[prop];
                return ((handler && handler.get) ? handler.get(elm) : elm.currentStyle[prop]);
            }
        ;

    function assert(msg, isTrue) {
        if (!isTrue) {
            throw ("assertion '" + msg + "' failed.");
        }
    }
    
    function assertRegexp(msg, str, re) {
        assert(msg, re.test(str));
    }
    
    function assertFunction(msg, func) {
        var isFunc = Object.prototype.toString.call(func) === '[object Function]';  

        assert(msg + " is a function", isFunc);
    }
    
    function assertElement(msg, elm) {
        assert(msg + " is element", elm.nodeType === 1 /*window.Element*/);
    }
    
    function assertNode(msg, elm) {
    assert(msg + " is a node", elm.nodeType === 1 /*instanceof window.Node*/);
    }

    function assertString(msg, str) {
        var type = typeof str;
        assert(msg + " is string", type === "string");
    }
    
    var re_complexSelector = new RegExp('^(?:' + re_selector_fragment.source.slice(1) + ')+$');
    function assertComplexSelector(msg, sel) {
        assertString(msg, sel);
        assertRegexp(msg + " is a complex selector", sel, re_complexSelector);
    }

    var re_simpleSelector = new RegExp(re_selector_fragment.source + '$');
    function assertSimpleSelector(msg, sel) {
        assertString(msg, sel);
        assertRegexp(msg + " is a simple selector", sel, re_simpleSelector);
    }

    /*debug!*/
    
    function _setStyle(elm, property, value)
    {
        var prop = _getAlias(property), handler = styleHandlers[prop];
        return (handler && handler.set) ? handler.set(elm, value) : elm.style[prop] = value;
    }


    function _getAlias(property)
    {
        return styleAlias[property] || (styleAlias[property] = property.replace(re_get_alias, function (m, l) { return l.toUpperCase(); }));
    }


    function _style(elm, property, value)
    {
        if (value === _undefined)
        {
            if (typeof property === "string")
            {
                return _getStyle(elm, property) || 0;
            }
            for (var x in property)
            {
                _setStyle(elm, x, property[x]);
            }
        }
        else
        {
            _setStyle(elm, property, value);
        }
    }


    // _sel returns an array of simple selector fragment objects from the passed complex selector string
    function _sel(selector)
    {
        var f, out = [];
        if (typeof selector === "string")
        {
            while (selector)
            {
                f = selector.match(re_selector_fragment);
                if (f[0] === "") { // matched no selector
                    break;
                }
                out.push({
                    rel: f[1],
                    uTag: (f[2] || "").toUpperCase(),
                    id: f[3],
                    classes: (f[4]) ? f[4].split(".") : _undefined
                });
                selector = selector.substring(f[0].length);
            }
        }
        return out;
    }


    // determines if the passed element is a descendant of anthor element
    function _isDescendant(elm, ancestor)
    {
        while ((elm = elm.parentNode) && elm !== ancestor) { }
        return elm !== null;
    }


    // $dom's CSS selector
    function _descendants(refelm, selector) {
        
        assertElement("refelm", refelm);
        if (selector !== _undefined) {
            assertComplexSelector("selector", selector);
        }
        /*debug!*/

        function find(elm, selectorFragment)
        {
            var c, results = selectorFragment.id ?
                ((c = ((elm && elm.ownerDocument) || _document).getElementById(selectorFragment.id)) && _isDescendant(c, elm)) ? [c] : [] :
                toArray(elm.getElementsByTagName(selectorFragment.uTag || "*"));
            c = results.length;

            if (c > 0 && (selectorFragment.id || selectorFragment.classes)) {
                while (c--) {
                    if (!_match(results[c], selectorFragment)) {
                        results.splice(c, 1);
                    }
                }
            }
            return results;
        }


        function toArray(nodes)
        {
            try {
                return Array.prototype.slice.call(nodes);
            } catch (e) {
                var arr = [];
                for (var i = 0, l = nodes.length; i < l; i++) {
                    arr.push(nodes[i]);
                }
                return arr;
            }
        }

        function contains(o)
        {
            for (var c = results.length; c--; ) {
                if (results[c] === o) {
                    return _true;
                }
            }
            return _false;
        }

        var results = [],
            elements = [refelm],
            selectorFragments = _sel(selector),
            c, lc,
            d, ld,
            e, le,
            fragment,
            elm, elms;

        if (!selectorFragments.length) {
            selectorFragments = [{}];
        }

        for (c = 0, lc = selectorFragments.length; c < lc; c++)
        {
            fragment = selectorFragments[c];
            for (d = 0, ld = elements.length; d < ld; d++)
            {
                elm = elements[d];
                switch (fragment.rel)
                {
                    case ">":
                        var children = elm.childNodes;
                        for (e = 0, le = children.length; e < le; e++)
                        {
                            if (_match(children[e], fragment))
                            {
                                results.push(children[e]);
                            }
                        }
                        break;

                    case "~":
                        while (elm = elm.nextSibling)
                        {
                            if (_match(elm, fragment))
                            {
                                if (contains(elm))
                                {
                                    break;
                                }
                                results.push(elm);
                            }
                        }
                        break;

                    case "+":
                        while ((elm = elm.nextSibling) && elm.nodeType !== 1) { }
                        if (elm && _match(elm, fragment))
                        {
                            results.push(elm);
                        }
                        
                        break;

                    default:
                        elms = find(elm, fragment);
                        if (c > 0)
                        {
                            for (e = 0, le = elms.length; e < le; e++)
                            {
                                if (!contains(elms[e])) {
                                    results.push(elms[e]);
                                }
                            }
                        }
                        else { results = results.concat(elms); }
                        break;
                }
            }

            if (!results.length) {
                return [];
            }
            elements = results.splice(0, results.length);

        }
        return elements;
    }


    /**
     * return false if elm is not an Element.
     * if selector is undefined/null, then we always match (unless elm is not an Element)
     * otherwise we try to match the selector
     */
    function _match(elm, selector)
    {
        if (!selector) {
            return true;
        }

        var tag = selector.uTag,
            id = selector.id,
            classes = selector.classes;

        return (elm.nodeType === 1) &&
        !(tag && tag !== elm.tagName) &&
        !(id && id !== elm.id) &&
        !(classes && !_hasClasses(elm, classes));
    }

    function _find(elm, property, selectorFragment) {
        
        assertNode("elm", elm);
        if (selectorFragment !== _undefined) {
            assertSimpleSelector("selectorFragment", selectorFragment);
        }
        /*debug!*/
        
        selectorFragment = _sel(selectorFragment)[0]; // will be undefined if no match
        while (elm && (!_match(elm, selectorFragment)) && (elm = elm[property])) { }
        return elm;
    }

    function _is(elm, selectorFragment) {
        assertElement("elm", elm); 
        assertSimpleSelector("selectorFragment", selectorFragment);  
        
        selectorFragment = _sel(selectorFragment)[0]; // will be undefined if no match
        return elm && _match(elm, selectorFragment);
    }

    function _findNext(elm, property, selector) {
        
        assertNode("elm", elm);
        if (selector !== _undefined) {
            assertSimpleSelector("selector", selector);
        }
        /*debug!*/

        return _find(elm[property], property, selector);
    }

    function _hasClasses(elm, classNames)
    {
        if (elm.className === "") {
            return _false;
        }
        for (var c = 0; c < classNames.length; c++)
        {
            if (!_hasClass(elm, classNames[c])) {
                return _false;
            }
        }
        return _true;
    }

    function init()
    {
        var done, timer, handler;
        function fn(e) {
            if (!done) {
                done = true;
                if (timer) {
                    timer = window.clearTimeout(timer);
                }
                for (var i = 0, l = loadHandlers.length; i < l; i++) { loadHandlers[i](); }
            }
        }

        // Diego Perini's doScroll trick
        // see http://javascript.nwbox.com/IEContentLoaded/
        function scrollCheck() {
            try {
                _docElt.doScroll("left");
            } catch (e) {
                window.setTimeout(scrollCheck, 20);
                return;
            }

            fn();
        }

        /* we're lucky because addEventListener and DOMContentLoaded are both
         * supported from IE9 */
        if (_document.addEventListener)
        {
            _document.addEventListener('DOMContentLoaded', fn, _false);
            /* just to be sure */
            _document.addEventListener('load', fn, _false);
        } else if (_document.attachEvent) {
            // IE8-
            /* just to be sure */
            _document.attachEvent('onload', fn);

            /* doScroll is not adequate when we're in a frame */
            /* (from jQuery) */
            var toplevel = false;

            try {
                toplevel = (window.frameElement === null);
            } catch(e) {}

            if (toplevel && _docElt.doScroll) {
                scrollCheck();
            }
        }
    }

     function _create(selector, doc) {
         var s = _sel(selector)[0],
             tag = s.uTag;
         if (! tag) {
             return null;
         }
         var e = (doc || _document).createElement(tag),
             id = s.id,
             classes = s.classes;
        if (id) {
            e.id = id;
        }
        
        if (classes) {
            e.className = classes.join(" ");
        }
        return e;
     }

    function _onready(handler) {
        assertFunction("onready handler", handler); 
        // readyState can be "interactive" too
        // see jquery bug http://bugs.jquery.com/ticket/10067
        if (/loaded|complete|interactive/.test(_document.readyState)) {
            // already ready
            window.setTimeout(handler, 0);
        } else {
            loadHandlers.push(handler);
        }
    }

    function _get(selector, doc) {
        return _descendants((doc || _docElt), selector);
    }

    function _ancestor(elm, selector) {
        return _findNext(elm, "parentNode", selector);
    }
    function _next(elm, selector) {
        return _findNext(elm, "nextSibling", selector);
    }

    function _previous(elm, selector) {
        return _findNext(elm, "previousSibling", selector);
    }

    function _first(elm, selector) {
        
        assertNode("elm", elm);
        if (selector !== _undefined) {
            assertSimpleSelector("selector", selector);
        }
        /*debug!*/

        elm = elm.parentNode.firstChild;
        return _find(elm, "nextSibling", selector);
    }
    function _last(elm, selector) {
        
        assertNode("elm", elm);
        if (selector !== _undefined) {
            assertSimpleSelector("selector", selector);
        }
        /*debug!*/

        elm = elm.parentNode.lastChild;
        return _find(elm, "previousSibling", selector);
    }

    function _hasClass(elm, className) {
        assertElement("elm", elm); 
        assertString("className", className); 
        assert("className has no space", className.indexOf(" ") === -1); 

        return (" " + elm.className + " ").indexOf(" "+className+" ") > -1;
    }

    function _addClass(elm, className) {
        assertElement("elm", elm); 
        assertString("className", className); 
        
        if (!_hasClass(elm, className)) {
            elm.className += " " + className;
        }
    }

    function _removeClass(elm, className) {
        assertElement("elm", elm); 
        assertString("className", className); 
        assert("className has no space", className.indexOf(" ") === -1);         

        if (_hasClass(elm, className)) {
            elm.className = elm.className.replace(new RegExp("(^|\\s)" + className + "(\\s|$)"), " ").replace(/\s$/, "");
        }
    }

    function _toggleClass(elm, className, expr) {
        (expr ? _addClass : _removeClass)(elm, className);
    }
    
    function _text(str) {
        return _document.createTextNode(str);
    }
    
    function setAttribute(elm, attr, value) {
        elm.setAttribute(attr, "" + value);
    }
    
    function getAttribute(elm, attr) {
        return elm.getAttribute(attr) || null;
    }
    
    function _attr(elm, attr, value) {
        assertElement("elm", elm); 

        if (typeof attr === "object") {
            for (var key in attr) {
                setAttribute(elm, key, attr[key]);
            }
            return;
        }
        
        assertString("attr", attr); 
        
        if (value === _undefined) {
            return getAttribute(elm, attr);
        } else {
            setAttribute(elm, attr, value);
        }
    }

    function _empty(elm) {
        assertElement("elm", elm); 

        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
        }
    }
    
    function extend(target, src) {
        if (!src) {
            // if called with 1 argument, extend $dom itself
            // (or DomObject prototype, see chain.js)
            src = target;
            target = this;
        }
        
        for (var key in src) {
            // let's say src will be a "pure" object
            target[key] = src[key];
        }
    }


    var dom = {
        /* -- Experimental methods --*/

        create: _create,
        onready: _onready,

        /* events */
        addEvent: _addEvent,
        removeEvent: _removeEvent,

        /* dom manipulations */
        get: _get,
        descendants: _descendants,
        ancestor: _ancestor,
        next: _next,
        previous: _previous,
        first: _first,
        last: _last,
        empty: _empty,
        is: _is,
        text: _text,
        attr: _attr, /* beta quality */

        /* styling */
        hasClass: _hasClass,
        addClass: _addClass,
        removeClass: _removeClass,
        toggleClass: _toggleClass,
        style: _style,
        
        /* extending for plugin */
        extend: extend
    };

    //window.$dom = dom;
    init();
    
    var _style = dom.style,
        animItems = [],
        _undefined,
    
    // Paul Irish's requestAnimationFrame shim
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        requestAnimFrame = window.requestAnimationFrame || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     ||
              function(/* function */ callback /*, DOMElement element */){
                window.setTimeout(function() { callback(); }, 16);
              },
        // we don't support relative units for animation on purpose, because
        // it's difficult to get it right : computedStyle comes in absolute units
        re_css_property = /^(.*?)(px|deg)?$/;


    function _removeAnim(index, fin) {
        var item = animItems.splice(index, 1)[0];
        
        if (item.callback) {
            item.callback(fin, item.elm);
        }
    }
    
    function _timerAnim(timestamp) {
        timestamp = timestamp || +new Date(); // Chrome 10 and the shim function give no time argument
        for (var c = animItems.length - 1; c >= 0; c--)    {
            var    prop, style,
                styles = {},
                anim = animItems[c];
            
            // set startTime if not set
            anim.startTime = anim.startTime || timestamp;
            
            var duration = anim.duration,
                props = anim.properties,
                ticks = timestamp - anim.startTime,
                ref = 0.5 - (Math.cos(ticks / duration * (Math.PI)) / 2);

            for (prop in props)    {
                style = props[prop];
/*                    
                styles[prop] = Number(ticks >= duration ?
                        style.e :
                        style.s > style.e ?
                            style.e + (style.s - style.e) * (1 - ref) : // going backward
                            style.s + (style.e - style.s) * ref  // going forward
                        ).toFixed(2) + style.u;
*/
                styles[prop] = "" + (ticks >= duration ?
                        style.e :
                        style.s + (style.e - style.s) * ref
                        ) + style.u;
            
                if (styles[prop] == "NaNpx") {
                    styles[prop] = 0;
                }
            }
            _style(anim.elm, styles);

            if (ticks >= duration) {
                _removeAnim(c, true);
            }
        }

        if (animItems.length) {
            requestAnimFrame(_timerAnim);
        }
    }


    function _anim(elm, properties, duration, callback) {
        var property, props = [], s, e, i = -1, c;

        for (c = animItems.length - 1; c >= 0; c--) {
            if (animItems[c].elm == elm) {
                i = c; break;
            }
        }

        if (properties === _undefined) {
            return i > -1; // means an animation is running
        }
        if (i > -1) {
            // if it was already animating, then we stop the last animation
            _removeAnim(i, false);
        }

        if (duration === _undefined) {
            duration = 500;
        }


        for (property in properties) {
            s = re_css_property.exec(_style(elm, property)); // current style
            e = re_css_property.exec(properties[property]); // style to be
            props[property] = {
                s: parseFloat(s[1]) || 0,
                e: parseFloat(e[1]) || 0,
                // we use s[2] only if the user didn't put any unit in the command
                u: e[2] || s[2] || ""
            };
        }

        animItems.push({
            elm: elm,
            properties: props,
            callback: callback,
            duration: duration
        });

        requestAnimFrame(_timerAnim);
    }
    
    dom.transform = dom.animate = _anim;
    
    if (typeof define === 'function' && define.amd) {
        define('dollardom', [], function() {
            return dom;
        });
    }

})(this);

