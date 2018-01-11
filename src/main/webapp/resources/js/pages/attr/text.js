function openTextAttrEdit(stepId){
	$.get(contextPath+'pages/attr/text.jsp?stepId='+stepId, function(data) {
		  var d = new Boxy(data,{
			  title : "编辑",
			 // closeText : "关闭",
			  unloadOnHide : true,
			  modal : true,
			  draggable : true
		  });
		  GLOB.dlg.textParamDlg =d;
		  loadLastSaveData();
	 });
	
}
