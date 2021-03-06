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

        var playSpeed = 0;

        var start = false;

        var drawROI = false;
        //ROI
        var offsetX;
        var offsetY;
        var pixelsX;
        var pixelsY;

        // TWO POINTS
        var getFirstPoint = false;
        var getSecondPoint = false;
        var firstPoint_x;
        var firstPoint_y;
        var secondPoint_x;
        var secondPoint_y;


        $(function (e) {

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
                if (drawROI == false) {
                    start = true;
                    if (start) {
                        var x = event.offsetX;
                        var y = event.offsetY;
                        if (getFirstPoint) {
                            // $("div").remove("#text .pixel");
                            $("div").remove(".pixel");

                            firstPoint_x = x + offsetX;
                            firstPoint_y = y + offsetY;
                            $("#first_x").val(firstPoint_x);
                            $("#first_y").val(firstPoint_y);
                            var content = $("<div class='pixel'/></div>").css({"top": y + "px", "left": x + "px"});
                            $(".selectedBox").append(content[0]);
                            getFirstPoint = false;
                        }
                        if (getSecondPoint) {
                            // $("div").remove("#text .pixe2");
                            $("div").remove(".pixe2");

                            secondPoint_x = x + offsetX;
                            secondPoint_y = y + offsetY;
                            $("#second_x").val(secondPoint_x);
                            $("#second_y").val(secondPoint_y);
                            var content = $("<div class='pixe2'/></div>").css({"top": y + "px", "left": x + "px"});
                            $(".selectedBox").append(content[0]);
                            getSecondPoint = false;
                        }
                    }
                    start = false;
                }

            })
        });

        window.onload = function (e) {
            e = e || window.event;
            // diffX, diffY the Y-axis difference between first point and $text
            var startX, startY, diffX, diffY;
            // is drag or not,initial is false
            var dragging = false;

            var $text = document.getElementById("text");

            // mouse down
            $('#text').mousedown(function (e) {
                if (drawROI) {
                    startX = e.pageX;
                    startY = e.pageY;

                    // if mouse down on class of selectedBox
                    if (e.target.className.match('selectedBox')) {
                        // $(".selectedBox").css("cursor", "move");

                        // allow to drag
                        dragging = true;

                        // set current div name as "moving_box"
                        if (document.getElementById("moving_box") !== null) {
                            document.getElementById("moving_box").removeAttribute("id");
                        }
                        e.target.id = "moving_box";

                        // calculate the coordinate difference
                        diffX = startX - e.target.offsetLeft;
                        diffY = startY - e.target.offsetTop;
                    }
                    else {
                        //delete old selectedBox
                        $("div").remove(".selectedBox");

                        // create selectedBox in text
                        var active_box = document.createElement("div");
                        active_box.id = "active_box";
                        active_box.className = "selectedBox";
                        active_box.style.top = startY + 'px';
                        active_box.style.left = startX + 'px';
                        $text.appendChild(active_box);
                        active_box = null;
                    }
                }
            });

            // mouse move
            $('#text').mousemove(function (e) {
                // update the size of selectedBox
                if (document.getElementById("active_box") !== null) {
                    var ab = document.getElementById("active_box");
                    ab.style.width = e.pageX - startX + 'px';
                    ab.style.height = e.pageY - startY + 'px';

                    drawROI = false;
                }

                // move,update coordinate of selectedBox
                if (document.getElementById("moving_box") !== null && dragging) {
                    var mb = document.getElementById("moving_box");
                    var text = document.getElementById("text");
                    mb.style.top = e.pageY - diffY + 'px';
                    mb.style.left = e.pageX - diffX + 'px';

                    if (mb.offsetTop < text.offsetTop) {
                        mb.style.top = text.style.top;
                    }
                    if (mb.offsetTop + mb.offsetHeight > text.offsetTop + text.offsetHeight) {
                        mb.style.top = text.offsetTop + text.offsetHeight - mb.offsetHeight + 'px';
                    }
                    if (mb.offsetLeft < text.offsetLeft) {
                        mb.style.left = text.style.left;
                    }
                    if (mb.offsetLeft + mb.offsetWidth > text.offsetLeft + text.offsetWidth) {
                        mb.style.left = text.offsetLeft + text.offsetWidth - mb.offsetWidth + 'px';
                    }

                    drawROI = false;

                }
            });

            // mouse up
            $('#text').mouseup(function (e) {
                // forbid to drag
                dragging = false;
                if (document.getElementById("active_box") !== null) {
                    var text = document.getElementById("text");
                    var ab = document.getElementById("active_box");
                    ab.removeAttribute("id");
                    // if length and width shorter than 3px，remove selectedBox
                    if (ab.offsetWidth < 3 || ab.offsetHeight < 3) {
                        $("div").remove("#active_box");
                    }

                    if (ab.offsetWidth + ab.offsetLeft > text.offsetWidth || ab.offsetHeight + ab.offsetLeft > text.offsetHeight) {
                        $("div").remove("#active_box");
                    }
                }

                var ROI = $(".selectedBox");
                if(ROI.length != 0) {
                    offsetX = ROI.offset().left - 20;
                    offsetY = ROI.offset().top - 198;
                    pixelsX = ROI.width();
                    pixelsY = ROI.height();
                    $("#offsetX").val(offsetX);
                    $("#offsetY").val(offsetY);
                    $("#pixelsX").val(pixelsX);
                    $("#pixelsY").val(pixelsY);
                }
                // $(".selectedBox").css("cursor", "default");
            });
        }

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
                        $("#text").children('span').remove();
                        init();
                        imageNum = Math.floor(res.num / 2);
                        fileNameFloder = fileName;
                        $("#images").show();
                        $("#ProgressInf").text("page 1 of " + imageNum);

                        var firstPicture = "<span> <img src='<%= CONTEXT_PATH%>resources/newImages/" + selectedDiv + "/" + selectedDiv + "_1.jpg' /> </span>";
                        $("#text").append(firstPicture);
                        //add picture
                        for (var i = 1; i < imageNum; i++) {
                            var addPicture = "<span class='spanhide'> <img src='<%= CONTEXT_PATH%>resources/newImages/" + selectedDiv + "/" + selectedDiv + "_" + (i + 1) + ".jpg' /> </span>";
                            $("#text").append(addPicture);
                        }

                        // $("#text").attr("style", "background:url('<%= CONTEXT_PATH%>resources/newImages/" + selectedDiv + "/" + selectedDiv + "_1.jpg'); no-repeat center; -webkit-transition:1s all linear; background-size:100% 600px;  ");

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
            var perNum = 400 / imageNum;
            var temp = Math.floor(num / perNum);
            if (temp < 2) {
                // $("#text").attr("style", "background:url('') no-repeat center; -webkit-transition:1s all linear; background-size:100% 600px;");
                // $("#text").attr("style", "background:url('<%= CONTEXT_PATH%>resources/newImages/" + fileNameFloder + "/" + fileNameFloder + "_1.jpg') no-repeat center; -webkit-transition:1s all linear; background-size:100% 600px;");

                $("#text span").hide().eq(0).show();
                $("#ProgressInf").text("page " + 1 + " of " + imageNum);
            } else {
                // $("#text").attr("style", "background:url('') no-repeat center; -webkit-transition:1s all linear; background-size:100% 600px;");
                // $("#text").attr("style", "background:url('<%= CONTEXT_PATH%>resources/newImages/" + fileNameFloder + "/" + fileNameFloder + "_" + ( temp + 1 ) + ".jpg') no-repeat center; -webkit-transition:1s all linear; background-size:100% 600px;");
                $("#text span").hide().eq(temp - 1).show();
                $("#ProgressInf").text("page " + temp + " of " + imageNum);

            }
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
                        $("#text").attr("style", "background:url(''); no-repeat center; -webkit-transition:1s all linear; background-size:100% 600px;  ");

                        $("#ProgressInf").text("frame 1 of " + imageNum);
                        $("#text").attr("style", "background:url('<%= CONTEXT_PATH%>resources/newImages/" + selectedDiv + "/" + selectedDiv + "_1.jpg'); no-repeat center; -webkit-transition:1s all linear; background-size:100% 600px;  ");
                        hideBtMask();
                    } else {
                        alert("error!");
                        hideBtMask();
                    }
                }
            });
        }

        function firstPoint() {
            var ROI = $(".selectedBox");
            if(ROI.length == 0) {
                alert("Please draw ROI first!");
            } else {
                getFirstPoint = true;
            }

        }

        function secondPoint() {
            var ROI = $(".selectedBox");
            if(ROI.length == 0) {
                alert("Please draw ROI first!");
            } else {
                getSecondPoint = true;
            }
        }

        function init() {

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

            offsetX = null;
            offsetY = null;
            pixelsX = null;
            pixelsY = null;
            $("#offsetX").val("");
            $("#offsetY").val("");
            $("#pixelsX").val("");
            $("#pixelsY").val("");
            $("div").remove("#text .selectedBox");

            $('#bt').css("left", 0);
            $('#bgcolor').css("width", 0);

        }

        var timer = '';  // timer
        var currentPicture = 0;
        var playSpeed = 0;

        function startPlay() {
            // var tempTime = null;
            var speed = $("#playSpeed").val();
            playSpeed = parseInt(speed.replace(/\b(0+)/gi, ""));
            if (speed == null || speed == "") {
                alert("Please input play speed!");
            } else {
                if (isNaN(playSpeed)) {
                    alert("Please input a correct number!");
                } else {
                    $("#startPlay").hide();
                    $("#continuePlay").hide();
                    $("#stopPlay").show();
                    $("#playSpeed").attr('readonly', true);

                    viewImage(0);

                    autoPlay(0, playSpeed);
                }

            }
        }

        function continuePlay() {

            var speed = $("#playSpeed").val();
            playSpeed = parseInt(speed.replace(/\b(0+)/gi, ""));
            if (speed == null || speed == "") {
                alert("Please input play speed!");
            } else {
                if (isNaN(playSpeed)) {
                    alert("Please input a correct number!");
                } else {

                    $("#startPlay").hide();
                    $("#continuePlay").hide();
                    $("#stopPlay").show();
                    $("#playSpeed").attr('readonly', true);

                    autoPlay(currentPicture, playSpeed);
                }
            }
        }

        function stopPlay() {
            clearInterval(timer); // delete timer
            $("#playSpeed").removeAttr('readonly');
            $("#playSpeed").val(playSpeed);
            $("#startPlay").show();
            $("#continuePlay").show();
            $("#stopPlay").hide();

            // init();
        }

        // play auto
        function autoPlay(num, playSpeed) {
            timer = setInterval(function () { // open the Timer
                num++;
                currentPicture = num;
                if (num <= imageNum) {
                    var left = 800 / imageNum * num;
                    $('#bt').css('left', left);
                    $('#bgcolor').width(left);
                    viewImage(left / 2)
                } else {
                    stopPlay();
                    $("#continuePlay").hide();
                    init();
                }
            }, 1000 / playSpeed);
        }

        function startDraw() {
            drawROI = true;
        }

        function speckleTracking() {
            if (offsetX == null || offsetY == null || pixelsX == null || pixelsY == null) {
                alert("Please draw ROI first!")
                return;
            }

            var confidenceStr = $("#confidence").val();
            if(confidenceStr.split(".").length > 2) {
                alert("Please input a correct number!");
                return;
            }else {
                if(confidenceStr == "" || parseFloat(confidenceStr) > 1 || parseFloat(confidenceStr) < 0) {
                    alert("Please input a correct number!")
                    return;
                }
            }


            showBtMask();
            $.ajax(ctx + 'user/speckleTracking', {
                    dataType: 'json',
                    type: "POST",
                    data: {
                        "selectedDiv": selectedDiv,
                        "offsetX": offsetX,
                        "offsetY": offsetY,
                        "pixelsX": pixelsX,
                        "pixelsY": pixelsY,
                        "confidence": $("#confidence").val()
                    },
                    success: function (res) {
                        if (res.result) {
                            hideBtMask();
                            alert("track success!");

                        } else {
                            hideBtMask();
                            alert("track fail!");
                        }
                    }
                });

        }


        function viewPulsatility() {
            if (firstPoint_x == null || firstPoint_y == null || secondPoint_x == null || secondPoint_y == null) {
                alert("Please select two points!")
            } else {
                showBtMask();
                $.ajax(ctx + 'user/viewPulsatility', {
                    dataType: 'json',
                    type: "POST",
                    data: {
                        "imageNum" : imageNum,
                        "selectedDiv": selectedDiv,
                        "firstPoint_x": firstPoint_x,
                        "firstPoint_y": firstPoint_y,
                        "secondPoint_x": secondPoint_x,
                        "secondPoint_y": secondPoint_y,
                        "fRate": $("#fRate").val(),
                        "calibration": $("#manualCalibration").val()
                    },
                    success: function (res) {
                        if (res.result) {
                            hideBtMask();
                            var xArr = res.xList;
                            var yArr = res.yList;
                            $("#lineChart").show();
                            var dataPoint = [];
                            for (var i = 0; i < xArr.length; i++) {
                                var arr = [];
                                arr.push(xArr[i]);
                                arr.push(yArr[i]);
                                dataPoint.push(arr);
                            }
                            lineChartInit(dataPoint);

                        } else {
                            hideBtMask();
                            alert("points out of ROI!");
                        }
                    }
                });
            }


        }

        function lineChartInit(dataPoint) {
            var option = {
                title: {
                    text: 'Tracking point',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        show: true,
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    },

                },
                legend: {
                    data: ['point']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataZoom: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        name: 'X',
                        type: 'value'
                    }
                ],
                yAxis: [
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
                series: [

                    {
                        name: 'point',
                        type: 'line',
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
                <label class="control-label" for="fRate" style="margin: 0px 5px">set speed:</label>
                <input class="form-control" id="playSpeed" name="playSpeed" style="width: 40%"
                       onKeyUp="value=value.replace(/\D/g,'')" onchange="value=value.replace(/\D/g,'')"
                       placeholder="pictures number per second">
                <button class="btn btn-success" id="startPlay" onclick="startPlay()" style="width: 60px">start</button>
                <button class="btn btn-default" id="continuePlay" onclick="continuePlay()"
                        style="width: 70px;display: none">continue
                </button>
                <button class="btn btn-danger" id="stopPlay" onclick="stopPlay()" style="width: 60px;display: none">
                    stop
                </button>
            </div>

            <div class="form-inline" role="form" style="margin: 10px;">
                <button class="btn btn-default" onclick="verticalFlip()" style="width: 110px">vertical flip</button>
                <button class="btn btn-default" id="drawROI" onclick="startDraw()" style="width: 80px;">drawROI</button>
            </div>

            <div class="form-inline" role="form" style="margin: 10px;">
                <div class="form-group">
                    <label class="control-label" for="offsetX" style="margin: 0px 5px">offsetX:</label>
                    <input class="form-control" id="offsetX" name="offsetX" style="width: 100px" readonly>
                </div>
                <div class="form-group">
                    <label class="control-label" for="offsetY" style="margin: 0px 5px">offsetY:</label>
                    <input class="form-control" id="offsetY" name="offsetY" style="width: 100px" readonly>
                </div>
            </div>
            <div class="form-inline" role="form" style="margin: 10px;">
                <div class="form-group">
                    <label class="control-label" for="pixelsX" style="margin: 0px 5px">pixelsX:</label>
                    <input class="form-control" id="pixelsX" name="pixelsX" style="width: 100px" readonly>
                </div>
                <div class="form-group">
                    <label class="control-label" for="pixelsY" style="margin: 0px 5px">pixelsY:</label>
                    <input class="form-control" id="pixelsY" name="pixelsY" style="width: 100px" readonly>
                </div>
            </div>

            <div class="form-inline" role="form" style="margin: 10px;">
                <div class="form-group">
                    <label class="control-label" for="confidence" style="margin: 0px 5px">confidence:</label>
                    <input class="form-control" id="confidence" name="confidence" style="width: 100px"
                           onKeyUp="value=value.replace(/[^\d\.]/g,'').replace(/^\./g, '')" onchange="value=value.replace(/[^\d\.]/g,'').replace(/^\./g, '')"
                           placeholder="from 0 to 1">
                </div>
                <button class="btn btn-default" onclick="speckleTracking()" style="width: 150px">speckle tracking</button>
            </div>

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
                <label class="control-label" for="fRate" style="margin: 0px 5px">set fRate:</label>
                <input class="form-control" id="fRate" name="fRate" style="width: 100px">
            </div>

            <div class="form-inline" role="form" style="margin: 10px;">
                <label class="control-label" for="manualCalibration" style="margin: 0px 5px">manual calibration:</label>
                <input class="form-control" id="manualCalibration" name="manualCalibration" style="width: 100px">
            </div>

            <div class="form-inline" role="form" style="margin: 10px;">
                <button class="btn btn-default" onclick="viewPulsatility()" style="width: 110px">show distances</button>
            </div>

            <div class="form-inline" role="form" id="lineChart"
                 style="display: none;margin: 10px;width: 450px;height: 350px;border: 1px red solid">

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