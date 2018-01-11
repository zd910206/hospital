/**
 * jsonTree 0.0.1 talkweb style to display tree
 */
;(function($,d3){
	/**
	 *  data：json数据
	 *  target：目标，顶点名称
	 */
	$.fn.jsonTree = function(data,target,m,locktop,setting){
		
		this.target_attribute = target;
		var json = target ? [{
			name:target,
			child:data
		}] : data;
		
		
		locktop = locktop || false;
		
		setting = $.extend({
			tag : 'top',
			parent : this,
			width : function(){return 0;},
			height : 0,
			func : null
		},setting);
		
		this.tag = setting.tag;
		
		//矩形尺寸
		this.rectwidth = 100;
		this.rectheight = 75;
		
		//起始节点
		this.itree = -1;
		
		//分组起始
		this.groupid = 0 ;
		
		//2树之间的间隔
		this.blank = 20;
		
		//需要绘制的坐标容器
		this.listmap = [];
		
		//组容器
		this.groupmap = {};
		
		//锁定层，从N开始
		this.startunopenLayer = -1;
		
		//需要打开的定点itree
		//this.pblank =[];
		
		//起始点
		this.m = m || {x:330,y:60};		
		
		//新绘图
		this.jsonTree2(this.m,json);
		
		//统计总数
		this.count = this.countNum();
		
		/**
		 * 	节点结构
		 * 	[ //层
		 * 		[ //子节点
		 * 			[1,2,3,4,5]//节点
		 * 		],
		 * 		[ //第2个节点
		 * 
		 * 		]
		 * 	]
		 */
		this.groupmap2 = [];
		
		//分组
		this.re_sort_group();
		
		//基本调整
		this.reset_listmap();
		
		//布局调整，坐标调整
		//if(this.listmap.length<500)
		this.layout_listmap();
		
		
		//自适应顶点位置
		if(!locktop){
			var min_x = this.get_min('x');
			
			if(min_x<0){
				this.move_child_node(0,min_x*-1);
			}
			
			
		}
		
		//补齐线条
		this.reset_line();
		
		
		//console.log(this.get_max('x'));
		
		//console.log(setting.parent.get_max('x'));
		
		
		//自适应大小
		setting.parent.css({
			width:(this.get_max('x')+setting.width(this))+'px',
			height:(this.get_max('y')+setting.height)+'px'
		});
		
		
		setting.func && setting.func(this);
		
		//最终绘制
		this.draw();
	};
	
	//计算最大宽高
	$.fn.get_max = function(xy){
		var max = 0;
		for(var i in this.listmap){
			if(this.listmap[i][xy] > max)
				max = this.listmap[i][xy]; 
		}
		return (max+150);
	};
	
	//计算最大宽高
	$.fn.get_min = function(xy){
		var len = this.startunopenLayer == -1 ? this.groupmap2.length-1 : this.startunopenLayer;
		
		var min = 0;
		for(var i=0;i<=len;i++){
			var group = this.groupmap2[i];
			for(var k2=0;k2<group.length;k2++){
				for(var g3=0;g3<group[k2].length;g3++){
					var itree = group[k2][g3];
					if(this.listmap[itree][xy] < min)
						min = this.listmap[itree][xy]; 
				}
			}
		}
		return min - 20;
	};
	
	//统计数量
	$.fn.countNum = function(){
		var num = 0;
		for(var i in this.listmap){
			if(this.listmap[i].data.text){
				var param = /\([\d\.\/]+\)/.exec(this.listmap[i].data.text);
				
				var text = this.listmap[i].data.text;
				
				if(param!=null && param.length>0)
					text = param[0].replace(/^\(|\)$/g,'');
				
				var n = text.match(/[\d\.]+/g);
				
				var tmp = 0;
				if(n){
					for(var k=0;k<n.length;k++){
						tmp = (Math.round(tmp*100) + Math.round(parseFloat(n[k])*100))/100;
					}
					num = (Math.round(num*100) + tmp*100)/100;
					this.listmap[i].data.currectNum = parseFloat(n[0]);
					this.listmap[i].data.wrongNum = parseFloat(n[1]);
					this.listmap[i].data.n = tmp;
				}
			}
		}
		
		this.set_parent_data();
		
		return num;
	};
	
	//计算父节点
	$.fn.set_parent_data = function(itree){
		for(var i=this.listmap.length-1;i>=0;i--){
			if(typeof this.listmap[i].data.n =='undefined'){
				var n = 0;
				var child = this.findChildNode(i);
				for(var j=0;j<child.length;j++){
					n = (Math.round(n * 100) + this.listmap[child[j]].data.n*100)/100;
				}
				
				this.listmap[i].data.n = n;
			}
		}
	};
	
	//计算结构
	$.fn.jsonTree2 = function(m,json){
		var cjson2 = [];
		this.groupmap[this.groupid] = [];
		
		for(var k in json){	
			this.itree++;
			
			var x = m.x;
			var y = m.y;
			var blank = this.blank;
			
			var listmap = {};
			
			//画矩形上的线条
			if(this.itree>=0){
				listmap.sourceline = {};
			}
			
			json[k].itree = this.itree;
			
			//画矩形
			listmap.rect = {};
			
			listmap.itree = this.itree;
			listmap.pid = json[k].pid;
			
			listmap.x = x;
			listmap.y = y;
			
/*			//相对坐标
			listmap.px = this.rectwidth + blank;
			listmap.py = this.rectheight*2 + 25;*/
			
			listmap.data = json[k];
			
			//画下面的线条
			if(json[k].child){
				listmap.appendline = {
						data:json[k]
					};
			}
			
			this.listmap[this.itree] = listmap;
			
			//子节点
			if(json[k].child){
					for(var k2 in json[k].child){
						json[k].child[k2].pid = this.itree;
						cjson2.push(json[k].child[k2]);
					}
			}
			
			if(this.itree>0){
				m.x += this.rectwidth+blank;
			}
			
			var tm = this.itree;
			
			this.groupmap[this.groupid].push(tm);
		}
		
		this.groupid++;
		
		var nm = {};
		nm.x = this.m.x;
		
		nm.y = m.y+this.rectheight*2 + 25;
		
		if(cjson2.length>0)
			this.jsonTree2(nm,cjson2);
	};
	
	//绘制到页面
	$.fn.draw = function(){
		for(var i = 0;i<this.groupmap2.length;i++){
			if(this.startunopenLayer>-1 && i>this.startunopenLayer){
				break;
			}
			var group = this.groupmap2[i];
			for(var k2=0;k2<group.length;k2++){
				for(var g3=0;g3<group[k2].length;g3++){
					var k = group[k2][g3];
					
					
					
					var x = this.listmap[k].x;
					var y = this.listmap[k].y;
					
					if(this.listmap[k].topline){
						var o = this.listmap[k].topline;
						this.drawtopline(o.x,o.y,o.width,this.listmap[k].itree);
					}
					
					if(this.listmap[k].sourceline){
						this.drawsourceline(x,y-this.rectheight+10,this.listmap[k].itree);
					}

					var o = this.listmap[k].rect;
					this.drawrect(x,y-25,this.listmap[k].itree,i==this.startunopenLayer);
					
//					console.log('itree:'+k+' i:'+i+' lock:'+(i==this.startunopenLayer));
					
					if(this.listmap[k].appendline && i != this.startunopenLayer){
						var o = this.listmap[k].appendline;
						var child = this.findChildNode(this.listmap[k].itree);
						
						this.listmap[child[0]] && this.drawappendline(x,y+this.rectheight-25,this.listmap[child[0]].itree);
					}
				}
			}
		}
	};
	
	//调整线条
	$.fn.reset_line = function(){
		//topline补齐
		for(var i in this.groupmap2){
			var group = this.groupmap2[i];
			for(var j in group){
				var litree = group[j][group[j].length-1];
				this.listmap[litree].topline = {
						y : this.listmap[litree].y - this.rectheight + 10
				};
			}
		}
		
		//重新调整坐标
		for(var k in this.listmap){
			if(this.listmap[k].topline){
				var topid = this.listmap[k].pid;
				var childs = this.findChildNode(topid);
				
				var sitree = childs[0];
				var eitree = childs[childs.length-1];
				
				this.listmap[k].topline.x = this.listmap[sitree].x+this.rectwidth/2;
				
				this.listmap[k].topline.width = this.listmap[eitree].x - this.listmap[sitree].x;
			}
		}
	};
	
	//调整布局
	$.fn.layout_listmap = function(startK){
		if(typeof startK=='undefined')
			startK = 0;

		for(var k=startK;k<this.groupmap2.length;k++){
			//网页保护机制
			if(k>1 && this.listmap.length>1000){
				this.startunopenLayer = k-1;
				break;
			}
			
			var group = this.groupmap[k];
			
			for(var i=0;i<group.length;i++){
				var len = i+2<group.length?i+2:group.length;
				for(var j=i+1;j<len;j++){
					var b = this.listmap[group[j]].x - this.listmap[group[i]].x;
					if(b < (this.rectwidth+this.blank) ){
						
						var topid = this.findParentItree(group[i],group[j]);
						var blank = this.rectwidth/2+this.blank/2;
						
						this.avg_child_node(topid,blank);
						
						this.layout_listmap();
						return;
					}
				}
			}
		}
	};
	
	//检查是否有重叠的部分
	$.fn.reset_listmap = function(){
		for(var k in this.groupmap2){
			var group = this.groupmap2[k];
			
			for(var k2 in group){
				
				var itree1 = group[k2][0];
				var pid = this.listmap[itree1].pid;
				
				if(pid>=0){
					var px = this.listmap[pid].x;
				}
				
				var nx = px - (this.listmap[group[k2][group[k2].length-1]].x-this.listmap[group[k2][0]].x)/2;
				for(var g in group[k2]){
					var itree = group[k2][g];
					if(itree>-1){
						var x = this.listmap[itree].x;
						if(nx){
							this.listmap[itree].x = nx;
						}
						nx += this.rectwidth + this.blank;
					}
				}
			}
		}
	};
	
	//重新分组
	$.fn.re_sort_group = function(){
		var newgroupmap = [];
		for(var k in this.groupmap){
			var group = this.groupmap[k];
			if(group.length>1){
				var flg = 0;
				var newarr = [];
				for(var i=flg;i<group.length;i++){
					var arr = [];					
					for(var j=flg+1;j<group.length;j++){
						if(this.listmap[group[i]].pid == this.listmap[group[j]].pid){
							if(i==j-1)
								arr.push(group[i]);
							
							arr.push(group[j]);
							flg = j+1;
							continue;
						}
					}
					
					if(arr.length>0){
						newarr.push(arr);
					}
				}
				newgroupmap.push(newarr);
			}
			else
				newgroupmap.push([group]);
		}
		
		this.groupmap2 = newgroupmap;
	};
	
	//移动节点blank个位置
	$.fn.avg_child_node = function(topid,blank){
		var arr = this.findChildNode(topid);
		if(arr.length>0){
			var center;
			if(arr.length%2==0){
				center = arr.length/2;	
			}
			else
				center = (arr.length-1)/2;
			
			var nblank = blank/(arr.length - 1);
			
			for(var i=0;i<center;i++){
				this.move_child_node(arr[i],blank/2*-1+nblank*i);
			}
			
			for(var i=arr.length-1,j=0;i>=center;i--,j++){
				this.move_child_node(arr[i],blank/2-nblank*j);
			}
		}
	};
	
	//移动节点位置
	$.fn.move_child_node = function(topid,blank,re){
		var arr = this.findChildNode(topid);
		
		if(this.listmap[topid] && !re){
			this.listmap[topid].x += blank;
		}
		
		if(arr.length==0)
			return;
		
		for(var k in arr){
			this.listmap[arr[k]].x += blank;
			
			this.move_child_node(arr[k],blank,2);
		};
	};
	
	//找到子节点
	$.fn.findChildNode = function(topid){
		var arr = [];
		for(var k in this.listmap){
			if(this.listmap[k].pid == topid){
				arr.push(this.listmap[k].itree);
			};
		}
		return arr;
	};
	
	//找父节点
	$.fn.findParentItree = function(itree1,itree2){		
		if(this.listmap[itree1].pid == this.listmap[itree2].pid)
			return this.listmap[itree1].pid;
		else
			return this.findParentItree(this.listmap[itree1].pid,this.listmap[itree2].pid);
	};
	
	//绘制缝合线
	$.fn.drawtopline = function(x,y,width,itree){
		var translate = (x)+" "+(y);
		
		var lineFunction = d3.svg.line()
        .x(function(d) { return d.x+0.5; })
        .y(function(d) { return d.y+0.5; })
        .interpolate("linear");
		
		//svg容器
		var g = d3.select(this[0]).append("g")
					.attr('transform',"translate("+translate+")")
					.attr('class','node_'+this.tag+'_'+itree);
		
		var lineData = [{ "x": 0,   "y": 0},{ "x": width,  "y": 0}];
		
		//把path扔到容器中，并给d赋属性
		var lineGraph = g.append("path")
		                            .attr("d", lineFunction(lineData))
		                            .attr("stroke", "black")
		                            .attr("stroke-width", 1)
		                            .attr("fill", "none");
	};
	
	//绘制引导线
	$.fn.drawsourceline = function(x,y,itree){
		var translate = (x)+" "+(y);
		
		var lineFunction = d3.svg.line()
        .x(function(d) { return d.x+0.5; })
        .y(function(d) { return d.y+0.5; })
        .interpolate("linear");
		
		//svg容器
		d3.svg.path = d3.select(this[0]).append("g")
					.attr('transform',"translate("+translate+")")
					.attr('class','node_'+this.tag+'_'+itree);
		
		var x = this.rectwidth/2;
		var lineData = [{ "x": x,   "y": 0},{ "x": x,  "y": 40}];
		
		if(itree>0){
			//把path扔到容器中，并给d赋属性
			var lineGraph = d3.svg.path.append("path")
			                            .attr("d", lineFunction(lineData))
			                            .attr("stroke", "black")
			                            .attr("stroke-width", 1)
			                            .attr("fill", "none");
		}
		
		if(itree==0)
			var text = this.listmap[itree].data.name;
		else{
			var tval = this.listmap[itree].data.value;
			
			var ex = /\.\d+$/.exec(tval);
			if(ex && ex.length>0 && ex[0].length>3)
				tval = parseFloat(tval).toFixed(3);
			
			var ifs = this.listmap[itree].data.ifs;
			ifs = ifs || '';
			
			var text = ifs+' '+(tval || '');
		}
		
		//没有输出数据的不予显示
		if(text != ' '){
			d3.svg.path.append("rect")
	        .attr("width", this.rectwidth)
	        .attr("height", 20)
	        .attr("x", 0)
	        .attr("y", 10)
	        .attr("fill", "#ffffff");

			d3.svg.path.append("text").attr('x',x).attr('y',25)
			.attr('style','text-anchor: middle;').text(text);
		}
		
	};
	
	//绘制向下引导线
	$.fn.drawappendline = function(x,y,itree){
		var translate = (x)+" "+(y);
		
		var lineFunction = d3.svg.line()
		        .x(function(d) { return d.x+0.5; })
		        .y(function(d) { return d.y+0.5; })
		        .interpolate("linear");
		
		//svg容器
		var path = d3.select(this[0]).append("g")
					.attr('transform',"translate("+translate+")")
					.attr('class','node_'+this.tag+'_'+itree);
		
		var x = this.rectwidth/2;
		var lineData = [{ "x": x,   "y": 0},{ "x": x,  "y": 60}];
		
		//把path扔到容器中，并给d赋属性
		var lineGraph = path.append("path")
		                            .attr("d", lineFunction(lineData))
		                            .attr("stroke", "black")
		                            .attr("stroke-width", 1)
		                            .attr("fill", "none");
		//背景挡板
		path.append("rect")
			        .attr("width", this.rectwidth)
			        .attr("height", 25)
			        .attr("x", 0)
			        .attr("y", 20)
			        .attr("fill", "#ffffff");
		
		var svgtext = path.append("text").attr('x',x).attr('y',25)
			.attr('text-anchor','middle');
		
		function getLength(str) { 
		    var len = str.length; 
		    var reLen = 0; 
		    for (var i = 0; i < len; i++) {        
		        if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) { 
		            // 全角    
		            reLen += 2; 
		        } else { 
		            reLen++; 
		        } 
		    } 
		    return reLen;    
		}
		
		function str_substring(str,size) {
			if(str){
				var len = str.length; 
			    var reLen = 0;
			    var ret = "";
			    for (var i = 0; i < len; i++) {        
			        if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) { 
			            // 全角    
			            reLen += 2;
			        }else { 
			            reLen++; 
			        }
			        ret += str[i];
			        if(reLen>size){
			        	ret += '...';
			        	break;
			        }
			    }
			    
			    return ret; 
			}
			else
				return 0;
		}
		
		var field_name = this.listmap[itree].data.name;
		field_name = str_substring(field_name,20);
		
		svgtext.append('tspan').attr('x',x).attr('dy',10)
			.text(field_name);
		
		path.append('title').html(this.listmap[itree].data.name);
	};
	
	//绘制矩形
	$.fn.drawrect = function(x,y,itree,lock){
		lock = lock || false;
		var rectwidth = this.rectwidth;
		var rectheight = this.rectheight;
		
		var lineData = [{ "x": 0,   "y": 0},{ "x": 0,  "y": rectheight},
		                { "x": rectwidth,  "y": rectheight},{ "x": rectwidth,   "y": 0},
		                { "x": 0,   "y": 0}];
		
		var translate = x+" "+y;
		
		//svg容器
		var Container = d3.select(this[0]).append("g")
					.attr('transform',"translate("+translate+")")
					.attr('class','node_'+this.tag+'_'+itree);
		
		var b = 0.5,wid = 1;
		var lineFunction = d3.svg.line().x(function(d) { return d.x+b; })
	        .y(function(d) { return d.y+b; })
	        .interpolate("linear");
		
		//把path扔到容器中，并给d赋属性
		Container.append("path")
				.attr('class','rect')
                .attr("d", lineFunction(lineData))
                .attr("stroke", "black")
                .attr("stroke-width", wid)
                .attr("fill", "none");
		
		var svgtext = Container.append("text")
					.attr('x',30)
					.attr('y',14)
					.attr("width", this.rectwidth)
					.attr("height", this.rectheight)
					.attr('style','font-size:12px;');
		
		svgtext.append('tspan').attr('x',28).attr('dy',0).text('节点：'+itree);
		
		var n = this.listmap[itree].data.n;
		
		//没有预测到数量的不予显示
		if(n>0){
			svgtext.append('tspan').attr('x',3).attr('dy',18).html('n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+n);
			
			var p = (this.listmap[itree].data.n/this.count*100).toFixed(3);
			
			svgtext.append('tspan').attr('x',3).attr('dy',17)
			.html('%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+p);
		}
		
		if(this.listmap[itree].data.text!=''){
			svgtext.append('tspan').attr('x',3).attr('dy',17)
					.html(this.listmap[itree].data.text);
		}
		
		
		var block = Container.append("rect")
        .attr("width", this.rectwidth)
        .attr("height", this.rectheight)
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", "#ffffff")
        .attr("style","opacity:0");
	
		//绑定事件
		block.on('click',function(){
			var b,wid;
			var pnode = d3.select(this.parentNode);
			
			if(pnode.select('path.rect').attr('stroke-width')=='2'){
				b = 0.5,wid = 1;
			}
			else{
				b = 1,wid = 2;
			}
			
			var lineFunction = d3.svg.line()
				.x(function(d) { return d.x+b; })
				.y(function(d) { return d.y+b; })
				.interpolate("linear");
			
			pnode.select('path')
				.attr('stroke-width',wid)
				.attr('d',lineFunction(lineData));
			
			var lineData2 = [{ "x": -3,   "y": -3},{ "x": -3,  "y": rectheight+4},
			                { "x": rectwidth+4,  "y": rectheight+4},{ "x": rectwidth+4,   "y": -3},
			                { "x": -3,   "y": -3}];
			
			var lineFunction2 = d3.svg.line()
				.x(function(d) { return d.x+0.5; })
				.y(function(d) { return d.y+0.5; })
				.interpolate("linear");
			
			//外面虚线
			pnode.append('path')
				.attr('class','dashedline')
				.attr('stroke-width',1)
				.attr('d',lineFunction2(lineData2))
				.attr("stroke", "black")
				.attr("fill", "none")
				.attr('stroke-linecap','round')
				.attr('stroke-dasharray','4,4,4');
			
			if(pnode.select('path.rect').attr('stroke-width')=='1'){
				pnode.selectAll('path.dashedline').data([]).exit().remove();
			}
		});
		
		//绘制伸缩按钮
		if(this.listmap[itree].data.child){
			var btn_w = btn_h = 14;
			//小框
			Container.append("path")
				.attr('class','btn')
		        .attr("d", lineFunction([{'x':rectwidth-btn_w,'y':rectheight},
		                                 {'x':rectwidth-btn_w,'y':rectheight+btn_h},
		                                 {'x':rectwidth,'y':rectheight+btn_h},
		                                 {'x':rectwidth,'y':rectheight},
		                                 {'x':rectwidth-btn_w,'y':rectheight}
		                                 ]))
		        .attr("stroke", "black")
		        .attr("stroke-width", wid)
		        .attr("fill", "none");
			
			//横线
			Container.append("path")
				.attr('class','btn_line')
		        .attr("d", lineFunction([{'x':rectwidth-btn_w+2,'y':rectheight+btn_h/2},
		                                 {'x':rectwidth-2,'y':rectheight+btn_h/2}
		                                 ]))
		        .attr("stroke", "black")
		        .attr("stroke-width", wid)
		        .attr("fill", "none");
			
			//竖线
			Container.append("path")
				.attr('class','btn_h_line')
		        .attr("d", lineFunction([{'x':rectwidth-btn_w/2,'y':rectheight+2},
		                                 {'x':rectwidth-btn_w/2,'y':rectheight+btn_h-2}
		                                 ]))
		        .attr("stroke", "black")
		        .attr("stroke-width", wid)
		        .attr("fill", "none")
		        .attr("style","display:"+(lock?'block':'none')+";");
			
			//挡板
			var btn_block = Container.append("rect")
		        .attr("width", btn_w)
		        .attr("height", btn_h)
		        .attr("x", rectwidth-btn_w)
		        .attr("y", rectheight)
		        .attr("fill", "#ffffff")
		        .attr("style","opacity:0")
		        .attr('itree',itree);
			
			this.listmap[itree].child_open = !lock;
			
			//绘制子树容器
			if(lock){
				var svg_fold = d3.select(this[0]).append("g")
				.attr('transform',"translate("+translate+")")
				.attr('id','fold_'+this.tag+'_'+itree);
			}
			
			var json_data = this.listmap[itree].data;
			
			var dthis = this;
			//点击打开事件
			btn_block.on('click',function(){
				var itree = $(this).attr('itree');
				var childs = dthis.findChildNode(itree);
				var func = function(childs,hide){
					for(var i=0;i<childs.length;i++){
						if(hide)
							$('.node_'+dthis.tag+'_'+childs[i]).hide();
						else
							$('.node_'+dthis.tag+'_'+childs[i]).show();
						if(dthis.listmap[childs[i]].child_open){
							var childs2 = dthis.findChildNode(childs[i]);
							if(childs2.length>0)
								func(childs2,hide);	
						}
					}
				};
				var hline = $(this.parentNode).find('.btn_h_line');
				if(dthis.listmap[itree].child_open){
					dthis.listmap[itree].child_open = false;
					func(childs,true);
					hline.show();
					
					$('#fold_'+dthis.tag+'_'+itree+' g').remove();
				}else{
					dthis.listmap[itree].child_open = true;
					func(childs,false);
					hline.hide();
					
					if($('#fold_'+dthis.tag+'_'+itree).length==0){
						return false;
					}
					
					if($('#fold_'+dthis.tag+'_'+itree+' g').length>0){
						$('#fold_'+dthis.tag+'_'+itree).css('display','block');
					}else{
						var width = d3.transform($('#fold_'+dthis.tag+'_'+itree).attr('transform')).translate[0];
						
						$('#fold_'+dthis.tag+'_'+itree).jsonTree([json_data],dthis.target_attribute,{x:1,y:y-40},true,{
							tag : 'child',
							parent : dthis,
							width : function(d){
								return d.get_min('x')*-1;
							},
							height : dthis.height(),
							func : function(d){
								//多级调整svg中的值
								var min_x = d.get_min('x')*-1;
								
								dthis.find('g').each(function(){
									var transform = $(this).attr('transform');
									
									var t = d3.transform(transform);
									
									t.translate[0] += (min_x-width);
									
									$(this).attr('transform','translate('+t.translate[0]+' '+t.translate[1]+')');
								});
								
								//调整滚动条
								$(window).scrollLeft(min_x-$(window).width()/2);
							}
						});	
					}
					
				}
			});
		}
	};

	/**
	 * 柱形图结构绘制
	 */
	$.fn.columnar = function(original_data,options){
	
		this.options = $.extend({
			width:105,
			height:49,
			background:'#dddddd',
			border:'1px solid #000000',
			original:false,
			display:'all',
			color:['#8CB9D0','#BF4C51','#AC59D0','#907C41']
		},options);
		
		var data;
		if(this.options.original){
			data = this._format_json(original_data);
		}
		else
			data = original_data;
		
		this.css({
				'width':this.options.width+'px',
				'height':this.options.height+'px',
				'background':this.options.background,
				'border':this.options.border
			});
		
		var blank = this.options.width/(data.length*2+1);
		var wid;
		if(blank<5){
			blank = 0;
			wid = this.options.width/data.length;
		}
		else
			wid = blank;
		
		if(this.options.display == 'all')
			this.draw_func_all(data,blank,wid);
		else if(this.options.display == 'line')
			this.draw_func_line(data,0);
		else if(this.options.display == 'more')
			this.draw_func_all(data,blank,wid);
	};
	
	$.fn.draw_func_line = function(data,blank){
		for(var i=0,start=0;i<data.length;i++){
			var o = data[i];
			if(this.options.only && this.options.only.length>0){
				if($.inArray(o.val,this.options.only) == -1){
					continue;
				}
			}
			start += blank;
			
			var m = {
					x:start,
					y:0,
					height:this.options.height,
					width:this.options.width*o.per/100,
					child:o.child
				};

			this.columnar_draw_line(m);
			start += this.options.height;
		}
	};
	
	$.fn.draw_func_all = function(data,blank,wid){
		for(var i=0,start=0;i<data.length;i++){
			var o = data[i];
			start += blank;
			
			var m = {
					x:start,
					height:this.options.height*o.per/100,
					width:wid,
					child:o.child
				};
			
			this.columnar_draw(m);
			start += wid;
		}
	};
	
	$.fn.columnar_draw_line = function(m){
		m.y = (this.options.height - m.height);
		
		var translate = m.x+" "+m.y;
		
		//svg容器
		var Container = d3.select(this[0]).append("g")
						.attr('transform',"translate("+translate+")");
		
		var start = 0;
		for(var i=0;i<m.child.length;i++){
			var wid = m.width * m.child[i].per/100;
			Container.append('rect').attr('fill',this.options.color[m.child[i].icolor])
					.attr('width',wid)
					.attr('height',this.options.height)
					.attr('y',0)
					.attr('x',start)
					.attr("stroke-width", 0.5)
					.attr("stroke", "black");
			
			start += wid;
		}		
	};
	
	$.fn.columnar_draw = function(m){
		m.y = (this.options.height - m.height);
		
		var translate = m.x+" "+m.y;
		
		//svg容器
		var Container = d3.select(this[0]).append("g")
						.attr('transform',"translate("+translate+")");
		
		var start = 0;
		for(var i=0;i<m.child.length;i++){
			var hei = m.height * m.child[i].per/100;
			Container.append('rect').attr('fill',this.options.color[m.child[i].icolor])
					.attr('width',m.width)
					.attr('height',hei)
					.attr('y',start)
					.attr("stroke-width", 0.5)
					.attr("stroke", "black");
			
			start += hei;
		}		
	};
	
	/*格式转换*/
	$.fn._format_json = function(original){
		var newdata = [];
		var childs = [];
		var count = 0;
		var flg = -1;
		for(var k in original){
			var m = {};
			m.val = k;
			m.num = 0;
			m.child = [];
			var ori = original[k];			
			for(var k2 in ori){
				//分组
				if($.inArray(k2,childs) == -1){
					childs.push(k2);
					flg++;
				}
				var icolor = $.inArray(k2,childs);
				var m2 = {
					name:k2,
					num:parseInt(ori[k2]),
					icolor:icolor
				};
				m.num += m2.num;
				m.child.push(m2);
			}
			
			for(var c in m.child){
				m.child[c].per = Math.round(m.child[c].num/m.num*10000)/100;
			}
			count += m.num;
			newdata.push(m);
		}
		
		for(var i in newdata){
			newdata[i].per = Math.round(newdata[i].num/count*10000)/100;
		}
		return newdata;
	};
	
	var tester = function(){
		var start = Math.round(new Date().getTime());
		var end = Math.round(new Date().getTime())-start;
		console.log('topid:'+topid+' 时间：'+end);
	};
})(jQuery,d3);