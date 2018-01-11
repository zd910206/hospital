mxCell.prototype.componentId = null;// 组件ID
mxCell.prototype.stepId = null;// 环节ID
mxCell.prototype.stepName = null;// 环节名
mxCell.prototype.stepCode = null;// 组件编码
mxCell.prototype.taskStepId = null;// 任务环节ID
mxCell.prototype.bondFunction = null;// 组件绑定方法
mxCell.prototype.taskId = null;// 任务ID
mxCell.prototype.stepState = null;// 组件状态
mxCell.prototype.funmodOp = null;// 组件操作权限
mxCell.prototype.nodeIP = null;// ip
mxCell.prototype.nodePort = null;// 端口
mxCell.prototype.stepImage = null;// 环节图片

mxGraph.prototype.taskState = null;// 流程状态
mxGraph.prototype.flowOp = null;// 流程操作权限
mxGraph.prototype.opType = null;// 流程、任务和收藏

mxCell.prototype.getTaskStepId = function () {
    return this.taskStepId;
};
mxCell.prototype.setTaskStepId = function (taskStepId) {
    this.taskStepId = taskStepId;
};
mxCell.prototype.getStepName = function () {
    return this.stepName;
};
mxCell.prototype.setStepCode = function (stepCode) {
    this.stepCode = stepCode;
};
mxGraph.prototype.getOpType = function () {
    return this.opType;
};
mxGraph.prototype.setOpType = function (opType) {
    this.opType = opType;
};
mxCell.prototype.getNodePort = function () {
    return this.nodePort;
};
mxCell.prototype.setNodePort = function (nodePort) {
    this.nodePort = nodePort;
};
mxCell.prototype.getNodeIP = function () {
    return this.nodeIP;
};
mxCell.prototype.setNodeIP = function (nodeIP) {
    this.nodeIP = nodeIP;
};
mxGraph.prototype.getFlowOp = function () {
    return this.flowOp;
};
mxGraph.prototype.setFlowOp = function (flowOp) {
    this.flowOp = flowOp;
};
mxCell.prototype.getBondFunction = function () {
    return this.bondFunction;
};
mxCell.prototype.setBondFunction = function (bondFunction) {
    this.bondFunction = bondFunction;
};
mxCell.prototype.getComponentOp = function () {
    return this.funmodOp;
};
mxCell.prototype.setComponentOp = function (funmodOp) {
    this.funmodOp = funmodOp;
};
mxCell.prototype.getComponentId = function () {
    return this.componentId;
};
mxCell.prototype.setComponentId = function (componentId) {
    this.componentId = componentId;
};
mxCell.prototype.getStepId = function () {
    return this.stepId;
};
mxCell.prototype.setStepId = function (stepId) {
    this.stepId = stepId;
};
mxCell.prototype.setStepName = function (stepName) {
    this.stepName = stepName;
};
mxCell.prototype.getStepCode = function () {
    return this.stepCode;
};
mxCell.prototype.getTaskId = function () {
    return this.taskId;
};
mxCell.prototype.setTaskId = function (taskId) {
    this.taskId = taskId;
};
//环节状态
mxCell.prototype.getStepState = function () {
    return this.stepState ? this.stepState : Step.stop;
};
mxCell.prototype.setStepState = function (stepState) {
    this.stepState = stepState;
};
//环节错误信息
mxCell.prototype.getStepError = function () {
    return this.stepError;
};
mxCell.prototype.setStepError = function (stepError) {
    this.stepError = stepError;
};
//环节图片信息
mxCell.prototype.getStepImage = function () {
    return this.stepImage;
};
mxCell.prototype.setStepImage = function (stepImage) {
    this.stepImage = stepImage;
};
//任务状态
mxGraph.prototype.getTaskState = function () {
    return this.taskState;
};
mxGraph.prototype.setTaskState = function (taskState) {
    this.taskState = taskState;
};

mxGraph.prototype.stopEditing = function (a) {
    if (!isEmpty(this.cellEditor))
        this.cellEditor.stopEditing(a);
};

/**
 * 初始化连接的图片
 * @param 图片路径
 * */
function initImgConn(imgPath) {
    mxConnectionHandler.prototype.connectImage = new mxImage(imgPath, 20, 20);
}


/** ************************* 添加折叠事件  ************************  */


/*
 定义一个树节点
 */
function TreeNodeShape() { };

TreeNodeShape.prototype = new mxCylinder();
TreeNodeShape.prototype.constructor = TreeNodeShape;

// 定义的上边缘部分的长度。
TreeNodeShape.prototype.segment = 20;

// 根据状态显示元素
TreeNodeShape.prototype.apply = function(state)
{
    mxCylinder.prototype.apply.apply(this, arguments);
    this.state = state;
};

TreeNodeShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
{
    var graph = this.state.view.graph;
    var hasChildren = graph.model.getOutgoingEdges(this.state.cell).length > 0;

    if (isForeground)
    {
        if (hasChildren)
        {
            // 这里使用的是元素范围外边距
            path.moveTo(w / 2, h + this.segment);
            path.lineTo(w / 2, h);
            path.end();
        }
    }
    else
    {
        path.moveTo(0, 0);
        path.lineTo(w, 0);
        path.lineTo(w, h);
        path.lineTo(0, h);
        path.close();
    }
};

mxCellRenderer.prototype.defaultShapes['treenode'] = TreeNodeShape;

// // 自定义元素边框
// mxGraphView.prototype.updateFloatingTerminalPoint = function(edge, start, end, source)
// {
//     var pt = null;
//
//     if (source)
//     {
//         pt = new mxPoint(start.x + start.width ,
//             start.y + start.height / 2);
//     }
//     else
//     {
//         pt = new mxPoint(start.x , start.y + start.height / 2);
//     }
//
//     edge.setAbsoluteTerminalPoint(pt, source);
// };

/** *************************  End  ************************  */


/**
 * 创建一个graph区域
 * @param areaId 画图区域容器的ID
 * */
function createGraphArea(areaId) {
    var container = document.getElementById(areaId);

    addScrollListener(container, wheelHandle);//监听鼠标滚轮（鼠标停留在画布，滑动滚轮）

    var model = new mxGraphModel();
    graph = new mxGraph(container, model);

    /////////////////////////////////////连接点///////////////////////////////////
    // Enables connect preview for the default edge style
    //graph.connectionHandler.createEdgeState = function (me) {
    //    var edge = graph.createEdge(null, null, null, null, null);
    //
    //    return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
    //};

    // Specifies the default edge style
    //graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';
    /////////////////////////////////////连接点///////////////////////////////////

    // 分组才会使用
    //graph.foldingEnabled = false; // 不可折叠
    //graph.recursiveResize = true; // 循环调整大小

    // 可以动态更改样式
    graph.getView().updateStyle = true;
    // 监听edge样式改变事件
    listenEdgeStyle();

    ////////////////////////////////改变cell的大小//////////////////////////////
    graph.setCellsResizable(true);
    // 监听cell大小改变
    //graph.createHandler = function (state) {
    //    if (state != null &&
    //        this.model.isVertex(state.cell)) {
    //        return new mxVertexToolHandler(state);
    //    }
    //    return mxGraph.prototype.createHandler.apply(this, arguments);
    //};
    ////////////////////////////////改变cell的大小//////////////////////////////

    // 选中高亮显示
    mxConstants.VERTEX_SELECTION_DASHED = false;
    mxConstants.VERTEX_SELECTION_STROKEWIDTH = 3;
    //mxConstants.VERTEX_SELECTION_COLOR = '#ff0000';
    //mxConstants.EDGE_SELECTION_DASHED = false;
    //mxConstants.EDGE_SELECTION_STROKEWIDTH = 3;

    // 创建网格
    //createGrid();
    graph.setGridEnabled(false);
    //graph.view.validateBackground();

    //var highlight = new mxCellTracker(graph, '#00FF00');// 鼠标停留高亮元素

    //mxGraphHandler.prototype.setMoveEnabled(true);//是否可以移动

    // 显示导航线
    mxGraphHandler.prototype.guidesEnabled = true;
    mxConstants.GUIDE_COLOR = '#FF0000'; // 导航线颜色
    mxConstants.GUIDE_STROKEWIDTH = 1; // 导航线宽度
    //mxGraphHandler.prototype.setHighlightColor('#FF0000');
    //mxEdgeHandler.prototype.snapToTerminals = true; // 导航线自动连接到目标
    mxRectangleShape.prototype.crisp = true; // 去锯齿效果

//	graph.selectEdges();//选中所有的线
//	graph.orderCells(true);//使线在所有元素的底下，即线和元素重叠时，线被节点遮住
//	graph.clearSelection();//取消选中的元素

//  	graph.setPanning(true);
//  	graph.setResizeContainer(true);// 容器自适应大小

    graph.setTooltips(true);// 是否启用鼠标停放提示
    // 鼠标停留在cell上的提示信息，调试用
    graph.getTooltipForCell = function (cell) {
        var opType = mxGraph.prototype.getOpType()
        if (cell.isVertex()) {
            if (opType == Etl.task) {
                return "IP:" + (isEmpty(cell.nodeIP) ? "未知" : cell.nodeIP) + "\n"
                    + "端口:" + (isEmpty(cell.nodePort) ? "未知" : cell.nodePort) + "\n"
                    + "流程ID:" + (isEmpty(flowIdAll) ? "未知" : flowIdAll) + "\n"
                    + "任务ID:" + (isEmpty(cell.taskId) ? "未知" : cell.taskId) + "\n"
                    + "任务状态:" + (isEmpty(mxGraph.prototype.getTaskState()) ? Task.cancel : mxGraph.prototype.getTaskState()) + "\n"
                    + "环节ID:" + cell.stepId + "\n"
                    + "组件编码:" + cell.stepCode + "\n"
                    + "环节状态:" + (isEmpty(cell.stepState) ? Step.stop : cell.stepState) + "\n"
                    + "任务环节ID:" + (isEmpty(cell.taskStepId) ? "未知" : cell.taskStepId) + "\n"
                    + "绑定方法:" + (isEmpty(cell.bondFunction) ? "无" : cell.bondFunction);
            } else {
                return "ID:" + cell.id + "\n"
                    + "流程ID:" + (isEmpty(flowIdAll) ? "未知" : flowIdAll) + "\n"
                    + "环节ID:" + cell.stepId + "\n"
                    + "组件编码:" + cell.stepCode + "\n"
                // + "绑定方法:" + (isEmpty(cell.bondFunction) ? "无" : cell.bondFunction);
            }
        } else {
            return "";
        }

    };

    //设置画布背景图片
//	var img = new mxImage(imageSrc,1280 ,1024);  // w:1280   h:1024
//	graph.setBackgroundImage(img);
//	graph.view.validate();

    graph.htmlLabels = true;//是否解析html
    graph.setCellsEditable(false);
    graph.setConnectable(true);//Specifies if the graph should allow new connections
    graph.setMultigraph(false);//Specifies if the graph should allow multiple connections between the same pair of vertices.
    graph.setAllowDanglingEdges(false);
    graph.setDropEnabled(true);//Specifies if the graph should allow dropping of cells onto or into other cells.


    /** ************************* 折叠事件加于画板  ************************  */

    // // 禁用如何菜单操作
    // graph.setCellsSelectable(false);
    // 定义折叠功能
    graph.isCellFoldable = function(cell)
    {
        return this.model.getOutgoingEdges(cell).length > 0;
    };

    // 定义折叠图标位置
    graph.cellRenderer.getControlBounds = function(state)
    {
        if (state.control != null)
        {
            var oldScale = state.control.scale;
            var w = state.control.bounds.width / oldScale;
            var h = state.control.bounds.height / oldScale;
            var s = state.view.scale;

            return new mxRectangle(state.x + state.width + 3,
                state.y ,
                state.width / 4, state.height / 4);
        }

        return null;
    };

    // 覆写折叠函数
    graph.foldCells = function(collapse, recurse, cells){
        this.model.beginUpdate();
        try
        {
            toggleSubtree(this, cells[0], !collapse);
            this.model.setCollapsed(cells[0], collapse);

            // 执行折叠操作
            // layout.execute(graph.getDefaultParent());
        }
        finally
        {
            this.model.endUpdate();
        }
    };

    /** ************************* End  ************************  */

}
// 元素展开折叠遍历子元素
function toggleSubtree(graph, cell, show)  {
    show = (show != null) ? show : true;
    var cells = [];

    graph.traverse(cell, true, function(vertex)
    {
        if (vertex != cell)
        {
            cells.push(vertex);
        }

        // 停止递归，如果元素被删除
        return vertex == cell || !graph.isCellCollapsed(vertex);
    });

    graph.toggleCells(show, cells, true);
};


