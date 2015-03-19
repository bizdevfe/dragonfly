/**
 * 翻页
 *
 * @ignore
 * @author YanYu
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        lang = require('lang/i18n'),
        Input = require('ui/Input'),
        Widget = require('ui/Widget');

    var DEFAULT_START_SHOW_CNT = 3,
        DEFAULT_END_SHOW_CNT = 2,
        DEFAULT_PAGE_SIZE = 20,
        DEFAULT_PAGE_NO = 1,
        DEFAULT_SIZE = new Array(10, 20, 50, 100, 200),

        DEFAULT_ISSIMPLE = false;

    /**
     * 翻页
     *
     * @extends Widget
     * @constructor
     * @param {Object} options 初始化参数
     *
     *     @example
     *     //默认值
     *     {
     *         hidden: false,         //是否隐藏
     *         pageData: {            //按钮文字
     *             pageNo: 1,         //当前是第几页
     *             recordCount: 200,  //一共有多少数据
     *             pageSize: 20       //每页显示多少数据
     *         },
     *         isSimple: false,       //是否显示简单样式
     *         skin: 'default'        //皮肤：'default', 'fire'
     *     }
     */
    function Page(options) {
        Widget.call(this, options);
    }

    Page.prototype = {
        /**
         * 初始化参数
         *
         * @param {Object} [options] 初始化参数
         * @protected
         * @override
         */
        initOptions: function(options) {
            this.options = _.extend({
                hidden: false,
                skin: 'default',
                isSimple: false
            }, options || {});
        },

        /**
         * 创建主元素
         *
         * @protected
         * @override
         */
        createMain: function() {
            var div = base.create('div.df-page.df-page-' + this.options.skin);
            return div;
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
                },
                content: function(content) {
                    this.main.innerHTML = content;
                },
                pageData: function() {
                    base.empty(this.main);
                    //从1开始要显示多少个页码
                    var startShowCnt = this.options.startShowCnt || DEFAULT_START_SHOW_CNT,
                        //省略号之后要显示多少个页面
                        endShowCnt = this.options.endShowCnt || DEFAULT_END_SHOW_CNT,
                        //每页能够显示多少个数组
                        size = this.options.size || DEFAULT_SIZE,
                        //翻页数据
                        pageData = this.options.pageData,
                        //展示的是第几页
                        pageNo = parseInt(pageData.pageNo || DEFAULT_PAGE_NO, 10),
                        //一共有多少数据
                        recordCount = parseInt(pageData.recordCount, 10),
                        //每页显示多少数据
                        pageSize = parseInt(pageData.pageSize || DEFAULT_PAGE_SIZE, 10),
                        //一共多少页
                        pageNum = this.getPageCount(),
                        //是否绘制简单翻页
                        isSimple = this.options.isSimple || DEFAULT_ISSIMPLE;

                    //如果要展示的页码大于一共有多少页，那么定位到最后一页
                    if (pageNo > pageNum) {
                        pageNo = pageNum;
                    }

                    //简单样式，在最开始增加pageNo/pageSize
                    if (isSimple) {
                        base.append(this.main, base.parse('<span style="margin-right: 5px;">' + pageNo + '/' + pageNum + '</span>'));
                    }

                    var pageSizeSelect = base.create('select');
                    base.css(pageSizeSelect, {
                        'width': '50px',
                        'margin-left': '5px',
                        'margin-right': '5px'
                    });
                    _.each(size, function(value) {
                        var option = new Option(value, value);
                        if (value == pageSize) {
                            option.selected = true;
                        }
                        pageSizeSelect.options.add(option);
                    });
                    base.append(this.main, pageSizeSelect);

                    base.append(this.main, base.parse('<span>' + lang.PerPageText + '</span>'));
                    base.append(this.main, base.parse('<span style="margin-left: 10px; margin-right: 10px">' + lang.TotalText + '&nbsp;' + recordCount + '</span>'));

                    //简单样式，增加直接跳转到第一页的按钮
                    if (isSimple) {
                        base.append(this.main, base.parse('<a class="prestart' + (pageNo == 1 ? ' prestart-arrow-disabled' : '') + '" href="javascript:;" title="' + lang.FirstPageText + '" name="preStart"></a>'));
                    }

                    //上一页
                    base.append(this.main, base.parse('<a class="previous' + (pageNo == 1 ? ' previous-arrow-disabled' : '') + '" href="javascript:;" title="' + lang.PreviousPageText + '" name="previous"></a>'));
                    //非简单样式，显示页号样式： 1,2,3 .... ,9,10
                    if (!isSimple) {
                        //页码
                        var pageDoms = [];
                        //从1开始要显示的页码数已经大于等于当前计算出的页码了，那么不显示省略号
                        //从1开始要显示的页码数与最后要显示的页码数总和大于等于计算出的页码了，那么不显示省略号
                        //把所有页码都显示出来
                        if (startShowCnt >= pageNum || startShowCnt + endShowCnt >= pageNum) {
                            for (var i = 0; i < pageNum; i++) {
                                pageDoms[pageDoms.length] = this.createPageNumDom(i + 1, i + 1 == pageNo);
                            }
                        } else { //需要加省略号
                            //当前选中的页码号是中间的页（不在starShowCnt的范围中显示，也不在endShowCnt的范围中显示）
                            for (var j = 0; j < startShowCnt; j++) {
                                pageDoms[pageDoms.length] = this.createPageNumDom(j + 1, j + 1 == pageNo);
                            }
                            //如果pageNo整好挨上了startShowCnt
                            //如pgeNo为4，而startShowCnt为3的时候
                            //则应该显示123[4]...910，而不是123...[4]...910
                            if (pageNo != startShowCnt + 1) {
                                pageDoms[pageDoms.length] = base.parse('<span>...</span>');
                            }
                            if (pageNo > startShowCnt && pageNo <= (pageNum - endShowCnt)) {
                                pageDoms[pageDoms.length] = this.createPageNumDom(pageNo, true);
                            }
                            if (pageNo != pageNum - endShowCnt) {
                                pageDoms[pageDoms.length] = base.parse('<span>...</span>');
                            }
                            for (var k = endShowCnt - 1; k >= 0; k--) {
                                pageDoms[pageDoms.length] = this.createPageNumDom(pageNum - k, pageNum - k == pageNo);
                            }
                        }
                        for (var l = 0; l < pageDoms.length; l++) {
                            base.append(this.main, pageDoms[l]);
                        }
                    }
                    //下一页
                    base.append(this.main, base.parse('<a class="next' + (pageNo == pageNum ? ' next-arrow-disabled' : '') + '" href="javascript:;" title="' + lang.NextPageText + '" name="next"></a>'));
                    //简单样式，增加直接跳转到最后一页的按钮
                    if (isSimple) {
                        base.append(this.main, base.parse('<a class="nextend' + (pageNo == pageNum ? ' nextend-arrow-disabled' : '') + '" href="javascript:;" title="' + lang.LastPageText + '" name="nextEnd"></a>'));
                    }
                    //跳转至
                    base.append(this.main, base.parse('<span>' + lang.GoText + '</span>'));
                    var input = base.parse('<span style="margin-right: 3px; margin-left: 3px"><input type="text" style="width:40px" /></span>');
                    base.append(this.main, input);
                    this.pageInput = new Input(input.firstChild);
                    //go
                    base.append(this.main, base.parse('<a href="javascript:;" title="go" class="go">go</a>'));
                }
            };
        },

        /**
         * 绑定事件
         *
         * @protected
         * @override
         */
        initEvents: function() {
            //go按钮
            this.delegateDOMEvent(this.main, 'click', 'a.go', function() {
                var pageNum = base.$('input', this.main)[0].value;
                regStr = "^-?[\\d]+$";
                //整数校验
                var reg = new RegExp(regStr, "g");
                if (reg.test(pageNum)) {
                    this.changePageNo(parseInt(pageNum, 10));
                }
            });
            //每页显示多少页select change事件
            this.delegateDOMEvent(this.main, 'change', 'select', function(e) {
                if (e && e.target) {
                    var options = e.target.options,
                        pageSize = base.attr(options[options.selectedIndex], 'value');
                    this.changePageSize(parseInt(pageSize, 10));
                }
            });
            //页码click
            this.delegateDOMEvent(this.main, 'click', 'a', function(e) {
                if (e && e.target) {
                    if (!base.hasClass(e.target, 'go') && !base.hasClass(e.target, 'actived')) {
                        var pageNum,
                            pageData = this.get('pageData'),
                            currentPageNum = parseInt(pageData.pageNo, 10);
                        switch (base.attr(e.target, 'name')) {
                            case 'previous':
                                pageNum = currentPageNum - 1;
                                if (pageNum <= 0) {
                                    return;
                                }
                                break;
                            case 'next':
                                pageNum = currentPageNum + 1;
                                if (pageNum > this.get('pageData').recordCount) {
                                    return;
                                }
                                break;
                            case 'num':
                                pageNum = base.html(e.target) - 0;
                                break;
                            case 'preStart':
                                if (currentPageNum == 1) {
                                    return;
                                } else {
                                    pageNum = 1;
                                }
                                break;
                            case 'nextEnd':
                                var pageCount = this.getPageCount();
                                if (currentPageNum == pageCount) {
                                    return;
                                } else {
                                    pageNum = pageCount;
                                }

                                break;
                        }
                        if (pageNum != void 0) {
                            this.changePageNo(pageNum);
                        }
                    }
                }
            });
        },

        /**
         * 创建页码的dom
         *
         * @param  {Number}  num       页码号
         * @param  {Boolean} isActived 是否是当前页
         * @return {HTMLElement}       页码dom
         * @protected
         */
        createPageNumDom: function(num, isActived) {
            return base.parse('<a href="javascript:;" class="' + (isActived ? 'actived' : '') + '" name="num" title="' + num + '">' + num + '</a>');
        },

        /**
         * 跳转到指定页码
         *
         * @param {Number} pageNum 页码号
         * @fires onnochange
         */
        changePageNo: function(pageNum) {
            if (pageNum > this.getPageCount()) {
                return;
            }
            if (pageNum < 1) {
                return;
            }
            
            this.fire('beforechange');
            
            this.set('pageData', $.extend(true, {}, this.get('pageData'), {
                pageNo: pageNum
            }));

            /**
             * 改变页码时触发
             * @event nochange
             * @param {Number} pageNum
             */
            this.fire('nochange', pageNum);
        },

        /**
         * 改变每页显示数据的size
         *
         * @param {Number} pageSize 每页显示数据的size
         * @fires onsizechange
         */
        changePageSize: function(pageSize) {
            this.fire('beforechange');
            
            this.set('pageData', $.extend(true, {}, this.get('pageData'), {
                pageSize: pageSize,
                pageNo: 1
            }));

            /**
             * 改变每页显示数据时触发
             * @event onsizechange
             * @param {Number} pageSize
             */
            this.fire('sizechange', pageSize);
        },

        /**
         * 改变总数
         *
         * @param {Number} recordCount 总数
         * @fires onrecordcountchange
         */
        changeRecordCount: function(recordCount) {
            this.fire('beforechange');
            
            this.set('pageData', $.extend(true, {}, this.get('pageData'), {
                recordCount: recordCount,
                pageNo: 1
            }));

            /**
             * 改变总数时触发
             * @event onrecordcountchange
             * @param {Number} recordCount
             */
            this.fire('recordcountchange', recordCount);
        },

        /**
         * 得到当前页码
         *
         * @return {Number} 当前页码
         */
        getCurrentPageNo: function() {
            return this.get('pageData').pageNo;
        },

        /**
         * 得到当前总页数
         *
         * @return {Number} 总页数
         */
        getPageCount: function() {
            var pageData = this.get('pageData'),
                //一共有多少数据
                recordCount = pageData.recordCount,
                //每页显示多少数据
                pageSize = pageData.pageSize || DEFAULT_PAGE_SIZE;
            return pageSize <= 0 ? 0 : (recordCount % pageSize === 0 ? Math.floor(recordCount / pageSize) : Math.floor(recordCount / pageSize) + 1);
        },

        /**
         * 得到当前每页有多少数据
         *
         * @return {Number} 每页有多少数据
         */
        getPageSize: function() {
            return this.get('pageData').pageSize;
        },

        /**
         * 解绑事件
         *
         * @protected
         * @override
         */
        destroyEvents: function() {
            this.removeDOMEvent(this.main);

            this.pageInput.destroy();
        }
    };

    base.inherit(Page, Widget);

    return Page;
});
