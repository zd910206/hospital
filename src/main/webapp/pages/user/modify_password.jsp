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
    <link rel="stylesheet" href="<%=CONTEXT_PATH%>resources/css/font.css">
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/css/basic.css"/>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/html5shiv.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript"
            src="<%=CONTEXT_PATH%>resources/js/comm/jquery.js"></script>
    <script type="text/javascript"
            src="<%=CONTEXT_PATH%>resources/js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript"
            src="<%=CONTEXT_PATH%>resources/js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript"
            src="<%=CONTEXT_PATH%>resources/js/comm/json2.js"></script>
    <script type="text/javascript"
            src="<%=CONTEXT_PATH%>resources/js/comm/common.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/ye.check.js"></script>
    <title>修改密码</title>
    <script type="text/javascript">
        var contextPath = "<%=CONTEXT_PATH%>";
        var path = "<%=path%>";
        var userId = "${user.userId}";
        var userName = "${user.userName}";

        /* 	$(function(){
         $("#pwdForm").bind("submit", function(){
         submitForm();
         return false;//必须添加return false语句，防止form提交
         });
         }); */

        var errmsg = "";
        $(function () {
            /* 	$("#addNodeForm").bind("submit", function(){
             saveNode(null, "node/add");
             return false;//必须添加return false语句，防止form提交
             }); */

            ye._same = function (id) {
                var d = ye.g(id).value;
                if (d == '') {
                    errmsg = '不能为空';
                    return false;
                }
                else {
                    if ($("#newPwd").val() != $("#confirmPwd").val()) {
                        errmsg = '两次输入的新密码不一致';
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            };

            var rule = {
                /* 'nodeIp':['require','请输入IP','&nbsp;'], */
                'oldPwd': ['require', '不能为空', '&nbsp;'],
                'newPwd': ['require', '不能为空', '&nbsp;'],
                'confirmPwd': ['same', '@errmsg', '&nbsp;']
            };
            var option = {
                method: 'ajax',
                msg: {
                    right: 'dright',
                    error: 'derr'
                },
                form: ye.g('pwdForm'),
                btn: {
                    name: 'modifyPwdBtn',
                    text: 'load...'
                },
                success: function (env) {
                    if (env.result) {
                        showAlert("提示", env.msg);
                        closeBoxy();
                    }
                    else {
                        showAlert("提示", env.msg);
                    }
                }
            };

            ye.check(rule).do_blur(option);

            ye.check(rule).do_keyup(option);

            $("#modifyPwdBtn").click(function () {
                if (ye.check(rule).do_validate(option))
                    submitForm();
            });

        });

        function formValidate(formid) {
            return $("#" + formid).form("validate");
        }
        function submitForm() {
            /* 		if(!formValidate('pwdForm')){return;}*/

            /* validateForm(); */
            var oldPwd = $("#oldPwd").val();
            var newPwd = $("#newPwd").val();
            var confirmPwd = $("#confirmPwd").val();
            var url = contextPath + "user/password/modify";
            $.ajax(url, {
                data: {
                    userId: userId,
                    oldPwd: oldPwd,
                    newPwd: newPwd
                },
                type: "POST",
                success: function (res) {
                    if (res.result) {
                        showAlert("提示", res.message, null, reLogin);
                    } else if (!isEmpty(res.wrong)) {
                        clearLabel();
                        showAlert('提示', res.wrong, null, function (r) {
                            clearForm();
                        });
                    } else {
                        showAlert(res.message);
                    }
                }
            });
        }

        function clearForm() {
            $('#pwdForm').form('clear');
            $('#userName').val(userName);
        }

        function clearLabel() {
            $("label").each(function () {
                $(this).removeClass("dright");
            });
        }

    </script>
</head>
<body>
<div class="easyui-panel" title="修改密码" data-options="fit:true">
    <div style="padding: 10px 60px 20px 60px">
        <%-- 			<form id="pwdForm" method="post">
                        <table cellpadding="5" align="center">
                            <tr>
                                <td>用户名：</td>
                                <td><input class="easyui-validatebox textbox" type="text"
                                    id="userName" name="userName" data-options="required:true"
                                    readonly="readonly" value="${user.userName }"></input></td>
                            </tr>
                            <tr>
                                <td>原来密码：</td>
                                <td><input class="easyui-validatebox textbox" type="password"
                                    id="oldPwd" name="oldPwd" data-options="required:true"></input></td>
                            </tr>
                            <tr>
                                <td>新密码：</td>
                                <td><input class="easyui-validatebox textbox" type="password"
                                    id="newPwd" name="newPwd" data-options="required:true"></input></td>
                            </tr>
                            <tr>
                                <td>确认新密码：</td>
                                <td><input class="easyui-validatebox textbox" type="password"
                                    id="confirmPwd" name="confirmPwd" data-options="required:true"></input></td>
                            </tr>
                        </table>
                    </form>
                    <div style="text-align: center; padding: 5px">
                        <a href="javascript:void(0)" class="easyui-linkbutton"
                            onclick="submitForm()">修&nbsp;&nbsp;&nbsp;&nbsp;改</a> <a href="javascript:void(0)"
                            class="easyui-linkbutton" onclick="clearForm()">重&nbsp;&nbsp;&nbsp;&nbsp;置</a>
                    </div> --%>


        <form class="form-horizontal" id="pwdForm">
            <div class="form-group">
                <label for="userName" class="col-sm-4 control-label">用户名：</label>
                <div class="col-sm-10 userName" style="width: 250px;">
                    <input class="form-control" id="userName" name="userName" value="${user.userName}" readonly="readonly">
                </div>
            </div>
            <div class="form-group">
                <label for="oldPwd" class="col-sm-4 control-label">旧密码：</label>
                <div class="col-sm-10 oldPwd" style="width: 250px;">
                    <input class="form-control" type="password" id="oldPwd" name="oldPwd">
                </div>
            </div>
            <div class="form-group">
                <label for="newPwd" class="col-sm-4 control-label">新密码：</label>
                <div class="col-sm-10 newPwd" style="width: 250px;">
                    <input class="form-control" type="password" id="newPwd" name="newPwd">
                </div>
            </div>
            <div class="form-group">
                <label for="confirmPwd" class="col-sm-4 control-label">确认新密码：</label>
                <div class="col-sm-10 confirmPwd" style="width: 250px;">
                    <input class="form-control" type="password" id="confirmPwd" name="confirmPwd">
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-4 col-sm-6">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-primary" id="modifyPwdBtn" style="width: 120px;">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <!-- <button type="reset" class="btn btn-primary">重置</button> -->
                    <!-- <button type="button" class="btn btn-primary" onclick="back()">返回</button> -->
                </div>
            </div>
        </form>

    </div>
</div>
<!-- 	<style scoped="scoped">
.textbox {
	height: 20px;
	margin: 0;
	padding: 0 2px;
	box-sizing: content-box;
}
</style> -->
<style type="text/css">
    .panel-header, .panel-body {
        border-width: 1px 1px 0 1px;
        border-style: solid;
    }
</style>
</body>
</html>