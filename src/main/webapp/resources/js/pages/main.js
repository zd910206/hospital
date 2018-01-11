$(document).ready(function(){
	
	initMenu();
//	loadRecentlyTask();
	loadMyFlow();
//	loadStaut();
});


function initMenu(){
	// 顶部下拉菜单
    var _li=$(".MenuList ul li");
    _li.mouseenter(function(){
        $(this).find("span").show();
    }).mouseleave(function(){
            $(this).find("span").hide();
    });
}

/**
 * 加载最近任务数据
 * */
function loadRecentlyTask(){
	$.post(contextPath+"task/top",{
		rows : "6",
		page : "1",
		userId : userId
	},function(resp){
		if(resp.result){
			var datas = resp.rows;
			var taskStr ="<ul class=\"HitsTime\">";
			for(var index = 0; index < datas.length; index++){
				taskStr +="<li><i>"+(index+1)+".</i><a href=\"#\" onclick=\"openTask("+datas[index]["taskId"]+");\">"+datas[index]["taskName"]+"</a>" +
						"<em>"+new Date(datas[index]["startTime"]).Format("yyyy-MM-dd HH:mm:ss")+"</em></li>";
			}
			taskStr += "</ul>";
			$("#task").empty();
			$("#task").html(taskStr);
		}else{
			alert(resp.msg);
		}
	},"json");
	
	
}

/**
 * 加载我的流程数据
 * */
function loadMyFlow(){
	$.post(contextPath+"flow/top",{
		rows : "6",
		page : "1",
		userId : userId,
		opType : "1"
	},function(resp){
		if(resp.result){
			var datas = resp.rows;
			var taskStr ="<ul class=\"HitsTime\">";
			if(datas.length <= 0){
				taskStr += "<li></li>";
			}else{
				for(var index = 0; index < datas.length; index++){
					taskStr +="<li><i>"+(index+1)+".</i><a href=\"#\" onclick=\"openFlow("+datas[index]["flowId"] + "," + datas[index]["opType"] + ");\">"+datas[index]["flowName"]+"</a>" +
							"<em>"+datas[index]["createTime"]+"</em></li>";
				}
			}
			taskStr += "</ul>";
			$("#flow").empty();
			$("#flow").html(taskStr);
		}else{
			alert(resp.msg);
		}
	},"json");
}

/**
 * 状态统计模块数据
 * */
function loadStaut(){
	
	$.post(contextPath+"task/count",{
		userId : userId
	},function(resp){
		if(resp.result){
			var datas = resp.datas;
			$("#statu").empty();
			var contentStr = "<span>";
			for(var i=0 ; i< datas.length ; i++){
				contentStr += datas[i]["statu"] +" : <b>"+datas[i]["size"]+"</b>个<br />";
			}
			contentStr += "</span>";
			$("#statu").append(contentStr);
		}else{
			alert(resp.msg);
		}
	},"json");
	
}




/**
 * 打开新建画布编辑窗口
 * */
function createNewGraph(){
	//$("#flowCfgName").val("");
	if(auth("create","您没有创建的权限!")){	
	
		$.get(contextPath+'pages/flow/creatFlowForward.jsp',{
			
		} ,function(data) {
			  var d = new Boxy(data,{
				  title : "创建流程",
				  unloadOnHide : true,
				  draggable : true,
				  modal : true
			  });
			  GLOB.dlg.createFlowDlg = d;
			  
			  loadSelDepartMentTree();
		 });
	}
}

function removeAllCell(){
	
}


function openFlowMenu(){
	if(auth("open","您没有打开的权限!")){
		$.get(contextPath+'pages/flow/openFlowMenu.jsp',{
			
		} ,function(data) {
			  var d = new Boxy(data,{
				  title : "打开",
				  unloadOnHide : true,
				  draggable : true,
				  modal : true
			  });
			  GLOB.dlg.openFlowMenuDlg = d;
			  
			  init();
		 });
	}
}

function auth(auth,errMsg){
	if(!GLOB.auths.contains(auth)){
		MessageSlide(errMsg);
		return false;
	}
	return true;
}

function closeWebPage() {  
    if (navigator.userAgent.indexOf("MSIE") > 0) {  
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {  
            window.opener = null; window.close();  
        }  
        else {  
            window.open('', '_top'); window.top.close();  
        }  
    }  
    else if (navigator.userAgent.indexOf("Firefox") > 0) {  
        window.location.href = 'about:blank ';  
    }  
    else {  
        window.opener = null;   
        window.open('', '_self', '');  
        window.close();  
    }  
}  
