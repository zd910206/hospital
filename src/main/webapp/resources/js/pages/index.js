var flowIdAll;

var flowTreeNode;
//左侧流程树
var dzNodes = [];
var dsetting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    view: {
        showLine: false
    },
    async: {
        type: 'post',
        enable: true,//是否异步
        url: ctx + "department/tree/data",
        autoParam: ["id=departmentId", "name"]//传递参数
        /* otherParam:{"otherParam":"zTreeAsyncTest"},
         dataFilter: filter   */
    },
    callback: {
        beforeClick: beforeClick,
        onClick: dOnClick,
        onRightClick: zTreeOnRightClick
    }
};

function dOnClick(e, treeId, treeNode) {
//     showFlowNotSaveModal(loadFlowCfg, treeNode.id, null);
//     var flowId = getFlowId(treeNode.id);
    loadFlowCfg(treeNode.id);
}


function beforeClick(treeId, treeNode) {
    var check = (treeNode && !treeNode.isParent);
    /* if (!check) alert("只能选择部门"); */
    return check;
}

/*鼠标右键菜单*/
var rMenuConfig = [{
    text: '打开',
    callback: function (e, treeId, treeNode) {
        dOnClick(e, treeId, treeNode);
    }
},  {
    text: '删除',
    callback: function (e, treeId, treeNode) {
        parent.Modal.confirm({
            msg: "确定要删除流程[" + treeNode.name + "]吗？"
        }).on(
            function (e) {
                if (e) {
                    $.post(ctx + "flow/mng/delete", {ids: treeNode.id}, function (res) {
                        if (res.result) {
                            var cells = getAllCells();
                            graph.removeCells(cells);
                            flowTreeNode.removeNode(treeNode);
                            parent.showTopMsg(BTAlert.info, '提示', res.message);
                        } else {
                            parent.showTopMsg(BTAlert.warning, '警告', res.message);
                        }
                    }, 'json');
                }
            });
    }
}];

//显示右键菜单
function showRMenu(event, treeId, treeNode) {
    var x = event.clientX;
    var y = event.clientY;
    var that = $("#rMenu").empty();
    $.each(rMenuConfig, function (i, val) {
        var dom = document.createElement('a');
        dom.innerHTML = val.text;
        $(dom).appendTo(that);
        $(dom).click(function () {
            val.callback.call(this, event, treeId, treeNode);
            hideRMenu();
        });
    });

    $("#rMenu").css({"top": y + "px", "left": x + "px", "display": "block"});
}

//隐藏右键菜单
function hideRMenu() {
    $("#rMenu").hide();
}

function zTreeOnRightClick(event, treeId, treeNode) {
    if (!treeNode) {
        flowTreeNode.cancelSelectedNode();
    } else if (treeNode && !treeNode.noR) { //noR属性为true表示禁止右键菜单
        if (beforeClick(treeId, treeNode) == true) {
            // flowTreeNode.cancelSelectedNode();
            showRMenu(event, treeId, treeNode);
        } else
            flowTreeNode.cancelSelectedNode();

    }
};

// 获取流程Id
function getFlowId(stepId) {
    var flowId;
    var url = ctx + "step/getFlowId";
    $.ajax({
        url: url,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        data: {"stepId":stepId},
        type: "POST",
        async:false,//这里选择异步为false，那么这个程序执行到这里的时候会暂停，等待
                    //数据加载完成后才继续执行
        success: function (data) {
            flowId = data.flowId;
        }
    });
     return flowId;
}

// 初始化页面
$(document).ready(function () {
    typeof(THEME) == 'undefined' && (THEME = 'blue/');
    loadBottomToolMenu();
    initOperateBar(flowIdAll);
    flowTreeNode = $.fn.zTree.init($("#flowTree"), dsetting, dzNodes);//初始化流程树
    //鼠标点击事件不在节点上时隐藏右键菜单
    $("body").bind("mousedown", function (event) {
        if (!(event.target.id == "rMenu" || $(event.target)
                .parents("#rMenu").length > 0)) {
            $("#rMenu").hide();
        }
    });
    initGraphWork();

    $('[data-toggle="tooltip"]').tooltip();

    // 不绑定快捷键，组合键会与系统冲突，单个字母按键导致无法正常输入英文字母
    $(document).keydown(function (e) {
        //var a = e.keyCode;
        hotKeyBind(e);
    });

});

