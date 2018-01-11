var GLOB_GRID={
	border : true,
	fit : true,
	resizable: true,
	fitColumns : true,
	singleSelect : true,
	remoteSort :false,
};

/**
 * [[
	               {field:'date',title:'日期',width:defaultWidth*0.09},
	               {field:'row',title:'待爬取数',width:defaultWidth*0.09},
	               {field:'skip',title:'跳跃忽略',width:defaultWidth*0.09},
	               {field:'forceskip',title:'上限忽略',width:defaultWidth*0.09},
	               {field:'distinguish',title:'智能识别',width:defaultWidth*0.09},
	               {field:'discard',title:'下载失败',width:defaultWidth*0.09},
	               {field:'finished',title:'完成',width:defaultWidth*0.09},
	               {field:'download',title:'下载量',width:defaultWidth*0.09},
	               {field:'start_time',title:'开始时间',width:defaultWidth*0.09},
	               {field:'end_time',title:'结束时间',width:defaultWidth*0.09},
	               {field:'create_time',title:'创建时间',width:defaultWidth*0.09}
	            ]]
 * 
 * */
function createBaseGrid(id,url,height,columns,fitColumns){
	$("#"+id).datagrid({
		 height : height,
		 //width : 'auto',
	     singleSelect : GLOB_GRID.singleSelect,
	     url: url,
	     //fitColumns: isEmpty(fitColumns)? null : fitColumns,
	     fit : true,
	     resizable : true,
	     columns:columns,
         pagination : { 
	    	pageSize: 10,//每页显示的记录条数，默认为10 
	        pageList: [10,15,30,50,100,150],//可以设置每页记录条数的列表 
	        beforePageText: '第',//页数文本框前显示的汉字 
	        afterPageText: '页    共 {pages} 页', 
	        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
	     },
	     loadMsg:"正在加载数据..."
	});
}

/**
 * 重新设置Gird的大小
 * */
function resizeGridControlsWidth(id){
	$('#'+id).datagrid('resize');
}


/**
 * 错误提示用Alert
 * */
function MessageAlert(msg){
	 $.messager.alert("提示",msg);
}

/**
 * 正确提示用slide
 * */
function MessageSlide(msg){
	$.messager.show({
        title:'提示',
        msg:msg,
        timeout:5000,
        showType:'slide'
    });
}



