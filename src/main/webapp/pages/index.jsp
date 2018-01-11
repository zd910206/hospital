<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
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
    <title>SHILAB_HOSPITAL SYSTEM|HOME</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="<%= CONTEXT_PATH%>resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="<%= CONTEXT_PATH%>resources/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css"/>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/html5shiv.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="<%= CONTEXT_PATH%>resources/bootstrap/js/bootstrap.min.js"></script>


    <script type="text/javascript">
        var ctx = "<%=CONTEXT_PATH%>";

        // function testInput() {
        //     alert(123);
        // }

        function uploadFile() {
            var fileObj = document.getElementById("inputFile").files[0]; // 获取文件对象
            var FileController = ctx + 'user/upload'; // 接收上传文件的后台地址

            if (fileObj) {
                alert(fileObj);
                // FormData 对象
                var form = new FormData();
                form.append("file", fileObj);// 文件对象

                // XMLHttpRequest 对象
                var xhr = new XMLHttpRequest();
                xhr.open("post", FileController, true);
                xhr.onload = function () {
                    alert(xhr.responseText);
                };
                xhr.send(form);

            } else {
                alert("未选择文件");
            }
        }

        var inputFlg;
        function checkUploadFile() {
            var fileName = document.getElementById("inputFileAgent").value;
            if(fileName == null || fileName == '') {
                alert("Please select a file!" );
                inputFlg = false;
            } else {
                var sp = fileName.split(".");
                if(sp.length < 1) {
                    alert("Please select a correct document!" );
                    inputFlg = false;
                } else if(sp[sp.length - 1] != "dcm") {
                    alert("Please select a file with suffix 'dcm'!");
                    inputFlg = false;
                } else {
                    inputFlg = true;
                }
            }
        }

        function afterCheck() {
            if(inputFlg == true) {
                alert("Upload success!");
            }
            return inputFlg;
        }

        function testMatlabAdd() {
            $.ajax(ctx + 'user/matlabAdd', {
                contentType: 'application/json',
                type: "POST",
                success: function (res) {
                    if (res.result) {
                        alert(res.sum);
                    } else {
                        alert("wrong!");
                    }
                }
            });
        }

        function changeAgentContent() {
            document.getElementById("inputFileAgent").value = document.getElementById("inputFile").value;
        }
    </script>
</head>
<body>
<%--<div>--%>
    <%--HELLO,THIS IS THE FIRST PAGE!--%>
    <%--<div style="margin: 20px;width:200px">--%>
        <%--<input id="testInput" type="button" onclick="testInput()" value="testInput" style="width:160px;">--%>
    <%--</div>--%>
<%--</div>--%>


<form action="<%=CONTEXT_PATH%>user/upload" method="post" enctype="multipart/form-data" onsubmit="return afterCheck();">
    <input type="button" onclick="document.getElementById('inputFile').click()" value="Browse..."/>
    <input type="file" id="inputFile" name="inputFile" style="display: none" onchange="changeAgentContent()"/>
    <input type="text" value="" disabled id="inputFileAgent"/>
    <input type="submit" id="uploadFiles" onclick="checkUploadFile()" value="upload files">
</form>


<div style="margin:10px">

    <input id="testMatlabAdd" type="button" onclick="testMatlabAdd()" value="testMatlabAdd" style="width:160px;">

</div>

</body>
</html>