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
        var errmsg = '';
        $(function () {
            /* $("#addUserForm").bind("submit", function(){
             submitForm();
             return false;//必须添加return false语句，防止form提交
             }); */

            $("#depart").combotree({
                url: ctx + "department/combotree",
                height: 32,
                width: 220,
                onLoadSuccess: function (node, data) {
                    var rootNode = $("#depart").tree('getRoot');
                    setCombotreeChecked(data[0].id);
                }
            });
            //var t = $('#depart').combotree("tree");
            //var root = t.tree('getRoot');

            $(".combo-text.validatebox-text").removeAttr("style");
            $(".combo-text.validatebox-text").css({"height": "32px", "line-height": "32px"});

            ye._same = function (id) {
                var d = ye.g(id).value;
                if (d == '') {
                    errmsg = '确认密码不能为空';
                    return false;
                }
                else {
                    if ($("#newPwd").val() != $("#confirmPwd").val()) {
                        errmsg = '两次输入的密码不一致';
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            };

            var rule = {
                'userName': ['require', '用户名不能为空', '&nbsp;'],
                'newPwd': ['require', '密码不能为空', '&nbsp;'],
                //'depart':['require','组织机构不能为空','&nbsp;'],
                'confirmPwd': ['same', '@errmsg', '&nbsp;']
            };
            var option = {
                method: 'ajax',
                msg: {
                    right: 'dright',
                    error: 'derr'
                },
                form: ye.g('addUserForm'),
                btn: {
                    name: 'addUserBtn',
                    text: 'load...'
                },
                success: function (env) {
                    if (env.result) {
                        parent.showAlert(env.msg);
                        closeBoxy();
                    }
                    else {
                        showAlert(env.msg);
                    }
                }
            };

            ye.check(rule).do_blur(option);

            ye.check(rule).do_keyup(option);

            $("#addUserBtn").click(function () {
                if (ye.check(rule).do_validate(option))
                    submitForm();
            });
        });
        function submitForm() {
            var newPwd = $("#newPwd").val();
            var confirmPwd = $("#confirmPwd").val();
            var url = ctx + "user/add";
            var user = {
                userName: $("#userName").val(),
                userType: $("input[name='admin']:checked").val(),
                password: newPwd,
                userDesc: $("#userDesc").val(),
                departmentId : $('#depart').combotree('tree').tree('getSelected').id
            };
            $.ajax(url, {
                contentType: 'application/json',
                data: JSON.stringify(user),
                type: "POST",
                success: function (res) {
                    if (res.result) {
                        showAlert('提示', '添加用户成功');
                        back();
                    } else {
                        showAlert('提示', '用户已存在');
                    }
                }
            });
        }

        function setCombotreeChecked(id) {
            $('#depart').combotree("setValue", id);
        }
    </script>
</head>
<body>
<div class="easyui-panel" title="增加用户">
    <div style="padding: 10px 60px 20px 60px">
        <form class="form-horizontal" id="addUserForm">
            <div class="form-group">
                <label for="userName" class="col-sm-4 control-label">用户名：</label>
                <div class="col-sm-10 userName" style="width: 250px;">
                    <input class="form-control" id="userName" name="userName">
                </div>
            </div>
            <div class="form-group">
                <label for="newPwd" class="col-sm-4 control-label">密码：</label>
                <div class="col-sm-10 newPwd" style="width: 250px;">
                    <input class="form-control" type="password" id="newPwd" name="newPwd">
                </div>
            </div>
            <div class="form-group">
                <label for="confirmPwd" class="col-sm-4 control-label">确认密码：</label>
                <div class="col-sm-10 confirmPwd" style="width: 250px;">
                    <input class="form-control" type="password" id="confirmPwd" name="confirmPwd" onblur="validateInput(this.id)" onkeyup="validateInput(this.id)">
                </div>
            </div>
            <div class="form-group">
                <label for="depart" class="col-sm-4 control-label">组织机构：</label>
                <div class="col-sm-10 depart" style="width: 300px;">
                    <input class="form-control" id="depart" name="depart"/>
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
                <label for="userDesc" class="col-sm-4 control-label">用户描述：</label>
                <div class="col-sm-10" style="width: 250px;">
                    <textarea class="form-control" rows="3" id="userDesc" name="userDesc"></textarea>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-4 col-sm-6">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" id="addUserBtn" class="btn btn-primary">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>
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