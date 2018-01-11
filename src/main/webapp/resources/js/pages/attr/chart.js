function openChartView(stepId){
	
	$.get(contextPath+'pages/attr/chartAttr.jsp?stepId='+stepId, function(data) {
		  var d = new Boxy(data,{
			  title : "图属性",
			 // closeText : "关闭",
			  unloadOnHide : true,
			  modal : true,
			  draggable : true
		  });
		  GLOB.dlg.charAttrDlg =d;
	 });
	
}