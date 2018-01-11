function openPartitionEdit(stepId,parentStepId){
	
	$.get(contextPath+'pages/attr/subareaAttr.jsp',{
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
		  GLOB.dlg.subareaParamDlg =d;
		  
		  init();
	 });
	
	
}



function test(){
	
}


