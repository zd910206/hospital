$(function(){
	$('[data-toggle="tooltip"]').tooltip();
	
	initTopMenu();
	// getTaskNumsByType(setTaskNums);
		  
	$('#topMsg').click(function(){
		$(this).slideUp(500);
	});
	
	$('#taskModal').on('hidden.bs.modal',function(){
		$('#taskTableDiv').empty().html('<table id="taskTable" ></table>');
	});
	
	$(document).keydown(function(e){
		//var a = e.keyCode;
		hotKeyBind(e);
	});
});

function initTopMenu(){
	$.ajax({
		type:"post",
		url : ctx + "menu/top",
		dataType : "json",
		success : function(res){
			if(res.result){
				var data = res.data;
				var allLevelLen = data.length;
				var levelOne = res.levelOne;
				var levelOneLen = levelOne.length;
				var ulHtml = '';
				for(var i=0;i<levelOneLen;i++){
					var funcId = levelOne[i].funcId;
					var liHtml = '<li class="dropdown" id="' + levelOne[i].funcId + '">' + 
					'<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + levelOne[i].funcName + '<span class="caret"></span></a>';
					//<img style="width:15px;height:15px;" src="' + ctx + levelOne[i]['iconCls'] + '"/>
					
					var innerUlHtml = '<ul class="dropdown-menu" role="menu">';
					var innerLiHtml = '';
					for(var j=0;j<allLevelLen;j++){
						if(data[j]['parentId'] == funcId){
							innerLiHtml += '<li><a href="#" onclick="addPageTab(\'' + levelOne[i].funcId + '_'+j+'\',\'' + data[j]['funcName'] + '\', \'' + data[j]['funcLink'] + '\')">' + data[j]['funcName'] + '</a></li>';
						}
					}
					innerUlHtml += innerLiHtml;
					innerUlHtml += '</ul>';
					liHtml += innerUlHtml;
					ulHtml += liHtml;
					ulHtml += '</li>';
				}
				//console.log(ulHtml);
				$('#menu').append(ulHtml);
			}else{
				MessageAlert(res.message);
			}
		}
	});
}

var setTaskNums = function(task){
	$('#runningSpan').text(task.running);
	$('#pauseSpan').text(task.pause);
	$('#stopSpan').text(task.stop);
}

// function getTaskNumsByType(func){
// 	$.ajax({
// 		type:"post",
// 		async:false,
// 		url:ctx + "task/status/num",
// 		success : function(res){
// 			if(res && res.result){
// 				func && func(res);
// 			}
// 		},
// 		error : function(){
// 			return null;
// 		}
// 	});
// }

// var taskNumInterval = setInterval(function(){
// 	getTaskNumsByType(setTaskNums);
// }, 10 * 1000);

function setFrameHeight(obj) {
	var ifm = obj;
	
	$(ifm.contentWindow.document.getElementById('sidebar-wrapper')).css('height', $(document).height() - 90 - 120);
	$(ifm.contentWindow.document.getElementById('page-content-wrapper')).css('height', $(document).height() - 90 - 120);
//	$($("#flowCfgFrame")[0].contentWindow.document.getElementById('container')).css('height', $(document).height());
	
	var subWeb = document.frames ? ifm.document : ifm.contentDocument;
	if (ifm != null && subWeb != null) {
			ifm.height = subWeb.body.offsetHeight + 'px';
	}
	ifm.height = $(document).height() - 90 + 'px';
	//$('#flowCfgFrame')[0].contentWindow.location.reload(true);
};

var showTopMsg = function(type, title, msg){
	var $msg = $('#topMsg');
	if(isEmpty(type)) type = 'alert-info';
	$msg.removeClass('alert-info alert-warning alert-danger');
	$msg.addClass(type);
	if(isEmpty(title)) title = '提示';
	title += '! ';
	$('#titleSpan').text(title);
	$('#msgSpan').text(msg);
	$msg.slideDown(400, function(){
		setTimeout(function(){
			$msg.slideUp(400);
		},  2 * 1000);
	});
}

function showMask(){
	//myApp.showPleaseWait();
	$('#backdiv').show();
	setTimeout(function(){
		$('#backdiv').hide();
	}, 2000);
}

