var BaseOperate = function(){};

BaseOperate.prototype = {
    save : function(){},
    batchDlete : function(){}
};

var CommonOperate = function(){};

CommonOperate.prototype = new BaseOperate();//BaseOperate.prototype

/***
 * 增加或修改
 * @param url 请求链接
 * @param obj 新增对象
 */
CommonOperate.prototype.save = function(dgId, dlgId, url, obj, isTreeGrid){
    $.ajax(url,{
        contentType : 'application/json',
        data: JSON.stringify(obj),
        type:"POST",
        success: function(res){
            if(res.result){
                if(typeof(dlgId) == "object")
                    dlgId.hide();
                else
                    $('#' + dlgId).dialog('close');
                if(!isEmpty(isTreeGrid) && isTreeGrid){
                    $("#" + dgId).treegrid("reload");
                }else{
                    $("#" + dgId).datagrid("load");
                }
                MessageSlide(res.message);
            }else{
//				$('#' + dlgId).dialog('close');
//				$("#" + dgId).datagrid("load");
                MessageSlide(res.message);
            }
        }
    });
};

/***
 * 批量删除
 * @param dgId
 * @param pkId
 * @param url
 */
CommonOperate.prototype.batchDlete = function(dgId, pkId, url, callback, preCondition) {
    var rows = $("#" + dgId).datagrid("getSelections");
    if (rows.length >= 1) {
        var ids = [];
        for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i][pkId]);
        }

        // 前提条件是否满足
        if(preCondition) {
            // 无法获取回调函数返回值，这里采用全局变量获取
//			if(!preCondition(ids.join(';'))) {
//				return;
//			}
            preCondition(ids.join(';'));
            if(!isMeet) {
                return;
            }
            // 重置条件
            isMeet = false;
        }

        parent.Modal.confirm({msg:"确定要删除选中的行吗？"}).on(
            function(r) {
                if (r) {
                    $.post(ctx + url, {
                        ids : ids.join(";")
                    }, function(res) {
                        if (callback) {
                            callback(res);
                        } else {
                            if (res.result) {
                                showAlert('提示',res.message);
                                // MessageAlert(res.message);
                                $("#" + dgId).datagrid('reload');
                            } else {
                                showAlert('提示',res.message);
                                // MessageAlert(res.message);
                            }
                        }
                    }, 'json');
                }
            });
    } else {
        showAlert('操作提示', '请选择需要删除的行！');
        return;
    }
};

/**
 * 返回选中的行
 *
 * @param dgId
 * @returns
 */
CommonOperate.prototype.getSelectedRow = function(dgId, onlyMsg, emptyMsg) {
    var row = $("#" + dgId).datagrid("getSelected");
    var rows = $("#" + dgId).datagrid("getSelections");
    if (row) {
        if (rows.length > 1) {
            if (!isEmpty(onlyMsg)) {
                MessageAlert(onlyMsg);
            } else {
                showAlert("提示","只能选择一行进行修改！");
            }
            return null;
        }
    } else {
        if (!isEmpty(emptyMsg)) {
            MessageAlert(emptyMsg);
        } else {
            showAlert('操作提示', '请选择需要修改的行！');
        }
        return null;
    }
    return row;
};

/**
 * 批量删除
 *
 * @param dgId
 *            表格ID
 * @param pkId
 *            行主键ID
 * @param url
 *            请求地址
 */
function batchDelete(dgId, pkId, url){
    var rows = $("#" + dgId).datagrid("getSelections");
    if (rows.length >= 1) {
        var ids = [];
        for(var i=0;i<rows.length;i++){
            ids.push(rows[i][pkId]);
        }
//		  alert(ids.join(";"));
        parent.Modal.confirm({msg: "确定要删除选中的行吗？"}).on(
            function (r) {
                if (r) {
                    //控制器中的接收的参数为ids
                    $.post(ctx + url, { ids : ids.join(";") }, function (res) {
                        if (res.result) {
                            showAlert('提示',res.message);
                            // MessageAlert(res.message);
                            $("#" + dgId).datagrid('reload');
                        } else {
                            showAlert('提示',res.message);
                            // MessageAlert(res.message);
                        }
                    }, 'json');
                }
            });
    }else{
        showAlert('操作提示', '请选择需要修改的行！');
        return;
    }
}

/**校验表单**/
function formValidate(formid){
    return $("#" + formid).form("validate");
}

/**重置表单**/
function resetForm(formid){
    $("#" + formid).form("clear");
}

/**关闭对话框**/
function closeDlg(formid){
    $('#' + formid).dialog('close');
}

/**重新加载表格数据**/
function reloadDataGrid(gridid){
    $("#" + gridid).datagrid("load");
}

