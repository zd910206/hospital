function openDiscreteEdit(stepId , parentStepId){
	
	$.get(contextPath+'pages/attr/discrete.jsp',{
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
		  GLOB.dlg.discreteParamDlg = d;
		  
		  init();
	 });
	
	
}


function openTransformEdit(stepId , parentStepId){
	$.get(contextPath+'pages/attr/transform.jsp',{
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
		  GLOB.dlg.transformParamDlg = d;
		  
		  init();
	 });
	
}