function initTaskData(url){
	//$('#backdiv').show();
	$taskTable = $('#taskTable').bootstrapTable({
		method : 'get',
		url : url,
		cache : false,
		height : 350,
		striped : true,
		pagination : true,
		sidePagination : "server",
		pageSize : 10,
		pageList : [ 5, 10, 20, 30, 50 ],
		columns : [
		           	{field:'ck',checkbox:true},
        	    	{field:'taskId',title:'任务ID',align:'center',visible:false},
          			{field:'flowId',title:'流程ID',align:'center',visible:false},
          			{field:'taskName',title:'任务名称',align:'left',width: 350,formatter : function(val, row, index){
          				return "<a href=\"#\" onclick=\"openTask('" + row.flowId + "','" + row.taskId + "')\">" + (row.runType==0?"<span class=\"label label-info\">全</span>":'<span class=\"label label-info\">子</span>') + "&nbsp;"  + val + "</a>";
		            			}},
		          	{field:'taskState',title:'任务状态', align:'center',width: 100,formatter:function(value, row, index){
		          		return getTaskStatusByType(row.taskState);
		            			}},
          			{field:'createUserId',title:'创建者ID',align:'center',visible:false},
          			{field:'createUserName',title:'创建者',align:'center',width: 150},
          			{field:'startTime',title:'开始时间',align:'center',width: 150,sortable:true},
          			{field:'endTime',title:'结束时间',align:'center',width: 150,sortable:true},
          			{field:'runTime',title:'运行时间',align:'center',width: 150,sortable:true},
          			{field:'remark',title:'描述',align:'center',width: 200}
		      ]
	});
}

function openTaskByType(taskType, title){
	var btn;
	if(taskType == Task.running){
		btn="<button type=\"button\" class=\"btn btn-default\" style=\"margin-bottom: 5px;margin-left: 5px;\" onclick=\"batchOperateTask('"+ taskType +"','"+ CMD.pause +"','" + false + "')\">暂停</button>" +
      		//"<button type=\"button\" class=\"btn btn-default\" style=\"margin-bottom: 5px;margin-left: 5px;\" onclick=\"batchOperateTask('"+ taskType +"','"+ CMD.pause +"','" + true + "')\">暂停全部</button>" +
      		"<button type=\"button\" class=\"btn btn-default\" style=\"margin-bottom: 5px;margin-left: 5px;\" onclick=\"batchOperateTask('"+ taskType +"','"+ CMD.stop +"','" + false + "')\">停止</button>"; // +
      		//"<button type=\"button\" class=\"btn btn-default\" style=\"margin-bottom: 5px;margin-left: 5px;\" onclick=\"batchOperateTask('"+ taskType +"','"+ CMD.stop +"','" + true + "')\">停止全部</button>";
	}else if(taskType == Task.cancel){
		btn="<button type=\"button\" class=\"btn btn-default\" style=\"margin-bottom: 5px;margin-left: 5px;\" onclick=\"batchOperateTask('"+ taskType +"','"+ CMD.restart +"','" + false + "')\">重跑</button>" +
      		//"<button type=\"button\" class=\"btn btn-default\" style=\"margin-bottom: 5px;margin-left: 5px;\" onclick=\"batchOperateTask('"+ taskType +"','"+ CMD.restart +"','" + true + "')\">重跑全部</button>" +
      		"<button type=\"button\" class=\"btn btn-default\" style=\"margin-bottom: 5px;margin-left: 5px;\" onclick=\"deleteTasks('"+ taskType +"','" + false + "')\">删除</button>" +
      		"<button type=\"button\" class=\"btn btn-default\" style=\"margin-bottom: 5px;margin-left: 5px;\" onclick=\"deleteTasks('"+ taskType +"','" + true + "')\">删除全部</button>";
	}else if(taskType == Task.pause){
		btn="<button type=\"button\" class=\"btn btn-default\" style=\"margin-bottom: 5px;margin-left: 5px;\" onclick=\"batchOperateTask('"+ taskType +"','"+ CMD.resume +"','" + false + "')\">恢复</button>" +
      		//"<button type=\"button\" class=\"btn btn-default\" style=\"margin-bottom: 5px;margin-left: 5px;\" onclick=\"batchOperateTask('"+ taskType +"','"+ CMD.resume +"','" + true + "')\">恢复全部</button>" +
      		"<button type=\"button\" class=\"btn btn-default\" style=\"margin-bottom: 5px;margin-left: 5px;\" onclick=\"batchOperateTask('"+ taskType +"','"+ CMD.stop +"','" + false + "')\">停止</button>"; // +
      		//"<button type=\"button\" class=\"btn btn-default\" style=\"margin-bottom: 5px;margin-left: 5px;\" onclick=\"batchOperateTask('"+ taskType +"','"+ CMD.stop +"','" + true + "')\">停止全部</button>";
	}
	$('#btnDiv').html(btn);
	
	initTaskData(ctx + "task/mng/table/bootstrap/data?taskType=" + taskType);
	
	/*$taskTable.bootstrapTable('refresh', {
        url: ctx + "task/mng/table/bootstrap/data?taskType=" + taskType
    });*/
	
	$('#taskModalLabel').text(title);
	$('#taskModal').modal('show');
}

