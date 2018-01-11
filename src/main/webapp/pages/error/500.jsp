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
    <link href="<%= CONTEXT_PATH%>resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="<%= CONTEXT_PATH%>resources/css/matrix-style.css" rel="stylesheet" type="text/css"/>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/html5shiv.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="<%=CONTEXT_PATH%>resources/js/comm/bootstrap-tab.js"></script>

    <title>ERROR</title>
    <script type="text/javascript">
        var ctx = "<%=CONTEXT_PATH%>";
        function toFirst() {
            parent.location.href = ctx + "index";
        }
    </script>
</head>
<body>
<div>
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span12">
                <div>
                    <div class="widget-content">
                        <div class="error_ex">
                            <h1>500</h1>
                            <h3>ERROR PAGE</h3>
                            <p>Sorry, internal server error, please contact the system administrator!</p>
                            <a class="btn btn-warning btn-big" onclick="toFirst()">Home</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--Footer-part-->
<%--<div class="row-fluid">--%>
    <%--<div id="footer" class="span12"> 2015 &copy; TalkWeb</div>--%>
<%--</div>--%>
<!--end-Footer-part-->
</body>
</html>