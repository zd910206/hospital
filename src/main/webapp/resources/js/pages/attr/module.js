var GLOB_dlg_textParamDlgArg = [];
function xBoxy(url,query,options,success,fail){
	$.messager.progress({
		interval:300,
		text:'请稍等...'
	});
	var l = GLOB_dlg_textParamDlgArg.length;
	$.get(url,query).done(function(data) {
		$.messager.progress('close');
		var d = new Boxy(data,$.extend({
			  title : '编辑',
			  unloadOnHide : true,
			  modal : true,
			  draggable : true
		},options));
		GLOB_dlg_textParamDlgArg.push(d);
		success && success();
	}).fail(function(){
		$.messager.progress('close');
		fail ? fail() : alert('加载出错了!');
	});
	return l;
};

function xBoxyCls(l){
	if(!l){
		l = GLOB_dlg_textParamDlgArg.length-1;
		
		for(var i=0;i<GLOB_dlg_textParamDlgArg.length;i++){
			GLOB_dlg_textParamDlgArg[i] && GLOB_dlg_textParamDlgArg[i].hide();
		}
	}
	GLOB_dlg_textParamDlgArg[l] && GLOB_dlg_textParamDlgArg[l].hide();
}

/*结果内容查看*/
function viewResultInfo(stepId,parentStepId,taskId){
	if(/^\d+$/.test(stepId)){
		if(!/^\d+$/.test(taskId)){
			MessageAlert('无法查看，没有流程号！');
			return;
		}
		
		GLOB.dlg.typeParamDlg = xBoxy(contextPath+'resultController/view',{
			taskId : taskId,
			stepId : stepId,
			parentStepId : parentStepId
		},{
			title : "结果"
		});		
	}
	else{
		MessageAlert('参数错误');
	}
}

/*数据审核*/
function openDataVerify(stepId,parentStepId,taskId){
	GLOB.dlg.typeParamDlg = xBoxy(contextPath+'dataverifyController/set',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "编辑"
	});
}

/*随机森林建模*/
function openRandForestsCreateEdit(stepId,parentStepId,taskId){
	GLOB.dlg.typeParamDlg = xBoxy(contextPath+'RandForestsController/Create',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "编辑"
	});
}

/*随机森林挖掘*/
function openRandForestsEdit(stepId,parentStepId,taskId){
	GLOB.dlg.typeParamDlg = xBoxy(contextPath+'RandForestsController/ming',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "编辑"
	});
}

/*导出编辑*/
function openExportEdit(stepId,parentStepId,taskId){
	GLOB.dlg.typeParamDlg = xBoxy(contextPath+'exportController/edit',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "编辑"
	});
}

/*填充编辑*/
function openFillEdit(stepId,parentStepId,taskId){
	GLOB.dlg.typeParamDlg = xBoxy(contextPath+'fillController/edit',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "编辑"
	});
}

/*C&R数挖掘*/
function openText_CREdit(stepId,parentStepId,taskId){
	GLOB.dlg.typeParamDlg = xBoxy(contextPath+'ModelingController/edit?act=text_CR',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "编辑"
	});
}

/*逻辑回归挖掘*/
function openLogistic_mingEdit(stepId,parentStepId,taskId){
	GLOB.dlg.logisticParamDlg = xBoxy(contextPath+'ModelingController/edit?act=logistic_ming',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "逻辑回归挖掘"
	});
}

/*线性回归挖掘*/
function openLinear_regress_mingEdit(stepId,parentStepId,taskId){
	GLOB.dlg.logisticParamDlg = xBoxy(contextPath+'ModelingController/edit?act=Linear_Regression_ming',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "线性回归挖掘"
	});
}

/*大数据表格*/
function openBigDataTableView(stepId,parentStepId,taskId){
	GLOB.dlg.tabParamDlg = xBoxy(contextPath+'bigdatatableController/view',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "大数据表格"
	});
}

/*记录选择*/
function openRecordChooseEdit(stepId,parentStepId,taskId){
	GLOB.dlg.chooseParamDlg = xBoxy(contextPath+'recordController/choose/edit',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "记录选项"
	});
}

/*方程式*/
function openEquationEdit(stepId,parentStepId,taskId){
	GLOB.dlg.equationParamDlg = xBoxy(contextPath+'resultController/equation/view',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "方程式"
	});
}

/*表格*/
function openTableView(stepId,parentStepId,taskId){
	GLOB.dlg.tableViewDlg = xBoxy(contextPath+'resultController/table/view',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "表格"
	});
}

/*导出平面文件*/
function openOutTextView(stepId,parentStepId,taskId){
	GLOB.dlg.otherViewDlg = xBoxy(contextPath+'resultController/outtext/download',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "平面文件"
	},function(){
		outtext_init();
	});
}

/*线性回归*/
function openLinearEdit(stepId,parentStepId,taskId){
	GLOB.dlg.otherViewDlg = xBoxy(contextPath+'linearController/linear/edit',{
		taskId : taskId,
		stepId : stepId,
		parentStepId : parentStepId
	},{
		title : "线性回归"
	},function(){
		linear_init();
	});
}