/**初始化画布和菜单**/
function initGraphWork() {
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error('Browser is not support!', 200, false);
    } else {
        initImgConn(ctx + 'resources/images/connector.gif');//// 定义悬停时显示的连接线图标
        createGraphArea("graphWorkSpace");

        listenerGraphCell();
        listenerLabelChange();
        graphListenerHandler();
        initOutLine("miniature");
    }
}
function refreshAll() {
    refreshFlowTree();
    // refreshTaskTree();
}

/**
 * 刷新流程树
 */
function refreshFlowTree() {
    $.fn.zTree.getZTreeObj("flowTree").reAsyncChildNodes(null, "refresh");
}
/**
 * 刷新任务树
 */
function refreshTaskTree() {
    $.fn.zTree.getZTreeObj("taskTree").reAsyncChildNodes(null, "refresh");
}
/**
 * 刷新收藏树
 */
function refreshCollectTree() {
    $.fn.zTree.getZTreeObj("collectTree").reAsyncChildNodes(null, "refresh");
}

/**
 * 加载并监听工具栏
 * 组件
 * */
function loadBottomToolMenu(type) {
    $.ajax({
        type: "post",
        url: ctx + "component/toolMenus",
        dataType: "json",
        success: function (env) {
            if (env.result) {
                var group = document.getElementById("groupTools");
                $('#groupTools').empty();
                $('#opts').empty();
                var datas = env.data;
                var flag = true;
                var maxComp = parseInt(($(window).width() - 80) / 60);
                for (var index = 0; index < datas.length; index++) {
                    var spanDescLabel = document.createElement("span");
                    if (index == 0) {
                        if (datas[index]['id'] == 'TOOL_START') {//
                            spanDescLabel.style.display = 'none';
                        } else {
                            spanDescLabel.className = "hover";
                            flag = false;
                        }
                    }
                    if (flag && index == 1)
                        spanDescLabel.className = "hover";

                    spanDescLabel.innerHTML = datas[index]['name'];
                    group.appendChild(spanDescLabel);
                    //group.append("<span>"+datas[index]['name']+"</span>");

                    var modules = document.getElementById("opts");
                    //var modules = $("#opts")

                    /******************add***************/
                    var tagDiv1 = document.createElement("div");
                    tagDiv1.className = "views-list";
                    if (index != 0) {
                        tagDiv1.style.display = 'none';
                    } else {
                        tagDiv1.style.display = 'block';
                    }

                    var tagA = document.createElement("a");
                    tagA.href = "javascript:void(0);";
                    tagA.className = "prev disabled-btn";
                    $(tagA).html('&lt;');

                    var tagB = document.createElement("a");
                    tagB.href = "javascript:void(0);";
                    tagB.className = "next";
                    $(tagB).html('&gt;');

//					tagDiv1.appendChild(tagA);

                    var tagDiv2 = document.createElement("div");
                    tagDiv2.className = "view-wrap";

                    var tagDiv3 = document.createElement("div");
                    tagDiv3.className = "items";
                    /****************************************/

                    var moduleUL = document.createElement("ul");

                    //var html ="<ul>";
                    var style = initStyle();//初始化
                    var menuLen = datas[index]['menus'].length;
                    for (var j = 0; j < menuLen; j++) {
                        var module = datas[index]['menus'][j];

                        var moduleLI = document.createElement("li");
                        var linkA = document.createElement("a");
                        linkA.setAttribute('data-toggle', 'tooltip');
                        linkA.setAttribute('title', module['name']);
                        linkA.style.cursor = 'move'; // 鼠标样式为move
                        var imgDesc = document.createElement("img");
                        imgDesc.src = ctx + module['imgPath'];
                        //imgDesc.title = module['otherData']['desc'];
                        //imgDesc.title = module['name'];
                        //克隆样式
                        style = mxUtils.clone(style);
                        //每个组件的图片路径
                        style[mxConstants.STYLE_IMAGE] = ctx + module['imgPath'];
                        var componentName = module['name']; // 组件名
                        var componentId = module['otherData']['componentId']; // 组件id
                        // 组件ID为数字，作为cell样式的key会导致拖拽的组件无法显示，所以在前面加上cs前缀
                        // cs:CellStyle的缩写，cs+组件ID作为cell样式的key，value为style
                        graph.getStylesheet().putCellStyle('cs' + componentId, style);
                        // 向画布中插入组件
                        //console.log(graph.getStylesheet().styles);
                        addVertex(imgDesc, 50, 50, componentName, 'cs' + componentId, false, componentId, type);

                        var descH1 = document.createElement("h1");
                        descH1.innerHTML = componentName;

                        linkA.appendChild(imgDesc);
                        linkA.appendChild(descH1);
                        moduleLI.appendChild(linkA);
                        //隐藏组件栏中开始组件图标，防止被拖拽，如果从后台过滤掉该组件的话会导致流程中的组件图标无法显示，所以在此隐藏该组件
                        if (componentId != -1) {
                            //$(moduleLI).style.display='none';
                            moduleUL.appendChild(moduleLI);
                        }
                    }
                    /*********************************/
                    //标签页下面的组件超过最多能显示的个数，则可以滚动
                    if (menuLen > maxComp) {
                        $(moduleUL).addClass('J_pro_view');
                        if (index == 1) {
                            $(moduleUL).addClass('current');
                        }
                        tagDiv1.appendChild(tagA);
                        $(tagDiv2).css('margin-left', '30px').css('margin-right', '30px');
                    }
                    tagDiv3.appendChild(moduleUL);
                    tagDiv2.appendChild(tagDiv3);

                    tagDiv1.appendChild(tagDiv2);
                    if (menuLen > maxComp) {
                        tagDiv1.appendChild(tagB);
                    }
//					tagDiv1.appendChild(tagB);
                    modules.appendChild(tagDiv1);
//					console.log($(modules).html());
                    /*********************************/
//					modules.appendChild(moduleUL);
                }
                initMenu();
                $('[data-toggle="tooltip"]').tooltip();
                initCurrentFlow();  //初始化当前流程   画布上显示

            } else {
                showAlert('提示', env.msg);
            }
        },
        error: function () {
//			parent.$.messager.progress('close');
//			MessageAlert("加载出错啦，请检查网络连接");
            parent.showTopMsg(BTAlert.danger, '提示', '加载组件失败，请检查网络连接');
            return;
        }
    });
}

