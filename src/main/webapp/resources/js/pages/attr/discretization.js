function initColumnId(fields){
	var col = [];
	for(var i=0;i<fields.length;i++){
		col.push(fields[i].sourceColumnId);
	}
	return col; 
}

/*格式：
 * 
 *  {"sourceColumnId":"a","columnId":"1","columnName":"a_new","transform":[{"maxValue":"30","minValue":"0","newValue":"20"},{"maxValue":"100","minValue":"30","newValue":"50"}]}
 * 
 */

function getTransformColumn(){
	var rows = getRowsByField();
	var columnId = $('#targetColumnId').val();
	var len = fields.length;
	if(len > 0){
		for(var i=0;i<len;i++){
			var f = fields[i];
			if(_.contains(colNames, columnId)){//已经包含该字段
				if(f.sourceColumnId == columnId){//直接修改transform
					var newColumn = $('#newColumn').val();
					if(!isEmpty(newColumn)){
						f.columnName = newColumn;
					}else{
						delete f.columnName;
						delete f.columnId;
					}
					f.transform = rows;
					break;
				}
			}else{
				//不包含该字段，则加入到fields数组中
				colNames.push(columnId);
				var field = {};//每个字段对应的离散值配置
				field.sourceColumnId = columnId;
				var newColumn = $('#newColumn').val();
				if(!isEmpty(newColumn)){
					field.columnName = newColumn;
				}else{
					delete field.columnName;
					delete field.columnId;
				}
				field.transform = rows;
				fields.push(field);
			}
		}
	}else{
		//第一次进入该页面
		colNames.push(columnId);
		var field = {};//每个字段对应的离散值配置
		field.sourceColumnId = columnId;
		var newColumn = $('#newColumn').val();
		if(!isEmpty(newColumn)){
			field.columnName = newColumn;
		}else{
			delete field.columnName;
			delete field.columnIdl;
		}
		field.transform = rows;
		fields.push(field);
	}
	return fields;
}

function getRowsByField(){
	var rows = [];
	$("input[name^='chk_']").each(function(){
		var row = {};
		var tr = $(this).parent().parent().children();
		row.minValue = tr.eq(1).text();
		row.maxValue = tr.eq(2).text();
		row.newValue = tr.eq(3).text();
		rows.push(row);
	});
	return rows;
}

function getRowsBySelField(sourceColumnId){
	var data = sourceColumnData[sourceColumnId];
	
	/*if(data && data.columnName){
		$('#newColumn').val(data.columnName);
	}*/
	
	$('#rows').html('');
	
	if(data && data['transform']){
		var rows = data['transform'];
		var appendHtml = "";
		for(var i=0;i<rows.length;i++){
			appendHtml += "<tr>";
			appendHtml += "<td><input type='checkbox' name='chk_'></td>";
			appendHtml += "<td class='editable'><span class='form-edit'>" + rows[i].minValue + "</span></td>";
			appendHtml += "<td class='editable'><span class='form-edit'>" + rows[i].maxValue + "</span></td>";
			appendHtml += "<td class='editable'><span class='form-edit'>" + rows[i].newValue + "</span></td>";
			appendHtml += "</tr>";
		}
		$("#rows").html(appendHtml);
	}
	
	bindTdEvent();
}

function addSection(){
	var originHtml = $("#rows").html();
	var appendHtml = originHtml + "<tr>";
	appendHtml += "<td><input type='checkbox' name='chk_'></td>";
	appendHtml += "<td class='editable'><span class='form-edit'></span></td>";
	appendHtml += "<td class='editable'><span class='form-edit'></span></td>";
	appendHtml += "<td class='editable'><span class='form-edit'></span></td>";
	appendHtml += "</tr>";
	$("#rows").html(appendHtml);
	bindTdEvent();
}

/*function getRowStr(){
	var rowStr = "";
	var rows = [];
	$("input[name^='chk_']").each(function(){
		var row = [];
		var tr = $(this).parent().parent().children();
		row.push(tr.eq(1).text());
		row.push(tr.eq(2).text());
		row.push(tr.eq(3).text());
		rows.push(row.join(','));
	});
	rowStr = rows.join('|');
	return rowStr;
}*/

function removeSection(){
	var fields = $("input[name^='chk_']:checked");
	var len = fields.length;
	if(len == 0){
		/* Modal.alert({
		      msg: '请选择一行或多行进行删除！',
		      title: '提示',
		      btnok: '确定',
		      btncl:'取消'
			    });
		return; */
	}else{
		$(fields).each(function(){
				var tr = $(this).parent().parent().children().remove();
		});
		getTransformColumn();
	}
}

//实现td的编辑功能
function bindTdEvent(){
	var tds = $('.editable');//所有td
	//给所有td绑定双击事件
	tds.click(function(e){
		//e.stopPropagation();
		var td = $(this);//当前点击的td
		var oldText = td.text();//原来td的文本值
		var input = $('<input type="text" value="' + oldText + '"/>');
		td.html(input);
		input.focus();
		input.click(function(){
			return false;
		});
		
		input.width(td.width() - 50);//设置输入框的宽度为td宽度
		
		//设置input样式
		input.addClass('form-control');
		
		//当文本框失去焦点时重新变为文本
    	input.blur(function(){
	    	var input_blur=$(this);  
	        
	    	//保存当前文本框的内容  
	     	var newText=input_blur.val();
		 	td.html('<span class="form-edit">'+newText+'</span>');   
	     	getTransformColumn();
        });
	});
}

function bindTdFieldEvent(){
	var tds = $('.query');//所有td
	//给所有td绑定双击事件
	tds.click(function(e){
		//e.stopPropagation();
		var td = $(this);//当前点击的td
		td.parent().find('a').click();
		var oldText = td.text();//原来td的文本值
		var input = $('<input type="text" value="' + oldText + '"/>');
		td.html(input);
		input.focus();
		input.click(function(){
			return false;
		});
		
		input.width(td.width() - 50);//设置输入框的宽度为td宽度
		//input.height(td.height());
		
		//设置input样式
		input.addClass('form-control');
		
		//当文本框失去焦点时重新变为文本  
    input.blur(function(){
    	var input_blur=$(this);  
            //保存当前文本框的内容  
     var newText=input_blur.val();
     td.html('<span class="form-edit">'+newText+'</span>');   
     $('#newColumn').val(newText);
     getTransformColumn();
        });   
	});
}