/**
 * No dashed shapes.导航线不是虚线，如果不重写该函数，那么导航线为虚线
 */
mxGuide.prototype.createGuideShape = function (horizontal) {
    var guide = new mxPolyline([], mxConstants.GUIDE_COLOR, mxConstants.GUIDE_STROKEWIDTH);
    return guide;
};


/**
 * 动态地创建网格（需要画布）
 */
function createGrid() {
    try {
        // 创建网格
        var canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';
        canvas.style.zIndex = -1;
        // 添加到容器
        graph.container.appendChild(canvas);

        var ctx = canvas.getContext('2d');

        // 过滤画布事件，修改画布作为容器
        var mxGraphViewIsContainerEvent = mxGraphView.prototype.isContainerEvent;
        mxGraphView.prototype.isContainerEvent = function (evt) {
            return mxGraphViewIsContainerEvent.apply(this, arguments) ||
                mxEvent.getSource(evt) == canvas;
        };

        var s = 0;
        var gs = 0;
        var tr = new mxPoint();
        var w = 0;
        var h = 0;

        function repaintGrid() {
            if (ctx != null) {
                var bounds = graph.getGraphBounds();
                var width = Math.max(bounds.x + bounds.width, graph.container.clientWidth);
                var height = Math.max(bounds.y + bounds.height, graph.container.clientHeight);
                var sizeChanged = width != w || height != h;

                if (graph.view.scale != s || graph.view.translate.x != tr.x || graph.view.translate.y != tr.y ||
                    gs != graph.gridSize || sizeChanged) {
                    tr = graph.view.translate.clone();
                    s = graph.view.scale;
                    gs = graph.gridSize;
                    w = width;
                    h = height;

                    // 根据需要清除背景
                    if (!sizeChanged) {
                        ctx.clearRect(0, 0, w, h);
                    } else {
                        canvas.setAttribute('width', w);
                        canvas.setAttribute('height', h);
                    }

                    var tx = tr.x * s;
                    var ty = tr.y * s;

                    // 设定网格线的距离（以像素为单位）
                    var minStepping = graph.gridSize;
                    var stepping = minStepping * s;

                    if (stepping < minStepping) {
                        var count = Math.round(Math.ceil(minStepping / stepping) / 2) * 2;
                        stepping = count * stepping;
                    }

                    var xs = Math.floor((0 - tx) / stepping) * stepping + tx;
                    var xe = Math.ceil(w / stepping) * stepping;
                    var ys = Math.floor((0 - ty) / stepping) * stepping + ty;
                    var ye = Math.ceil(h / stepping) * stepping;

                    xe += Math.ceil(stepping);
                    ye += Math.ceil(stepping);

                    var ixs = Math.round(xs);
                    var ixe = Math.round(xe);
                    var iys = Math.round(ys);
                    var iye = Math.round(ye);

                    // 绘制网格
                    ctx.strokeStyle = '#f6f6f6';
                    ctx.beginPath();

                    for (var x = xs; x <= xe; x += stepping) {
                        x = Math.round((x - tx) / stepping) * stepping + tx;
                        var ix = Math.round(x);

                        ctx.moveTo(ix + 0.5, iys + 0.5);
                        ctx.lineTo(ix + 0.5, iye + 0.5);
                    }

                    for (var y = ys; y <= ye; y += stepping) {
                        y = Math.round((y - ty) / stepping) * stepping + ty;
                        var iy = Math.round(y);

                        ctx.moveTo(ixs + 0.5, iy + 0.5);
                        ctx.lineTo(ixe + 0.5, iy + 0.5);
                    }

                    ctx.closePath();
                    ctx.stroke();
                }
            }
        };
    }
    catch (e) {
        mxLog.show();
        mxLog.debug('Using background image');

        container.style.backgroundImage = 'url(\'../../js/mxGraph/images/grid.gif\')';
    }

    var mxGraphViewValidateBackground = mxGraphView.prototype.validateBackground;
    mxGraphView.prototype.validateBackground = function () {
        mxGraphViewValidateBackground.apply(this, arguments);
        repaintGrid();
    };
}

/**
 * 设置拓扑背景
 * @public
 * @param {String} img 图片名
 * @param {Number} width 图片的宽
 * @param {Number} height 图片的高
 */
function setTopologyBgImg(imgStr, width, height) {
    var img = new mxImage(_TOPOLOGYBG_PATH + imgStr, width, height);
    graph.setBackgroundImage(img);
}

/**
 * 初始化风格
 * */