/**
 * 初始化菜单
 * */
function initMenu() {
    //选项卡封装
    function tab(o1, o2, o3, c, e) {
        o1.each(function (i) {
            $(this).bind(e, function () {
                o2.hide().eq(i).fadeIn();

                o1.removeClass(c);
                $(this).addClass(c);

                o2.each(function () {
                    $(this).removeClass('current');
                });

                o2.eq(i).addClass('current');

                o3.each(function (j) {
                    $(this).hide();
                });

                o3.eq(i).css('display', 'block');

                initCurrentTab();

            });
            if ($(this).hasClass(c)) {
                $(this).addClass(c);
                o2.hide().eq(i).fadeIn();
            }
        });
    }

    //选项卡封装 end
    tab($(".TabTop span"), $(".Tabconter ul"), $(".Tabconter .views-list"), "hover", "click"); //选项卡封装调用

    //工具效果
    $(".Tool").toggle(function () {
        $(".Tool").animate({
            left: -1
        });
    }, function () {
        $(".Tool").stop().animate({
            left: -47
        });
    });
    initCurrentTab();
}

function initCurrentTab() {
    // 每页能显示的最多组件数，60为每个组件的宽度
    var maxComp = parseInt(($(window).width() - 80) / 60);
    var page = 1;// 初始为第一版
//	var J_pro = $(".J_pro_view .current");// 图片列表区域
    var J_pro = $(".current");// 图片列表区域
    J_pro.animate({"margin-left": "0px"}, 0);//第一页
    $(".prev").addClass("disabled-btn");
    // var view_wrap=$(".view-wrap").width();//图片显示固定范围
    var num = 5;
    var view_wrap = num * 60;//每次滚动5个组件宽度
    var total = $(".current li").length;// 图片总数
    if (total < maxComp) return;
//	console.log(view_wrap + ":" + total);
    var total_page = Math.round(total / num) + 1;// 总页数
    // 下一页
    $(".next").click(function () {
        if (!J_pro.is(":animated")) { // 如果正处于动画中的则不进行动画
            if (page == total_page) {
                // 最后一版，动画跳回第一版
                $(this).addClass("disabled-btn");
                return false;
                // J_pro.animate({"margin-left": "0px" }, 300);//如果是是最后一屏就回到第一屏
                // page = 1;
            } else {
                // 跳到下一版
                $(".prev").removeClass("disabled-btn");
                $(this).removeClass("disabled-btn");
                J_pro.animate({
                    "margin-left": "-=" + view_wrap
                }, 300);
                page++;
            }
        }
    });
    // 上一页
    $(".prev").click(function () {
        if (!J_pro.is(":animated")) { // 如果正处于动画中的则不进行动画
            if (page == 1) {
                // 第一个版面，动画跳到最后一版
                $(this).addClass("disabled-btn");
                return false;
                // J_pro.animate({"margin-left": "-=" + view_wrap * (total_page
                // - 1) }, 300);//如果是
                // page = total_page;
            } else {
                // 跳到下一版
                $(".next").removeClass("disabled-btn");
                $(this).removeClass("disabled-btn");
                J_pro.animate({
                    "margin-left": "+=" + view_wrap
                }, 300);
                page--;
            }
        }
    });
}