/**将类型为type的任务批量进行operate操作**/
function batchOperateTask(type, operate, isAll){
	var taskIdSet = [];
	if(isAll == 'false'){
		var rows = $taskTable.bootstrapTable('getSelections');
		if(isEmpty(rows) || rows.length == 0){
			showAlert('提示', '请选择任务');
			return;
		}else{
			for(var i=0;i<rows.length;i++){
				taskIdSet.push(rows[i].taskId);
			}
		}
	}
	
	if(isAll == 'true'){
		var datas = $taskTable.bootstrapTable('getData');
		if(isEmpty(datas) || datas.length == 0) return;
		for(var i=0;i<datas.length;i++){
			taskIdSet.push(datas[i].taskId);
		}
	}
//	if(isEmpty(rows) || rows.length == 0){
//		top.Modal.alert({
//			msg: '请选择任务!',
//			title: '提示',
//			btnok: '确定'
//		});
//		return;
//	}else{
//		$('#taskModal').modal('hide');
		Modal.confirm({
	 		msg: "确定要执行此操作吗？"
		 }).on(
		 function (e) {
			if(e){
				showBtMask();
//				console.log(taskIdSet.join(';'));
				$.ajax({
					type:"post",
					url:ctx + "flow/batch/operate/" + type,
					data:{
						taskIdSet: taskIdSet.join(';'),
						operate: operate,
						isAll: isAll
					},
					success : function(res){
						hideBtMask();
						if(res && res.result){
							Modal.alert({
							      msg: '操作成功',
							      title: '提示',
							      btnok: '确定'
							    }).on(function(e){
							    	$taskTable.bootstrapTable('refresh', {
							            url: ctx + "task/mng/table/bootstrap/data?taskType=" + type
							        });
							    	clearInterval(taskNumInterval);//清除原来的
									getTaskNumsByType(setTaskNums);//立即调用一次
									taskNumInterval = setInterval(function(){
										getTaskNumsByType(setTaskNums);
									}, 10 * 1000);
							    });
//							openTaskByType(type);
						}else{
							Modal.alert({
							      msg: '操作出现错误，导致部分操作无法完成，请重新尝试',//操作如果存在错误，忽略错误，继续操作下一个任务
							      title: '提示',
							      btnok: '确定'
							    }).on(function(e){
							    	$taskTable.bootstrapTable('refresh', {
							            url: ctx + "task/mng/table/bootstrap/data?taskType=" + type
							        });
							    	clearInterval(taskNumInterval);//清除原来的
									getTaskNumsByType(setTaskNums);//立即调用一次
									taskNumInterval = setInterval(function(){
										getTaskNumsByType(setTaskNums);
									}, 10 * 1000);
							    });
						}
					},
					error : function(){
						hideBtMask();
						showAlert('提示', '操作失败');
//						openTaskByType(type);
					}
				});
			}else{
//				$('#taskModal').modal('show');
			}
		 });
//	}
}