function initStyle() {
    // 点元素的默认样式
    var style = graph.getStylesheet().getDefaultVertexStyle();
    delete style[mxConstants.STYLE_STROKECOLOR]; // transparent
    delete style[mxConstants.STYLE_FILLCOLOR]; // transparent
//	delete style[mxConstants.STYLE_STROKECOLOR];

    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
    //style[mxConstants.STYLE_STROKECOLOR] = '#00FF00';
    //style[mxConstants.STYLE_STROKEWIDTH] = 3;
    style[mxConstants.HIGHLIGHT_COLOR] = '#FF0000';
    style[mxConstants.HIGHLIGHT_STROKEWIDTH] = '4';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
    style[mxConstants.STYLE_IMAGE_WIDTH] = '50';//显示图标width
    style[mxConstants.STYLE_IMAGE_HEIGHT] = '50';//显示图标height
    style[mxConstants.STYLE_INDICATOR_WIDTH] = '10';
    style[mxConstants.STYLE_INDICATOR_HEIGHT] = '10';
    style[mxConstants.STYLE_IMAGE_ALIGN] = 'center';
//	style[mxConstants.STYLE_SPACING] = '5';
    style[mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
//	style[mxConstants.STYLE_INDICATOR_SPACING]='5';
//	style[mxConstants.STYLE_LABEL_PADDING]='5';

    style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = 'bottom';
//	style[mxConstants.STYLE_ROUNDED] = true;

    style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';//图形文本自动换行
    graph.getStylesheet().putDefaultVertexStyle(style);

//	 默认连接线样式
    var edgeStyle = graph.getStylesheet().getDefaultEdgeStyle();
    delete edgeStyle['endArrow'];      // 删除连线箭头
    edgeStyle[mxConstants.STYLE_FONTCOLOR] = '#000000';
    //edgeStyle[mxConstants.STYLE_STROKECOLOR] = '#00FF00'; // 连接线颜色
    edgeStyle[mxConstants.STYLE_STROKEWIDTH] = 2;
    edgeStyle[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
    edgeStyle[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
    edgeStyle[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white'; // 连线的文本覆盖连线，即文字浮于连线上
//	style[mxConstants.EDGE_SELECTION_COLOR] = 'red';
//    style[mxConstants.STYLE_ROUNDED] = true;
//    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
//     style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
//    style[mxConstants.STYLE_FONTSIZE] = '10';
    graph.getStylesheet().putDefaultEdgeStyle(edgeStyle);

    return style;
}

/**
 * 添加节点模板
 * @param img 图片
 * @param w 宽度
 * @param h 高度
 * @param value 文本值
 * @param styleKey cellStyle的key
 * @param highlightDropTargets
 * */
function addVertex(img, w, h, value, styleKey, highlightDropTargets, componentId,  type) {
    highlightDropTargets = highlightDropTargets == null ? false : highlightDropTargets;
    //var value = null;

    var cell = new mxCell((!isEmpty(value)) ? value : '', new mxGeometry(0, 0, w, h), styleKey);
    cell.vertex = true;
    //绑定自定义属性到组件，这里组件指的是cell
    //cell].setValue(cellValue);
    cell.setComponentId(componentId);//组件Id
    cell.setValue(value); //组件名
    // cell.setStepCode(stepCode); //组件名
    //cell.setStepImage(img.src);
    cell.setStyle(styleKey);
    //console.log(cell.getStyle());

    addComponentItem(graph, cell, img, highlightDropTargets, type);

    img.enabled = true;

    graph.getSelectionModel().addListener(mxEvent.CHANGE, function () {
        var tmp = graph.isSelectionEmpty();
        mxUtils.setOpacity(img, (true) ? 100 : 20);//设置不透明度
        img.enabled = tmp;
    });

}

/**
 * 添加组件并监听拖拽事件
 * @param graph
 * @param cell 节点
 * @param imgDOM 图片DOM
 * @param highlightDropTargets 是否高亮显示拖拽源
 * */
var addStep = function (stepName,stepCode,fontColor,fontSize,num) {
    if(stepName != ""  &&　stepCode != ""){
        if(num == "1"){
            addCell.setValue(stepName);
            addCell.setStepCode(stepCode);
            $.post(ctx + "step/mng/update", {
                label: stepName,
                stepId: addCell.getStepId(),
                stepCode: stepCode
            }, function (env) {
                if (!env.result) {
//				MessageAlert(env.msg);
                    parent.showTopMsg(BTAlert.danger, '错误', env.msg);
                }else{
                    lineLabelChange("fontColor",fontColor);
                    lineLabelChange("fontSize",fontSize);
                    //graph.startEditing(addCell);
                     //loadFlowCfg(env.flowIdByStepId);
                    // refreshFlowTree();
                }
            }, "json");
        }else{
            $.post(ctx + "step/create", {
                flowIdAll: flowIdAll,
                componentId: addCell.getComponentId(),
                stepName:stepName,
                stepCode:stepCode
            }, function (env) {
                if (env.result) {
                    var stepId = env.stepId;
                    //将获取的环节ID绑定到刚拖拽到画布的组件
                    addCell.setStepId(stepId);
                    addCell.setValue(stepName);
                    addCell.setStepCode(stepCode);
                    //isValidDropTarget Returns true if the given cell is a valid drop target for the specified cells // 目标是否有效
                    var validDropTarget = (addTarget != null) ?
                        addGraph.isValidDropTarget(addTarget, [addCell], addEvt) : false;
                    var style = addCell.getStyle();
                    var select = null;

                    if (addTarget != null && !validDropTarget &&
                        addGraph.getModel().getChildCount(addTarget) == 0 &&
                        addGraph.getModel().isVertex(addTarget) == addCell.vertex) {
                        addGraph.getModel().setStyle(addTarget, style);
                        select = addTarget;
                    }
                    else {
                        if (addTarget != null && !validDropTarget) {
                            addTarget = null;
                        }

                        var pt = addGraph.getPointForEvent(addEvt);
                        select = addGraph.moveCells([addCell], pt.x, pt.y, true, addTarget);
                    }

                    addGraph.setSelectionCells(select);
                    lineLabelChange("fontColor",fontColor);
                    lineLabelChange("fontSize",fontSize);
                } else {
                    alert(env.msg);
                }
            }, "json");
        }
    }else {
        if(addCell.getStepId() != null){
            showAlert('提示',"修改组件失败！");
        }else{
            showAlert('提示',"生成组件失败！");
        }
    }
}
var addCell,addGraph, addEvt, addTarget =null;
function addComponentItem(graph, cell, img, highlightDropTargets, type) {
    // 拖拽至画布生成stepID
    // 在给定的位置插入一个元素
    // 如果鼠标点击连接图标并移动到另外一个元素时，就建立两个图标的连接

    var funct = function (graph, evt, target, x, y) {
        if (flowIdAll== undefined) {
            showAlert('提示', '请先打开或创建一个流程');
        }else{
            addGraph = graph;
            addEvt = evt;
            addTarget = target;
            showEdgeLabelAttrModal(cell,0);
        }
    };

    // 创建拖动源的预览
    var dragElt = document.createElement('div');
    dragElt.style.border = 'dashed black 1px';
    dragElt.style.width = '50px';
    dragElt.style.height = '50px';

//  Configures the given DOM element to act as a drag source for the specified graph.  Returns a a new mxDragSource
//	element	DOM element to make draggable.
//	graphF	mxGraph that acts as the drop target or a function that takes a mouse event and returns the current mxGraph.
//	funct	Function to execute on a successful drop.
//	dragElement	Optional DOM node to be used for the drag preview.
//	dx	Optional horizontal offset between the cursor and the drag preview.
//	dy	Optional vertical offset between the cursor and the drag preview.
//	autoscroll	Optional boolean that specifies if autoscroll should be used.  Default is mxGraph.autoscroll.
//	scalePreview	Optional boolean that specifies if the preview element should be scaled according to the graph scale.  If this is true, then the offsets will also be scaled.  Default is false.
//	highlightDropTargets	Optional boolean that specifies if dropTargets should be highlighted.  Default is true.
//	getDropTarget	Optional function to return the drop target for a given location (x, y).  Default is mxGraph.getCellAt.

    // 在点击拖动源图标时提供预览。 预览是提供的仅仅是拖动源的图片
    var ds = mxUtils.makeDraggable(img, graph, funct, dragElt, 0, 0, graph.autoscroll, highlightDropTargets);
    //// 从拖动源拖动时显示导航线
    ds.isGuidesEnabled = function () {
        return graph.graphHandler.guidesEnabled;
    };
    // 从拖动源拖动元素到图形以外的区域时，显示拖动源图片预览
    ds.createDragElement = mxDragSource.prototype.createDragElement;
    ds.enabled = !isEmpty(type) ? (type != Etl.task) : true;
}

/**
 * 创建一个缩略图的ID
 * @param outLineAreaId div或者容器的ID
 * */
function initOutLine(outLineAreaId) {
    if (!isEmpty(graph)) {
        var outline = new mxOutline(graph, document.getElementById(outLineAreaId));

        //$("a.miniatureIoc").toggle(function () {
        //    $("a.miniatureIoc").css("background-image", "url(\"" + ctx + "resources/" + THEME + "images/up_arrow.png\")");
        //    $("#miniature").hide(500);
        //}, function () {
        //    $("a.miniatureIoc").css("background-image", "url(\"" + ctx + "resources/" + THEME + "images/down_arrow.png\")");
        //    $("#miniature").show(500);
        //});
        // 默认显示
        $("a.miniatureIoc").css("background-image", "url(\"" + ctx + "resources/" + THEME + "images/down_arrow.png\")");
        $("#miniature").show(500);
        $('a.miniatureIoc').click(function () {
            if ($('#miniature').css('display') == 'none') {
                $("a.miniatureIoc").css("background-image", "url(\"" + ctx + "resources/" + THEME + "images/down_arrow.png\")");
                $("#miniature").show(500);
            } else {
                $("a.miniatureIoc").css("background-image", "url(\"" + ctx + "resources/" + THEME + "images/up_arrow.png\")");
                $("#miniature").hide(500);
            }
        });
//	    var scale = graph.view.scale;
//	    var bounds = graph.getGraphBounds();
//	    graph.view.setTranslate(-bounds.x / scale, -bounds.y / scale);
//		$('svg').css('height', '40px;').css('width', '20px');
    }
}

/**
 * 编辑区域的一些监听事件
 * */
var undoMng = new mxUndoManager();

function graphListenerHandler() {
    if (!isEmpty(graph)) {
        // 监听撤销操作
        var listener = function (sender, evt) {
            undoMng.undoableEditHappened(evt.getProperty('edit'));
        };
        graph.getModel().addListener(mxEvent.UNDO, listener);
        graph.getView().addListener(mxEvent.UNDO, listener);

        // 监听按键
        var keyHandler = new mxKeyHandler(graph);
        keyHandler.setEnabled(true);

        // 鼠标可框选，同时选择多个cell
        rubberband = new mxRubberband(graph);

        //监听delete按钮事件，删除选中的cell或edge
        // 按键对应的数字，参考http://www.kodyaz.com/content/HowToGetKeyCodesList.aspx
        keyHandler.bindKey(46, function () {
            if (graph.isEnabled()) {
                del();
            }
        });

        // 监听拷贝事件,ctrl+c
        keyHandler.bindControlKey(67, function () {
            if (graph.isEnabled()) {
                copy();
            }
        });

        // 监听剪切事件,ctrl+x
        keyHandler.bindControlKey(88, function () {
            if (graph.isEnabled()) {
                cut();
            }
        });

        // 监听粘贴事件,ctrl+v
        keyHandler.bindControlKey(86, function () {
            if (graph.isEnabled()) {
                paste();
            }
        });

        // 监听撤销事件,ctrl+z
        keyHandler.bindControlKey(90, function () {
            if (graph.isEnabled()) {
                undo();
            }
        });

        // 监听恢复事件,ctrl+shift+z
        keyHandler.bindControlShiftKey(90, function () {
            if (graph.isEnabled()) {
                redo();
            }
        });

        // 监听打印事件,ctrl+shift+p
        keyHandler.bindControlShiftKey(80, function () {
            if (graph.isEnabled()) {
                print();
            }
        });

        // 监听显示事件,ctrl+shift+s
        keyHandler.bindControlShiftKey(83, function () {
            if (graph.isEnabled()) {
                show();
            }
        });

        // 元素状态改变的事件
        var linkValidator = function (sender, evt) {
            graph.validateGraph();//Validates the graph by validating each descendant of the given cell or the root of the model
        };
        graph.getModel().addListener(mxEvent.CHANGE, linkValidator);
    }
}

/**
 * 剪切
 */
function cut() {

    mxClipboard.cut(graph);
}

/**
 * 拷贝
 */
function copy() {
    mxClipboard.copy(graph);
}

/**
 * 粘贴
 */
function paste() {
    mxClipboard.paste(graph);
}

//覆盖原来的拷贝方法
mxClipboard.paste = function (graph) {
    if (!mxClipboard.isEmpty()) {
        if (!getTaskStateByFlowId(flowCfgId)) {
            isFlowSave = false;
            showBtMask();
            var cells = graph.getImportableCells(mxClipboard.cells);
            var newCells = [];//设置新的stepId后的cells
            var retCells = [];//返回的cells
//		  var cells = mxClipboard.cells;
            var delta = mxClipboard.insertCount * mxClipboard.STEPSIZE;
            var parent = graph.getDefaultParent();

            graph.model.beginUpdate();
            try {
                for (var i = 0; i < cells.length; i++) {
                    var tmp = (mxClipboard.parents != null && graph.model.contains(mxClipboard.parents[i])) ?
                        mxClipboard.parents[i] : parent;
                    var cell = cells[i];
                    if (!isEmpty(cell.getComponentId())) {
                        pasteStep(cell, function (stepId) {
                            cell.setStepId(stepId);
                        });
                    }
                    newCells.push(cell);
                }
                retCells = graph.importCells(newCells, delta, delta, tmp);//导入新的cells到画布中
            }
            finally {
                graph.model.endUpdate();
                hideBtMask();
            }

            // Increments the counter and selects the inserted cells
            mxClipboard.insertCount++;
            graph.setSelectionCells(retCells);//选中复制后的cells
        }

    } else {
        window.parent.showTopMsg(BTAlert.warning, '警告', '粘贴板为空');
    }
};

//修改粘贴板中cells的stepId，其余属性不变
function pasteStep(cell, func) {
//	var newCell = mxUtils.clone(cell);
    $.ajax({
        async: false,//不异步
        type: "post",
        url: ctx + "step/create",
        data: {
            stepId: cell.getStepId(),
            flowId: flowIdAll,
            componentId: cell.getComponentId(),
            stepName: cell.getValue(),
            isPaste: true
        },
        success: function (res) {
            if (res.result) {
//				cell.setStepId(res.stepId);
                func && func(res.stepId);
            }
        },
        error: function () {
            hideBtMask();
        }
    });
}

/**
 * 删除  step
 */
function del() {
    graph.removeCells();
}
/**
 * 分组
 */
function UnorGroup() {
    var cells = getSelectionCells();
    if (cells.length == 1 && cells[0].parent.getId() == 1) {
        graph.ungroupCells(cells);
        } else {
        graph.groupCells(null, 1, null);
        var parent = [];
        cells[0].parent.setValue("分组");
        parent.push(cells[0].parent);
        // graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, "#C3D9FF", parent);
        graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, "#C3D9FF", parent);
        graph.setCellStyles(mxConstants.STYLE_DASHED, 1, parent);
        graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, 2, parent);
        graph.setCellStyles(mxConstants.STYLE_FONTSIZE, 16, parent);

        parent[0].setVertex(3);
        doGroup(parent[0])
    }
}

/**
 * 撤销操作
 */
function undo() {
    undoMng.undo();
}
/**
 * 恢复操作
 */
function redo() {
    undoMng.redo();
}

/**
 * 获取选中的所有cell
 * @returns {Array}
 */
function getSelectionCells() {
    var cells = [];
    cells = graph.getSelectionCells();
    return cells;
}

//是否包含开始环节，开始环节不能进行拷贝、剪切、粘贴和删除操作
//true包含开始节点，反之false
function isContainStartStep(cells) {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].getComponentId() == -1) {
            return true;
        }
    }
    return false;
}

/**
 * 覆盖方法,实现自定义方法.
 * */
mxConnectionHandler.prototype.createMarker = function () {
    var a = new mxCellMarker(this.graph);
    a.hotspotEnabled = true;
    a.getCell = mxUtils.bind(this,
        function (b, c) {
            c = mxCellMarker.prototype.getCell.apply(a, arguments);
            this.error = null;// Holds the current validation error while connections are being created.
            if (!this.isConnectableCell(c))
                return null;// Returns true if the given cell is connectable.
            if (c != null)
                if (this.isConnecting()) {// Returns true if the source terminal has been clicked and a new connection is currently being previewed.
                    if (this.previous != null) {
                        this.error = validatorConnection(this.previous.cell, c);
                        if (this.error == null) {
                            this.error = this.validateConnection(
                                this.previous.cell, c);
                            if (this.error != null && this.error.length == 0) {
                                c = null;
                                if (this.isCreateTarget())
                                    this.error = null;
                            }
                        }
                    }
                } else
                    this.isValidSource(c) || (c = null);
            else if (this.isConnecting() && !this.isCreateTarget()
                && !this.graph.allowDanglingEdges)
                this.error = "";

            return c;
        });
    a.isValidState = mxUtils.bind(this,
        function (b) {
            return this.isConnecting() ? this.error == null : mxCellMarker.prototype.isValidState.apply(a, arguments);
        });
    a.getMarkerColor = mxUtils.bind(this,
        function (b, c, d) {
            return this.connectImage == null || this.isConnecting() ? mxCellMarker.prototype.getMarkerColor.apply(a, arguments) : null;
        });
    a.intersects = mxUtils.bind(this,
        function (b, c) {
            return this.connectImage != null || this.isConnecting() ? true : mxCellMarker.prototype.intersects.apply(a, arguments);
        });
    return a;
};

mxConnectionHandler.prototype.validateConnection = function (a, b) {
    if (b.getComponentId() == -1) {
        return "";
    }
    else
        return !this.isValidTarget(b) ? "" : this.graph.getEdgeValidationError(null, a, b)
};

mxGraphModel.prototype.cellRemoved = function (a) {
    if (a != null && this.cells != null) {
        for (var b = this.getChildCount(a) - 1; b >= 0; b--) {
            this.cellRemoved(this.getChildAt(a, b));
        }
        this.cells != null && a.getId() != null && delete this.cells[a.getId()];
    }
};

/**
 * 处理节点连接
 * @param cell
 */
function postCellConnect(cell, func) {
    var target_step_id = cell.target.getStepId();
    var source_step_id = cell.source.getStepId();
    //console.log("源组件【%d】=> 目标组件【%d】", source_step_id, target_step_id);
    $.post(ctx + "step/component/connect", {
        flowId: flowIdAll,
        source_stepId: source_step_id,
        target_stepId: target_step_id
    }, function (resp) {
        if (resp.result) {
            //cell.setStepId(resp.stepId);
            //func && func(); // 成功后，事务结束
        }
    }, "json");
}

/**
 * 校验连接,当形成环路时不允许连接
 * @param sourceCell 源节点
 * @param targetCell 目标节点
 * */
function validatorConnection(sourceCell, targetCell) {
    if (sourceCell.getId() == targetCell.getId())
        return null;
    else {
        if (hasLoopLink(sourceCell, targetCell))
            return "";
        else null;
    }
}

/**
 * 判断是否有环路
 */
function hasLoopLink(sourceCell, targetCell) {
    //判断源和目标是否为同一个节点
    if (sourceCell.getId() == targetCell.getId())
        return true;
    else {
        return hasChildCell(targetCell, sourceCell);
    }
}

