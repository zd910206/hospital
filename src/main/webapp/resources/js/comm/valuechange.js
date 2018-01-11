//自定义事件valuechange，判断元素（如input、textarea等）的值是否被改变(包括剪切、粘贴和输入)，同时可以获取修改前和修改后的值
//调用方式
/**	 
$('selector').on('valuechange', function (e, previous) {//previous：原来的值， $(this).val():当前值
     YOUR LOGICAL CODE HERE
  });
**/
;
(function($) {
	'use strict';
	
	$.event.special.valuechange = {//valuechange自定义事件名

			//this指向元素
			teardown : function(namespaces) {
				//http://api.jquery.com/unbind/
				$(this).unbind('.valuechange');//移除该命名空间中所有事件，忽略事件类型
			},

			handler : function(e) {
				$.event.special.valuechange.triggerChanged($(this));//调用triggerChanged函数
			},

			//jQuery(elem).bind(event, callback)实际上是映射到 jQuery.event.add(elem, types, handler, data)
			add : function(element) {
				//http://api.jquery.com/on/
				//.on( events [, selector ] [, data ], handler )
				$(this).on(
						'keyup.valuechange cut.valuechange paste.valuechange input.valuechange',//一个或多个用空格分隔的事件类型和可选的命名空间
						element.selector, //选择器
						$.event.special.valuechange.handler//事件处理函数
					)
			},

			triggerChanged : function(element) {
				//内容是否可编辑
				var current = element[0].contentEditable === 'true' ? element.html() : element.val(), 
						previous = typeof element.data('previous') === 'undefined' ? element[0].defaultValue	 : element.data('previous')//第1次previous的值为undefined
				if (current !== previous) {
					element.trigger('valuechange', [ element.data('previous') ])//传递到事件处理程序的额外参数
					element.data('previous', current)//将当前值current赋值给previous
				}
			}
		}
})(jQuery);