// 初始化创建、保存、发布、回退等按钮
function initOperateBar(flowId) {
    var html = '';
    // var inport = '<span><a class="opa"onclick = "importFlow()" data-toggle="tooltip" data-placement="bottom" title="导入文件"><img class="opimg" style="width:14px;height:14px;" src="' + ctx + 'resources/images/import.png"/>导入</a></span>';
    var create = '<span><a class="opa" onclick="createFlow();" data-toggle="tooltip" data-placement="bottom" title="创建流程"><img class="opimg" style="width:14px;height:14px;" src="' + ctx + 'resources/images/glyphicons_folder_plus.png"/>创建</a></span>';
    var save = '<span><a class="opa" onclick="saveFlow();" data-toggle="tooltip" data-placement="bottom" title="保存流程"><img class="opimg" style="width:14px;height:14px;" src="' + ctx + 'resources/images/glyphicons_file.png"/>保存</a></span>';
    var open = '<span><a class="opa" onclick="openFlow();" data-toggle="tooltip" data-placement="bottom" title="打开流程"><img class="opimg" style="width:14px;height:14px;" src="' + ctx + 'resources/images/glyphicons_folder_open.png"/>打开</a></span>';
    var runHTML = '<span><a id="oper-task" class="opa start" onclick="startCollect();" data-toggle="tooltip" data-placement="bottom" title="启用采集流程"><img class="opimg" style="width:14px;height:14px;" src="' + ctx + 'resources/images/glyphicons_start.png"/>启用</a></span>';
    var cancel = '<span><a class="opa" onclick="stopCollect();" data-toggle="tooltip" data-placement="bottom"  title="停用采集流程"> <img class="opimg"style="width:14px;height:14px;" src="' + ctx + 'resources/images/glyphicons_stop.png"/>停用 </a></span>'
    var version = '<span><a class="opa" onclick="publishVersion();" data-toggle="tooltip" data-placement="bottom" title="发布新版本"><img class="opimg" style="width:14px;height:14px;" src="' + ctx + 'resources/images/glyphicons-file-import.png"/>发布</a></span>';
    var rollBack = '<span><a class="opa" onclick="rollBack();" data-toggle="tooltip" data-placement="bottom" title="回退历史版本"><img class="opimg" style="width:14px;height:14px;" src="' + ctx + 'resources/images/glyphicons-file-export.png"/>回退</a></span>';
    var lookRunState = '<span><a class="opa" onclick="lookRunState();" data-toggle="tooltip" data-placement="bottom" title="查看运行状态"><img class="opimg" style="width:14px;height:14px;" src="' + ctx + 'resources/images/glyphicons_search.png"/>查看</a></span>';
    if (flowId == undefined || flowId == null) {
        html += create + save + open + version + rollBack + lookRunState;
        $('#navbarDiv').html(html);
    } else {
        $.post(ctx + "isUse/addOperate", {
            flowId: flowId
        }, function (env) {
            if (env.len == "0") {
                html += create + save + open + version + rollBack + runHTML + lookRunState;
                $('#navbarDiv').html(html);
            } else {
                //MessageAlert(env.msg);
                html += create + save + open + version + rollBack + cancel + lookRunState;
                $('#navbarDiv').html(html);
            }
        }, "json");
        // var run = !noStart ? runHTML : '';
        // html += create + save + open + cancel + run+version + rollBack+lookversion;
        // html += create + save + open + version + rollBack ;
        // $('#navbarDiv').html(html);
        return html;
    }
}

