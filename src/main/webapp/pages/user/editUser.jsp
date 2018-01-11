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
    <title></title>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/js/easyui/themes/bootstrap/easyui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/js/easyui/themes/icon.css"/>
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/css/font.css">
    <link rel="stylesheet" type="text/css" href="<%=CONTEXT_PATH%>resources/css/basic.css"/>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/html5shiv.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/easyui/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/common.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/crud.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/mng/user.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/ye.check.js"></script>
    <script type="text/javascript">
        var ctx = "<%=CONTEXT_PATH%>";
        var userId = "<%=request.getParameter("userId") %>";
        $(function () {
            paddingFormData();

            $("#depart").combotree({
                url: ctx + "department/combotree",
                height: 32,
                width: 220,
            });

            $(".combo-text.validatebox-text").removeAttr("style");
            $(".combo-text.validatebox-text").css({"height": "32px", "line-height": "32px"});

            var rule = {
                'userName': ['require', '用户名不能为空', '&nbsp;']
                //'password':['require','密码不能为空','&nbsp;']
            };
            var option = {
                method: 'ajax',
                msg: {
                    right: 'dright',
                    error: 'derr'
                },
                form: ye.g('editUserForm'),
                btn: {
                    name: 'editUserBtn',
                    text: 'load...'
                },
                success: function (env) {
                    if (env.result) {
                        parent.MessageAlert(env.msg);
                        closeBoxy();
                    }
                    else {
                        paremt.MessageAlert(env.msg);
                    }
                }
            };

            ye.check(rule).do_blur(option);

            ye.check(rule).do_keyup(option);

            $("#editUserBtn").click(function () {
                if (ye.check(rule).do_validate(option))
                    modifyUser();
            });
        });

        function paddingFormData() {
            if (!isEmpty(userId)) {
                $.ajax(ctx + "user/mng/list/" + userId, {
                    type: "POST",
                    success: function (res) {
                        if (res.result) {
                            $('#userName').val(res.user.userName);
                            //$('#password').val(res.user.password);
                            $('#userDesc').val(res.user.userDesc);
                            $('#depart').combotree('setValue', res.user.departmentId);
                            $("input[type='radio'][name='admin'][value='" + res.user.userType + "']").attr("checked", true);
                            $("input[type='radio'][name='status'][value='" + res.user.status + "']").attr("checked", true);
                        } else {
                            //MessageSlide(res.message);
                        }
                    }
                });
            }
        }

        function modifyUser() {
            var url = ctx + "user/modify/" + userId;
            var user = {
                userId: userId,
                userName: $("#userName").val(),
                userDesc: $("#userDesc").val(),
                userType: $("input[name='admin']:checked").val(),
                departmentId : $('#depart').combotree('tree').tree('getSelected').id,
                password: $("#password").val(),
                status: $("input[name='status']:checked").val()
            };
            $.ajax(url, {
                contentType: 'application/json',
                data: JSON.stringify(user),
                type: "POST",
                success: function (res) {
                    if (res.result) {
                        showAlert('提示', res.message);
                        back();
                    } else {
                        showAlert('提示', res.message);
                    }
                }
            });
        }

    </script>
</head>
<body>
<div class="easyui-panel" title="修改用户">
    <div style="padding: 10px 60px 20px 60px">
        <form class="form-horizontal" id="editUserForm">
            <div class="form-group">
                <label for="userName" class="col-sm-4 control-label">用户名：</label>
                <div class="col-sm-10 userName" style="width: 250px;">
                    <input class="form-control" id="userName" name="userName" readonly="readonly">
                </div>
            </div>
            <div class="form-group">
                <label for="password" class="col-sm-4 control-label">密码：</label>
                <div class="col-sm-10 newPwd" style="width: 250px;">
                    <input class="form-control" type="password" id="password" name="password">
                </div>
                <label class="label-desc">为空则不修改</label>
            </div>

            <div class="form-group">
                <label for="depart" class="col-sm-4 control-label">组织机构：</label>
                <div class="col-sm-10" style="width: 250px;">
                    <select id="depart" name="depart">
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="userDesc" class="col-sm-4 control-label">用户描述：</label>
                <div class="col-sm-10" style="width: 300px;">
                    <textarea class="form-control" rows="3" id="userDesc" name="userDesc"></textarea>
                </div>
            </div>
            <div class="form-group">
                <label for="admin" class="col-sm-4 control-label">是否管理员：</label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label class="radio-inline">
                    <input type="radio" name="admin" id="admin" value="1">是
                </label>
                <label class="radio-inline">
                    <input type="radio" name="admin" id="common" value="0" checked="checked">否
                </label>
            </div>

            <div class="form-group">
                <label for="admin" class="col-sm-4 control-label">是否锁定：</label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label class="radio-inline">
                    <input type="radio" name="status" id="status1" value="Locked">是
                </label>
                <label class="radio-inline">
                    <input type="radio" name="status" id="status2" value="" checked="checked">否
                </label>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-4 col-sm-6">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" id="editUserBtn" class="btn btn-primary">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <!-- <button type="reset" class="btn btn-primary">重置</button> -->
                    <button type="button" class="btn btn-primary" onclick="back()">返&nbsp;&nbsp;&nbsp;&nbsp;回</button>
                </div>
            </div>
        </form>
    </div>
</div>
</body>
</html>