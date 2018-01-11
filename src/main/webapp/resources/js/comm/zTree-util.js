var setting = {
		view: {
			dblClickExpand: false,
			showLine: true
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
//			beforeClick: beforeClick,
			onClick: onClick
		}
	};

	var zNodes;

	function beforeClick(treeId, treeNode) {
		var check = (treeNode && !treeNode.isParent);
		/* if (!check) alert("只能选择部门！"); */
		return check;
	}
	
	function onClick(e, treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj("dtree"),
		nodes = zTree.getSelectedNodes();
		if(nodes[0].isParent == false && nodes[0].pId == -1){
			showAlert("提示","此协议下无通道可选!");
		}
		if(nodes[0].isParent == false && nodes[0].pId != -1) {
			v = "";
			nodes.sort(function compare(a,b){return a.id-b.id;});
			for (var i=0, l=nodes.length; i<l; i++) {
				v += nodes[i].name + ",";
			}
			if (v.length > 0 ) v = v.substring(0, v.length-1);
			var d = $("#selTree");
			d.val(v);
			// d.attr("value", v);
			idChannel = nodes[0].id;
			hideMenu();
		}

	}
	
	function toggleMenu(){
		if($("#menuContent").css("display") == "none"){
			showMenu();
		}else{
			hideMenu();
		}
	}

	function showMenu() {
		var dObj = $("#selTree");
		var dOffset = $("#selTree").offset();
		$("#menuContent").css({left:dOffset.left + "px", top:dOffset.top + dObj.outerHeight() + "px"}).slideDown(100);

		$("body").bind("mousedown", onBodyDown);
	}
	function hideMenu() {
		$("#menuContent").fadeOut(100);
		$("body").unbind("mousedown", onBodyDown);
	}
	function onBodyDown(event) {
		if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
			hideMenu();
		}
	}

	function selectFirstNode() {
		var treeObj = $.fn.zTree.getZTreeObj("dtree");
		//获取节点
		var nodes = treeObj.getNodes();
		if (nodes.length > 0) {
			var children = nodes[0].children;
			var node = treeObj.getNodeByParam("id", children[0].id);
			treeObj.selectNode(node);
			$("#selTree").val(node.name);
		}
	}
	
	function disableInput(){
		$("#selTree").attr("readonly", "readonly");
	}
	
	function enableInput(){
		$("#selTree").removeAttr("readonly");
	}