/**
 *  画布上显示当前流程
 */
function initCurrentFlow() {
    $.ajax({
        type: "post",
        url: ctx + "step/config/load/",
        dataType: "json",
        success: function (env) {
            if (env.result) {
                var cell = [];
                //加载画布
                for(var i = 0;i < env.stepList.length; i++) {
                    var step = env.stepList[i];
                    stepJson.push(JSON.stringify(step) );
                    cell.push(step);
                }
                var cells = getAllCells();
                for (var i = 0; i < cells.length; i++) {
                    var cell = cells[i];
                    if (graph.getModel().getChildCount(cell) > 0) {
                        cell.setConnectable(false); // 分组组件不可连接
                    }
                }
            }
            else {
                parent.showTopMsg(BTAlert.danger, '错误', env.msg);
            }
        }
    });
}

/**获取所有cell**/
function getAllCells() {
    var graphModel = graph.getModel();
    var bossCell = graph.getDefaultParent();
    var cells = [];
    var vertexCells = graph.getChildVertices(bossCell);
    if (!isEmpty(vertexCells)) {
        for (var i = 0; i < vertexCells.length; i++) {
            var cell = vertexCells[i];
            cells.push(cell);
            if (graphModel.getChildCount(cell) > 0) { // 分组
                Array.prototype.push.apply(cells, getChildCells(vertexCells[i]));
            }
        }
    }
    return cells;
}

/**
 * 获取分组下的cell
 */
function getChildCells(cell) {
    var graphModel = graph.getModel();
    var cells = [];
    if (graphModel.getChildCount(cell) > 0) {
        Array.prototype.push.apply(cells, graphModel.getChildVertices(cell));
    }
    if (cells.length > 0) {
        for (var i = 0; i < cells.length; i++) {
            Array.prototype.push.apply(cells, getChildCells(cells[i])); // 递归调用
        }
    }
    return cells;
}
/**
 * 弹出参数属性配置页面
 */
function openInitCommon(flowCfgId, stepId) {
    var h;
    if (stepId > 0) {
        h = '500px';
    } else {
        h = '500px';
    }
    StageDialog({
        url: ctx + 'pages/attr/config.jsp?flowId=' + flowCfgId + '&stepId=' + stepId,
        title: '属性参数配置',
        id: 'modal-content',
        width: '900px',
        height: h,
        imgUrl: ctx+'resources/images/config.png',
        showFooter: false
    });
}

//获取该流程下的所有任务
function getTaskStateByFlowId(flowId) {
    var flag = false;
    // if (mxGraph.prototype.getOpType() == Etl.task)
    //     return true;
    var url = ctx + "step/showFlowId";
    $.ajax(url, {
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(flowId),
        type: "POST",
        success: function (res) {
            if (!res.ifFlag) {
                flag = true;
            }
        }
    });
        return flag;
}
/**
 * 导入文件
 */
function importFlow(){
    StageDialog({
        url: ctx + 'pages/attr/importFlow.jsp',
        title: '导入文件',
        width: '800px',
        height: '200px',
        showFooter: false
    });
}

/**
 * 保存流程
 * */