/***
 * 初始化下拉框
 * @param id
 * @param url
 */
function initCombobox(id, url){
    $('#' + id).combobox({
        url : ctx + url,
        valueField : 'id',
        textField : 'text',
        width : 172
    });
}

/**
 * 初始化下拉树
 * @param id
 * @param url
 */
function initSelectTree(id, url){
    $("#" + id).combotree({
        url : url,
        width : 220
    });
}

function initSelectValue(sel, url, func){
    $.ajax(url,{
        type:"POST",
        success: function(obj){
            if(!isEmpty(obj) && obj.length > 0){
                var len = obj.length;
                if(!isEmpty(sel)){
                    var ids = sel.split(',');
                    for(var f=0;f<ids.length;f++){
                        var id = ids[f];
                        var options = $("#" + id).html();
                        for(var i=0;i<len;i++){
                            options += "<option value='" + obj[i].id + "'>" + obj[i].text + "</option>";
                        }
                        $("#" + id).html(options);
                    }
                }
                func && func(obj);
            }
        }
    });
}

function initSelectAndShowId(sel, url, func){
    $.ajax(url,{
        type:"POST",
        success: function(obj){
            if(!isEmpty(obj) && obj.length > 0){
                var len = obj.length;
                if(!isEmpty(sel)){
                    var ids = sel.split(',');
                    for(var f=0;f<ids.length;f++){
                        var id = ids[f];
                        var options = $("#" + id).html();
                        for(var i=0;i<len;i++){
                            options += "<option value='" + obj[i].id + "'>" + obj[i].id + "</option>";
                        }
                        $("#" + id).html(options);
                    }
                }
                func && func(obj);
            }
        }
    });
}

function initMultipleSelectValue(id, url,func){
    $.ajax(url,{
        type:"POST",
        success: function(obj){
            if(!isEmpty(obj) && obj.length > 0){
                var len = obj.length;
                var options = $("#" + id).html();
                for(var i=0;i<len;i++){
                    options += "<option id='" + obj[i].id + "' value='" + obj[i].id + "'>" + obj[i].text + "</option>";
                }
                //alert(options);
                $("#" + id).html(options);

                func && func(obj);
            }
        }
    });
}

function validateInput(id){
    /* */
    var valText = $("#" + id).val();
    if(isEmpty(valText)){
        $("div." + id).addClass("has-error");
        $("div."+ id + ".empty-error").show();
    }else{
        $("div." + id).removeClass("has-error");
        $("div."+ id + ".empty-error").hide();
    }
}

function validateForm(){
    $(".form-control.required").each(function(){
        //alert($(this).val());
        var valStr = $(this).val();
        if(isEmpty(valStr)){
            $("div." + this.id).addClass("has-error");
            $("div."+ this.id + ".empty-error").show();
        }else{
            $("div." + this.id).removeClass("has-error");
            $("div."+ this.id + ".empty-error").hide();
        }
    });
}

function validator(o){
    if(!isEmpty(o)){
        validate(o);
    }else{
        $("input").each(function(){
            validate(this);
        });
    }
}

function validate(o){
    var id = o.id;
    if(isRequired()){
        var inputStr = $(o).val();
        if(isEmpty(inputStr)){
            removeError(id, 'number-error');
            removeError(id, 'format-error');
            addError(id, 'empty-error');
            showTips(o);
        }else{
            removeError(id, 'empty-error');
            validateByType(o);
            showTips(o);
        }
    }
}

function showTips(t){
    var id = t.id;
    if($("." + id + ".has-error").length == 0){
        $("." + id + ".has-success").show();
    }else{
        $("." + id + ".has-success").hide();
    }
}

function removeError(id, type){
    $("div." + id).removeClass("has-error");
    $("div."+ id + "." + type).hide();
}

function addError(id, type){
    $("div." + id).addClass("has-error");
    $("div."+ id + "." + type).show();
}

function validateByType(dthis){
    var type = $(dthis).attr("validate-type");
    var id = dthis.id;
    var val = $(dthis).val();
    if(type == "ip"){
        if(!isIpAddress(val)){
            addError(id, 'format-error');
        }else{
            removeError(id, 'format-error');
        }
    }else if(type == "number"){
        if(!isNumber(val)){
            addError(id, 'number-error');
        }else{
            removeError(id, 'number-error');
        }
    }
}

function isRequired(){
    return typeof($(".required")) != "undefined";
}

function stepAttrTabSelected(title,index){
    var jq = $(this).find('.panel:eq('+index+')').find('iframe');

    if(!jq.attr('src')){
        jq.attr('src',jq.attr('original'));
    }
}
