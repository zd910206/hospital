/**
 * 数据检测集所有的组件配置
 * @param stepId  步骤ID
 * @param parentStepId 父类步骤ID
 */
//评估
function openAssessEidt(stepId,parentStepId){
	
	$.get(contextPath+'pages/attr/evaluateAttr.jsp',{
		stepId : stepId,
		parentStepId : parentStepId
	} ,function(data) {
		  var d = new Boxy(data,{
			  title : "评估",
			  unloadOnHide : true,
			  draggable : true,
			  modal : true
		  });
		  GLOB.dlg.evaluateParamDlg =d;
		  
		  //init();
	 });
	
}


function openAnalyzeView(stepId,parentStepId){
	$.get(contextPath+'pages/attr/analysisResult.jsp',{
		stepId : stepId,
		parentStepId : parentStepId
	} ,function(data) {
		  var d = new Boxy(data,{
			  title : "分析",
			  unloadOnHide : true,
			  draggable : true,
			  modal : true
		  });
		  GLOB.dlg.analyzeViewDlg =d;
	 });
}