/**
 * 是否还存在连接其他的节点
 * @param source 源节点
 * @param target 目标节点
 * */
function hasChildCell(source, target) {
    var edgeCount = source.getEdgeCount();
    for (var i = 0; i < edgeCount; i++) {
        var edgeObj = source.getEdgeAt(i);
        //当连线的源ID,与节点的ID一致时
        if (edgeObj.source.getId() == source.getId()) {
            var targetCell = edgeObj.target;
            if (target.getId() == targetCell.getId()) {
                return true;
            } else {
                return hasChildCell(targetCell, target);
            }
        }
    }
    return false;
}

/**
 * 移除所有的组件
 * */
function removeAllCell() {
    if (!isEmpty(graph)) {
        graph.removeCells(graph.getChildVertices(graph.getDefaultParent()));
    }
}

/**
 * 打印
 * */
function print() {
    if (!isEmpty(graph)) {
        mxUtils.printScreen(graph);
    }
}

/**
 * 显示
 */
function show() {
    if (!isEmpty(graph))
        mxUtils.show(graph);
}

/**
 * 需要用到mxGraph的Java API
 * @param data
 * @param filename
 * @param format
 */
var saveLocalFile = function (data, filename, format) {
    new mxXmlRequest(ctx + "flow/save", 'xml=' + encodeURIComponent(data) + '&filename=' +
        encodeURIComponent(filename) + '&format=' + format).simulate(document, '_blank');
};

/**
 * 导出图片
 */
function exportImg() {
    var xml = mxUtils.getXml(getSvg());
    saveLocalFile(xml, flowName, 'png');
}

function getBackgroundPageBounds() {
    var layout = graph.getPageLayout();
    var page = graph.getPageSize();

    return new mxRectangle(this.scale * (this.translate.x + layout.x * page.width),
        this.scale * (this.translate.y + layout.y * page.height),
        this.scale * layout.width * page.width,
        this.scale * layout.height * page.height);
}

/**
 * 矢量图形
 */
function getSvg(background, scale, border, nocrop, crisp, ignoreSelection, showText) {
    scale = (scale != null) ? scale : 1;
    border = (border != null) ? border : 1;
    crisp = (crisp != null) ? crisp : true;
    ignoreSelection = (ignoreSelection != null) ? ignoreSelection : true;
    showText = (showText != null) ? showText : true;

    var bounds = (nocrop) ? getBackgroundPageBounds() : (ignoreSelection) ?
            graph.getGraphBounds() : graph.getBoundingBox(graph.getSelectionCells());

    if (bounds == null) {
        throw Error(mxResources.get('drawingEmpty'));
    }

    var imgExport = new mxImageExport();
    var vs = graph.view.scale;

    // Prepares SVG document that holds the output
    var svgDoc = mxUtils.createXmlDocument();
    var root = (svgDoc.createElementNS != null) ?
        svgDoc.createElementNS(mxConstants.NS_SVG, 'svg') : svgDoc.createElement('svg');

    if (background != null) {
        if (root.style != null) {
            root.style.backgroundColor = background;
        }
        else {
            root.setAttribute('style', 'background-color:' + background);
        }
    }

    if (svgDoc.createElementNS == null) {
        root.setAttribute('xmlns', mxConstants.NS_SVG);
        root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
    }
    else {
        // KNOWN: Ignored in IE9-11, adds namespace for each image element instead. No workaround.
        root.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', mxConstants.NS_XLINK);
    }

    var s = scale / vs;
    root.setAttribute('width', (Math.ceil(bounds.width * s) + 2 * border) + 'px');
    root.setAttribute('height', (Math.ceil(bounds.height * s) + 2 * border) + 'px');
    root.setAttribute('version', '1.1');

    // Adds group for anti-aliasing via transform
    var node = root;

    if (crisp) {
        var group = (svgDoc.createElementNS != null) ?
            svgDoc.createElementNS(mxConstants.NS_SVG, 'g') : svgDoc.createElement('g');
        group.setAttribute('transform', 'translate(0.5,0.5)');
        root.appendChild(group);
        svgDoc.appendChild(root);
        node = group;
    }
    else {
        svgDoc.appendChild(root);
    }

    // Renders graph. Offset will be multiplied with state's scale when painting state.
    var svgCanvas = new mxSvgCanvas2D(node);
    svgCanvas.translate(Math.floor((border / scale - bounds.x) / vs), Math.floor((border / scale - bounds.y) / vs));

    // Paints background image
    var bgImg = graph.backgroundImage;

    if (bgImg != null) {
        var s2 = vs / scale;
        var tr = graph.view.translate;
        var tmp = new mxRectangle(tr.x * s2, tr.y * s2, bgImg.width * s2, bgImg.height * s2);

        // Checks if visible
        if (mxUtils.intersects(bounds, tmp)) {
            svgCanvas.image(tr.x, tr.y, bgImg.width, bgImg.height, bgImg.src, true);
        }
    }

    svgCanvas.scale(s);
    svgCanvas.textEnabled = showText;

    // Adds hyperlinks (experimental)
    imgExport.getLinkForCellState = mxUtils.bind(this, function (state, canvas) {
        return this.getLinkForCell(state.cell);
    });

    // Implements ignoreSelection flag
    imgExport.drawCellState = function (state, canvas) {
        if (ignoreSelection || state.view.graph.isCellSelected(state.cell)) {
            mxImageExport.prototype.drawCellState.apply(this, arguments);
        }
    };

    imgExport.drawState(graph.getView().getState(graph.model.root), svgCanvas);

    return root;
};

/**
 * xml
 */
function getXml() {
    return mxUtils.getPrettyXml(getGraphXml());
};

function getGraphXml(ignoreSelection) {
    ignoreSelection = (ignoreSelection != null) ? ignoreSelection : true;
    var node = null;

    if (ignoreSelection) {
        var enc = new mxCodec(mxUtils.createXmlDocument());
        node = enc.encode(graph.getModel());
    }
    else {
        node = graph.encodeCells(graph.getSelectionCells());
    }

    if (graph.view.translate.x != 0 || graph.view.translate.y != 0) {
        node.setAttribute('dx', Math.round(graph.view.translate.x * 100) / 100);
        node.setAttribute('dy', Math.round(graph.view.translate.y * 100) / 100);
    }

    node.setAttribute('grid', (graph.isGridEnabled()) ? '1' : '0');
    node.setAttribute('gridSize', graph.gridSize);
    node.setAttribute('guides', (graph.graphHandler.guidesEnabled) ? '1' : '0');
    node.setAttribute('tooltips', (graph.tooltipHandler.isEnabled()) ? '1' : '0');
    node.setAttribute('connect', (graph.connectionHandler.isEnabled()) ? '1' : '0');
    node.setAttribute('arrows', (graph.connectionArrowsEnabled) ? '1' : '0');
    node.setAttribute('fold', (graph.foldingEnabled) ? '1' : '0');
    node.setAttribute('page', (graph.pageVisible) ? '1' : '0');
    node.setAttribute('pageScale', graph.pageScale);
    node.setAttribute('pageWidth', graph.pageFormat.width);
    node.setAttribute('pageHeight', graph.pageFormat.height);

    if (graph.background != null) {
        node.setAttribute('background', graph.background);
    }

    return node;
}

/***
 * 创建图形中的XML结构
 * */
function getGraphXML() {
    if (!isEmpty(graph)) {
        var encoder = new mxCodec();
        var node = encoder.encode(graph.getModel());
        var flowXML = mxUtils.getPrettyXml(node);
        return flowXML;
    }
}

var transparentImage = (mxClient.IS_SVG) ? 'data:image/gif;base64,R0lGODlhMAAwAIAAAP///wAAACH5BAEAAAAALAAAAAAwADAAAAIxhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8egpAAA7' :
    ctx + 'resources/js/mxGraph/images' + '/transparent.gif';
var gridImage = (mxClient.IS_SVG) ? 'data:image/gif;base64,R0lGODlhCgAKAJEAAAAAAP///8zMzP///yH5BAEAAAMALAAAAAAKAAoAAAIJ1I6py+0Po2wFADs=' :
    ctx + 'resources/js/mxGraph/images' + '/grid.gif';

/**
 * 更新组件
 */
var updateGraphComponents = function () {
    if (graph.container != null) {
        var bg = (graph.background == null || graph.background == 'none') ? '#ffffff' : graph.background;

        if (graph.view.backgroundPageShape != null) {
            graph.view.backgroundPageShape.fill = bg;
            graph.view.backgroundPageShape.redraw();
        }

        var noBackground = 'url(' + transparentImage + ')';
        var bgImg = (!graph.pageVisible && graph.isGridEnabled()) ? 'url(' + gridImage + ')' : noBackground;

        // Needed to align background position for grid
        if (graph.isGridEnabled()) {
            graph.view.validateBackground();
        }

        if (graph.view.canvas.ownerSVGElement != null) {
            graph.view.canvas.ownerSVGElement.style.backgroundImage = bgImg;
        } else {
            graph.view.canvas.style.backgroundImage = bgImg;
        }

        graph.container.style.backgroundImage = noBackground;

        if (graph.view.backgroundPageShape != null) {
            graph.view.backgroundPageShape.node.style.backgroundImage = (graph.isGridEnabled()) ? 'url(' + gridImage + ')' : 'none';
        }

        graph.container.style.backgroundColor = bg;

        if (graph.pageVisible) {
            graph.container.style.backgroundColor = '#ebebeb';
            graph.container.style.borderStyle = 'solid';
            graph.container.style.borderColor = '#e5e5e5';
            graph.container.style.borderTopWidth = '1px';
            graph.container.style.borderLeftWidth = '1px';
            graph.container.style.borderRightWidth = '0px';
            graph.container.style.borderBottomWidth = '0px';
        }
        else {
            graph.container.style.border = '';
        }

        graph.container.style.overflow = (graph.scrollbars) ? 'auto' : 'hidden';

        graph.fireEvent(new mxEventObject('updateGraphComponents'));
    }
};

/**
 * 设置为默认样式
 * @param cell
 */
var setDefaultStyle = function (cell) {
    var state = graph.view.getState(cell);

    if (state != null) {
        // Ignores default styles
        var clone = cell.clone();
        clone.style = ''
        var defaultStyle = graph.getCellStyle(clone);
        var values = [];
        var keys = [];

        for (var key in state.style) {
            if (defaultStyle[key] != state.style[key]) {
                values.push(state.style[key]);
                keys.push(key);
            }
        }

        // Handles special case for value "none"
        var cellStyle = graph.getModel().getStyle(state.cell);
        var tokens = (cellStyle != null) ? cellStyle.split(';') : [];

        for (var i = 0; i < tokens.length; i++) {
            var tmp = tokens[i];
            var pos = tmp.indexOf('=');

            if (pos >= 0) {
                var key = tmp.substring(0, pos);
                var value = tmp.substring(pos + 1);

                if (defaultStyle[key] != null && value == 'none') {
                    values.push(value);
                    keys.push(key);
                }
            }
        }

        // Resets current style
        if (graph.getModel().isEdge(state.cell)) {
            Style.prototype.currentEdgeStyle = {};
        }
        else {
            Style.prototype.currentVertexStyle = {}
        }

        graph.fireEvent(new mxEventObject('styleChanged', 'keys', keys, 'values', values, 'cells', [state.cell]));
        //console.log(Style.prototype.currentEdgeStyle);
    }
};

/**
 * 清除默认样式
 */
var clearDefaultStyle = function () {
    Style.prototype.currentEdgeStyle = Style.prototype.defaultEdgeStyle;
    Style.prototype.currentVertexStyle = {};
    // 更新
    graph.fireEvent(new mxEventObject('styleChanged', 'keys', [], 'values', [], 'cells', []));
};

/////////////////////////////////////////////////改变edge属性//////////////////////////////////////////////////
var valueStyles = ['fontFamily', 'fontSize', 'fontColor'];
var styles = ['rounded', 'shadow', 'glass', 'dashed', 'dashPattern'];
var connectStyles = ['shape', 'edgeStyle', 'curved', 'rounded', 'elbow'];
var alwaysEdgeStyles = ['edgeStyle', 'startArrow', 'startFill', 'startSize', 'endArrow', 'endFill', 'endSize'];
var keyGroups = [['startArrow', 'startFill', 'startSize', 'endArrow', 'endFill', 'endSize'],
    ['strokeColor', 'strokeWidth'],
    ['fillColor', 'gradientColor'],
    valueStyles,
    ['align'],
    ['html']];
