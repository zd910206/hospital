<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String CONTEXT_PATH = com.SHILAB.web.web.util.Constants.HOST_NAME + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1"/>
    <meta http-equiv='X-UA-Compatible' content='IE=5,IE=9'/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="shortcut icon" href="<%=CONTEXT_PATH%>resources/images/talkyun.ico" type="image/x-icon">
    <title>SHILAB_HOSPITAL|LOGIN</title>
    <link href="<%= CONTEXT_PATH%>resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="<%= CONTEXT_PATH%>resources/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css"/>
    <link href="<%= CONTEXT_PATH%>resources/css/login.css" rel="stylesheet" type="text/css"/>
    <style type="text/css">
        .alert {
            padding: 10px;
            margin-bottom: 0px;
        }

        .col-sm-4 {
            padding-right: 0px;
        }

        .navbar-brand {
            font-size: 20px;
        }
    </style>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/html5shiv.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="<%= CONTEXT_PATH%>resources/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/login.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/common.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/md5.js"></script>
    <script type="text/javascript">
        var ctx = "<%=CONTEXT_PATH%>";
        var path = "<%=path%>";

        if (top != self)
            top.location = location;

        function get_code() {
            $('#imgcode').attr('src', ctx + 'captcha?v=' + Math.random());
        }

        //	require(['login'], function(){});
    </script>
</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#" style="color: white;">SHILAB_HOSPITAL SYSTEM</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown active">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <!-- <span class="glyphicon glyphicon-question-sign"></span> -->HELP<span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#" data-toggle="modal" data-target="#versionModal">ABOUT SYSTEM</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div class="container" style="margin: 100px auto;">
    <!-- <form class="form-signin" role="form">
        <h4 class="form-signin-heading">请登录</h4>
        <input type="text" class="form-control" placeholder="帐号" required autofocus>
        <input type="password" class="form-control" placeholder="密码" required />
        <div class="checkbox">
            <label> <input type="checkbox" value="remember-me">
                记住帐号
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" onclick="window.location.href='index.html'">登	录</button>
    </form> -->
    <form class="form-horizontal" role="form">
        <input type="hidden" name="forwardUrl" value="<%=request.getParameter("forwardUrl")!=null?
					java.net.URLEncoder.encode(request.getParameter("forwardUrl"),"UTF-8"):""%>"/>
        <div class="form-group" style="display: none;" id="validDiv">
            <div class="alert alert-danger alert-dismissible fade in col-sm-offset-4 col-sm-3" role="alert">
                <label class="close" data-dismiss="alert"><!-- <span aria-hidden="true">×</span><span class="sr-only">Close</span> --></label>
                <sapn id="errMsg"></sapn>
            </div>
        </div>
        <div class="form-group">
            <label for="username" class="col-sm-4 control-label"><img src="<%=CONTEXT_PATH%>resources/images/glyphicons_user.png" style="width: 18px;height: 18px;"/></label>
            <div class="col-sm-3">
                <input type="text" class="form-control" style="height: 40px;" id="userName" name="userName" value="admin" placeholder="用户名">
            </div>
        </div>
        <div class="form-group">
            <label for="T__pwd" class="col-sm-4 control-label"><img src="<%=CONTEXT_PATH%>resources/images/glyphicons_lock.png" style="width: 18px;height: 18px;"/></label>
            <div class="col-sm-3">
                <input type="password" class="form-control" style="height: 40px;" id="T__pwd" value="" placeholder="password" autocomplete=“off”>
                <input type="hidden" class="form-control" style="height: 40px;" id="pwd" name="pwd" autocomplete=“off”>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-2 col-sm-offset-4">
                <input type="text" class="form-control" style="height: 40px;" id="captcha" name="captcha" value="" placeholder="Verification Code">
            </div>
            <div class="col-sm-6">
                <label class="col-sm-2 control-label">
                    <img src="<%=CONTEXT_PATH%>captcha" id="imgcode"/>
                </label>
                <label class="col-sm-3 control-label" style="font-weight: normal;margin-left: 15px"><a href="javascript:;" onclick="get_code()">not clear?change</a></label>
            </div>
        </div>

        <!-- <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <div class="checkbox">
              <label>
                <input type="checkbox"> Remember me
              </label>
            </div>
          </div>
        </div> -->
        <div class="form-group">
            <div class="col-sm-offset-4 col-sm-5">
                <input id="submitBtn" type="button" class="btn btn-primary" value="LOGIN" style="width:260px;">
            </div>
        </div>
    </form>
</div>
<div class="modal fade" id="versionModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">ABOUT SHILAB_HOSPITAL SYSTEM</h4>
            </div>
            <div class="modal-body" style="text-align: center;">
                <div><strong style="font-size: 18px;">SHILAB_HOSPITAL SYSTEM</strong></div>
                <div style="margin: 5px;">Version 1.0</div>
                <div>Copyright © 2017–2018 SHILAB</div>
                <div>All Rights Reserved.</div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</body>
</html>