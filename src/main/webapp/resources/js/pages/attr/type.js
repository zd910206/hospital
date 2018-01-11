function openTypeEdit(stepId,parentStepId){
	$.get(contextPath+'pages/attr/type.jsp', {
		stepId : stepId,
		parentId : parentStepId
	},function(data) {
		  var d = new Boxy(data,{
			  title : "编辑",
			  unloadOnHide : true,
			  modal : true,
			  draggable : true
		  });
		  GLOB.dlg.typeParamDlg =d;
		  initGrid();
	 });
}