for (var i = 0; i < keyGroups.length; i++) {
    for (var j = 0; j < keyGroups[i].length; j++) {
        styles.push(keyGroups[i][j]);
    }
}

for (var i = 0; i < connectStyles.length; i++) {
    styles.push(connectStyles[i]);
}

var insertHandler = function (cells, asText) {
    console.log(Style.prototype.currentEdgeStyle);
    graph.getModel().beginUpdate();
    try {
        // Applies only basic text styles
        if (asText) {
            var edge = graph.getModel().isEdge(cell);
            var current = (edge) ? Style.prototype.currentEdgeStyle : Style.prototype.currentVertexStyle;
            var textStyles = ['fontSize', 'fontFamily', 'fontColor'];

            for (var j = 0; j < textStyles.length; j++) {
                var value = current[textStyles[j]];

                if (value != null) {
                    graph.setCellStyles(textStyles[j], value, cells);
                }
            }
        }
        else {
            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i];

                // Removes styles defined in the cell style from the styles to be applied
                var cellStyle = graph.getModel().getStyle(cell);
                var tokens = (cellStyle != null) ? cellStyle.split(';') : [];
                var appliedStyles = styles.slice();

                for (var j = 0; j < tokens.length; j++) {
                    var tmp = tokens[j];
                    var pos = tmp.indexOf('=');

                    if (pos >= 0) {
                        var key = tmp.substring(0, pos);
                        var index = mxUtils.indexOf(appliedStyles, key);

                        if (index >= 0) {
                            appliedStyles.splice(index, 1);
                        }

                        // Handles special cases where one defined style ignores other styles
                        for (var k = 0; k < keyGroups.length; k++) {
                            var group = keyGroups[k];

                            if (mxUtils.indexOf(group, key) >= 0) {
                                for (var l = 0; l < group.length; l++) {
                                    var index2 = mxUtils.indexOf(appliedStyles, group[l]);

                                    if (index2 >= 0) {
                                        appliedStyles.splice(index2, 1);
                                    }
                                }
                            }
                        }
                    }
                }

                // Applies the current style to the cell
                var edge = graph.getModel().isEdge(cell);
                var current = (edge) ? Style.prototype.currentEdgeStyle : Style.prototype.currentVertexStyle;

                for (var j = 0; j < appliedStyles.length; j++) {
                    var key = appliedStyles[j];
                    var styleValue = current[key];

                    if (styleValue != null && (key != 'shape' || edge)) {
                        // Special case: Connect styles are not applied here but in the connection handler
                        if (!edge || mxUtils.indexOf(connectStyles, key) < 0) {
                            graph.setCellStyles(key, styleValue, [cell]);
                        }
                    }
                }
            }
        }
    }
    finally {
        graph.getModel().endUpdate();
    }
};

////////////////////////////////改变cell的大小//////////////////////////////
function mxVertexToolHandler(state) {
    mxVertexHandler.apply(this, arguments);
};

mxVertexToolHandler.prototype = new mxVertexHandler();
mxVertexToolHandler.prototype.constructor = mxVertexToolHandler;

mxVertexToolHandler.prototype.domNode = null;

mxVertexToolHandler.prototype.init = function () {
    mxVertexHandler.prototype.init.apply(this, arguments);

    this.domNode = document.createElement('div');
    this.domNode.style.position = 'absolute';
    this.domNode.style.whiteSpace = 'nowrap';

    function createImage(src) {
        if (mxClient.IS_IE && !mxClient.IS_SVG) {
            var img = document.createElement('div');
            img.style.backgroundImage = 'url(' + src + ')';
            img.style.backgroundPosition = 'center';
            img.style.backgroundRepeat = 'no-repeat';
            img.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block';

            return img;
        }
        else {
            return mxUtils.createImage(src);
        }
    };

    // Delete
    //var img = createImage('images/delete2.png');
    //img.setAttribute('title', 'Delete');
    //img.style.cursor = 'pointer';
    //img.style.width = '16px';
    //img.style.height = '16px';mxEvent.addli
    //
    //mxEvent.addListener(img, 'click',
    //    mxUtils.bind(this, function (evt) {
    //        this.graph.removeCells([this.state.cell]);
    //        mxEvent.consume(evt);
    //    })
    //);
    //this.domNode.appendChild(img);

    // Size
    var img = createImage( ctx + 'resources/images/fit_to_size.png');
    img.setAttribute('title', 'Resize');
    img.style.cursor = 'se-resize';
    img.style.width = '16px';
    img.style.height = '16px';
    mxEvent.addListener(img, 'mousedown',
        mxUtils.bind(this, function (evt) {
            this.start(mxEvent.getClientX(evt), mxEvent.getClientY(evt), 7);
            this.graph.isMouseDown = true;
            //this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
            mxEvent.consume(evt);
        })
    );
    this.domNode.appendChild(img);

    this.graph.container.appendChild(this.domNode);
    this.redrawTools();
};

mxVertexToolHandler.prototype.redraw = function () {
    mxVertexHandler.prototype.redraw.apply(this);
    this.redrawTools();
};

mxVertexToolHandler.prototype.redrawTools = function () {
    if (this.state != null && this.domNode != null) {
        var dy = (mxClient.IS_VML && document.compatMode == 'CSS1Compat') ? 20 : 4;
        this.domNode.style.left = (this.state.x + this.state.width - 56) + 'px';
        this.domNode.style.top = (this.state.y + this.state.height + dy) + 'px';
    }
};

mxVertexToolHandler.prototype.destroy = function (sender, me) {
    mxVertexHandler.prototype.destroy.apply(this, arguments);

    if (this.domNode != null) {
        this.domNode.parentNode.removeChild(this.domNode);
        this.domNode = null;
    }
};
////////////////////////////////改变cell的大小//////////////////////////////

var selectionState;
function listenEdgeStyle() {
    selectionState = Format.prototype.getSelectionState();

    graph.connectionHandler.addListener(mxEvent.CONNECT, function (sender, evt) {
        var cells = [evt.getProperty('cell')];

        if (evt.getProperty('terminalInserted')) {
            cells.push(evt.getProperty('terminal'));
        }

        insertHandler(cells);
    });

    graph.addListener('styleChanged', mxUtils.bind(this, function (sender, evt) {
        var cells = evt.getProperty('cells');
        var vertex = false;
        var edge = false;

        if (cells.length > 0) {
            for (var i = 0; i < cells.length; i++) {
                vertex = graph.getModel().isVertex(cells[i]) || vertex;
                edge = graph.getModel().isEdge(cells[i]) || edge;

                if (edge && vertex) {
                    break;
                }
            }
        }
        else {
            vertex = true;
            edge = true;
        }

        var keys = evt.getProperty('keys');
        var values = evt.getProperty('values');

        for (var i = 0; i < keys.length; i++) {
            var common = mxUtils.indexOf(valueStyles, keys[i]) >= 0;

            // Special case: Edge style and shape
            if (mxUtils.indexOf(connectStyles, keys[i]) >= 0) {
                if (edge || mxUtils.indexOf(alwaysEdgeStyles, keys[i]) >= 0) {
                    if (values[i] == null) {
                        delete Style.prototype.currentEdgeStyle[keys[i]];
                    }
                    else {
                        Style.prototype.currentEdgeStyle[keys[i]] = values[i];
                    }
                }
                // Uses style for vertex if defined in styles
                else if (vertex && mxUtils.indexOf(styles, keys[i]) >= 0) {
                    if (values[i] == null) {
                        delete Style.prototype.currentVertexStyle[keys[i]];
                    }
                    else {
                        Style.prototype.currentVertexStyle[keys[i]] = values[i];
                    }
                }
            }
            else if (mxUtils.indexOf(styles, keys[i]) >= 0) {
                if (vertex || common) {
                    if (values[i] == null) {
                        delete Style.prototype.currentVertexStyle[keys[i]];
                    }
                    else {
                        Style.prototype.currentVertexStyle[keys[i]] = values[i];
                    }
                }

                if (edge || common || mxUtils.indexOf(alwaysEdgeStyles, keys[i]) >= 0) {
                    if (values[i] == null) {
                        delete Style.prototype.currentEdgeStyle[keys[i]];
                    }
                    else {
                        Style.prototype.currentEdgeStyle[keys[i]] = values[i];
                    }
                }
            }
        }
    }));
}

/*****************************Style**************************/
Style = function () {
};

/**
 * 默认边样式
 */
Style.prototype.defaultEdgeStyle = {'rounded': '0', 'html': '1'};
/**
 * 当前边样式
 */
Style.prototype.currentEdgeStyle = Style.prototype.defaultEdgeStyle;
/**
 * 当前顶点样式
 */
Style.prototype.currentVertexStyle = {};
/*****************************Style**************************/

/*****************************Menus**************************/
Menus = function () {
};
/**
 * 改变edge(边)的样式
 * @param menu
 * @param label
 * @param keys
 * @param values
 * @param sprite
 * @param parent
 * @param reset
 * @returns {*}
 */
//Menus.prototype.edgeStyleChange = function (menu, label, keys, values, sprite, parent, reset) {
//    return menu.addItem(label, null, mxUtils.bind(this, function () {
//        graph.stopEditing(false);
//
//        graph.getModel().beginUpdate();
//        try {
//            var cells = graph.getSelectionCells();
//            var edges = [];
//
//            for (var i = 0; i < cells.length; i++) {
//                var cell = cells[i];
//
//                if (graph.getModel().isEdge(cell)) {
//                    if (reset) {
//                        var geo = graph.getCellGeometry(cell);
//
//                        // Resets all edge points
//                        if (geo != null) {
//                            geo = geo.clone();
//                            geo.points = null;
//                            graph.getModel().setGeometry(cell, geo);
//                        }
//                    }
//
//                    for (var j = 0; j < keys.length; j++) {
//                        graph.setCellStyles(keys[j], values[j], [cell]);
//                    }
//
//                    edges.push(cell);
//                }
//            }
//
//            graph.fireEvent(new mxEventObject('styleChanged', 'keys', keys,
//                'values', values, 'cells', edges));
//        }
//        finally {
//            graph.getModel().endUpdate();
//        }
//    }), parent, sprite);
//};

Menus.prototype.edgeStyleChange = function (keys, values, reset) {
    graph.stopEditing(false);

    graph.getModel().beginUpdate();
    try {
        var cells = graph.getSelectionCells();
        var edges = [];

        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];

            if (graph.getModel().isEdge(cell)) {
                if (reset) {
                    var geo = graph.getCellGeometry(cell);

                    // Resets all edge points
                    if (geo != null) {
                        geo = geo.clone();
                        geo.points = null;
                        graph.getModel().setGeometry(cell, geo);
                    }
                }

                for (var j = 0; j < keys.length; j++) {
                    graph.setCellStyles(keys[j], values[j], [cell]);
                }

                edges.push(cell);
            }
        }

        graph.fireEvent(new mxEventObject('styleChanged', 'keys', keys,
            'values', values, 'cells', edges));
    }
    finally {
        graph.getModel().endUpdate();
    }
};

Menus.prototype.createStyleChangeFunction = function (keys, values) {
    return mxUtils.bind(this, function () {
        graph.stopEditing(false);

        graph.getModel().beginUpdate();
        try {
            for (var i = 0; i < keys.length; i++) {
                graph.setCellStyles(keys[i], values[i]);
            }

            graph.fireEvent(new mxEventObject('styleChanged', 'keys', keys, 'values', values,
                'cells', graph.getSelectionCells()));
        }
        finally {
            graph.getModel().endUpdate();
        }
    });
};

Menus.prototype.styleChange = function (menu, label, keys, values, sprite, parent, fn) {
    var apply = Menus.prototype.createStyleChangeFunction(keys, values);

    return menu.addItem(label, null, mxUtils.bind(this, function () {
        if (fn != null) {
            fn();
        }
        else {
            apply();
        }
    }), parent, sprite);
};
/*****************************Menus**************************/

/*****************************Format**************************/
Format = function() {};

Format.prototype.getSelectionState = function () {
    if (this.selectionState == null) {
        this.selectionState = this.createSelectionState();
    }

    return this.selectionState;
};

