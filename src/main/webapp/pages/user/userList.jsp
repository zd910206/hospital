<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
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
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/js/easyui/themes/bootstrap/easyui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/js/easyui/themes/icon.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/css/font.css">
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/css/basic.css"/>

    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/bootstrap/css/bootstrap-theme.min.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/bootstrap/css/bootstrap-table.css"/>

    <style type="text/css">
        /*解决超多列显示问题*/
        table {
            table-layout: fixed;
        }

        button[name=refresh] {
            height: 34px;
        }
    </style>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/html5shiv.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="<%= CONTEXT_PATH%>resources/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/bootstrap-modal-tips.js"></script>
    <script type="text/javascript" src="<%= CONTEXT_PATH%>resources/bootstrap/js/bootstrap-table.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/json2.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/common.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/crud.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/mng/user.js"></script>

    <title>用户管理</title>
    <script type="text/javascript">
        var ctx = "<%=CONTEXT_PATH%>";
        var contextPath = "<%=CONTEXT_PATH%>";
        var GLOB = {
            dlg: {}
        };
        $(function () {
            loadUserData();
        });

    </script>
</head>
<body>
<div class="bars pull-left">
    <div id="custom-toolbar">
        <div class="form-inline" role="form" style="margin: 10px;">
            <div class="form-group">
                <label class="control-label" for="userName">用户名</label>
                <input class="form-control" id="userName" name="userName" style="width: 220px">
            </div>

            <div class="form-group">
                <label class="control-label" for="userType">是否为管理员</label>
                <select id="userType" name="userType" class="form-control">
                    <option value="">请选择</option>
                    <option value="1">是</option>
                    <option value="0">否</option>

                </select>
            </div>
            <button class="btn btn-default" onclick="queryUser()">查询</button>
            <button class="btn btn-default" onclick="newUserDlg()">新增</button>
            <button class="btn btn-default" onclick="editUserDlg()">修改</button>
            <button class="btn btn-default" onclick="deleteUser()">删除</button>
        </div>
    </div>
</div>
<table id="userGrid" style="table-layout:fixed"></table>
</body>
</html>