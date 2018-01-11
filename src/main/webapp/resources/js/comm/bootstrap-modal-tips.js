/**
 * 简化bootstrap模态框的使用
 */

/**
 * 使用方法如下：
 1.引入该js脚本
 2.在html加入如下文本：

<div id="syg-alert" class="modal fade">
<div class="modal-dialog">
	<div class="modal-content">
	    <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title"><i class="fa fa-exclamation-circle"></i> [Title]</h4>
	    </div>
	    <div class="modal-body">
	        <p>[Message]</p>
	    </div>
	    <div class="modal-footer" >
	        <button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>
	        <button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>
	    </div>
	</div>
</div>
</div>

3.使用
1)alert
Modal.alert({
		      msg: 'tips here',
		      title: 'title',
		      btnok: 'ok',
		      btncl:'cancel'
			    });
			    
2)confirm
//这里的on函数的参数是函数，点击【ok】按钮，则e返回true,否则返回false
Modal.confirm({
 msg: "tips here"
 }).on( function (e) {
	
});	    
**/

;
(function($) {
	$(function() {
		'use strict';
		window.Modal = function() {
			var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');//i 表示不不区分大小写  //g 表示匹配全部 //m 表示多行匹配
			var alr = $("#syg-alert");//与div中的id对应，即保持一致
			var ahtml = alr.html();
	
			var _alert = function(options) {
				alr.html(ahtml); // 复原
				alr.find('.ok').removeClass('btn-danger').addClass('btn-primary');
				if(options.btnclAll){
					alr.find('.cancelAll').show();
				}

				alr.find('.cancel').hide();//alert框隐藏cancel按钮
				
				var mode = {
						warning : function(options){
							var res = [];
							res.push('<img src="resources/images/status/failed.gif"> ');
							res.push(options.msg);
							options.msg = res.join('');
						},
						success : function(options){
							var res = [];
							res.push('<img src="resources/images/status/complete.gif"> ');
							res.push(options.msg);
							options.msg = res.join('');
						}
				};
				
				if(options.mode){
					mode[options.mode](options);
				}
				
				_dialog(options);//覆盖默认的option
	
				return {
					on : function(callback) {
						if (callback && typeof(callback) == 'function') {//callback instanceof Function
							alr.find('.ok').click(function() {
								callback(true)
							});
						}
					}
				};
			};
			
			var _confirm = function(options) {
				alr.html(ahtml); // 复原
				alr.find('.ok').removeClass('btn-primary').addClass('btn-default');//addClass('btn-success')
				alr.find('.cancel').show();
				_dialog(options);
	
				return {
					on : function(callback) {
						if (callback && typeof(callback) == 'function') {
							alr.find('.ok').click(function() {
								callback(true)
							});
							alr.find('.cancel').click(function() {
								callback(false)
							});
						}
					}
				};
			};
	
			var _dialog = function(options) {
				//默认option
				var ops = {
					msg : "提示内容",
					title : "操作提示",
					btnok : "确定",
					btncl : "取消"
				};
				
				//合并选项
				$.extend(ops, options);
	
				//在这里通过正则替换掉占位符
				var html = alr.html().replace(reg, function(node, key) {
					return {
						Title : ops.title,
						Message : ops.msg,
						BtnOk : ops.btnok,
						BtnCancel : ops.btncl,
						BtnCancelAll : ops.btnclAll
					}[key];
				});
	
				alr.html(html);
				alr.modal({
					width : 500,
					backdrop : 'static'
				});
			}
	
			return {
				alert : _alert,
				confirm : _confirm
			}
	
		}();
	});
})(jQuery);