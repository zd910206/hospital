<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String CONTEXT_PATH = com.talkweb.web.web.util.Constants.HOST_NAME + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1"/>
    <meta http-equiv='X-UA-Compatible' content='IE=5,IE=9'/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>拓维大数据应用平台</title>
    <link rel="shortcut icon" type="image/x-icon" href="<%=CONTEXT_PATH%>resources/images/talkyun.ico">
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="<%= CONTEXT_PATH%>resources/bootstrap/css/bootstrap-theme.min.css"/>
    <link rel="stylesheet" type="text/css" href="<%= CONTEXT_PATH%>resources/bootstrap/css/bootstrap-sidebar.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/css/inx.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/css/reset.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/default/css/base.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/default/css/main.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/default/css/boxy.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/css/metro.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/css/grapheditor.css"/>

    <style type="text/css">
        .navbar {
            position: absolute;
            z-index: 1001;
        }

        /*#graphWorkSpace {*/
            /*position: absolute;*/
        /*}*/

        .workspace:-moz-full-screen {
            width: 100%;
            height: 100%;
        }

        .panel-header {
            background: whitesmoke;
        }

        .panel-title {
            height: 18px;
            line-height: 18px;
        }

        .messager-body.panel-body.panel-body-noheader.panel-body-noborder.window-body.window-body-noheader {
            width: auto;
        }

        .navbar {
            min-height: 30px;
            margin-bottom: 0px;
        }

        .navbar-brand {
            height: 30px;
            padding: 5px;
            font-size: 14px;
        }

        .navbar-default {
            background-color: #f5f5f5;
            border-radius: 0px;
            background-image: none;
            width: 100%;
            padding-right: 5px;
        }

        .panel-default > .panel-heading {
            background-image: none;
            padding: 6px 15px;
            cursor: pointer;
            /* background-color: #424750;*/
        }

        .panel-heading:hover {
            color: #fff;
            background-image: none;
            background-color: #424750;
        }

        .panel-group .panel {
            border-radius: 0px;
        }

        .panel-group {
             padding: 0 2px 0 2px;
        }

        .panel-title {
            font-size: 14px;
        }

        #accordion .active {
            color: #fff;
            background-image: none;
            background-color: #424750;
        }

        .collapsed {
            color: #fff;
        }

        .ztree li span.button.root_open {
            background-position: -105px -44px;
        }

        .ztree li span.button.root_close {
            background-position: -126px -44px;
        }

        .ztree li span.button.noline_open {
            background-position: -105px -84px;
        }

        .ztree li span.button.noline_close {
            background-position: -125px -84px;
        }

        .opimg {
            height: 16px;
            width: 16px;
            margin-bottom: 5px;
        }

        .opa {
            line-height: 30px;
            margin-right: 15px;
        }

        .ztree li a:hover {
            color: #fff;
            /* background-color: #0088cc; */
            background-color: #2D96FF;
            text-decoration: none;
        }

        .ztree li a.curSelectedNode {
            color: #fff;
            /* background-color: #0088cc; */
            background-color: #2D96FF;
        }

        .view-wrap ul {
            padding: 0;
            margin: 0;
            width: 20000em;
        }

        /* .view-wrap li{list-style-type:none;float:left;width:40px;height:40px;background:#f0f0f0;border:solid 1px #ccc;margin-right:5px;text-align:center;line-height:120px;font-size:20px;font-weight:700;margin-left:5px;box-shadow:1px 2px 5px rgba(0, 0, 0, 0.2);}
         */
        .view-wrap, .items {
            width: 99%;
            overflow: hidden;
            height: 124px; /* margin-left:25px; */
            margin-right: 5px;
        }

        .views-list {
            position: relative; /* width:530px; margin-left:40px;margin-right: 40px;*/
        }

        .prev {
            left: 0px;
            top: 0;
        }

        .next {
            position: absolute;
            right: 0px;
        }

        .prev:hover {
            background: #555;
        }

        .next:hover {
            background: #555;
        }

        .prev, .next {
            position: absolute;
            height: 80px;
            width: 40px;
            background: #ccc;
            border: solid 1px #ccc;
            top: 0;
            text-align: center;
            line-height: 80px;
            color: #000;
            text-decoration: none;
            font-size: 30px;
            font-weight: bold;
            top: 5px;
        }

        .disabled-btn {
            opacity: 0.5;
            filter: alpha(opacity=50);
        }

        .fullscreen {
            position: absolute;
            z-index: 10001;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }

        div#rMenu {
            background-color: #555555;
            text-align: left;
            padding: 2px;
            width: 100px;
            position: absolute;
            display: none;
            z-index: 10000;
        }

        div#rMenu a {
            display: block;
            margin: 0;
            padding: 3px 6px;
            color: #fff;
        }

        div#rMenu a:hover, div#rMenu a:visited {
            color: #333;
            background: #fff;
        }
    </style>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/html5shiv.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/jscolor.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/jquery/jquery.ztree.all-3.5.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/zTree-util.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/jquery/jquery.layout.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/jquery/jquery.ui.all.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/jquery/jquery.roll.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/json2.js"></script>
    <!-- jquery easyUI -->
    <script type="text/javascript">
        var contextPath = "<%=CONTEXT_PATH%>";
        var ctx = "<%=CONTEXT_PATH%>";
        var path = "<%=path%>";
        var mxBasePath = "<%=CONTEXT_PATH%>resources/js/mxGraph";
        <%--var mxBasePath = "<%=CONTEXT_PATH%>resources";--%>
        var THEME = 'default/';
        var graph;
        var flowCfgId = "${flowId}"; //流程ID
        var flowName = "${flowName}";
        var userId = "${user.userId}"; //用户ID
        //var ifTaskStateChange = false;//默认任务状态没有改变

        var stepJson = [];

        $(function () {
            // 禁用浏览器右键菜单
            document.body.oncontextmenu = function () {
                return false
            };

            $('[data-toggle="tooltip"]').tooltip();

            $('.ztree').css('height', parent.document.documentElement.clientHeight);

            /* $("#menu-toggle").click(function(e) {
             e.preventDefault();
             $("#wrapper").toggleClass("toggled");

             if($('#wrapper').hasClass('toggled')){
             $('#menu-toggle').attr('src', ctx + 'resources/images/glyphicons_right.png').attr('title', '展开左边菜单');
             }else{
             $('#menu-toggle').attr('src', ctx + 'resources/images/glyphicons_left.png').attr('title', '收缩左边菜单');
             }
             }); */

            $("#resize").bind("click", function () {
                var $graphObj = $("#page-content-wrapper");
                if ($graphObj.hasClass('fullscreen')) {
                    $(this).attr('src', ctx + 'resources/images/glyphicons_resize_full.png');
                    $(this).removeAttr('title').attr('data-original-title', '隐藏左边和底部菜单');
                    $graphObj.css('height', $(window).height() - 120);
                    $graphObj.css('width', $(window).width() - 250);
                    $graphObj.removeClass('fullscreen');
                } else {
                    $(this).attr('src', ctx + 'resources/images/glyphicons_resize_small.png');
                    $(this).removeAttr('title').attr('data-original-title', '显示左边和底部菜单');
                    $graphObj.css('height', $(window).height());
                    $graphObj.css('width', $(window).width());
                    $graphObj.addClass('fullscreen');
                }
                $('[data-toggle="tooltip"]').tooltip();
            });

            $('.panel-title a').each(function () {
                $(this).bind('click', function () {
                    $('.panel-heading').each(function () {
                        $(this).removeClass('active');
                    });
                    if ($(this)[0].id.trim() != 'headingOne') {
                        $('#refresh').css('color', 'black');
                    } else {
                        $('#refresh').css('color', 'white');
                    }
                    $(this).parent().parent().addClass('active');
                });
            });

            $('.panel-heading').each(function () {
                $(this).bind('click', function () {
                    if ($(this)[0].id.trim() != 'headingOne') {
                        $('#refresh').css('color', 'black');
                    } else {
                        $('#refresh').css('color', 'white');
                    }
                    $('.panel-heading').each(function () {
                        $(this).removeClass('active');
                    });
                    $(this).addClass('active');
                });
            });
        });
    </script>
