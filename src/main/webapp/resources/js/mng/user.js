var operate = new CommonOperate();

function newUserDlg(){
	window.location.href = ctx+'user/add/forward';
}

function editUserDlg(){
	var selectedRows = $comTable.bootstrapTable('getSelections');
	var len = selectedRows.length;
	if(len == 0){
		showAlert('操作提示', '请选择需要修改的行！');
	}else if(len == 1){
		window.location.href = ctx + 'pages/user/editUser.jsp?userId=' + selectedRows[0].userId;
	}else{
		showAlert('操作提示', '同时只能对一行进行修改！');
	}
}

function deleteUser(){
	var rows = $comTable.bootstrapTable("getSelections");
	var len = rows.length;
	if(len == 0){
		showAlert('操作提示', '请选择需要删除的行！');
		return;
	}else{
		var ids = [];
		for(var i=0;i<len;i++){
			ids.push(rows[i]['userId']);
		}
		parent.Modal.confirm({
			msg: "确定要删除选中的【"+ len +"】行吗？"
		}).on(
			function (e) {
				//console.log(e);
				if(e){
					$.post(ctx + "user/delete", { ids : ids.join(";") }, function (res) {
						if (res.result) {
							showAlert('提示', res.message);
							$comTable.bootstrapTable('refresh', ctx + "user/list/search");
						}
					}, 'json');
				}
			});
	}
}

function formValidate(formid){
	return $("#" + formid).form("validate");
}

function resetForm(formid){
	$("#" + formid).form("clear");
}

function removeAttribute(){
	$('input').removeAttr("class");
	$('input').attr("required", false);
}

function loadUserData(){
	$comTable = $('#userGrid').bootstrapTable({
		method : 'post',
		contentType : "application/x-www-form-urlencoded",
		queryParams: queryParams,
		url : ctx + "user/list/search",
		cache : false,
		height : $(window).height(),
		striped : true,
		pagination : true,
		sidePagination : "server",
		pageSize : 10,
		pageList : [20, 30, 50, 100 ],
//		search : true,
		showColumns : true,
		showRefresh : true,
		columns : [
			{ checkbox: true},
			{field:'userId',title:'用户ID',align:'center',sortable:true,visible:false},
			{field:'password',visible:false},
			{field:'userName',width:200,title:'用户名',align:'center'},
			{field:'departmentName',width:200,title:'部门',align:'center'},
			{field:'userType',width:200,title:'是否管理员',align:'center',formatter:function(value, row, index){
				return row.userType == 1 ? '是' : '否';
			}},
			{field:'userDesc',width:250,title:'用户描述',align:'center'},
			{field:'lastLoginTime',width:200,title:'上次登录时间',align:'center',sortable:true}
		]
	});
}

function queryParams(params){
	var userName = isEmpty($("#userName").val()) ? "" : $("#userName").val();
	var userType = isEmpty($("#userType").val()) ? "" : $("#userType").val();
	params.userName = userName;
	params.userType = userType;
	return params;
}

function queryUser(){
	$comTable.bootstrapTable('refresh', {
		url: ctx + "user/list/search",
		query: {
			userName: $('#userName').val(),
			userType: $("#userType").val()
		}
	});
}
