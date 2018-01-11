/**
 * Created by SZJ on 2017/3/31.
 */
var operate = new CommonOperate();

// 加载参数列表
function loadConfigData(flowId,stepId){
    $comTable = $('#configGrid').bootstrapTable({
        method : 'post',
        contentType : "application/x-www-form-urlencoded",
        queryParams: queryParams,
        url : ctx + "config/list/"+stepId,
        cache : false,
        height : $(window).height()-10,
        striped : true,
        pagination : true,
        sidePagination : "server",
        pageSize : 9,
        pageList : [20, 30, 50],
//		search : true,
        showColumns : true,
        showRefresh : true,
        fit:false,
        columns :[
            {field:'ck',width:80,checkbox:true},
            {field:'configId',title:'参数ID',align:'center',sortable:true,visible:false},
            {field:'equipmentName',width:140,title:'设备名称',align:'center'},
            {field:'configName',width:140,title:'参数名称',align:'center'},
            {field:'configCode',width:280,title:'参数编码',align:'center'},
            {field:'fieldType',width:80,title:'参数类型',align:'center'},
            {field:'fieldLength',width:80,title:'参数长度',align:'center'},
            {field:'channelName',width:180,title:'数据通道',align:'center'},
            {field:'unitName',width:80,title:'单位名称',align:'center'},
            {field:'unitCode',width:80,title:'单位编码',align:'center'},
            {field:'itemCode',width:220,title:'OPC数据点变量名(tag点)',align:'center'},
        ],
    });
}

function queryParams(params){
    var configName = isEmpty($("#configName").val()) ? "" : $("#configName").val();
    var configCode = isEmpty($("#configCode").val()) ? "" : $("#configCode").val();
    params.configName = configName;
    params.configCode = configCode;
    return params;
}

function queryConfig(){
    $comTable.bootstrapTable('refresh', {
        url: ctx + "config/list/"+stepId,
        query: {configName: $('#configName').val(),configCode: $("#configCode").val()//传到后台的参数
        }
    });
}



// 新增一个参数属性
function newConfig(stepId,flowId) {
    window.location.href = ctx+'pages/attr/addConfig.jsp?stepId='+stepId+'&flowId='+flowId;
}

// 编辑参数属性
function editConfig() {
    var selectedRows = $comTable.bootstrapTable('getSelections');
    var len = selectedRows.length;
    if(len == 0){
        showAlert('操作提示', '请选择需要修改的行！');
    }else if(len == 1){
        window.location.href = ctx + 'pages/attr/editConfig.jsp?configId=' + selectedRows[0].configId;
    }else{
        showAlert('操作提示', '同时只能对一行进行修改！');
    }
}

// 删除参数属性
function deleteConfig() {
    var rows = $comTable.bootstrapTable("getSelections");
    var len = rows.length;
    if(len == 0){
        showAlert('操作提示', '请选择需要删除的行！');
        return;
    }else{
        var ids = [];
        for(var i=0;i<len;i++){
            ids.push(rows[i]['configId']);
        }
        parent.Modal.confirm({
            msg: "确定要删除选中的【"+ len +"】行吗？"
        }).on(
            function (e) {
                //console.log(e);
                if(e){
                    $.post(ctx + "config/delete", { ids : ids.join(";") }, function (res) {
                        if (res.result) {
                            showAlert('提示', res.message);
                            $comTable.bootstrapTable('refresh', ctx + "config/list/"+stepId);
                        }
                    }, 'json');
                }
            });
    }
}

// 导入参数属性
function inputInto(stepId) {
    window.location.href = ctx+'pages/attr/importFlow.jsp?stepId='+stepId;
}



