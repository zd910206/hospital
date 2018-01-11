/**
 * 记录选项集所有的组件配置
 */
function openSpecimenEdit(stepId,parentStepId){
	
	$.get(contextPath+'pages/attr/specimenAttr.jsp',{
		stepId : stepId,
		parentStepId : parentStepId
	} ,function(data) {
		  var d = new Boxy(data,{
			  title : "编辑",
			  unloadOnHide : true,
			  draggable : true,
			  modal : true,
			  draggable : true
		  });
		  GLOB.dlg.specimenParamDlg =d;
		  
		  init();
	 });
	
}