function saveFlow() {
    if (flowIdAll== undefined) {
        showAlert('提示', '请先打开或创建一个流程');
    }else {
        var xml = getGraphXML();//获取画布的xml
        //console.log(xml);
        //根据流程Id保存该流程对应的xml
        $.post(ctx + "flow/xml/save", {
            xml: xml,
            flowCfgId: flowIdAll
        }, function (env) {
            if (env.result) {
                parent.showTopMsg(BTAlert.info, '提示', env.msg);
            }
            else
                parent.showTopMsg(BTAlert.danger, '警告', env.msg);
        }, "json");
        refreshFlowTree();//刷新左边流程菜单树
    }
}

/**
 * @param flowId 流程Id
 * @param loadTaskId 任务Id
 * @param type 类型 流程或任务
 * @param parentNmae 部门或任务状态类型
 * @param name  流程或任务名称
 * @param flowTaskState 如果打开的是任务，这里是任务状态
 * @param isReloadMenu 是否重新加载底部组件
 * @param disableStart 禁用启动按钮 default undefined or false
 */
function loadFlowCfg(flowId) {
    flowIdAll = flowId;
    initOperateBar(flowId);
    graph.setEnabled(true);
//	showBtMask();
    //判断流程是否保存，如果没有保存，则提示用户保存流程
    //这里用户可能会存在几种操作：
    //1、用户拖拽组件后，没保存，直接打开另一个流程或进行其它操作
    //2、用户拖拽组件后又删除，没保存，直接打开另一个流程或进行其它操作
    $.ajax({
        type: "post",
        url: ctx + "flow/config/load/" + flowId,
        data: "flowId=" + flowId,
        dataType: "json",
        success: function (env) {
            if (env.result) {
                flowName = env.data.flowName;
                version = env.data.version;

                // var isFollow = isEmpty(env.isFollow) ? null : env.isFollow;
                // var warningSteps = env.warningSteps;//告警环节列表

                // //停止当前栏目运行按钮图标
                // $('#oper-task').addClass("start").removeClass("stop");
                // $('#oper-task').text() != null && ($('#oper-task').text('启动新任务').attr('title', '启动'));

                flowCfgId = env.data.flowId;//新打开的流程Id
                // taskId = loadTaskId;//新打开的任务Id

                //加载历史画布

                    if (!isEmpty(env.data.xmlInfo)) {
                        var doc = mxUtils.parseXml(env.data.xmlInfo);//解释xml
                        // console.log(env.data.xmlInfo);
                        var codec = new mxCodec(doc);
                        codec.decode(doc.documentElement, graph.getModel());
                    }
					// hideB3tMask();//加载成功
                    // 撤销和恢复只针对当前流程有效，所有每次打开流程的时候，需要清空历史
                    // if (!undoMng.isEmpty()) {
                    //     undoMng.clear(); // Clears the command history.
                    // }
                    //
                    var cells = getAllCells();
                    for (var i = 0; i < cells.length; i++) {
                        var cell = cells[i];
                        if (graph.getModel().getChildCount(cell) > 0) {
                            cell.setConnectable(false); // 分组组件不可连接
                        }
                    }

                    // 撤销和恢复只针对当前流程有效，所有每次打开流程的时候，需要清空历史
                    if (!undoMng.isEmpty()) {
                        undoMng.clear(); // Clears the command history.
                    }
                // if (parseInt(mxGraph.prototype.getFlowOp()) < 2 && type != Etl.task) {
                //     parent.showTopMsg(BTAlert.warning, '警告', '您只有查看该流程的权限，若需要修改和启动流程，请与系统管理员联系。');
                // }

                var nav_str = "当前流程";
                nav_str += " &gt; " + flowName;
                nav_str += " &nbsp;&nbsp;当前版本";
                if(version == null) {
                    nav_str += " &gt; " + "未发布的版本";
                }else {
                    nav_str += " &gt; " + version;
                }

//                 var navMenu = initOperateBar(flowTaskState, flowOp, type, isFollow, disableStart);
// //				initToolTipDlg();
//                 if (isEmpty(type)) {
//                     if (env.nav.f_app_name && env.nav.f_app_name != env.topDepart)
//                         nav_str += env.nav.f_app_name + " &gt; ";
//
//                     if (env.nav.app_name)
//                         nav_str += env.nav.app_name + " &gt; ";
//
//                     if (env.nav.flow_name)
//                         nav_str += env.nav.flow_name;
//                 } else if (type == Etl.task) {
//                     nav_str += getTaskStatusByType(parentName) + '&nbsp;&nbsp;';
//                     nav_str += isEmpty(name) ? "任务" : "任务" + " &gt; " + parentName + " &gt; " + name;
//                 } else if (type == Etl.flow) {
//                     nav_str += parentName + " &gt; " + name;
//                 } else {
//                     nav_str += "流程";
//                 }

                // //组建状态初始化
                // if (warningSteps) {
                //     // [,3056,3057]导致JSON.parse错误
                //     setCurrentStepWarningStyle(JSON.parse(warningSteps.replace('[,', '[')));
                // }
                // else
                //     setCurrentStepWarningStyle([]);
                //
                // $('#navbarDiv').html(navMenu);
                $('#navStr').html(nav_str);
                // $('[data-toggle="tooltip"]').tooltip();
            } else {
//				MessageAlert(env.msg);
				hideBtMask();
                // parent.showTopMsg(BTAlert.danger, '错误', env.msg);
            }
        }
    });
//	projectId = null;
}