Format.prototype.createSelectionState = function () {
    var cells = graph.getSelectionCells();
    var result = this.initSelectionState();

    for (var i = 0; i < cells.length; i++) {
        this.updateSelectionStateForCell(result, cells[i], cells);
    }

    return result;
};

Format.prototype.initSelectionState = function () {
    return {
        vertices: [], edges: [], x: null, y: null, width: null, height: null, style: {},
        containsImage: false, containsLabel: false, fill: true, glass: true, rounded: true,
        autoSize: false, image: true, shadow: true
    };
};

Format.prototype.updateSelectionStateForCell = function (result, cell, cells) {
    var graph = graph;

    if (graph.getModel().isVertex(cell)) {
        result.vertices.push(cell);
        var geo = graph.getCellGeometry(cell);

        if (geo != null) {
            if (geo.width > 0) {
                if (result.width == null) {
                    result.width = geo.width;
                }
                else if (result.width != geo.width) {
                    result.width = '';
                }
            }
            else {
                result.containsLabel = true;
            }

            if (geo.height > 0) {
                if (result.height == null) {
                    result.height = geo.height;
                }
                else if (result.height != geo.height) {
                    result.height = '';
                }
            }
            else {
                result.containsLabel = true;
            }

            if (!geo.relative || geo.offset != null) {
                var x = (geo.relative) ? geo.offset.x : geo.x;
                var y = (geo.relative) ? geo.offset.y : geo.y;

                if (result.x == null) {
                    result.x = x;
                }
                else if (result.x != x) {
                    result.x = '';
                }

                if (result.y == null) {
                    result.y = y;
                }
                else if (result.y != y) {
                    result.y = '';
                }
            }
        }
    }
    else if (graph.getModel().isEdge(cell)) {
        result.edges.push(cell);
    }

    var state = graph.view.getState(cell);

    if (state != null) {
        result.autoSize = result.autoSize || this.isAutoSizeState(state);
        result.glass = result.glass && this.isGlassState(state);
        result.rounded = result.rounded && this.isRoundedState(state);
        result.image = result.image && this.isImageState(state);
        result.shadow = result.shadow && this.isShadowState(state);
        result.fill = result.fill && this.isFillState(state);

        var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);
        result.containsImage = result.containsImage || shape == 'image';

        for (var key in state.style) {
            var value = state.style[key];

            if (value != null) {
                if (result.style[key] == null) {
                    result.style[key] = value;
                }
                else if (result.style[key] != value) {
                    result.style[key] = '';
                }
            }
        }
    }
};

Format.prototype.isFillState = function (state) {
    return state.view.graph.model.isVertex(state.cell) ||
        mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null) == 'arrow' ||
        mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null) == 'flexArrow';
};

Format.prototype.isGlassState = function (state) {
    var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);
    return (shape == 'label' || shape == 'rectangle' || shape == 'internalStorage' ||
    shape == 'ext' || shape == 'umlLifeline' || shape == 'swimlane' ||
    shape == 'process');
};

Format.prototype.isRoundedState = function (state) {
    var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

    return (shape == 'label' || shape == 'rectangle' || shape == 'internalStorage' || shape == 'corner' ||
    shape == 'parallelogram' || shape == 'swimlane' || shape == 'triangle' || shape == 'trapezoid' ||
    shape == 'ext' || shape == 'step' || shape == 'tee' || shape == 'process' || shape == 'link' ||
    shape == 'rhombus' || shape == 'offPageConnector' || shape == 'loopLimit' || shape == 'hexagon' ||
    shape == 'manualInput' || shape == 'curlyBracket' || shape == 'singleArrow' ||
    shape == 'doubleArrow' || shape == 'flexArrow' || shape == 'card' || shape == 'umlLifeline');
};

Format.prototype.isAutoSizeState = function (state) {
    return mxUtils.getValue(state.style, mxConstants.STYLE_AUTOSIZE, null) == '1';
};

Format.prototype.isImageState = function (state) {
    var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);
    return (shape == 'label' || shape == 'image');
};

Format.prototype.isShadowState = function (state) {
    var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);
    return (shape != 'image');
};
/*****************************Format**************************/

var addItem = mxUtils.bind(this, function (menu, width, cssName, keys, values, parent) {
    var menus = new Menus();
    var item = menus.styleChange(menu, '', keys, values, 'geIcon', parent);

    var pat = document.createElement('div');
    //pat.style.width = width + 'px';
    //pat.style.height = '1px';
    pat.style.height = '10px';
    pat.style.borderBottom = '1px ' + cssName + ' black';
    //pat.style.paddingTop = '6px';
    pat.style.marginBottom = '10px';

    item.firstChild.firstChild.style.padding = '0px 4px 0px 4px';
    item.firstChild.firstChild.style.width = width + 'px';
    item.firstChild.firstChild.appendChild(pat);

    return item;
});

/**
 * 添加右键菜单项快捷键，右对齐
 * @param item 菜单
 * @param shortcut 快捷键
 */
var addShortcut = function (item, shortcut) {
    if (shortcut != null) {
        var td = item.firstChild.nextSibling.nextSibling;
        var span = document.createElement('span');
        span.style.color = 'gray';
        mxUtils.write(span, shortcut);
        td.appendChild(span);
    }
};

/**
 * 改变连线宽度
 * @param lineWidth
 */
var strokeWidthChange = function (lineWidth) {
    var value = Math.min(999, Math.max(1, (isNaN(lineWidth)) ? 1 : lineWidth));

    if (value != mxUtils.getValue(selectionState.style, mxConstants.STYLE_STROKEWIDTH, 1)) {
        graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, value, graph.getSelectionCells());
        graph.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_STROKEWIDTH],
            'values', [value], 'cells', graph.getSelectionCells()));
    }
};

/**
 * 改变连线的终点样式
 */
var edgeStyleEnd = function(end) {
    if (end == mxConstants.STYLE_ENDARROW) {
        graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_CLASSIC, graph.getSelectionCells());
        graph.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ENDARROW],
            'values', [end], 'cells', graph.getSelectionCells()));
    } else {
        graph.setCellStyles(mxConstants.STYLE_ENDARROW, null, graph.getSelectionCells());
        graph.fireEvent(new mxEventObject('styleChanged', 'keys', null,
            'values', null, 'cells', graph.getSelectionCells()));
    }
}


/**
 * 改变连线颜色
 * @param color
 */
var strokeColorChange = function (color) {
    //console.log(selectionState.style);
    if (color != mxUtils.getValue(selectionState.style, mxConstants.STYLE_STROKECOLOR, '#6482B9')) {
        graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, color, graph.getSelectionCells());
        graph.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_STROKECOLOR],
            'values', [color], 'cells', graph.getSelectionCells()));
    }
};

/**
 * 改变连线文本属性(字体大小、颜色等)
 * @param color
 */
var lineLabelChange = function (key, value) {
    var defaultValue = '';
    if (key == mxConstants.STYLE_FONTCOLOR) {
        defaultValue = '#6482B9';
    } else if (key == mxConstants.STYLE_FONTSIZE) {
        defaultValue = 1;
    }
    if (value != mxUtils.getValue(selectionState.style, key, defaultValue)) {
        graph.setCellStyles(key, value, graph.getSelectionCells());
        graph.fireEvent(new mxEventObject('styleChanged', 'keys', [key],
            'values', [value], 'cells', graph.getSelectionCells()));
    }
};

/**
 * 打开颜色选择器
 * @param cell
 */
var showPickColorModal = function(cell) {
    var url = ctx + 'step/line/color';
    //console.log(cell.getStyle());
    var color = mxUtils.getValue({'strokeColor': findStyleValueByKey(cell, mxConstants.STYLE_STROKECOLOR)}, mxConstants.STYLE_STROKECOLOR, '#6482B9');
    var params = 'stepId=' + cell.getStepId() + '&color=' + color.replace('#', '');
    StageDialog({
        modalId: 'color',
        title: '线条颜色选择器',
        url: url + '?' + params,
        width: '320px',
        height: '220px',
        showFooter: false
    });
};

/**
 * 打开线条粗细选择器
 * @param cell
 */
var showPickStrokeWidthModal = function (cell) {
    var url = ctx + 'step/line/width';
    var width = mxUtils.getValue({'strokeWidth': findStyleValueByKey(cell, mxConstants.STYLE_STROKEWIDTH)}, mxConstants.STYLE_STROKEWIDTH, 3);
    var params = 'stepId=' + cell.getStepId() + '&width=' + width;
    StageDialog({
        modalId: 'width',
        title: '线条宽度',
        url: url + '?' + params,
        width: '320px',
        height: '120px',
        showFooter: false
    });
};

function findStyleValueByKey(cell, attr) {
    var cellStyle = cell.getStyle();
    if (!isEmpty(cellStyle)) {
        var styles = cellStyle.split(';');
        var styleLen = styles.length;
        for (var i = styleLen; i > 0; i--) {
            var kv = styles[i - 1].split('=');
            if (attr == kv[0]) {
                return kv[1];
            }
        }
    }
}
/////////////////////////////////////////////////改变edge属性//////////////////////////////////////////////////
/**
 * 显示页面模态框方法
 * @param cell
 */
