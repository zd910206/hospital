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
    <script type="text/javascript" src="<%= CONTEXT_PATH%>resources/js/comm/common.js"></script>
    <script type="text/javascript" src="<%= CONTEXT_PATH%>resources/echarts/echarts.common.min.js"></script>


    <script type="text/javascript">
        var ctx = "<%=CONTEXT_PATH%>";

        var selectedDiv;

        var inputFlg;

        var imageNum;
        var fileNameFloder;

        var getFirstPoint = 0;
        var getSecondPoint = 0;
        var firstPoint_x;
        var firstPoint_y;
        var secondPoint_x;
        var secondPoint_y;

        var start = false;

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
            $btn.mousedown(function (e) {
                lx = $btn.offset().left;
                ox = e.pageX - left;
                statu = true;
            });
            $(document).mouseup(function () {
                statu = false;
            });
            $box.mousemove(function (e) {
                if (statu) {
                    left = e.pageX - ox;
                    if (left < 0) {
                        left = 0;
                    }
                    if (left > 800) {
                        left = 800;
                    }
                    $btn.css('left', left);
                    $bgcolor.width(left);
                    viewImage(left / 2);
                    //$text.html('位置:' + parseInt(left/2) + '%');
                }
            });
            $bg.click(function (e) {
                if (!statu) {
                    bgleft = $bg.offset().left;
                    left = e.pageX - bgleft;
                    if (left < 0) {
                        left = 0;
                    }
                    if (left > 800) {
                        left = 800;
                    }
                    $btn.css('left', left);
                    $bgcolor.stop().animate({width: left}, 800);
                    viewImage(left / 2);
                }
            });
            // $("#text").click(function(){
            //     var x=event.offsetX;
            //     var y=event.offsetY;
            //     alert(x+'_'+y);
            // });

            $("#text").click(function () {
                start = true;
                if (start) {
                    var x = event.offsetX;
                    var y = event.offsetY;
                    if (getFirstPoint == 1) {
                        // $("div").remove("#text .pixel");
                        $("div").remove(".pixel");

                        firstPoint_x = x;
                        firstPoint_y = y;
                        $("#first_x").val(x);
                        $("#first_y").val(y);
                        var content = $("<div class='pixel'/></div>").css({"top": y + "px", "left": x + "px"});
                        $("#text").append(content[0]);
                    }
                    if (getSecondPoint == 1) {
                        // $("div").remove("#text .pixe2");
                        $("div").remove(".pixe2");

                        secondPoint_x = x;
                        secondPoint_y = y;
                        $("#second_x").val(x);
                        $("#second_y").val(y);
                        var content = $("<div class='pixe2'/></div>").css({"top": y + "px", "left": x + "px"});
                        $("#text").append(content[0]);
                    }
                }
                start = false;

            })
        });

        function checkUploadFile() {
            var fileName = document.getElementById("inputFileAgent").value;
            if (fileName == null || fileName == '') {
                alert("Please select a file!");
                inputFlg = false;
            } else {
                var sp = fileName.split(".");
                if (sp.length < 1) {
                    alert("Please select a correct document!");
                    inputFlg = false;
                } else if (sp[sp.length - 1] != "dcm") {
                    alert("Please select a file with suffix 'dcm'!");
                    inputFlg = false;
                } else {
                    inputFlg = true;
                }
            }
        }

        function afterCheck() {
            if (inputFlg == true) {
                // FileName = document.getElementById("inputFileAgent").value;
                showBtMask();
                // alert("Upload success!");
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
                        if (dcmList.length > 0) {
                            $("#dcmList").empty();
                            $("#dcmList").show();
                            for (var i = 0; i < dcmList.length; i++) {
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
                    "fileName": fileName
                },
                success: function (res) {
                    if (res.result) {

                        // init
                        init();

                        imageNum = res.num / 2;
                        fileNameFloder = fileName;
                        $("#images").show();
                        $("#ProgressInf").text("page 1 of " + imageNum);

                        // $("#text").attr("style","background:url('D:\\\\" +floder + "\\" + fileName + "\\" + fileName + "_1.jpg') no-repeat;");
                        $("#text").attr("style", "background:url('<%= CONTEXT_PATH%>resources/newImages/" + selectedDiv + "/" + selectedDiv + "_1.jpg'); no-repeat center; -webkit-transition:1s all linear; background-size:800px 600px;  ");

                    } else {
                        alert("No image in this folder!");
                    }
                }
            });


        }

        function init() {
            getFirstPoint = 0;
            getSecondPoint = 0;
            firstPoint_x = null;
            firstPoint_y = null;
            secondPoint_x = null;
            secondPoint_y = null;
            $("#first_x").val("");
            $("#first_y").val("");
            $("#second_x").val("");
            $("#second_y").val("");
            $("div").remove("#text .pixel");
            $("div").remove("#text .pixe2");


            $('#bt').css("left", 0);
            $('#bgcolor').css("width", 0);
        }

        function changeAgentContent() {
            document.getElementById("inputFileAgent").value = document.getElementById("inputFile").value;
        }

        function viewImage(num) {
            var perNum = 400 / imageNum;
            var temp = Math.ceil(num / perNum);
            if (temp == 0) {
                $("#text").attr("style", "background:url('') no-repeat center; -webkit-transition:1s all linear; background-size:800px 600px;");
                $("#text").attr("style", "background:url('<%= CONTEXT_PATH%>resources/newImages/" + fileNameFloder + "/" + fileNameFloder + "_1.jpg') no-repeat center; -webkit-transition:1s all linear; background-size:800px 600px;");
            } else {
                $("#text").attr("style", "background:url('') no-repeat center; -webkit-transition:1s all linear; background-size:800px 600px;");
                $("#text").attr("style", "background:url('<%= CONTEXT_PATH%>resources/newImages/" + fileNameFloder + "/" + fileNameFloder + "_" + temp + ".jpg') no-repeat center; -webkit-transition:1s all linear; background-size:800px 600px;");
            }
            $("#ProgressInf").text("");
            $("#ProgressInf").text("page " + temp + " of " + imageNum);

        }

        function firstPoint() {
            getSecondPoint = 0;
            getFirstPoint = 1;
        }

        function secondPoint() {
            getFirstPoint = 0;
            getSecondPoint = 1;
        }

        function verticalFlip() {
            showBtMask();
            $.ajax(ctx + 'user/verticalFlip', {
                dataType: 'json',
                type: "POST",
                data: {
                    "selectedDiv": selectedDiv
                },
                success: function (res) {
                    if (res.result) {
                        init();
                        $("#text").attr("style","background:url(''); no-repeat center; -webkit-transition:1s all linear; background-size:800px 600px;  ");

                        $("#ProgressInf").text("page 1 of " + imageNum);
                        $("#text").attr("style", "background:url('<%= CONTEXT_PATH%>resources/newImages/" + selectedDiv + "/" + selectedDiv + "_1.jpg'); no-repeat center; -webkit-transition:1s all linear; background-size:800px 600px;  ");
                        hideBtMask();
                    } else {
                        alert("error!");
                        hideBtMask();
                    }
                }
            });
        }

        function viewPulsatility() {
            if(firstPoint_x == null || firstPoint_y == null || secondPoint_x == null || secondPoint_y == null ) {
                alert("Please select two points!")
            } else {
                showBtMask();
                $.ajax(ctx + 'user/viewPulsatility', {
                    dataType: 'json',
                    type: "POST",
                    data: {
                        "selectedDiv": selectedDiv,
                        "firstPoint_x": firstPoint_x,
                        "firstPoint_y": firstPoint_y,
                        "secondPoint_x": secondPoint_x,
                        "secondPoint_y": secondPoint_y,
                        "fRate":$("#fRate").val(),
                        "calibration": $("#manualCalibration").val()
                    },
                    success: function (res) {
                        if (res.result) {
                            hideBtMask();
                            var xArr = res.xList;
                            var yArr = res.yList;
                            $("#lineChart").show();
                            var dataPoint = [];
                            for(var i = 0; i < xArr.length; i ++) {
                                var arr = [];
                                arr.push(xArr[i]);
                                arr.push(yArr[i]);
                                dataPoint.push(arr);
                            }
                            lineChartInit(dataPoint);

                        } else {
                            hideBtMask();
                            alert("track is lost!");
                        }
                    }
                });


            }


        }


        function lineChartInit(dataPoint) {
            var option = {
                title : {
                    text: 'Tracking point',
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer:{
                        show: true,
                        type : 'cross',
                        lineStyle: {
                            type : 'dashed',
                            width : 1
                        }
                    },

                },
                legend: {
                    data:['point']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataZoom : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        name:'X',
                        type: 'value'
                    }
                ],
                yAxis : [
                    {
                        name: 'Y',
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#dc143c'
                            }
                        }
                    }
                ],
                series : [

                    {
                        name:'point',
                        type:'line',
                        data: dataPoint
                    }
                ]
            };

            var lineChart = echarts.init(document.getElementById('lineChart'));
            lineChart.setOption(option);
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


