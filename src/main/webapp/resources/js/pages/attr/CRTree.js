function openCRTreeEdit(stepId, parentStepId){
	$.get(contextPath+'pages/attr/CRTree.jsp',{
		stepId : stepId,
		parentStepId : parentStepId
	} ,function(data) {
		  var d = new Boxy(data,{
			  title : "编辑",
			 // closeText : "关闭",
			  unloadOnHide : true,
			  draggable : true,
			  modal : true
		  });
		  GLOB.dlg.treeParamDlg =d;
	 });
}


function openLogisticRegressionEdit(stepId, parentStepId){
	$.get(contextPath+'pages/attr/logisticRegression.jsp',{
		stepId : stepId,
		parentStepId : parentStepId
	} ,function(data) {
		  var d = new Boxy(data,{
			  title : "逻辑回归",
			 // closeText : "关闭",
			  unloadOnHide : true,
			  draggable : true,
			  modal : true
		  });
		  GLOB.dlg.logisticRegressionDlg =d;
	 });
}