function showPages(cell) {
    var stepid = cell.stepId;
    if (!isEmpty(stepid)) {
        $.ajax(ctx + "step/showGroupId/" + stepid, {
            type: "POST",
            success: function (res) {
                if (res.result) {
                    if(res.type == 1){
                        //判断是否拥有参数配置权限
                        openInitCommon(res.flowid,stepid);
                    }else {
                        showAlert("提示内容","此组件无配置参数属性！");
                    }
                }
            }
        });
    }
}
//var mxImgBasePath = ctx + 'resources/images/mx/';
function listenerGraphCell() {
    // 鼠标点击事件
    //graph.addListener(mxEvent.CLICK, function (sender, evt) {
    //    var cell = evt.getProperty('cell');
    //    console.log(cell);
    //    if (cell != null) {
    //    	var self = this;
    //    	var model = self.cellEditor.graph.getModel();
    //    	var curCell = model.getCell(cell.id);
    //    	model.beginUpdate();
    //    	try {
    //    		self.cellEditor.graph.setCellStyles("strokeColor", "#00FF00", [curCell]);
    //    		self.cellEditor.graph.setCellStyles("strokeWidth", "3", [curCell]);
    //    	} finally {
    //    		model.endUpdate();
    //    	}
    //    	var highlight = new mxCellHighlight(graph, '#00FF00', 3);
    //    	highlight.highlight(graph.view.getState(cell));
    //    }
    //});

    /**
     * 鼠标双击事件
     * */
    graph.dblClick = function (evt, cell) {
        showPages(cell);
    };

    mxEvent.disableContextMenu(document.body);//禁用浏览器自带右键菜单
    mxRectangleShape.prototype.crisp = true;// 去锯齿效果
    graph.panningHandler.autoExpand = true;// 设置自动扩大鼠标悬停

    // 覆写右键单击事件  mxPopupMenu
    graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
        var taskState = mxGraph.prototype.getTaskState();
        var numOp, opType = mxGraph.prototype.getOpType();
        if (!isEmpty(mxGraph.prototype.getFlowOp()))
            numOp = parseInt(mxGraph.prototype.getFlowOp());
//		console.log(numOp);
        if (!isEmpty(cell)) {//cell不为空，则在组件上右键点击
            /**查看、编辑**/
            if(!cell.isEdge()){
                menu.addItem('编辑组件参数属性', null, function () {
                    showPages(cell);
                }, null, null,cell.vertex != 3);
            }

            /**重命名**/
            if (opType != Etl.task && !cell.isEdge()) {
                menu.addItem('编辑组件属性', null, function () {
                    showEdgeLabelAttrModal(cell,1);
                }, null, null ,cell.vertex != 3);
//					menu.addSeparator();
//                 menu.addItem('重命名', null, function () {
//                     if (!getTaskStateByFlowId(flowCfgId))
//                         graph.startEditing(cell);
//                 }, null, null);
            }

            menu.addSeparator();

            if(cell.vertex == 3) {
                menu.addItem('重命名', null, function () {
                    graph.startEditingAtCell(cell);
                }, null, null,true);
            }



            /**任务的停止、运行**/
//                 var run2StepText;
//                 if (isEmpty(taskState)) {
//                     run2StepText = "运行";
//                 } else if (taskState == Task.complete) {
//                     run2StepText = "运行任务";
//                 } else {
//                     run2StepText = (taskState != Task.cancel ? '停止任务' : '运行任务');
//                 }
//                 // GLOB.run[cell.getStepId()] = cell;
//                 menu.addItem(run2StepText, null, function () {
//                     if (taskState == Task.cancel) {
// //						cell.setStepState(1);//设置为运行状态
//                         operate4Flow(1, cell.getStepId(), cell);//启动
//                     }
//                     else {
// //						cell.setStepState(0);//状态为0表示停止
//                         operate4Flow(1, cell.getStepId(), cell);
//                     }
//                 }, null, null, (numOp >= 4));//!isTaskRun(cell.getTaskId())
//                 /**环节的运行、停止**/
//				var runThisStepText = cell.getStepState() != Step.stop ? '停止该环节' : '运行该环节';
//				menu.addItem(runThisStepText, null, function(){
//					if(cell.getStepState()==Step.stop){
//						startStep(taskId, cell.taskStepId, null, cell);//启动
//					}
//					else{
//						stopStep(taskId, cell.taskStepId, null, cell);
//					}
//				}, null,null,opType == Etl.task && numOp >= 4);
//				console.log(mxGraph.prototype.getOpType());
            /**流程配置页面可见、任务页面不可见**/
            if (opType != Etl.task) {
                // if (numOp >= 2) {//至少具有修改权限
                if(!cell.isEdge()){
                    menu.addSeparator();
                    var copyMenu = menu.addItem('复制', null, function () {
                        copy();
                    });
                    addShortcut(copyMenu, 'Ctrl+C');
                    var cutMenu = menu.addItem('剪切', null, function () {
                        cut();
                    });
                    addShortcut(cutMenu, 'Ctrl+X');

                    var delMenu = menu.addItem('删除', null, function () {
                        del();
                    });
                    addShortcut(delMenu, 'Delete');
                    menu.addSeparator();

                    var groupMenu = menu.addItem('分组/取消', null, function () {
                        UnorGroup();
                    });
                    addShortcut(groupMenu);
                }

                if (cell.isEdge()) { // cell是连线才能修改
                    var menus = new Menus();
                    menu.addItem('设置为默认样式', null, function () {
                        if (graph.isEnabled() && !graph.isSelectionEmpty())
                        {
                            setDefaultStyle(graph.getSelectionCell());
                        }
                    });
                    menu.addSeparator();
                    //var connectionMenu = menu.addItem('连接类型', null, null);
                    //menu.addItem('', null, function () {
                    // 不支持连线形状
                    //menus.styleChange(menu, '', [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, 'width'], [null, null, null, null], 'geIcon geSprite geSprite-connection', connectionMenu);
                    //menus.styleChange(menu, '', [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, 'width'], ['link', null, null, null], 'geIcon geSprite geSprite-linkedge', connectionMenu);
                    //menus.styleChange(menu, '', [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, 'width'], ['flexArrow', null, null, null], 'geIcon geSprite geSprite-arrow', connectionMenu);
                    //menus.styleChange(menu, '', [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, 'width'], ['arrow', null, null, null], 'geIcon geSprite geSprite-simplearrow', connectionMenu);

                    var waypointMenu = menu.addItem('路径类型', null, null);
                    menu.addItem('', null, function () {
                        menus.edgeStyleChange([mxConstants.STYLE_EDGE, mxConstants.STYLE_NOEDGESTYLE], [null, null], true);
                    }, waypointMenu, 'geIcon geSprite geSprite-straight');
                    menu.addItem('', null, function () {
                        menus.edgeStyleChange([mxConstants.STYLE_EDGE, mxConstants.STYLE_NOEDGESTYLE], ['orthogonalEdgeStyle', null], true);
                    }, waypointMenu, 'geIcon geSprite geSprite-orthogonal');

                    var patternMenu = menu.addItem('线条样式', null, null);
                    addItem(menu, 75, 'solid', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], [null, null], patternMenu);
                    addItem(menu, 75, 'dashed', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', null], patternMenu);
                    addItem(menu, 75, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 4'], patternMenu);

                    // 终点样式
                    var endMenu = menu.addItem('终点样式', null, null);
                    menu.addItem('有箭头', null, function () {
                        edgeStyleEnd('endArrow');
                    }, endMenu);
                    menu.addItem('无箭头', null, function () {
                        edgeStyleEnd('endFill');
                    }, endMenu);

                    // 字体大小
                    var strokeWidthMenu = menu.addItem('字体大小', null, null);
                    menu.addItem('1 pt', null, function () {
                        strokeWidthChange(1);
                    }, strokeWidthMenu);
                    menu.addItem('3 pt', null, function () {
                        strokeWidthChange(3);
                    }, strokeWidthMenu);
                    menu.addItem('5 pt', null, function () {
                        strokeWidthChange(5);
                    }, strokeWidthMenu);
                    menu.addItem('10 pt', null, function () {
                        strokeWidthChange(10);
                    }, strokeWidthMenu);
                    menu.addItem('自定义...', null, function () {
                        showPickStrokeWidthModal(cell);
                    }, strokeWidthMenu);

                    var strokeWidthMenu = menu.addItem('线条颜色', null, null);
                    menu.addItem('红色', null, function () {
                        strokeColorChange('#FF0000');
                    }, strokeWidthMenu);
                    menu.addItem('蓝色', null, function () {
                        strokeColorChange('#0000FF');
                    }, strokeWidthMenu);
                    menu.addItem('黄色', null, function () {
                        strokeColorChange('#FFFF00');
                    }, strokeWidthMenu);
                    menu.addItem('黑色', null, function () {
                        strokeColorChange('#000000');
                    }, strokeWidthMenu);
                    menu.addItem('自定义...', null, function () {
                        showPickColorModal(cell);
                    }, strokeWidthMenu);
                }
            }
        } else {//在组件之外右键点击
                menu.addItem('查看源码', null, function () {
                    openXmlSourceModal();
                }, null, null, true);
                menu.addItem('清除默认样式', null, function () {
                    clearDefaultStyle();
                }, null, null, true);
                var vewMenu = menu.addItem('视图', null, function () {
                    clearDefaultStyle();
                }, null, null, true);
                var gridText = '';
                if (graph.isGridEnabled()) {
                    gridText = '隐藏网格';
                } else {
                    gridText = '显示网格';
                }
                menu.addItem(gridText, null, function () {
                    graph.setGridEnabled(!graph.isGridEnabled());
                    updateGraphComponents();
                    graph.fireEvent(new mxEventObject('gridEnabledChanged'));
                }, vewMenu, null, true);
                var guideText = '';
                if (graph.graphHandler.guidesEnabled) {
                    guideText = '隐藏导航线';
                } else {
                    guideText = '显示导航线';
                }
                menu.addItem(guideText, null, function () {
                    graph.graphHandler.guidesEnabled = !graph.graphHandler.guidesEnabled;
                    graph.fireEvent(new mxEventObject('guidesEnabledChanged'));
                }, vewMenu, null, true);
                menu.addSeparator();

                var pasteMenu = menu.addItem('打印', null, function () {
                    print();
                }, null, null);
                addShortcut(pasteMenu, 'Ctrl+Shift+P');
                var showMenu = menu.addItem('显示', null, function () {
                    show();
                }, null, null);
                addShortcut(showMenu, 'Ctrl+Shift+S');
                //var exportMenu = menu.addItem('导出为图片', null, function () {
                //    exportImg();
                //}, null, null, numOp >= 1);
                //addShortcut(exportMenu, 'Ctrl+Shift+E');
            menu.addSeparator();
            var pasteMenu = menu.addItem('粘贴', null, function () {
                paste();
            }, null, null, true);
            addShortcut(pasteMenu, 'Ctrl+V');
            var pasteMenu = menu.addItem('撤销', null, function () {
                undo();
            }, null, null, true);
            addShortcut(pasteMenu, 'Ctrl+z');
            var pasteMenu = menu.addItem('恢复', null, function () {
                redo();
            }, null, null, true);
            addShortcut(pasteMenu, 'Ctrl+Shift+z');
        }

//		var editor = new mxEditor();
//		var graph = editor.graph;
//		editor.setGraphContainer(document.getElementById("graphWorkSpace"));
//		var config = mxUtils.load(ctx + 'resources/editors/config/keyhandler-minimal.xml').getDocumentElement();
//		editor.configure(config);
//
//		// Configures the automatic layout for the table columns
//		editor.layoutSwimlanes = true;
//		editor.createSwimlaneLayout = function ()
//		{
//			var layout = new mxStackLayout(this.graph, false, 0, 0);
//			layout.fill = true;
//			layout.resizeParent = true;
//
//			// Overrides the function to always return true
//			layout.isVertexMovable = function(cell)
//			{
//				return true;
//			};
//
//			return layout;
//		};
//		createPopupMenu(editor, graph, menu, cell, evt);
    };

}

//Function to create the entries in the popupmenu
//function createPopupMenu(editor, graph, menu, cell, evt)
//{
//	if (cell != null)
//	{
//		if (graph.isHtmlLabel(cell))
//		{
//			menu.addItem('编辑', ctx + 'resources/editors/images/properties.gif', function()
//			{
//				editor.execute('properties', cell);
//			});
//
//			menu.addSeparator();
//		}
//
//		menu.addItem('运行', ctx + 'resources/images/mx/delete2.png', function()
//		{
//			editor.execute('delete', cell);
//		});
//
//		menu.addSeparator();
//		menu.addItem('剪切', null, function()
//	    {
//			cut();
//	    });
//		menu.addItem('复制', null, function()
//	    {
//			copy();
//	    });
//		menu.addItem('删除', null, function()
//		{
//			graph.removeCells();
//		});
//	}
//
//	menu.addItem('粘贴', null, function()
//    {
//		paste();
//    });
//
//}

/**有如下几种情况不能进行编辑
 * 1、任务页面
 * 2、流程下存在运行的任务
 * 3、当前用户没有拥有修改权限**/
function propertiesEdit(cell) {
    var func = cell.getBondFunction();
    var stepId = cell.stepId;
    var parentId = getParentStepId(cell);
    var iTaskId = taskId;
    var flowRight = mxGraph.prototype.getFlowOp();
    var imgUrl = cell.getStepImage();// 这里获取不到？？？
    if (isEmpty(imgUrl)) {
        $.ajax({
            type: "post",
            async: false,
            cache: false,
            url: ctx + "component/step/" + cell.getComponentId(),
            success: function (res) {
                if (res && res.result) {
                    imgUrl = ctx + res.component.icoFilePath;
                }
            },
            error: function () {
                return null;
            }
        });
    }
    if (cell.getTaskId())
        iTaskId = cell.getTaskId();
    if (!iTaskId) {
//			iTaskId = 0;
        iTaskId = -1;//taskId为-1表示不能编辑
        $.ajax({
            type: "post",
            async: false,
            cache: false,
            url: ctx + "flow/task/" + flowCfgId,
            success: function (res) {
                if (res.result && res.task) {
                    var len = res.task.length;
                    for (var i = 0; i > -len; i--) {
                        if (res.task[-i].taskState == Task.running) {
//								iTaskId = res.task[-i].taskId;
                            iTaskId = 0;
                            break;
                        }
                    }
                }
            },
            error: function () {
                return null;
            }
        });
    }

    // 打开组件配置模态框
    if (!isEmpty(func)) {
        eval(func + "('" + stepId + "','" + parentId + "','" + iTaskId + "','" + flowCfgId + "','" + (isEmpty(cell.taskStepId) ? "-1" : cell.taskStepId) + "','" + flowRight + "','" + imgUrl + "')");//调用组件绑定的函数
    }
}

function showEdgeModal(cell) {
    var url = ctx + 'step/line/attr';
    var params = 'stepId=' + cell.getStepId();
    StageDialog({
        modalId: 'edge',
        title: 'Line属性',
        url: url + '?' + params,
        width: '600px',
        height: '320px',
        showFooter: false
    });
}

/**
 * 文本属性编辑模态框
 * @param cell
 */
