/*
 *    表格数据编辑器，用于和bootstrapTable插件配合使用

 *    说明：
 *    <p>1. formatter:ye.edit.bootstrapTable  用于普通文本框的编辑</p>
 *    <p>
 *    		2. formatter:new ye.edit.bootstrapTable(lang.data,'paramType').select  用于下拉框的选择，
 *    		    lang.data为需要绑定的值，以value=text格式，为null则为默认值
 *    </p>
 *    <p>
 *         3 . 为事件添加绑定操作。
 *         	onLoadSuccess:function(data){
 *         		ye.edit.bind(data,"setting/param/post",'paramId',{width:180});
 *         	}
 *    </p>
 */

!(function (ye) {
	ye.edit = {};
	var _LIST_VALUE = {}; //存储下拉选项内容
	var _UPDATE_BIND = [];
	ye.edit.bootstrapTable = function (value, row, index, field, filter) {
		if (typeof row != 'string') {
			value = (value == null || value == '') ? '' : value;
			
			return '<span class="form-edit" title="编辑" ed-index="' + index + '" field="' + field + '"  onclick="do_click(this)">' + value + '</span>';
		} else {
			//下拉列初始化
			_LIST_VALUE[row] = value;
			_LIST_VALUE[row].filter = filter;
			
			return this;
		}
	};

	/*下拉列*/
	ye.edit.bootstrapTable.prototype.select = function (value, row, index, field) {
		var _tar_val = null;
		var _tar_text = null;
		
		if(_LIST_VALUE[field]){
			_tar_val = _getValue(_LIST_VALUE[field],value);
			_tar_text = _getText(_LIST_VALUE[field],value);
		}
		
		var _tar_text = _tar_text ? _tar_text : _getText(_LIST_VALUE[field],'');
		
		this.filter = _LIST_VALUE[field].filter;
		
		//默认值处理
		$.each(_LIST_VALUE[field], function (i, val) {
			if (typeof value == 'string' && value.toLowerCase() == val.value.toLowerCase()) {
				row[field] = val.value;
				_UPDATE_BIND.push({
					index  : index,
					row : row
				});
			}
		});
		row[field] = _tar_val;
		_UPDATE_BIND.push({
			index  : index,
			row : row
		});

		return '<span class="form-edit" title="编辑" type="select" ed-index="' + index + '" field="' + field + '" filter="'+this.filter+'" onclick="do_click(this)">' + _tar_text + '</span>'
	};

	var option,
	$that;
	ye.edit.bind = function (data, uri, keyField, _option, table) {
		option = $.extend(
				//默认值
			{
				width : 100,
				blurSubmit : true //光标移开即提交
			},
				//必须值
			{
				uri : uri,
				keyField : keyField,
				data : data
			}, _option);

		$that = table;
		
		$.each(_UPDATE_BIND,function(i,val){
			$that.bootstrapTable('updateRow',val);
		});
		
		_UPDATE_BIND = [];
	}

	window.do_click = function(o) {
		o.className = '';
		$(o).data('original', o.innerHTML);
		if (ye.getAttr(o, 'type') == 'select') {
			var dom = ye.create("select");
			var field = ye.getAttr(o, 'field');
			
			//已经选中的值
			var btrows = $that.bootstrapTable('getData');
			var tars = {};
			$.each(btrows,function(i,val){
				tars[val[field]] = 1;
			});
			
			var newoption = [];
			
			if(_LIST_VALUE[field].filter){
				$.each(_LIST_VALUE[field],function(i,val){
					if(val.value == '' || !tars[val.value] || val.text.toLowerCase() == o.innerHTML.toLowerCase()){
						newoption.push(val);
					}
				});
			}else{
				newoption = _LIST_VALUE[field];
			}
			
			$.each(newoption, function (k, val) {
					var selectedstr = "";
					if (o.innerHTML.toLowerCase() == val.text.toLowerCase()) {
						selectedstr = ' selected="selected";'
					}
					$('<option value="' + val.value + '" ' + selectedstr + '>' + val.text + '</option>').appendTo(dom);	
			});
			
			dom.focus();
		} else if (ye.getAttr(o, "type") == "bool") {
			var dom = document.createElement("input");
			ye.setAttr(dom, "type", "checkbox");
			if (o.innerHTML == "是") {
				dom.value = "1";
			} else {
				dom.value = "0";
				ye.setAttr(dom, "checked", "");
			}
			dom.focus();
			dom.onclick = function () {
				if (this.checked)
					this.value = "1";
				else
					this.value = "0";
			}
		} else {
			if (len(o.innerHTML) < 30) {
				var dom = document.createElement("input");
				dom.className = "form-control";
				dom.value = o.innerHTML;
			} else {
				var dom = document.createElement("textarea");
				dom.className = "textarea";
				o.setAttribute("width", 500);
				if (len(o.innerHTML) < 100)
					o.setAttribute("height", 50);
				else
					o.setAttribute("height", 100);

				dom.value = o.innerHTML;
			}

			dom.style.width = option.width + "px";
		}
		o.innerHTML = "";

		o.appendChild(dom);

		if (ye.getAttr(o, 'type') == 'bool') {
			if (dom.value == "1")
				dom.checked = true;
			else
				dom.checked = false;
		}
		/*
		 * if (event.keyCode == 13){ o.firstChild.onblur(); }
		 */
		o.firstChild.onblur = function () {
			if (ye.getAttr(o, 'type') == 'bool') {
				setTimeout(function (dthis, o) {
					blurfunc(dthis, o);
				}, 200, this, o)
			} else {
				blurfunc(this, o);
			}
		}

		o.onclick = "";
		o.firstChild.focus();
		_obj = o;
	}

	var blurfunc = function (dthis, o) {
		var valid = dthis.parentNode.getAttribute('valid');
		var table = dthis.parentNode.getAttribute('table');
		var field = dthis.parentNode.getAttribute('field');
		var type = dthis.parentNode.getAttribute('type');
		var index = dthis.parentNode.getAttribute('ed-index');
		var val = dthis.value;
		var text = $(dthis).find('option:selected').text();

		if (type == "int") {
			if (!/^\d+$/.test(val)) {
				alert("数据类型错误");
				return;
			}
		} else if (type == "bool") {
			if (!/^0|1$/.test(val)) {
				alert("数据类型错误");
				return;
			}
		}

		dthis.parentNode.onclick = function () {
			do_click(this)
		}
		var typ = ye.getAttr(o, 'type');
		if (typ == 'bool')
			if (val == "1")
				dthis.parentNode.innerHTML = "是";
			else
				dthis.parentNode.innerHTML = "否";
		else if (typ == 'select') {
			dthis.parentNode.innerHTML = text;
		} else
			dthis.parentNode.innerHTML = val;

		_obj.className = 's_edit';
		if (option.blurSubmit) {
			$.post(option.uri, {
				field : field,
				id : option.data[index][option.keyField],
				value : val
			}, function (env) {
				if (!env.result) {
					alert(env.msg);
					_obj.innerHTML = $(o).data('original');
				}
				_obj.className = "form-edit";
			});
		} else {
			_obj.className = "form-edit";

			var data = option.data[index];
			data[field] = val;
			
			$that.bootstrapTable('updateRow', {
				index : index,
				row : data
			});

			//ye.edit.bind(option.data, option.url, option.keyField, option, $that);
			return;
		}
	}

	var len = function (s) {
		var l = 0;
		var a = s.split("");
		for (var i = 0; i < a.length; i++) {
			if (a[i].charCodeAt(0) < 299) {
				l++;
			} else {
				l += 2;
			}
		}
		return l;
	}
	
	var _getValue = function(arr, key){
		var ret = null;
		$.each(arr,function(i,val){
			if(ret ==null && val.value == key){
				ret = val.value;
			}
		});
		return ret;
	};
	
	var _getText = function(arr, key){
		var ret = null;
		$.each(arr,function(i,val){
			if(ret ==null && val.value == key){
				ret = val.text;
			}
		});
		return ret;
	};
})(ye);