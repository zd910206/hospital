$(function(){
	initSelectValue('measure', ctx + 'step/combobox/measure');
	initSelectValue('role', ctx + 'step/combobox/role');
	
	//增加名义值输入匡
	$('#addBtn').on('click',function(){
		addFieldType('');
	});
	
		//名义值保存
	$('#ModelSave').on('click',function(){
		var v = [];
		$('#measure1 input').each(function(){
			v.push($(this).val().replace(',','，'));
		});
		var norminalStr = v.join(',');
		var selected = hot.getSelected();
		var data = hot.getData();
		var change = $(data[selected[0]][5]);
		change.attr('norminalStr',norminalStr);
		data[selected[0]][5]=change[0].outerHTML+"&nbsp"+change[1].outerHTML;
		var newdata = [];
		// $(data[selected[0]][5]).attr('norminalStr',norminalStr);
		for(var i = 0;i < data.length;i ++) {
			var json = {
				check: false,
				columnName: data[i][1],
				measure: data[i][2],
				role: data[i][3],
				type: data[i][4],
				operation: data[i][5],
			};
			newdata.push(json);
		}
		hot.loadData(newdata);
		$("#measure1").modal('hide');
	});

	$('#ModelSave2').on('click',function(){
		var minValue = $('#measure2 #minValue').val();
		var maxValue = $('#measure2 #maxValue').val();
		if(ye.isEmpty(minValue) || ye.isEmpty(maxValue)){
			alert('不能为空');
			return false;
		}
		if(parseFloat(minValue)>parseFloat(maxValue)){
			alert('最大值必须大于最小值！');
			return false;
		}
		var selected = hot.getSelected();
		var data = hot.getData();
		var change = $(data[selected[0]][5]);
		change.attr('maxValue',maxValue);
		change.attr('minValue',minValue);
		data[selected[0]][5]=change[0].outerHTML+"&nbsp"+change[1].outerHTML;
		var newdata = [];
		// $(data[selected[0]][5]).attr('norminalStr',norminalStr);
		for(var i = 0;i < data.length;i ++) {
			var json = {
				check: false,
				columnName: data[i][1],
				measure: data[i][2],
				role: data[i][3],
				type: data[i][4],
				operation: data[i][5],
			};
			newdata.push(json);
		}
		hot.loadData(newdata);
		$("#measure2").modal('hide');
	});
	
	// $('#addColumn').click(function(){
	// 	var confstr = $(this).attr('data-conf');
	// 	var columnHtml = '';
	// 	if(confstr != null){
	// 		var conf;
	// 		eval('conf='+confstr);
	// 		$.each(conf.columns,function(k,val){
	// 			var type = val.type ? val.type : 'text';
	// 			var className = val.className ? val.className : 'form-control '+val.fieldName;
	// 			columnHtml += '<td><input type="'+type+'" class="'+className+'" style="width:'+val.width+'px;"/></td>';
	// 		});
	// 	}else{
	// 		columnHtml = '<td><input type="text" class="form-control columnName" style="width:160px;"/></td>';
	// 	}
	// 	getMaxColumnId(function(columnId){
	// 		var res = [];
	// 		res.push('<tr columnId="'+columnId+'">');
	// 		res.push(columnHtml);
	// 		res.push('<td  class="editable measure" opt-typ="measure" norminalStr="" minVal="" maxVal=""><span class="mval">连续</span>\
	// 		      	<span class="glyphicon glyphicon-triangle-bottom" onclick="option_edit(this)"></span>\
	// 		      	<span class="glyphicon glyphicon-edit"  onclick="measure_edit($(this).parent())" title="编辑"></span></td>');
	// 		res.push('<td class="editable role" opt-typ="role">\
	// 			<span class="mval">输入</span>\
	//           	<span class="glyphicon glyphicon-triangle-bottom" onclick="option_edit(this)"></span>\
	// 			</td>');
	// 		res.push('<td><a href="#" title="删除" class="glyphicon glyphicon-minus" onclick="remove_column(this)"></a></td>');
	// 		res.push('</tr>');
	// 		var html = res.join('');
	// 		$(html).appendTo($('.table tbody')[0]);
	// 	});
	// })
});

//添加名义值输入匡
function addFieldType(val){
	val = val.replace(/"/g,'&quot;');
	$('#addBtn').parent().before('<div class="form-group"><input type="text" class="form-control" value="'+val+'"><a href="#" class="glyphicon glyphicon-minus" onclick="remove_group(this)"></a></div>');
}

//移除名义值
function remove_group(dthis){
	$(dthis).parent().remove();
}

//
// function getMaxColumnId(callback){
// 	//	var columnId = $('.table tr:last').attr('columnId');
// 	//	return columnId ? parseInt(columnId)+1 : 0;
//
// 	//#TODO
// 	$.post(ctx+'setting/getMaxColumnId', {}, function(columnId){
// 		callback(columnId)
// 	});
// }

//名义值编辑内容绑定
function measure_edit(td,t){
	if(typeof t == 'undefined'){
		var v = td.children(0).find('.mval').html();
		$('#measure option').each(function(){
			if($(this).html()==v){
				t = $(this).val();
			}
		});
	}
	if(t==1){
		$('#measure1 .form-group').remove();
		var norminalStr = $(td).attr('norminalstr');
		if(norminalStr != null && "" != norminalStr) {
			var norminalArr = norminalStr.split(",");
			for(var i=0;i<norminalArr.length;i++){
				addFieldType(norminalArr[i]);
			}
		} ;
		$('#measure1').modal('show');

	}else if(t==2){
		$('#measure2').modal('show');
		$('#measure2 #minValue').val($(td).attr('minValue'));
		$('#measure2 #maxValue').val($(td).attr('maxValue'));
	}
}

// function saveFieldType(){
// 	$.post(
// 		ctx + "step/config/dm/field_type_param/update",
// 		{
// 			stepId: stepId,
// 			rows: getRowStr()
// 		},
// 		function(r){
// 			if(r.result){
// 				//$("#modifyModal").modal('hide');
// 				//$('#modifyModal').on('hidden.bs.modal', function (e) {
// 					window.location.reload();
// 			//	})
// 			}
// 	});
// }



function option_edit(dthis){
	var td = $(dthis).parent();//当前点击的td
	var id = td.attr('opt-typ');
	var oldText = $(td).find('.mval').html();//原来td的文本值
	var select = $('<select id="'+id+'_td">'+$('#'+id).html()+'</select>');

	td.html(select);
	select.focus();
	selectedByText(id + "_td", oldText, 'text');
	select.click(function(){
		return false;
	});

	 if(id!='role'){
		 select.change(function(){
				var v = $(this).val();
				var td = $(this).parent();
				measure_edit(td,v);
			});
	 }

	select.width(100);//设置输入框的宽度为td宽度

	//设置input样式
	select.addClass('form-control');

	//当文本框失去焦点时重新变为文本
	select.blur(function(){
    	var input_blur=$(this);
        //保存当前文本框的内容
     	var newText=input_blur.find("option:selected").text();
        var html = '<span class="mval">'+newText+'</span> <span class="glyphicon glyphicon-triangle-bottom" onclick="option_edit(this)"></span>';
        if(id!='role')
        	html += ' <span class="glyphicon glyphicon-edit"  onclick="measure_edit($(this).parent(),'+input_blur.val()+')" title="编辑"></span>'
     	td.html(html);
    });
}