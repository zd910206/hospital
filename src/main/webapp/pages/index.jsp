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
    <link href="<%= CONTEXT_PATH%>resources/css/indexImages.css" rel="stylesheet" type="text/css"/>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/html5shiv.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="<%= CONTEXT_PATH%>resources/bootstrap/js/bootstrap.min.js"></script>

    <script type="text/javascript">
        var ctx = "<%=CONTEXT_PATH%>";

        var selectedDiv;

        var inputFlg;

        var imageNum;
        var fileNameFloder;

        $(function () {
            var $box = $('#box');
            var $bg = $('#bg');
            var $bgcolor = $('#bgcolor');
            var $btn = $('#bt');
            var $text = $('#text');
            var statu = false;
            var ox = 0;
            var lx = 0;
            var left = 0;
            var bgleft = 0;
            $btn.mousedown(function(e){
                lx = $btn.offset().left;
                ox = e.pageX - left;
                statu = true;
            });
            $(document).mouseup(function(){
                statu = false;
            });
            $box.mousemove(function(e){
                if(statu){
                    left = e.pageX - ox;
                    if(left < 0){
                        left = 0;
                    }
                    if(left > 200){
                        left = 200;
                    }
                    $btn.css('left',left);
                    $bgcolor.width(left);
                    viewImage(left/2);
                    //$text.html('位置:' + parseInt(left/2) + '%');
                }
            });
            $bg.click(function(e){
                if(!statu){
                    bgleft = $bg.offset().left;
                    left = e.pageX - bgleft;
                    if(left < 0){
                        left = 0;
                    }
                    if(left > 200){
                        left = 200;
                    }
                    $btn.css('left',left);
                    $bgcolor.stop().animate({width:left},200);
                    viewImage(left/2);
                }
            });
            $("#text").click(function(){
                var x=event.offsetX;
                var y=event.offsetY;
                alert(x+'_'+y);
            });
        });

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
                // FileName = document.getElementById("inputFileAgent").value;
                alert("Upload success!");
            }
            return inputFlg;
        }

        function showDcm() {
            $.ajax(ctx + 'user/showDcm', {
                contentType: 'application/json',
                type: "POST",
                success: function (res) {
                    if (res.result) {
                        var dcmList = res.dcmList;
                        if(dcmList.length > 0) {
                            $("#dcmList").empty();
                            $("#dcmList").show();
                            for(var i = 0; i < dcmList.length; i ++ ) {
                                $("#dcmList").prepend("<div style='margin: 10px; font-size:16px; cursor:pointer;background: rgba(0,0,255,0.23); float:left' id='" + dcmList[i] + "' onclick='showImages(this)'>" + dcmList[i] + "</div>");
                            }
                        } else {
                            alert("Please upload a dcm file!");
                        }
                    } else {
                        alert("Please upload a dcm file!");
                    }
                }
            });
        }

        function showImages(e) {
            $("#" + selectedDiv).removeClass('bg');
            var fileName = $(e).text();
            selectedDiv = fileName;
            $(e).addClass('bg');
            $.ajax(ctx + 'user/showImages', {
                dataType: 'json',
                type: "POST",
                data: {
                   "fileName" : fileName
                },
                success: function (res) {
                    if (res.result) {
                        imageNum = res.num / 2;
                        fileNameFloder = fileName;
                        $("#images").show();
                        $("#ProgressInf").text("page 1 of" + imageNum);

                        // $("#text").attr("style","background:url('D:\\\\" +floder + "\\" + fileName + "\\" + fileName + "_1.jpg') no-repeat;");
                        $("#text").attr("style","background:url('<%= CONTEXT_PATH%>resources/newImages/"+selectedDiv+"/"+selectedDiv+"_1.jpg') no-repeat;");

                    } else {
                        alert("No image in this folder!");
                    }
                }
            });




        }

        function changeAgentContent() {
            document.getElementById("inputFileAgent").value = document.getElementById("inputFile").value;
        }

        function viewImage(num) {
            var perNum = 100 / imageNum;
            var temp = Math.ceil(num / perNum);
            if( temp == 0) {
                $("#text").attr("style","background:url('') no-repeat;");
                $("#text").attr("style","background:url('<%= CONTEXT_PATH%>resources/newImages/"+fileNameFloder+"/"+fileNameFloder+"_1.jpg') no-repeat;");
            } else {
                $("#text").attr("style","background:url('') no-repeat;");
                $("#text").attr("style","background:url('<%= CONTEXT_PATH%>resources/newImages/"+fileNameFloder+"/"+fileNameFloder+"_"+temp+".jpg') no-repeat;");
            }
            $("#ProgressInf").text("");
            $("#ProgressInf").text("page " +temp + " of" + imageNum);

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


<form style="margin:20px" action="<%=CONTEXT_PATH%>user/upload" method="post" enctype="multipart/form-data" onsubmit="return afterCheck();">
    <div class="form-inline">
        <input type="button" class="btn btn-default" onclick="document.getElementById('inputFile').click()" value="Browse..."/>
        <input type="file" id="inputFile" name="inputFile" style="display: none" onchange="changeAgentContent()"/>
        <input type="text" class="form-control" style="width: 220px" value="" disabled id="inputFileAgent"/>
        <input type="submit" class="btn btn-success" id="uploadFiles" onclick="checkUploadFile()" value="upload files">
    </div>
</form>


<div style="margin:20px">
    <input id="showDcm" class="btn btn-default" type="button" onclick="showDcm()" value="showImages" style="width:160px;">
</div>

<div id="dcmList" style="display: none;margin:20px;height: 50px; width: 500px;border: 1px forestgreen solid"></div>


<div id="images" style="display: none;">
    <div id="text"></div>
    <div id="box">
        <div id="bg">
            <div id="bgcolor"></div>
        </div>
        <div id="bt"></div>
    </div>
    <div id="ProgressInf" style="">text</div>
</div>

</body>
</html>