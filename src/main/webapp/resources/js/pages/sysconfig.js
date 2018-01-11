/**
 * 创建新选项卡
 * @param tabId    选项卡id
 * @param title    选项卡标题
 * @param url      选项卡远程调用路径
 */
function addTab(tabId,title,url){
	//如果当前id的tab不存在则创建一个tab
	if($('#'+tabId).html()==null){
		var name = 'iframe_'+tabId;
		$('#centerTab').tabs('add',{
			title: title,         
			closable:true,
			cache : false,
			//注：使用iframe即可防止同一个页面出现js和css冲突的问题
			content : '<iframe name="'+name+'"id="'+tabId+'"src="'+url+'" width="100%" height="100%" frameborder="0" scrolling="auto" ></iframe>'
		});
	}else{
		//如果tab页已经打开，那么选中它
		if ($('#centerTab').tabs('exists', title)){
			$('#centerTab').tabs('select', title);
		}
	}
}

/**加载tab时，显示遮照层mask**/
(function() {
	$.extend($.fn.tabs.methods, {
		//显示遮罩  
		loading : function(jq, msg) {
			return jq.each(function() {
				var panel = $(this).tabs("getSelected");
				if (msg == undefined) {
					msg = "正在加载数据，请稍候...";
				}
				$("<div class=\"datagrid-mask\"></div>").css({
					display : "block",
					width : panel.width(),
					height : panel.height()
				}).appendTo(panel);
				$("<div class=\"datagrid-mask-msg\"></div>").html(msg)
						.appendTo(panel).css(
								{
									display : "block",
									left : (panel.width() - $(
											"div.datagrid-mask-msg", panel)
											.outerWidth()) / 2,
									top : (panel.height() - $(
											"div.datagrid-mask-msg", panel)
											.outerHeight()) / 2
								});
			});
		},
		//隐藏遮罩  
		loaded : function(jq) {
			return jq.each(function() {
				var panel = $(this).tabs("getSelected");
				panel.find("div.datagrid-mask-msg").remove();
				panel.find("div.datagrid-mask").remove();
			});
		}
	});
})(jQuery);  

//显示遮罩：$("#tabID").tabs("loading",msg) msg--要显示的信息
//隐藏遮罩：$("#tabID").tabs("loaded")

/**datagrid遮照层**/
(function() {
	$.extend($.fn.datagrid.methods, {
		// 显示遮罩
		loading : function(jq) {
			return jq.each(function() {
				$(this).datagrid("getPager").pagination("loading");
				var opts = $(this).datagrid("options");
				var wrap = $.data(this, "datagrid").panel;
				if (opts.loadMsg) {
					$("<div class=\"datagrid-mask\"></div>").css({
						display : "block",
						width : wrap.width(),
						height : wrap.height()
					}).appendTo(wrap);
					$("<div class=\"datagrid-mask-msg\"></div>").html(
							opts.loadMsg).appendTo(wrap).css(
							{
								display : "block",
								left : (wrap.width() - $(
										"div.datagrid-mask-msg", wrap)
										.outerWidth()) / 2,
								top : (wrap.height() - $(
										"div.datagrid-mask-msg", wrap)
										.outerHeight()) / 2
							});
				}
			});
		},
		// 隐藏遮罩
		loaded : function(jq) {
			return jq.each(function() {
				$(this).datagrid("getPager").pagination("loaded");
				var wrap = $.data(this, "datagrid").panel;
				wrap.find("div.datagrid-mask-msg").remove();
				wrap.find("div.datagrid-mask").remove();
			});
		}
	});
})(jQuery);