<form style="margin:20px" action="<%=CONTEXT_PATH%>user/upload" method="post" enctype="multipart/form-data"
      onsubmit="return afterCheck();">
    <div class="form-inline">
        <input type="button" class="btn btn-default" onclick="document.getElementById('inputFile').click()"
               value="Browse..."/>
        <input type="file" id="inputFile" name="inputFile" style="display: none" onchange="changeAgentContent()"/>
        <input type="text" class="form-control" style="width: 220px" value="" disabled id="inputFileAgent"/>
        <input type="submit" class="btn btn-success" id="uploadFiles" onclick="checkUploadFile()" value="upload files">
    </div>
</form>


<div style="margin:20px">
    <input id="showDcm" class="btn btn-default" type="button" onclick="showDcm()" value="showImages"
           style="width:160px;">
</div>

<div id="dcmList" style="display: none;margin:20px;height: 50px; width: 500px;border: 1px forestgreen solid"></div>


<div id="images" style="display: none">
    <div style="height:600px">
        <div id="text"></div>

        <div id="pointPosition">
            <div class="form-inline" role="form" style="margin: 10px;">
                <button class="btn btn-default" onclick="firstPoint()" style="width: 110px">FirstPoint</button>
                <div class="form-group">
                    <label class="control-label" for="first_x" style="margin: 0px 5px">X:</label>
                    <input class="form-control" id="first_x" name="first_x" style="width: 100px" readonly>
                </div>
                <div class="form-group">
                    <label class="control-label" for="first_y" style="margin: 0px 5px">Y:</label>
                    <input class="form-control" id="first_y" name="first_y" style="width: 100px" readonly>
                </div>
            </div>
            <div class="form-inline" role="form" style="margin: 10px;">
                <button class="btn btn-default" onclick="secondPoint()" style="width: 110px">SecondPoint</button>
                <div class="form-group">
                    <label class="control-label" for="second_x" style="margin: 0px 5px">X:</label>
                    <input class="form-control" id="second_x" name="second_x" style="width: 100px" readonly>
                </div>
                <div class="form-group">
                    <label class="control-label" for="second_y" style="margin: 0px 5px">Y:</label>
                    <input class="form-control" id="second_y" name="second_y" style="width: 100px" readonly>
                </div>
            </div>

            <div class="form-inline" role="form" style="margin: 10px;">
                <button class="btn btn-default" onclick="verticalFlip()" style="width: 110px">vertical flip</button>
            </div>

            <div class="form-inline" role="form" style="margin: 10px;">
                <label class="control-label" for="fRate" style="margin: 0px 5px">set fRate:</label>
                <input class="form-control" id="fRate" name="fRate" style="width: 100px">
            </div>

            <div class="form-inline" role="form" style="margin: 10px;">
                <label class="control-label" for="manualCalibration" style="margin: 0px 5px">manual calibration:</label>
                <input class="form-control" id="manualCalibration" name="manualCalibration" style="width: 100px">
            </div>

            <div class="form-inline" role="form" style="margin: 10px;">
                <button class="btn btn-default" onclick="viewPulsatility()" style="width: 110px">pulsatility</button>
            </div>

            <div class="form-inline" role="form" id="lineChart" style="display: none;margin: 10px;width: 450px;height: 350px;border: 1px red solid">

            </div>



        </div>
    </div>


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