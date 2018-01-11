/**
 * 组建保存接口
 * @param callback
 * @param errorCallback
 */
function stepSubmitFunction(callback, errorCallback){
	if(typeof option != 'undefined'){
		option.success = callback;
		option.errorCallback = errorCallback;
	}
	if(typeof rule != 'undefined')
		ye.check(rule).do_post(option);
	else{
		callback(null);
	}
}

/**列转行*/
function initSourceColumn(fields){
 	var ret = {};
	for(var i=0; i<fields.length; i++){
		ret[fields[i].sourceColumnId] = fields[i];
	}
	
	return ret;
}

/**
 * 进度条
 */
function stepConfigLoading(){
	$('<div style="position:absolute; top : 10px; right: 10px; background:#f30;color:#fff;padding:0 5px;line-height:20px;font-size:12px;z-index:9999;" id="popLoading">正在加载...</div>').appendTo($(document.body));
}

/**
 * 关闭进度条
 */
function finishStepConfig(){
	$('#popLoading').remove();
}

$(document).keydown(function(e){
	var a = e.keyCode;
	if(a == 27)
		hotKeyBind(e);
});