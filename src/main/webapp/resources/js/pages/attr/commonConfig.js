/*function submitConfiguration(){
	validateForm();
	var stepRunType = ($("#stepRunType").find("option:selected").text() == "并行" ? "1" : "0");
//	if(isEmpty(stepRunType)){boxyAlert("运行方式不能为空！");return;}
	if($("div.has-error").length == 0){
		var stepRunNode = isEmpty($("#stepRunNode").val()) ? null : $("#stepRunNode").find("option:selected").text();
		var startClazz = $("#startCls").val();
		var sleepTime = $("#sleep").val();
//		alert("here");return;
		$.ajax(ctx + "step/config/common",{
			data: {stepId : stepId, stepRunType : stepRunType, stepRunNode : stepRunNode, startClass : startClazz, sleepTime : sleepTime },
			type:"POST",
			success: function(res){
				if(res.result){
					parent.MessageAlert(res.message);
				}else{
					parent.MessageAlert(res.message);
				}
			}
		});
	}
	//alert(stepRunType + ":" + stepRunNode);
}*/

//function resetConfiguration(){
//	$("#stepRunType").combobox('setValue', '');
//	$("#stepRunNode").combobox('setValue', '');
//	$("#outputPath").val('');
//}

function selectedByText(id, value,param){
	$('#' + id + ' option').each(function(){
		var text;
		if(param=='text')
			text = $(this).text();
		else
			text = $(this).val();
		
	    if (text == value) {
	        $(this).attr('selected', 'selected');
	        return false;
	    }
	    return true;
	});
}

var options = {
		nonSelectedText: '--没有选择任何节点--',
		nSelectedText:'个节点被选择',
		selectAllText:'选中全部',
		includeSelectAllOption: true,
		enableFiltering: true,
		filterPlaceholder: '查询',
		buttonWidth: '220px',
		maxHeight : 250,
		dropRight: true,
		numberDisplayed : 1
//		buttonText: function(options) {
//			if (options.length == 0) {
//			  return '--请选择运行节点--';
//			}else if (options.length > 1) {
//			  return '选择了 ' + options.length + ' 个节点  ';
//			}else {
//	      var selected = '';
//		      options.each(function() {
//	        selected += $(this).text() + ', ';
//		      });
//	      return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
//		    }
//		}
    };

var initMultipleSelect = function(){
	if($('#stepRunNode').multiselect)
		$('#stepRunNode').multiselect(options);
}

function setMultipleSelected(ids){
	if(!isEmpty(ids)){
		var id = ids.split(",");
	// var count = $("#stepRunNode option").length;
		$.ajax(ctx + 'step/combobox/runNode',{
			type:"POST",
			success: function(obj){
				if(!isEmpty(obj) && obj.length > 0){
					var len = obj.length;
					for (var i=0;i<id.length;i++) {
						for (var j=0;j<len;j++) {
							if (obj[j].id == id[i]) {
//								$("#stepRunNode").get(0).options[j].selected = true;
								$('option[value="' + obj[j].id + '"]', $('#stepRunNode')).prop('selected', true);
								$('option[value="' + obj[j].id + '"]', $('#stepRunNode')).attr('selected', 'selected');
//								$("#stepRunNode option[text='" + obj[j].text + "']").attr("selected", selected)
								break;
//								$('#stepRunNode').val(obj[j].text);
							}
						}
					} 
//					$('#stepRunNode').multiselect('setOptions', options);
//					$('#stepRunNode').multiselect('rebuild');
					 $('#stepRunNode').multiselect('refresh');
					 $('.btn-group').addClass("open");
				}
			}
		});
	}
}

function showOrHidePriority(){
	var selVal = $('#priority').val();
	if(selVal == 0){
		$('#numPriority').attr('disabled', true);
	}else{
		$('#numPriority').attr('disabled', false);
		$('#numPriority').val("50");
	}
}

function showOrHideOption(){
	var selVal = $('#stepRunType').val();
	if(selVal == 'STEP_RUN_CONCURRENCY'){//并发
		//$('#startCls').attr('disabled', false);
		$('#sleep').attr('disabled', false);
		$('#dataCycle').attr('disabled', false);
		
		if(parent.$('#jobDependTab')){
			parent.$('#jobDependTab').parent().addClass('disabled');
		}
	}else{
		//$('#startCls').val('').attr('disabled', true);
		$('#sleep').val('').attr('disabled', true);
		$('#dataCycle').val('').attr('disabled', true);
		if(parent.$('#jobDependTab')){
			parent.$('#jobDependTab').parent().removeClass('disabled');
		}
	}
}

function initCommonCfgSelect(step_id, callback){
	stepId = step_id;
	var i = 0;
	initSelectValue('stepRunType', ctx + 'step/combobox/runType',function(){i++;callOver()});
	initMultipleSelectValue('stepRunNode', ctx + 'step/combobox/runNode', function(){initMultipleSelect();i++;callOver()});
	initSelectValue('startCls', ctx + 'step/combobox/startCondition',function(){i++;callOver()});
	initSelectValue('dataCycle', ctx + 'step/combobox/dataCycle',function(){i++;callOver();});
	
	function callOver(){
		if(i==4){
			loadCfg(callback);
		}
	}
	
	function loadCfg(callback){
		$.ajax(ctx + "step/config/load/" + stepId,{
			type:"POST",
			success: function(res){
				if(res && res.result){
					if(res.stepParam){
						var len = res.stepParam.length;
						for(var i=0;i<len;i++){
							res.stepParam[i].paramName && res.stepParam[i].paramName == "condition_class" && selectedByText("startCls", res.stepParam[i].paramValue,'value');/*$("#startCls").val(res.stepParam[i].paramValue)*/;
							res.stepParam[i].paramName && res.stepParam[i].paramName == "dataCycle" && $("#dataCycle").val(res.stepParam[i].paramValue);
							res.stepParam[i].paramName && res.stepParam[i].paramName == "task_sleeptime" && $("#sleep").val(res.stepParam[i].paramValue);
							res.stepParam[i].paramName && res.stepParam[i].paramName == "log_name" && $("#logTableName").val(res.stepParam[i].paramValue);
						}
					}else{
						$("#startCls").val('com.talkweb.etl.agent.api.condition.CommonCondition');
					}
					
					if(res.stepCfg){
	//					if(!isEmpty(res.stepCfg.stepName)) $("#stepName").val(res.stepCfg.stepName);
						selectedByText("priority", res.stepCfg.isLevel,'value');
						if(res.stepCfg.isLevel == 1){
							var num = res.stepCfg.priorityLevel;
							if(num == 10000){
								$('#numPriority').val('');
							}else{
								$('#numPriority').val(num);
							}
							$('#numPriority').attr('disabled', false);
						}else if(res.stepCfg.isLevel == 0){
							$('#numPriority').attr('disabled', true);
							$('#numPriority').val('');
						}else{
							$('#numPriority').attr('disabled', false);
						}
						if(!isEmpty(res.stepCfg.stepRunType)){
							selectedByText("stepRunType", (res.stepCfg.stepRunType == "1" ? "STEP_RUN_CONCURRENCY" : "STEP_RUN_SERIAL"),'value');
							showOrHideOption();
						}	 
						//if(!isEmpty(res.stepCfg.stepRunNode)) selectedByText("stepRunNode", res.stepCfg.stepRunNode,'value');
						if(!isEmpty(res.stepCfg.stepRunNode)) setMultipleSelected(res.stepCfg.stepRunNode);
							
	//					flowId=res.stepCfg.flowId;
					}
					callback && callback();	
				}else{
					MessageAlert(res.message);
				}
			}
		});
	}
}