function showEdgeLabelAttrModal(cell,num) {
    addCell = cell;
    var stepId = addCell.getStepId();
    var fontSize = mxUtils.getValue({'fontSize': findStyleValueByKey(cell, mxConstants.STYLE_FONTSIZE)}, mxConstants.STYLE_FONTSIZE, 11);
    var fontColor = mxUtils.getValue({'fontColor': findStyleValueByKey(cell, mxConstants.STYLE_FONTCOLOR)}, mxConstants.STYLE_FONTCOLOR, '#000000');
    var fontFamily = mxUtils.getValue({'fontFamily': findStyleValueByKey(cell, mxConstants.STYLE_FONTFAMILY)}, mxConstants.STYLE_FONTFAMILY, 'Helvetica');
    var labelText = cell.getValue();
    var url = ctx + 'step/line/label/attr';
    var params = 'fontSize=' + fontSize + '&fontColor=' + fontColor.replace('#', '')  + '&stepId=' + stepId+ '&fontFamily=' + fontFamily+'&labelText='+encodeURI(encodeURI(labelText))+'&num='+num;
    StageDialog({
        modalId: 'label',
        title: '编辑组件信息',
        url: url + '?' + params,
        width: '600px',
        height: '330px',
        showFooter: false
    });
}

/**
 * 监听Label的改变事件
 * */
function listenerLabelChange() {
    graph.addListener(mxEvent.LABEL_CHANGED, function (sender, evt) {
        var cell = evt.getProperty("cell");
        var label = cell.getValue();
        var stepId = cell.getStepId();
        $.post(ctx + "step/mng/update", {
            label: label,
            stepId: stepId
        }, function (env) {
            if (!env.result) {
//				MessageAlert(env.msg);
                parent.showTopMsg(BTAlert.danger, '错误', env.msg);
            }
        }, "json");
    });
}

/*读取父节点的stepId*/
function getParentStepId(cell) {
    var edgeCount = cell.getEdgeCount();
    var parentId = "";
    for (var i = 0; i < edgeCount; i++) {
        var edge = cell.getEdgeAt(i);
        if (edge.source.getStepId() != cell.getStepId()) {
            parentId += edge.source.getStepId() + ";";
        }
    }
    return parentId;
}

/*读取子子节点列表*/
function getChildStepIds(stepId) {
    var ret = [];
    var cells = getAllCells();//获取所有组件
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].getStepId() == stepId) {
            var edges = cells[i].edges || cells[i].target.edges;
            for (var j = 0; j < edges.length; j++) {
                if (cells[i].style != edges[j].target.style) {
                    ret.push(edges[j].target);
                    if (edges[j].target.edges != null) {
                        fillChildStep(edges[j].target.edges, edges[j].target.getStepId(), ret);
                    }
                }
            }
        }
    }
    return ret;
}

function fillChildStep(cells, stepId, ret) {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].target && cells[i].target.getStepId() != stepId) {
            var edges = cells[i].edges || cells[i].target.edges;
            for (var j = 0; j < edges.length; j++) {
                if (cells[i].target.style == edges[j].target.style) {
                    ret.push(edges[j].target);
                    if (edges[j].target.edges != null) {
                        fillChildStep(edges[j].target.edges, edges[j].target.getStepId(), ret);
                    }
                }
            }
        }
    }
}

function getCurrentCells(stepId) {
    var stepIds;
    if (typeof stepId == 'object') {
        stepIds = stepId;
    } else if (!isEmpty(stepId)) {
        stepIds = [parseInt(stepId)];
    }
    var cells = getAllCells();//获取所有组件
    var ret = [];
    for (var i = 0; i < cells.length; i++) {
        if ($.inArray(cells[i].getStepId(), stepIds) > -1) {
            ret.push(cells[i]);
        }
    }
    return ret;
}

function disConnectSourceAndTarget(cells) {
    if (!isEmpty(cells)) {
        for (var i = 0; i < cells.length; i++) {
            //source和target都不为空，cell表示连接线
            if (!isEmpty(cells[i].source) && !isEmpty(cells[i].target)) {
                //删除连接线时，断开连接线两边组件的关系，方便保存时判断所有环节是否都是从【开始环节】开始运行
                return updateRelationBetweenSourceAndTarget(cells[i].source.stepId, cells[i].target.stepId);
            } else {//删除环节时，会删除环节的所有连线
                var edges = cells[i].edges;//该环节所用连线
                for (var j = 0; j < edges.length; j++) {
                    var edge = edges[j];//每条连线对应两个环节，分别称为source和target
                    if (!isEmpty(edge.source) && !isEmpty(edge.target))
                        return updateRelationBetweenSourceAndTarget(edge.source.stepId, edge.target.stepId);
                }
            }
        }
    }
}

//断开组件之间的关系
function updateRelationBetweenSourceAndTarget(sourceStepId, targetStepId) {
    var flag = false;
    $.ajax({
        type: "post",
        async: false,
        url: ctx + "step/component/disconnect",
        data: {
            sourceStepId: sourceStepId,
            targetStepId: targetStepId
        },
        success: function (r) {
            if (r.result) {
                flag = true;
            }
        }
    });
    return flag;
}

// 放大
function zoomIn() {
    graph.zoomIn();
}

// 缩小
function zoomOut() {
    graph.zoomOut();
}


/**
 * 是否是简单的元素
 * */
function isEmpty(data) {
    if (typeof(data) == "undefined" || data == null || data == "null" || data == "")
        return true;
    return false;
}



function configureStylesheet(graph) {
//	var style = new Object();
//	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
//	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
//	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
//	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_BOTTOM;
//	style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
//	style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
//	style[mxConstants.STYLE_IMAGE] = ctx + 'resources/images/menu/datacollect.png';
//	graph.getStylesheet().putCellStyle('image', style);

//	var style = initStyle();//初始化
    var style = mxUtils.clone(initStyle());
    style[mxConstants.STYLE_IMAGE] = ctx + 'resources/images/menu/start.png';//这里图片应该从数据库中获取
    graph.getStylesheet().putCellStyle('cs-1', style);
};

/**由于有些流程非常复杂，绘图区显示不下，如果通过缩小视图，又看不见组件文字描述。有些用户则不愿意
 * 拖动画布来查看盲区图形(即在画布可见区外)，而且运维人员需要通过stepId来快速定位到某个组件。
 * 1.定义查找图形的方法，根据遍历画布中的所有组件，通过stepId定位到图形cell
 * 2.通过上一步定位到图形cell，然后选中它，并将选中cell显示在画布中心，并高亮显示
 */
//var highlight = new mxCellHighlight(graph, '#ff0000', 2);
var locateCell = function (cell) {
    var x = -cell.geometry.x + ($('#graphWorkSpace').width() - cell.geometry.width) / 2;
    var y = -cell.geometry.y + ($('#graphWorkSpace').height() - cell.geometry.height) / 2;
    //mxGraphView
    graph.getView().setTranslate(x, y);

//    highlight.highlight(graph.getView.getState(cell));
}

var findCellById = function (stepInfo) {
    if (!isEmpty(stepInfo)) {
        var cells = getAllCells();//获取所有组件
        var cell = findCellByStepInfo(cells, stepInfo);//根据stepId查找cell
        if (cell) {
            graph.setSelectionCell(cell);//选中cell
            locateCell(cell);//定位到cell，让cell在画布中心
        } else {
//			MessageSlide('没有找到环节ID或环节名称为【' + stepInfo +'】的组件！');
            parent.showTopMsg(BTAlert.warning, '警告', '没有找到符合条件的组件');
        }
    }
}

function findCellByStepInfo(cells, stepInfo) {
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        if (cell.getStepId() == stepInfo || cell.getTaskStepId() == stepInfo || cell.getValue().toLowerCase().indexOf(stepInfo.toLowerCase()) != -1) {
            return cell;
        }
    }
    return null;
}

/**利用graph.getGraphBounds()与graph.view.setTranslate()方法居中，然后来个while循环，
 * 如果内容宽高比container大就zoomOut()缩小，直到内容小于container的宽高为止。
 **/
//mxGraph.prototype.zoomToCenter = function(margin){
//    var bounds = this.getGraphBounds();
//    margin = margin || 10;
// 
//    this.container.style.overflow = "hidden";
// 
//    this.view.setTranslate(
//        -bounds.x -(bounds.width - this.container.clientWidth)/ 2,
//        -bounds.y - (bounds.height - this.container.clientHeight) / 2
//    );
//     
//    while( (bounds.width + margin * 2) > this.container.clientWidth
//            || (bounds.height + margin * 2) > this.container.clientHeight ){
//        this.zoomOut();
//        bounds = this.getGraphBounds();
//    }
//     
//    this.container.style.overflow = "auto";
// 
//};

//重写鼠标滚轮事件
mxEvent.addMouseWheelListener = function (funct) {
}

function addScrollListener(element, wheelHandle) {
    if (typeof element != 'object')return;
    if (typeof wheelHandle != 'function')return;

    // 监测浏览器
    //IE, KHTML(Safari, Chrome), Opera对应的事件名称是 "mousewheel"
    //而 Gecko(Firefox, Netscape) 对应的事件名称是 "DOMMouseScroll"
    if (typeof arguments.callee.browser == 'undefined') {
        var user = navigator.userAgent;
        var b = {};
        b.opera = user.indexOf("Opera") > -1 && typeof window.opera == "object";
        b.khtml = (user.indexOf("KHTML") > -1
            || user.indexOf("AppleWebKit") > -1
            || user.indexOf("Konqueror") > -1)
            && !b.opera;
        b.ie = user.indexOf("MSIE") > -1 && !b.opera;
        b.gecko = user.indexOf("Gecko") > -1 && !b.khtml;
        arguments.callee.browser = b;
    }
    if (element == window)
        element = document;
    if (arguments.callee.browser.ie)
        element.attachEvent('onmousewheel', wheelHandle);
    else
        element.addEventListener(
            arguments.callee.browser.gecko ? 'DOMMouseScroll'
                : 'mousewheel', wheelHandle, false);
}

function wheelHandle(e) {
    var upcheck;
    //（IE、Opera、Safari、Firefox、Chrome）中Firefox 使用detail，其余四类使用wheelDelta表示滚轮向上（大于0）或向下（小于0）
    if (e.wheelDelta) {
        upcheck = e.wheelDelta > 0 ? 1 : 0;
    } else {
        upcheck = e.detail < 0 ? 1 : 0;
    }
    if (upcheck) {
        graph.zoomIn();
    } else {
        graph.zoomOut();
    }

    if (window.event) {
        e.returnValue = false;
        window.event.cancelBubble = true;
    } else {
        e.preventDefault();
        e.stopPropagation();
    }
}

//所有环节必须从【开始环节】开始运行，也就是说所有环节
//必须是【开始环节】的直接或间接子环节，否则不能保存
function isCanSave() {
    var canSave = true;
    var cells = getAllCells();
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        // 如果分组，那么该cell存在children
        var cellChildren = cell.children;
        //console.log(cellChildren);
        if (!isEmpty(cellChildren)) {
            i++;
            var childrenLen = cellChildren.length;
            for (var k = 0; k < childrenLen; k++) {
                if(!doValidate(cellChildren[k])) return false;
            }
        } else {
            // 未分组
            if(!doValidate(cell)) return false;
        }
    }
    return canSave;
}

/**
 * 校验连线的合法性
 * @param cell
 * @returns {boolean}
 */
function doValidate(cell) {
    if (cell.isVertex()) {
        var edges = cell.edges;
        if (!isEmpty(edges)) {
            var edgeLen = edges.length;// 连线的条数
            if (edgeLen == 0) {// 连线条数为0，表示该环节为单独环节
                return false;
            } else if (edgeLen >= 1) {
                for (var j = 0; j < edgeLen; j++) {
                    var edge = edges[j];
                    if (isEmpty(edge.source.stepId)) {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
    }

    return true;
    //}
}

/**
 * 查看流程源码
 */
function openXmlSourceModal() {
    var xml = getXml();
    var body = '<textarea class="form-control" rows="20" style="margin-bottom: 15px;">' + xml + '</textarea>';
    var edgeModal = getComponentStr('XML源码', body, null, null, null, false);
    parent.$(edgeModal).modal({backdrop: 'static', keyboard: false}); // 显示组件模态框
}

/**
 * 分组
 * @param cell
 */
function doGroup(cell) {
    if (!isEmpty(cell)) {
        // 生成一个环节
        $.post(ctx + "step/group", {
            flowId: flowIdAll,
            style: cell.getStyle(),
            stepName: cell.getValue()
        }, function (res) {
            if (res.result) {
                cell.setStepId(res.stepId);
                cell.setConnectable(false);
            }
        }, "json");
    }
}