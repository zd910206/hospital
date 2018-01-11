function getParam(option){
		var sqltext = getValue() ? getValue() : $("#sqltext").val();
		var param = {
				'sqltext' : sqltext,
				'dbType' : $('input[name=dbType]').val()
			};
		
		param = $.extend(param,option);
		
		return  param;
}

(function($){ 
	$.fn.extend({ 
	"insert":function(value){ 
	//默认参数 
	value=$.extend({ 
	"text":"123" 
	},value); 
	var dthis = $(this)[0]; //将jQuery对象转换为DOM元素 
	//IE下 
	if(document.selection){ 
	$(dthis).focus(); //输入元素textara获取焦点 
	var fus = document.selection.createRange();//获取光标位置 
	fus.text = value.text; //在光标位置插入值 
	$(dthis).focus(); ///输入元素textara获取焦点 
	} 
	//火狐下标准 
	else if(dthis.selectionStart || dthis.selectionStart == '0'){ 
	var start = dthis.selectionStart;	//获取焦点前坐标 
	var end =dthis.selectionEnd;	//获取焦点后坐标
		//以下这句，应该是在焦点之前，和焦点之后的位置，中间插入我们传入的值 .然后把这个得到的新值，赋给文本框 
				dthis.value = dthis.value.substring(0, start) + value.text + dthis.value.substring(end, dthis.value.length); } 
		//在输入元素textara没有定位光标的情况 
			else{ 
				this.value += value.text; this.focus(); 
			}; 
			return $(this); 
		} 
		}) 
	})(jQuery);

var pageNumber = 1;
function data_load(param,pageSize,if_more){
	param['pageNumber'] = pageNumber;
	param['pageSize'] = pageSize;
	
	if(param['sqltext']=='' || param['sqltext']==null){
		$.messager.alert('错误提示','没有输入执行条件!','warning');
		return false;
	}
	
	try{
		$("#data_list").datagrid({
			nowrap : true,
			border : true,
			fitColumns : false,
			singleSelect : true,
			columns : [ [] ],
			data : [],
			pagination : false
		});
		
		$("#data_list").datagrid({
			loadMsg : '正在加载，请稍等...'
		});	
	}
	catch(e){
		console.log(e);
	}
	$('.search').linkbutton('disable');
	$('.search').linkbutton({'iconCls':'icon-loading',text:$('.search').text()});
    $("#msg").empty().removeClass('error').removeClass('success');
	$.ajax({
		type : 'post',
		url : 'post',
		data : param,
		cache : false,
		dataType : 'json',
		success : function(data) {
			if(data.result){
				$("#errormsg").text();
				$('.search').linkbutton('enable');
				$('.search').linkbutton({'iconCls':'icon-search'});
				loadSQLDataGrid(data,param,pageSize);

				//if(!if_more){
					var html = '<img src="../resources/images/dot.gif" title="" alt="" class="icon ic_s_success">成功 (执行花费：'+data.useTime+' 秒) ';
					if(data.rows && data.rows.length>0 && getQueryTotal()){
						//html += '<em class="total" style="margin-left:15px;"><img src="../resources/images/loading.gif" width="20" /> 正在计算数据条数...</em>';
						//getTotalCount(param,'.total',pageSize);
                        setTotalCount(data, param,'.total',pageSize);
					}

					$('.search .l-btn-text').html('执行');
					
					$("#msg").empty().show().removeClass('error').addClass('success').html(html);
				//}
				
				$('.tool').show();
			}else{
				$("#msg").addClass('error').html('<img src="../resources/images/dot.gif" title="" alt="" class="icon ic_s_error">'+data.msg);
				$('.search').linkbutton('enable');
				$('.search').linkbutton({'iconCls':'icon-search'});
				$('.search .l-btn-text').html('执行');
			}
		},
		error : function(msg) {
			$('.search').linkbutton('enable');
			$('.search').linkbutton({'iconCls':'icon-search'});
			$('.search .l-btn-text').html('执行');
			$("#msg").addClass('error').html(msg.responseText);
		}
	});
}

function loadSQLDataGrid(data,param,pageSize) {
	var columns = [];
	$.each(data.columns, function(i, val) {
		columns.push({
			field : val,
			title : val
		});
	});

	$("#data_list").datagrid({
				nowrap : true,
//				height : 400,
//				striped : true,
				border : true,
//				collapsible : true,// 是否可折叠的
//				fit : true,
				fitColumns : false,
				singleSelect : true,
				columns : [ columns ],
				data : data.rows,
				pagination : false,
				rownumbers: true
			});
}

function getQueryTotal(){
	return true;
	//return $('#set-count').prop('checked');
}

function getTotalCount(param,id,pageSize){
	if(getQueryTotal){
		param['act'] = 'getCount';
		$.ajax({
			type : 'post',
			url : 'post',
			data : param,
			cache : false,
			dataType : 'json',
			success : function(data) {
                setTotalCount(data, param,id,pageSize)
			},
			error : function(msg) {
				$("#msg").addClass('error').html(msg.responseText);
			}
		});
	}else{
		console.log('不需要统计...');
	}
}

function setTotalCount(data, param,id,pageSize){
    $("#msg").show();
    if(data.result){
        if(data.total!=0){
            $(id).html('共 '+data.total+' 行 (统计花费：'+data.useTime+' 秒)');

            $('#pageBox').show().pagination({
                pageNumber:pageNumber,
                pageSize: pageSize,
                total: data.total,
                pageList: [10,30,50,100],
                onSelectPage:function(p, pageSize){
                    pageNumber = p;
                    $(this).pagination('loading');
                    param['act'] = '';
                    data_load(param,pageSize,true);
                    $(this).pagination('loaded');
                }
            });
        }
    }else{
        $(id).html(data.msg);
    }
}