</head>
<body>

<div id="wrapper">

    <!-- 左边树形菜单 -->
    <div id="sidebar-wrapper" style="overflow:hidden">
        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true" style="margin-bottom: 0px">
            <a onclick="refreshAll();"><span id="refresh" class="glyphicon glyphicon-refresh" data-toggle="tooltip"
                                             data-placement="bottom" title="刷新"
                                             style="position: absolute;margin-left: 210px;margin-top: 8px;color: white;"
                                             aria-hidden="true"></span></a>
            <%-- <span style="margin-left: 10px;"><a class="opa" onclick="refreshAll();"><img class="opimg" src="<%=CONTEXT_PATH%>resources/images/glyphicons-refresh.png"/>刷新</a></span> --%>
            <div class="panel panel-default">
                <div class="panel-heading active" role="tab" id="headingOne" data-toggle="collapse"
                     data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true"
                           aria-controls="collapseOne">
                            菜单
                        </a>
                        <!-- <span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> -->
                    </h4>
                </div>
                <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                    <div class="panel-body" style="padding: 0px;overflow: auto; ">
                        <ul id="flowTree" class="ztree" style="height: 100%"></ul>
                    </div>
                </div>
            </div>
        </div>
        <ul class="sidebar-nav">

        </ul>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content 中间显示div -->
    <div id="page-content-wrapper">
        <!-- <a href="#menu-toggle" class="btn btn-default" id="menu-toggle">Toggle Menu</a> -->
        <div id="workspace" class="workspace">
            <nav class="navbar navbar-default" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header" id="navbarDiv" style="color:#777;"> </div>

                    <div id="navStr" style="text-align: right;line-height: 30px;font-weight: bold;color:#777;">
                    </div>
                </div>
            </nav>
            <div class="add-cut" id="add-cut">
                <img src="<%=CONTEXT_PATH%>resources/images/glyphicons_plus.png"
                     style="cursor: pointer;width: 17px;height: 17px;padding: 2px;margin-top: 8px;margin-left: 5px;"
                     data-toggle="tooltip" data-placement="bottom" title="放大" onclick="zoomIn();"/>
                <img src="<%=CONTEXT_PATH%>resources/images/glyphicons_minus.png"
                     style="cursor: pointer;width: 12px;height: 3px;margin-top: 8px;margin-left: 8px;"
                     data-toggle="tooltip" data-placement="bottom" title="缩小" onclick="zoomOut();"/>
                <img src="<%=CONTEXT_PATH%>resources/images/glyphicons_undo.png"
                     style="cursor: pointer;width: 18px;height: 10px;margin-top: 8px;margin-left: 8px;"
                     data-toggle="tooltip" data-placement="bottom" title="撤销(Ctrl+Z)" onclick="undo();"/>
                <img src="<%=CONTEXT_PATH%>resources/images/glyphicons_redo.png"
                     style="cursor: pointer;width: 18px;height: 10px;margin-top: 8px;margin-left: 8px;"
                     data-toggle="tooltip" data-placement="bottom" title="恢复(Ctrl+Shift+Z)" onclick="redo();"/>
                <img src="<%=CONTEXT_PATH%>resources/images/glyphicons_bin.png"
                     style="cursor: pointer;width: 12px;height: 15px;margin-top: 8px;margin-left: 8px;"
                     data-toggle="tooltip" data-placement="bottom" title="删除(Delete)" onclick="del();"/>
                <img id="resize" src="<%=CONTEXT_PATH%>resources/images/glyphicons_resize_full.png"
                     style="cursor: pointer;width: 15px;height: 15px;margin-top: 8px;margin-left: 8px;"
                     data-toggle="tooltip" data-placement="bottom" title="隐藏左边和底部菜单" onclick="del();"/>
            </div>
            <div id="graphWorkSpace" style="z-index: 99;left: 0px;width: 100%;height: 100%;"></div>
            <a class="miniatureIoc" href="javascript:;"></a>

            <div id="miniature"
                 style="cursor:move;position:absolute;border:solid 2px; z-index: 100;bottom: 5px;right: 5px;width: 180px; height: 180px;border-color: rgb(211, 211, 221);"></div>
        </div>
    </div>
    <!-- /#page-content-wrapper -->

</div>

<!-- 下方标签页-->
<div class="TabList" id="tabDiv" style="height: 120px;width: 100%;border: 1px solid #ddd;margin-top: 4px;">
    <div class="TabTop" id="groupTools" style="font-size: 12px;"></div>
    <div class="Tabconter" id="opts" style="font-size: 12px;"></div>
</div>

<div id="rMenu">
</div>

<%-- <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/easyui/locale/easyui-lang-zh_CN.js"></script> --%>
<script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/jquery.boxy.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/mxGraph/js/mxClient.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/common.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/pages/graph.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/pages/index.js"></script>
<script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/highcharts/highcharts.js"></script>

<!-- etl -->
<%--<script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/pages/attr/module_etl.js"></script>--%>
</body>
</html>