/**
 * 打开新建流程对话框
 * */
function createFlow() {
    StageDialog({
        url: ctx + 'pages/flow/createFlow.jsp?userId=' + userId,
        title: '创建流程',
        width: '800px',
        height: '240px',
        showFooter: false
    });
}

//启动采集流程
function startCollect(){
    if (flowIdAll== undefined) {
        showAlert('提示', '请先打开或创建一个流程');
    }else {
        var versionNun = versionNum(flowIdAll);
        if(versionNun == 0) {
            showAlert("提示","该流程还未发布有版本！")
        } else {
            StageDialog({
                url: ctx + "pages/publish/startCollect.jsp?flowId=" + flowIdAll,
                title: '启动采集',
                width: '800px',
                height: '420px',
                showFooter: false
            });
        }
    }

}

//停止采集流程
function stopCollect(){
    parent.Modal.confirm({
        msg: "确定要停用当前流程吗？" }).on(
        function (r) {
            if (r) {
                showBtMask();
                $.post(ctx + "isUse/stopCollect", {
                    flowId: flowIdAll
                },function(env){
                    hideBtMask();
                    if(env.result){
                        parent.showTopMsg(BTAlert.info, '提示', env.message);
                        initOperateBar(flowIdAll);
                    }else{
                        parent.showTopMsg(BTAlert.warning, '警告', env.message);
                    }
                },"json");
            }
        });
}
/**
 * 发布新版本
 */
function publishVersion() {
    if (flowIdAll== undefined) {
        showAlert('提示', '请先打开或创建一个流程');
    }else {
        StageDialog({
            url: ctx + "pages/publish/publish.jsp?flowId=" + flowIdAll,
            title: '流程发布',
            width: '800px',
            height: '200px',
            showFooter: false
        });
    }
}

/**
 * 回退
 */
function rollBack() {
    if (flowIdAll== undefined) {
        showAlert('提示', '请先打开或创建一个流程');
    }else {
        var versionNun = versionNum(flowIdAll);
        if (versionNun == 0) {
            showAlert("提示", "该流程还未发布有版本！")
        } else {
            StageDialog({
                url: ctx + "pages/publish/rollBack.jsp?flowId=" + flowIdAll,
                title: '流程回退',
                width: '800px',
                height: '420px',
                showFooter: false
            });
        }
    }
}
/**
 *  统计发布的版本数量
 */
function versionNum(flowId){
        var versionNum;
        var url = ctx + "publish/versionNum";
        $.ajax({
            url: url,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            data: {"flowId":flowId},
            type: "POST",
            async:false,
            success: function (data) {
                versionNum = data.len;
            }
        });
        return versionNum;
}

/**
 * 打开流程操作
 * */
function openFlow() {
    StageDialog({
        url: ctx + 'pages/flow/openFlow.jsp',
        title: '打开流程',
        width: '800px',
        height: '400px',
        showFooter: false
    });
}

/**
 *  查看运行状态
 */
function lookRunState() {

}



