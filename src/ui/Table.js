/**
 * 表格
 *
 * @ignore
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        base = require('base/base'),
        Widget = require('ui/Widget');

    var tpl = [
        '<table width="100%" border="0" cellspacing="0" cellpadding="0" >',
        '<thead>',
        '<tr class="tr_style"><th>表头</th><th>表搜索头</th></tr>',
        '</thead>',
        '<tbody>',
        '<tr><td>ssssssssssss</td></tr>',
        '</tbody>',
        '</table>'
    ].join('');

    var defaultCfg = {
        marker : true,
        refresh : false,
        switchTags : false,
        hidden:false,
        beforeRender:function(){},
        afterRender:function(){},
        noDataHtml: '没有数据',
        noFollowHeadCache: false,
        followHead: false,
        sortable: false,
        encode: false,
        columnResizable: false,
        rowWidthOffset: -1,
        select: '',
        selectMode: 'box',
        breakLine: false,
        hasTip: false,
        tipWidth: 18,
        sortWidth: 9,
        fontSize: 13,
        colPadding: 8,
        zIndex: 0
    };

    /**
     * 表格
     *
     * @extends Widget
     * @constructor
     */
    function Table(options) {
        Widget.call(this, options);
    }


    //------------------------------ head -------------------------------
    //获取表格头html
    function getHeadHtml(table){

    }
    //渲染表格头
    function renderHead(table){
        this.getHeadHtml(table);
    }
    //表格头事件 鼠标移入单元格
    function titleOverHandler(element, e){

    }
    //表格头事件 鼠标移出单元格
    function titleOutHandler(element, e){

    }
    //表格头事件 鼠标点击单元格
    function titleClickHandler(element, e){

    }
    //表格头事件 拖拽处理（多个方法）
    //创建基准线
    function createDragMark(table){

    }
    //显示基准线
    function showDragMark(table, left){

    }
    //隐藏基准线
    function hideDragMark(table){

    }
    //表格头移动(鼠标事件）
    function headMoveHandler(table, e){

    }
    //表格头点击开始(鼠标事件）
    function dragStartHandler(table, e){

    }
    //表格头拖拽中(鼠标事件）
    function dragingHandler(table, evt){

    }
    //表格头点击结束(鼠标事件）
    function dragEndHandler(table, evt){

    }

    //------------------------------ body -------------------------------
    //获取主题html
    function getBodyHtml(table){

    }
    //渲染主体
    function renderBody(table){

    }
    //获取表格行的html
    function getRowHtml(table, data, index, builderList){

    }
    //表格行鼠标移上事件
    function rowOverHandler(element, e){

    }
    //表格行鼠标移出事件
    function rowOutHandler(element, e){

    }
    //表格行鼠标点击事件
    function rowClickHandler(element, e){

    }
    //行的checkbox点击处理
    function rowCheckboxClick(element, e){

    }
    //全选/全不选
    function toggleSelectAll(arg){

    }
    //获取第一列的多选框
    function getMultiSelectField(table){

    }


    //------------------------------ foot -------------------------------
    //获取foot的html
    function getFootHtml(table){

    }
    //渲染foot
    function renderFoot(table){

    }


    //------------------------------ main -------------------------------
    //根据元素获取匹配函数
    function getHandlers(table, el, eventType){

    }
    //批量添加Handlers
    function addHandlers(table, el, eventType, handlers){

    }
    //批量删除Handlers
    function removeHandlers(table, el, eventType, handlers){
        
    }
    //初始化main元素事件处理函数
    function initMainEventhandler(table){
        addHandlers(
            table,
            table.main,
            'mouseover',
            [
                {
                    handler: rowOverHandler,
                    matchFn: rowClass
                },
                {
                    handler: titleOverHandler,
                    matchFn: titleClass
                }
            ]
        );

        addHandlers(
            table,
            table.main,
            'mouseout',
            [
                {
                    handler: rowOutHandler,
                    matchFn: rowClass
                },
                {
                    handler: titleOutHandler,
                    matchFn: titleClass
                }
            ]
        );

        addHandlers(
            table,
            table.main,
            'click',
            [
                {
                    handler: rowClickHandler,
                    matchFn: rowClass
                },
                {
                    handler: titleClickHandler,
                    matchFn: titleClass
                },
                {
                    handler: toggleSelectAll,
                    matchFn: selectAllClass
                },
                {
                    handler: rowCheckboxClick,
                    matchFn: multiSelectClass
                },
                {
                    handler: selectSingleHandler,
                    matchFn: singleSelectClass
                }
            ]
        );
    }


    Table.prototype = {

        //构造函数内顺序执行 main->initStates->initOptions->initPainters

        /**
         * 创建主元素
         *
         * @protected
         * @override
         */
        createMain: function() {
            var div = document.createElement('div');
            div.className = 'classic_01 mb10';
            return div;
        },

        /**
         * 初始化参数
         *
         * @param {Object} [options] 初始化参数
         * @protected
         * @override
         */
        initOptions: function(options) {
            this.options = _.extend(defaultCfg, options || {});
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
                    this.main.style.display = hidden ? 'none' : '';
                },
                disabled: function(disabled) {
                    this.main.disabled = disabled;
                },
                tags:function(tags){
                    _.each(tags,function(value, key){
                        if(_.isString(value)){
                            //直接渲染
                            console.log(this.main, value);
                        } else if(_.isFunction(value)){
                            value.call();
                        }
                    },this);
                    var keys = _.keys(tags);
                    console.log(keys);
                }
            };
        },


        //render内部函数 appendMain->initElements->initEvents->repaint->initExtensions
        //其中repaint绘制两次，第一次是初始化，第二次是改变的值
        /**
         * 创建其他元素
         *
         * @protected
         * @override
         */
        initElements: function() {
            this.main.style.display = 'none';
            this.main.innerHTML = _.template(tpl)({
            });
            //console.log(this.main.innerHTML);
        },

        /**
         * 绑定事件
         *
         * @protected
         * @override
         */
        initEvents: function() {
            /**
             * 点击
             * @event click
             */
            this.addFiredDOMEvent(this.main, 'click');
        },

        /**
         * 解绑事件
         *
         * @protected
         * @override
         */
        destroyEvents: function() {
            this.removeDOMEvent(this.main);
        }
    };

    base.inherit(Table, Widget);

    return Table;
});