function getTaskStatusByType(type){
	if(!isEmpty(type)){
		if(type == "完成"){
			ret = '<span class="label label-success" style="line-height: 18px;">' + type + '</span>';
		}else if(type == "停止"){
			ret = '<span class="label label-danger" style="line-height: 18px;">' + type + '</span>';
		}else if(type == "运行"){
			ret = '<span class="label label-primary" style="line-height: 18px;">' + type + '</span>';
		}else if(type == "暂停"){
			ret = '<span class="label label-warning" style="line-height: 18px;">' + type + '</span>';
		}else if(type == "创建"){
			ret = '<span class="label label-info" style="line-height: 18px;">' + type + '</span>';
		}
	}
	return ret;
};

function getTaskInfoByTaskId(taskId, func){
	var taskState;
	if(!isEmpty(taskId)){
		$.ajax({
			type:"post",
			url:ctx + "task/" + taskId + "/state/",
			success : function(res){
				if(res.result && res.task){
					func && func(res.task);
				}
			},
			error : function(){
				return null;
			}
		});
	}
}

function openTask(flowId, taskId){
	getTaskInfoByTaskId(taskId, function(task){
		flowCfgFrame.window.loadFlowCfg(flowId, taskId, Etl.task, getTaskStatusTips(task.taskState), task.taskName, task.taskState);
	});
	$('#taskModal').modal('hide');
	selectTabByTitle('flowConfig'); // 选中并显示流程配置标签页
}

function deleteTasks(type, isAll){
	var taskIdSet = [];
	var msg;
	if(isAll == 'false'){
		msg = '确定要删除选中的任务吗？';
		var rows = $taskTable.bootstrapTable('getSelections');
		if(isEmpty(rows) || rows.length == 0){
			showAlert('提示', '请选择任务');
			return;
		}else{
			for(var i=0;i<rows.length;i++){
				taskIdSet.push(rows[i].taskId);
			}
		}
	}
	
	if(isAll == 'true'){
		msg = '确定要删除全部任务吗？';
		//var datas = $taskTable.bootstrapTable('getData');
		//if(isEmpty(datas) || datas.length == 0) return;
		//for(var i=0;i<datas.length;i++){
		//	taskIdSet.push(datas[i].taskId);
		//}
	}
	Modal.confirm({
 		msg: msg
	 }).on(
	 function (e) {
		if(e){
			showBtMask();
			$.ajax({
				type:"post",
				url:ctx + "task/mng/delete",
				data:{
					ids: taskIdSet.join(';'),
                    isAll: isAll == 'true'
				},
				success : function(res){
					hideBtMask();
					if(res && res.result){
						Modal.alert({
						      msg: '操作成功',
						      title: '提示',
						      btnok: '确定'
						    }).on(function(e){
						    	$taskTable.bootstrapTable('refresh', {
						            url: ctx + "task/mng/table/bootstrap/data?taskType=" + type
						        });
						    	for(var i = 0 ; i< taskIdSet.length; i++){
						    		callWorkspaceFunction('stopScanServer',taskIdSet[i]);
						    	}
						    	clearInterval(taskNumInterval);//清除原来的
								getTaskNumsByType(setTaskNums);//立即调用一次
								taskNumInterval = setInterval(function(){
									getTaskNumsByType(setTaskNums);
								}, 10 * 1000);
						    });
					}else{
						
					}
				},
				error : function(){
					hideBtMask();
					showAlert('提示', '操作失败');
				}
			});
		}
	 });
}


/*在新标签页打开流程*/
function openFlowByTab(flowId, flowName, taskId, taskStepId,childFlow){
	if(flowId && flowName){
		removeModal();
		var query = {
				'flowId' : flowId,
				'taskId' : typeof(taskId) != 'undefined' ? taskId : -1,
				'taskStepId' : typeof(taskStepId) != 'undefined' ? taskStepId : -1,
				'childFlow' : typeof(childFlow) != 'undefined' && childFlow ? 1 : 0
		};
		addPageTab('flow_'+flowId+'_'+(query.taskStepId > 0 ? query.taskStepId : '0'), flowName,'flow/forward?'+getQueryString(query), 'onload="setFrameHeight(this)"');
	}else{
		Modal.alert({
		      msg : '未指定流程信息',
		      title : '提示',
		      btnok : '确定',
		      mode : 'warning'
		    });
	}
}