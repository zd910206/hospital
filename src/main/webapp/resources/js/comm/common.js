/**
 * String 类型的替换全部
 * @param s1 需要替换的字符
 * @param s2 替换成为什么字符
 * @see 例如: var str="123_321";	
 * 			str = str.replaceAll("_",",");		//str = "123,321"
 * */
String.prototype.replaceAll = function(s1,s2) {
    return this.replace(new RegExp(s1,"gm"),s2);
};


/**
 * 判断数组中是否存在某个值
 * @param 判断的值
 * @returns true/false
 */
Array.prototype.contains = function (element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
};

/**
 * Unicode编码转换成ASCII码
 * @param 需要转换的数据
 */
function U2A(str) { //Unicode -> ASCII转换
	var code = str.match(/&#(\d+);/g);

	if (code != null){ 
		for (var i=0; i<code.length; i++){
			str = str.replace(code[i],String.fromCharCode(code[i].replace(/[&#;]/g, '')));				
		}
	}
	return str;
}

/*
 * 对象拷贝
 * @param obj
 * */
function cloneObject(obj){
    var o = obj.constructor === Array ? [] : {};
    for(var i in obj){
        if(obj.hasOwnProperty(i)){
            o[i] = typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];
        }
    }
    return o;
}

/**
 * 字符串数据拷贝
 * */
function stringClone(obj){
	if(typeof(obj) ==="string")
		return obj;
}

/**
 * 是否是简单的元素
 * */
function isEmpty(data){
	if(typeof(data) =="undefined" || data == null || data == "null" || data =="" )
		return true;
	return false;
}

function replaceEmpty2SimpleStr(val){
	if(isEmpty(val))
		return "";
	return val;
}


/**
 * 错误提示用Alert
 * */
function MessageAlert(msg){
	parent.$.messager.alert("提示",msg);
}

/**
 * 正确提示用slide
 * */
function MessageSlide(msg){
	parent.$.messager.show({
		title:'提示',
		msg:msg,
		timeout:3000,
		showType:'slide',
		style:{
			right:0,
			left:'',
			top:'',
			bottom:-document.body.scrollTop-document.documentElement.scrollTop,
			position:'fixed'
    	}
    });
}

function center(msg){
    parent.$.messager.show({
        title:'提示',
        msg:msg,
        timeout:1000,
        showType:'slide',
        style:{
            right:'',
            bottom:''
        }
    });
}

//---------------------------------------------------   
//判断闰年   
//---------------------------------------------------   
Date.prototype.isLeapYear = function()    
{    
 return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));    
};    

//---------------------------------------------------   
//日期格式化   
//格式 YYYY/yyyy/YY/yy 表示年份   
//MM/M 月份   
//W/w 星期   
//dd/DD/d/D 日期   
//hh/HH/h/H 时间   
//mm/m 分钟   
//ss/SS/s/S 秒   
//---------------------------------------------------   
Date.prototype.Format = function(formatStr)    
{    
 var str = formatStr;    
 var Week = ['日','一','二','三','四','五','六'];   

 str=str.replace(/yyyy|YYYY/,this.getFullYear());    
 str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));    

 str=str.replace(/MM/,(this.getMonth()+1)>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));    
 str=str.replace(/M/g,(this.getMonth()+1));    

 str=str.replace(/w|W/g,Week[this.getDay()]);    

 str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());    
 str=str.replace(/d|D/g,this.getDate());    

 str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());    
 str=str.replace(/h|H/g,this.getHours());    
 str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
 str=str.replace(/m/g,this.getMinutes());    

 str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());    
 str=str.replace(/s|S/g,this.getSeconds());    

 return str;    
};    

//+---------------------------------------------------   
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd    
//+---------------------------------------------------   
function daysBetween(DateOne,DateTwo)   
{    
 var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));   
 var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);   
 var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));   

 var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));   
 var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);   
 var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));   

 var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);    
 return Math.abs(cha);   
}   


//+---------------------------------------------------   
//| 日期计算   
//+---------------------------------------------------   
Date.prototype.DateAdd = function(strInterval, Number) {    
 var dtTmp = this;   
 switch (strInterval) {    
     case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));   
     case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));   
     case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));   
     case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));   
     case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));   
     case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());   
     case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());   
     case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());   
 }   
};   

//+---------------------------------------------------   
//| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串   
//+---------------------------------------------------   
Date.prototype.DateDiff = function(strInterval, dtEnd) {    
 var dtStart = this;   
 if (typeof dtEnd == 'string' )//如果是字符串转换为日期型   
 {    
     dtEnd = StringToDate(dtEnd);   
 }   
 switch (strInterval) {    
     case 's' :return parseInt((dtEnd - dtStart) / 1000);   
     case 'n' :return parseInt((dtEnd - dtStart) / 60000);   
     case 'h' :return parseInt((dtEnd - dtStart) / 3600000);   
     case 'd' :return parseInt((dtEnd - dtStart) / 86400000);   
     case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));   
     case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);   
     case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();   
 }   
};   

//+---------------------------------------------------   
//| 日期输出字符串，重载了系统的toString方法   #TODO 与日期控件冲突,注释   
//+---------------------------------------------------   
/*Date.prototype.toString = function(showWeek)   
{    
 var myDate= this;   
 var str = myDate.toLocaleDateString();   
 if (showWeek)   
 {    
     var Week = ['日','一','二','三','四','五','六'];   
     str += ' 星期' + Week[myDate.getDay()];   
 }   
 return str;   
};*/

//+---------------------------------------------------   
//| 日期合法性验证   
//| 格式为：YYYY-MM-DD或YYYY/MM/DD   
//+---------------------------------------------------   
function IsValidDate(DateStr)    
{    
 var sDate=DateStr.replace(/(^\s+|\s+$)/g,''); //去两边空格;    
 if(sDate=='') return true;    
 //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''    
 //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式    
 var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g,'');    
 if (s=='') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D    
 {    
     var t=new Date(sDate.replace(/\-/g,'/'));    
     var ar = sDate.split(/[-/:]/);    
     if(ar[0] != t.getYear() || ar[1] != t.getMonth()+1 || ar[2] != t.getDate())    
     {    
         //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');    
         return false;    
     }    
 }    
 else    
 {    
     //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');    
     return false;    
 }    
 return true;    
}    

//+---------------------------------------------------   
//| 日期时间检查   
//| 格式为：YYYY-MM-DD HH:MM:SS   
//+---------------------------------------------------   
function CheckDateTime(str)   
{    
 var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;    
 var r = str.match(reg);    
 if(r==null)return false;    
 r[2]=r[2]-1;    
 var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]);    
 if(d.getFullYear()!=r[1])return false;    
 if(d.getMonth()!=r[2])return false;    
 if(d.getDate()!=r[3])return false;    
 if(d.getHours()!=r[4])return false;    
 if(d.getMinutes()!=r[5])return false;    
 if(d.getSeconds()!=r[6])return false;    
 return true;    
}    

//+---------------------------------------------------   
//| 把日期分割成数组   
//+---------------------------------------------------   
Date.prototype.toArray = function()   
{    
 var myDate = this;   
 var myArray = Array();   
 myArray[0] = myDate.getFullYear();   
 myArray[1] = myDate.getMonth();   
 myArray[2] = myDate.getDate();   
 myArray[3] = myDate.getHours();   
 myArray[4] = myDate.getMinutes();   
 myArray[5] = myDate.getSeconds();   
 return myArray;   
};   

//+---------------------------------------------------   
//| 取得日期数据信息   
//| 参数 interval 表示数据类型   
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒   
//+---------------------------------------------------   
Date.prototype.DatePart = function(interval)   
{    
 var myDate = this;   
 var partStr='';   
 var Week = ['日','一','二','三','四','五','六'];   
 switch (interval)   
 {    
     case 'y' :partStr = myDate.getFullYear();break;   
     case 'm' :partStr = myDate.getMonth()+1;break;   
     case 'd' :partStr = myDate.getDate();break;   
     case 'w' :partStr = Week[myDate.getDay()];break;   
     case 'ww' :partStr = myDate.WeekNumOfYear();break;   
     case 'h' :partStr = myDate.getHours();break;   
     case 'n' :partStr = myDate.getMinutes();break;   
     case 's' :partStr = myDate.getSeconds();break;   
 }   
 return partStr;   
};   

//+---------------------------------------------------   
//| 取得当前日期所在月的最大天数   
//+---------------------------------------------------   
Date.prototype.MaxDayOfDate = function()   
{    
 var myDate = this;   
 var ary = myDate.toArray();   
 var date1 = (new Date(ary[0],ary[1]+1,1));   
 var date2 = date1.dateAdd(1,'m',1);   
 var result = dateDiff(date1.Format('yyyy-MM-dd'),date2.Format('yyyy-MM-dd'));   
 return result;   
};   

//+---------------------------------------------------   
//| 取得当前日期所在周是一年中的第几周   
//+---------------------------------------------------   
Date.prototype.WeekNumOfYear = function()   
{    
 var myDate = this;   
 var ary = myDate.toArray();   
 var year = ary[0];   
 var month = ary[1]+1;   
 var day = ary[2];   
 document.write('< script language=VBScript\> \n');   
 document.write('myDate = DateValue('+month+'-'+day+'-'+year+') \n');   
 document.write('result = DatePart("ww", myDate) \n');   
 document.write(' \n');   
 return result;   
};   

//+---------------------------------------------------   
//| 字符串转成日期类型    
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd   
//+---------------------------------------------------   
function StringToDate(DateStr)   
{    

 var converted = Date.parse(DateStr);   
 var myDate = new Date(converted);   
 if (isNaN(myDate))   
 {    
     //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';   
     var arys= DateStr.split('-');   
     myDate = new Date(arys[0],--arys[1],arys[2]);   
 }   
 return myDate;   
};

/**
 * 切换用户
 * */
function changeUser(){
	//var url = "/" + location.href.replaceAll(ctx, "");
	var url =  location.href;
	//对url进行编码
	var forwardUrl = escape(url);
	$.post(ctx+"user/switch",{
		forwardUrl:forwardUrl
		},function(res){
		if(res.result){
			window.location.href = path + "/user/login?forwardUrl=" + forwardUrl;
	}else{
		MessageAlert(res.message);
	};
		},"json");
};

/**
 * 修改密码后跳转到登录页面
 * */
function reLogin(){
	$.post(ctx+"user/reLogin",{
		},function(res){
		if(res.result){
			 //window.location.reload();
			window.parent.location.reload();
	}else{
		MessageAlert(res.message);
	}
		},"json");
};

/**
 * 退出用户
 * */
function exit(){
//	if(window.confirm("你确定要退出吗？")){
//		$.post(ctx+"user/logout",function(res){
//			if(res.result){
//				closeWebPage();
//			}else{
//				MessageAlert(res.message);
//			}
//		},"json");
//	}
	
	$.messager.confirm('提示','你确定要退出吗？',function(r){
    if (r){
			$.post(ctx+"user/logout",function(res){
			if(res.result){
				closeWebPage();
			}else{
				MessageAlert(res.message);
			}
		},"json");
	    };
	});
}

function closeWebPage() {  
    if (navigator.userAgent.indexOf("MSIE") > 0) {  
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {  
            window.opener = null; window.close();  
        }  
        else {  
            window.open('', '_top'); window.top.close();  
        }  
    }  
    else if (navigator.userAgent.indexOf("Firefox") > 0) {  
        window.location.href = 'about:blank ';  
        //window.history.go(-2);  
    }  
    else {  
        window.opener = null;   
        window.open('', '_self', '');  
        window.close();  
    }  
}  

function sleep(n)
{
  var start = new Date().getTime();
  while(true) if(new Date().getTime() - start > n) break;
}

function showMask(msg){
//	var d = new Boxy("<div>操作正在进行，请稍侯...</div>",{
//		  unloadOnHide : true,//对话框隐藏后会被销毁
//		  draggable : true,//可拖拽
//		  modal : true//模态
//	  });
//	GLOB.dlg.mask = d;
//	d.show();
	if(isEmpty(msg)) msg = '操作正在进行，请稍侯。。。';
	parent.$.messager.progress({
		interval:300,
		text:msg
	});
}

var myApp;
myApp = myApp || (function () {
    var pleaseWaitDiv = $('<div class="modal fade" style="z-index: 99999999;"> ' + 
    		  '<div class="modal-dialog modal-sm">' + 
    		    '<div class="modal-content" style="margin-top: 250px;">' + 
    		      '<div class="progress">' + 
    		      '<div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' + 
    		        '<span style="font-size: 14px;line-height: 35px;">操作正在进行，请稍侯。。。</span>' + 
    		      '</div>' + 
    		      '</div>' + 
    		    '</div>' + 
    		  '</div>' + 
    		'</div>');
    return {
        showPleaseWait: function() {
            pleaseWaitDiv.modal({backdrop: 'static', keyboard: false});
        },
        hidePleaseWait: function () {
            pleaseWaitDiv.modal('hide');
        }
    };
})();

function showBtMask(){
	parent.myApp.showPleaseWait();
}

function hideBtMask(){
	parent.myApp.hidePleaseWait();
}

function hideMask(){
//	var d = GLOB.dlg.mask;
//	d.hide();
	if(parent)
		parent.$.messager.progress('close');
};

function boxyAlert(msg){
	Boxy.alert(msg, null, {title: "提示", modal : true,draggable : false,closeable : true,cache:true,unloadOnHide : true}); 
};

function back(){
	window.history.back();
};

function isIpAddress(ip){
	var ipRegex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	return ipRegex.test(ip);
};

function isNumber(n){
	var noRegex = /^([0-9]+)$/;
	return noRegex.test(n);
};

function closeDlg(){
	closeBoxy();
};

function closeBoxy(flowId){
	parent.xBoxyCls(flowId);
};

/**
 * js模块别名
 */
var require_config = {
	'easyui' : '../easyui/jquery.easyui.min',
	'easyui-lang' : '../easyui/locale/easyui-lang-zh_CN',
	'bootstrap' : '../bootstrap/js/bootstrap.min'
};

/**
 * 动态载入js
 * @param param
 * @returns
 */
function require(param){
	var path = '';
	var dom = null;
	$('script').each(function(){
		var src = $(this).attr('src');
		if(/resources\/js\/comm\//.test(src) && path ==''){
			path = src;
			dom = this;
			return;
		}
	});
	
	var before = path.substring(0,path.lastIndexOf('/')+1);
	
	if(typeof param=='string'){
//		$.getScript(before+param+".js");
		var newbefore = fill_path(before,param);
		var newdom = document.createElement("script");
		newdom.type = 'text/javascript';
		newdom.src = newbefore+".js";
		$(newdom).insertAfter(dom);
	}else{
		for(var i=0;i<param.length;i++){
			//$.getScript(before+param[i]+".js");
			var newdom = document.createElement("script");
			newdom.type = 'text/javascript';
			var newbefore = fill_path(before,param[i]);
			newdom.src = newbefore+".js";
			
			$(newdom).insertAfter(dom);
		}
	}
}

function fill_path(before,param){
	if(require_config[param]!=undefined)
		param = require_config[param];
	if(/^\.\.\//.test(param)){
		before = before.replace(/\/$/,'');
		before = before.substring(0,before.lastIndexOf('/')+1);
		var newparam = param.replace(/^\.\.\//,'');
		return fill_path(before,newparam);
	}
	else
		return before+param;
}

var GLOB_dlg_textParamDlgArg = [];

function xBoxy(url,query,options,success,fail){
//	$.messager.progress({
//		interval:300,
//		text:'请稍等...'
//	});
	var l = GLOB_dlg_textParamDlgArg.length;
	$.get(url,query).done(function(data) {
//		$.messager.progress('close');
		var d = new Boxy(data,$.extend({
			  title : '编辑',
			  unloadOnHide : true,
			  modal : true,
			  draggable : true
		},options));
		GLOB_dlg_textParamDlgArg.push(d);
		success && success();
	}).fail(function(){
//		$.messager.progress('close');
//		fail ? fail() : alert('加载出错了!');
		fail && fail();
	});
	return l;
};

function openHelp(title){
   //alert(title);
	//window.open("http://www.jb51.net");
	var conf = {
		'DB数据源' 	: 	ctx+"pages/help/dbsjy.html",
		'文件抽取'  	: 	ctx+"pages/help/wjcq.html",
		'C&R' 			: 	ctx+"pages/help/C&R.html",
		'审核'			:   ctx+"pages/help/sjsh.html",
	    '类型'            :   ctx+"pages/help/lx.html",
	    '分析'            :   ctx+"pages/help/fx.html",
	    'Hive外部表入库'            :   ctx+"pages/help/hivewbbrk.html",
	    '逻辑回归'            :   ctx+"pages/help/ljhg.html",
	    '表格'            :   ctx+"pages/help/bg.html",
	    'DB数据汇总'            :   ctx+"pages/help/dbsjhz.html",
		'数据发布'	:	    ctx+"pages/help/" + title+".jsp",
        '属性参数配置' :         ctx+"pages/help/help.jsp"
	};
	var helpURL
	if(conf[title]){
		helpURL = conf[title];
	}else{
		//alert("谁？");
		helpURL = ctx+"pages/help/help.jsp";
	}
	

//	switch(title)
//	{
//	case "DB数据源":helpURL = ctx+"pages/help/dbsjy.html";break;
//	case "文件抽取":helpURL = ctx+"pages/help/wjcq.html";break;
//	case "C&R":helpURL = ctx+"pages/help/C&R.html";break;
//	case "审核":helpURL = ctx+"pages/help/sjsh.html";break;
//	case "数据发布":helpURL = ctx+"pages/help/" + title+".jsp";break;
//	default:alert("谁？");
//	}
	
	return helpURL;
}

/**removeModal()、submitAllIframe()、showTab() ==> SEE COMMON.JS*/
function getComponentStr(title, bodyContent, isTask, imgUrl, width, showFooter) {
    var _modalId = 'component-modal';
    var width = width || '1010px';
    var showFooter = typeof showFooter != 'undefined' ? showFooter : true;
    var modalStr =
        '<div class="modal" id="component-modal" style="">' +
        '<div class="modal-dialog" style="width: '+width+';">' +
        '<div class="modal-content">' +
        '<div class="modal-header" style="padding:10px;background-color:#f5f5f5;">' +
        '<button type="button" class="close" onclick="removeModal(\''+ _modalId +'\')" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<a href="'+openHelp(title)+'" target="_blank" class="help" aria-label="help"><span aria-hidden="true" class="glyphicon glyphicon-question-sign"></span></a>' +
        '<h4 class="modal-title">';
    if(imgUrl != null)
        modalStr += '<img style="width: 24px;height: 24px;" src="'+ imgUrl +'"/>&nbsp;';
    modalStr += title +'</h4>' +
        '</div>' +
        '<div id="component-body-div" class="modal-body">' +
        bodyContent +
        '</div>';
    if(showFooter){//是否显示模态框底部按钮
        if(!isTask) {
            modalStr +=
                '<div class="modal-footer" style="text-align: center;padding:10px;background-color:#f5f5f5;">' +
                '<button type="button" class="btn btn-success" onclick="submitAllIframe(this)"><span class="glyphicon glyphicon-ok"></span>保存</button>' +
                '<button type="button" class="btn btn-danger"  onclick="removeModal(\''+ _modalId +'\')"><span class="glyphicon glyphicon-remove"></span>关闭</button>' +
                '</div>';
        }else{
            modalStr +=
                '<div class="modal-footer" style="text-align: center;padding:10px;background-color:#f5f5f5;">' +
                '<button type="button" class="btn btn-success" disabled><span class="glyphicon glyphicon-ok"></span>保存</button>' +
                '<button type="button" class="btn btn-danger" onclick="removeModal(\''+ _modalId +'\')"><span class="glyphicon glyphicon-remove"></span>关闭</button>' +
                '</div>';
        }
    }
    modalStr +=
        '</div>' +
        '</div>' +
        '</div>';
    return modalStr;
}
function getComponentStrInput(title, bodyContent, isTask, imgUrl, width, showFooter) {
    var _modalId = 'component-modal-input';
    var width = width || '1010px';
    var showFooter = typeof showFooter != 'undefined' ? showFooter : true;
    var modalStr =
        '<div class="modal" id="component-modal-input" style="">' +
        '<div class="modal-dialog" style="width: '+width+'; margin-top: 150px">' +
        '<div class="modal-content">' +
        '<div class="modal-header" style="padding:10px;background-color:#f5f5f5;">' +
        '<button type="button" class="close" onclick="removeModal(\''+ _modalId +'\')" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<a href="'+openHelp(title)+'" target="_blank" class="help" aria-label="help"><span aria-hidden="true" class="glyphicon glyphicon-question-sign"></span></a>' +
        '<h4 class="modal-title">';
    if(imgUrl != null)
        modalStr += '<img style="width: 24px;height: 24px;" src="'+ imgUrl +'"/>&nbsp;';
    modalStr += title +'</h4>' +
        '</div>' +
        '<div id="component-body-div" class="modal-body">' +
        bodyContent +
        '</div>';
    if(showFooter){//是否显示模态框底部按钮
        if(!isTask) {
            modalStr +=
                '<div class="modal-footer" style="text-align: center;padding:10px;background-color:#f5f5f5;">' +
                '<button type="button" class="btn btn-success" onclick="submitAllIframe(this)"><span class="glyphicon glyphicon-ok"></span>保存</button>' +
                '<button type="button" class="btn btn-danger"  onclick="removeModal(\''+ _modalId +'\')"><span class="glyphicon glyphicon-remove"></span>关闭</button>' +
                '</div>';
        }else{
            modalStr +=
                '<div class="modal-footer" style="text-align: center;padding:10px;background-color:#f5f5f5;">' +
                '<button type="button" class="btn btn-success" disabled><span class="glyphicon glyphicon-ok"></span>保存</button>' +
                '<button type="button" class="btn btn-danger" onclick="removeModal(\''+ _modalId +'\')"><span class="glyphicon glyphicon-remove"></span>关闭</button>' +
                '</div>';
        }
    }
    modalStr +=
        '</div>' +
        '</div>' +
        '</div>';
    return modalStr;
}
/* 当前场景对话框 */
function StageDialog(option) {
    var option = $.extend({
        width: '980px',
        height: '460px'
    }, option);
    var data = option.data;
    if (!isEmpty(option.url)) {
        data = '<iframe scrolling="no" frameborder="0" src="' + option.url + '" style="width: ' + (parseInt(option.width) - 30) + 'px; height: ' + option.height + '; margin-bottom: 14px ;overflow: hidden;"></iframe>';
    }

    var component = getComponentStr(option.title, data, false, option.imgUrl, option.width, option.showFooter);
    parent.$(component).modal({backdrop: 'static', keyboard: false}); // 显示组件模态框


    /*
     var d = new parent.Boxy(data,$.extend({
     title : '编辑',
     unloadOnHide : true,
     modal : true,
     draggable : true
     },option));
     parent.GLOB_dlg_textParamDlgArg.push(d);
     option.success && option.success();*/
}


function StageDialogInput(option) {
    var option = $.extend({
        width: '980px',
        height: '460px'
    }, option);
    var data = option.data;
    if (!isEmpty(option.url)) {
        data = '<iframe scrolling="no" frameborder="0" src="' + option.url + '" style="width: ' + (parseInt(option.width) - 30) + 'px; height: ' + option.height + '; margin-bottom: 14px ;overflow: hidden;"></iframe>';
    }

    var component = getComponentStrInput(option.title, data, false, option.imgUrl, option.width, option.showFooter);
    parent.$(component).modal({backdrop: 'static', keyboard: false}); // 显示组件模态框

    /*
     var d = new parent.Boxy(data,$.extend({
     title : '编辑',
     unloadOnHide : true,
     modal : true,
     draggable : true
     },option));
     parent.GLOB_dlg_textParamDlgArg.push(d);
     option.success && option.success();*/
}

function xBoxyCls(flowId){
	removeModal();
//	if(!l){
//		l = GLOB_dlg_textParamDlgArg.length-1;	
	
/*		for(var i=0;i<GLOB_dlg_textParamDlgArg.length;i++){
			GLOB_dlg_textParamDlgArg[i] && GLOB_dlg_textParamDlgArg[i].hide();
		};*/
		
//		if(!isEmpty(flowId)){
//			parent.$("#flowCfgFrame")[0].contentWindow.loadFlowCfg(flowId);
//		};
//	}
//	GLOB_dlg_textParamDlgArg[l] && GLOB_dlg_textParamDlgArg[l].hide();
};

//原型方式扩展Array
/**求数组的最小值**/
Array.prototype.min = function(){
    return Math.min.apply({},this);
};
/**求数组的最大值**/
Array.prototype.max = function(){
    return Math.max.apply({},this);
};
/**通过值找到索引**/
Array.prototype.indexOf = function(val) {
	for ( var i = 0; i < this.length; i++) {
		if (this[i] == val)
			return i;
	}
	return -1;
};
/**删除指定的值**/
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
/*删除指定的下标*/
Array.prototype.removeIndex=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
}

/**模拟枚举**/
/**任务状态**/
if(typeof Task == "undefined"){
	var Task = Task || {};
	Task.running 		= 	'running';
	Task.complete 		= 	'complete';
	Task.cancel 			= 	'cancel';
	Task.pause 			= 	'pause';
	Task.create 			= 	'create';
}

/**环节状态**/
if(typeof Step == "undefined"){
	var Step = Step || {};
	Step.running 		= 	'running';
	Step.complete 		= 	'complete';
	Step.stop 				= 	'stop';
	Step.failed 			= 	'failed';
	Step.wait 				= 	'wait';
	Step.sleep 			= 	'sleep';
	Step.ready 			= 	'ready';
	Step.warning    =   'warning';
}

/**流程、任务和环节**/
if(typeof Etl == "undefined"){
	var Etl = Etl || {};
	Etl.flow 		   = 	 'flow';
	Etl.task 		   = 	 'task';
	Etl.step 		   = 	 'step';
}

/**命令**/
if(typeof CMD == "undefined"){
	var CMD = CMD || {};
	CMD.start 		   		= 	 'start';
	CMD.stop 		   		= 	 'stop';
	CMD.pause 		  		= 	 'pause';
	CMD.resume 		   		= 	 'resume';
	CMD.restart 		    = 	 'restart';
}

/**节点操作**/
if(typeof NodeOp == "undefined"){
	var NodeOp = NodeOp || {};
	NodeOp.connect 			= 	'connect';
	NodeOp.disconnect 	= 	'disconnect';
	NodeOp.remove 				= 	'remove';
	NodeOp.refresh 			= 	'refresh';
}

/**bootstrap顶部提示**/
if(typeof BTAlert == "undefined"){
	var BTAlert = BTAlert || {};
	BTAlert.info 			 = 	 'alert-info';
	BTAlert.warning 	 = 	 'alert-warning';
	BTAlert.danger			 = 	 'alert-danger';
}

/** 获取环节状态提示信息* */
function getStepStatusTips(stepState){
	var status;
	if(!isEmpty(stepState)){
		switch(stepState){
		case Step.running :
			status = "运行";
			break;
		case Step.stop :
			status = "停止";
			break;
		case Step.failed :
			status = "失败";
			break;
		case Step.complete :
			status = "完成";
			break;
		case Step.wait :
			status = "等待";
			break;
		case Step.sleep :
			status = "休眠";
			break;
		case Step.ready :
			status = "准备";
			break;
		case Step.warning :
			status = "警告";
			break;
		default:
			status = "未知";
			break;
		}
	}
	return status;
}

/**获取任务状态提示信息**/
function getTaskStatusTips(taskState){
	var status;
	if(!isEmpty(taskState)){
		switch(taskState){
		case Task.running :
			status = "运行";
			break;
		case Task.pause :
			status = "暂停";
			break;
		case Task.cancel:
			status = "停止";
			break;
		case Task.complete :
			status = "完成";
			break;
		case Task.create :
			status = "创建";
			break;
		default:
			status = "未知";
			break;
		}
	}
	return status;
}

function getStepStatusByType(type){
	var ret;
	if(!isEmpty(type)){
		if(type == "完成"){
			ret = '<span class="label label-success">' + type + '</span>';
		}else if(type == "停止" || type == "失败"){
			ret = '<span class="label label-danger">' + type + '</span>';
		}else if(type == "运行"){
			ret = '<span class="label label-primary">' + type + '</span>';
		}else if(type == "警告" || type == '暂停'){
			ret = '<span class="label label-warning">' + type + '</span>';
		}else{
			ret = '<span class="label label-info">' + type + '</span>';
		}
	}
	return ret;
};

function getTaskStatusByType(type){
	var ret;
	if(!isEmpty(type)){
		if(type == "完成"){
			ret = '<span class="label label-success">' + type + '</span>';
		}else if(type == "停止"){
			ret = '<span class="label label-danger">' + type + '</span>';
		}else if(type == "运行"){
			ret = '<span class="label label-primary">' + type + '</span>';
		}else if(type == "暂停"){
			ret = '<span class="label label-warning">' + type + '</span>';
		}
	}
	return ret;
};

/**
 * 设置未来(全局)的AJAX请求默认选项
 * 主要设置了AJAX请求遇到Session过期的情况
 */
$.ajaxSetup({
	timeout: 5 * 60000,
	type: 'POST',
	error: function (xhr, textStatus, e) { 
//		MessageAlert("服务器拒绝连接！"); 
//		return;
//		MessageAlert(textStatus);
		hideMask();
		if(textStatus == 'timeout'){
			MessageAlert("ajax请求超时，请检查网络是否正常！"); 
			return;
		}
	},
	complete: function(xhr,status) {//函数写在complete中，因为无论success还是error，complete函数都会执行。
//		hideMask();
		var sessionStatus = xhr.getResponseHeader('sessionstatus');
		if(sessionStatus == 'timeout') {
			var top = getTopWinow();
			var yes = confirm('由于您长时间没有操作或重启了应用程序或手动清除了session，导致session失效，请重新登录');
			if (yes) {
				top.location.href = ctx + 'user/login';			
			}
		}
	}
});

/**
 * 在页面中任何嵌套层次的窗口中获取顶层窗口
 * @return 当前页面的顶层窗口对象
 */
function getTopWinow(){
	var p = window;
	while(p != p.parent){
	    p = p.parent;
	}
	return p;
}

/**根据下拉框的文本选择**/
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

function showAlert(title, msg, ok, cl){
	var options = {
			msg: msg,
			title: isEmpty(title) ? '提示' : title,
			btnok: isEmpty(ok) ? '确定' : ok
	};
	if(!isEmpty(cl)){
		options.btncl = cl;
	}
	parent.Modal.alert(options);
}


function setWinHeight(obj) 	{ 	 
	var win=obj;
	win.height = $(document).height();
	if (document.getElementById){ 	  
		if (win && !window.opera){ 	   
			if (win.contentDocument && win.contentDocument.body.offsetHeight){ 	    		
				win.height = $(document).height(); 		 		 		
				//win.height = win.contentDocument.body.offsetHeight;  	   
				}else if(win.Document && win.Document.body.scrollHeight) 		
					win.height = win.Document.body.scrollHeight;
		} 
	} 
	//win.style.height = $(document).height() + 'px';
	$(win).css('height', win.height + 20);
//	$(win).css('width', win.width);
}

/*重置columnList参数*/
function resetColumnList(stepId,exclude){
	if(confirm('确定重置当前环节参数吗？')){
		parent.showBtMask();
		$.post(ctx+'setting/resetColumn',{stepId:stepId,exclude:exclude},function(env){
			parent.hideBtMask();
			if(env.result){
				parent.$.messager.alert('系统提示',env.msg,'info');
				parent.callWorkspaceFunction('removeWarningStyle',stepId);
				location.reload();
			}else{
				parent.$.messager.alert('系统提示',env.msg,'error');
			}
		}).fail(function(xhr){
			parent.hideBtMask();
			parent.$.messager.alert('系统提示','服务器内部错误！'+xhr.responseText,'error');
		})
	}
}

function checkAll(dthis,jqs){
	jqs.prop('checked',dthis.checked);
}

function isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';   
}

var iframeArr;
/**提交组件中所有的iframe的表单*/
var submitAllIframe = function(self){
	$(self).html('<span class="glyphicon glyphicon-ok"></span>保存中...').prop('disabled',true);
	iframeArr = [];
	$("#component-body-div iframe[src!='']").each(function(){
		if(this.contentWindow && 
				this.contentWindow.stepSubmitFunction){
			iframeArr.push(this);
		}
//		$(this).contents().find('#t-post').click();
	});
	submitCallback(0, self);
}

function submitCallback(index, self){
	iframeArr[index] &&
	iframeArr[index].contentWindow && 
	iframeArr[index].contentWindow.stepSubmitFunction && 
	iframeArr[index].contentWindow.stepSubmitFunction(function(res){
		if(res && res.result){
			if(index == iframeArr.length-1){
//				$.messager.alert('系统提示','全部保存成功','info');
				$(self).html('<span class="glyphicon glyphicon-ok"></span>保存').prop('disabled',false);
				
				Modal.alert({
						mode: 'success',
						msg: res.msg,
						title: '系统提示',
						btnok: '确定',
						btnclAll : '关闭所有窗口'
				    });
			}
			 if(index < iframeArr.length-1){
				 submitCallback(index+1, self);
			 }
		}else{
			Modal.alert({
			      msg: res != null ? res.msg : '保存出错',
			      title: '错误提示',
			      btnok: '确定'
			});
			var i = $('#component-body-div iframe').index(iframeArr[index]);
			$('#component-tab li').eq(i).click();
			$(self).html('<span class="glyphicon glyphicon-ok"></span>保存').prop('disabled',false);
		}
	}, function(){
		var i = $('#component-body-div iframe').index(iframeArr[index]);
		$('#component-tab li a').eq(i).click();
		$(self).html('<span class="glyphicon glyphicon-ok"></span>保存').prop('disabled',false);
	});
}


/**每次关闭组件模态框时，移除该div。解决第二次打开模态框时选择tab页无法显示相应tab页的内容*/
function removeModal(id) {
	$('.modal-open').css('padding-right', '0px');// 在火狐下每次移除模态框，padding-right会增加15px???
	if (!isEmpty(id)) $('#' + id).remove()
    else $('#component-modal').remove();
}

function initTabs() {
	$('#component-tab a:first').tab('show');//初始化显示哪个tab 
    
    $('#component-tab a').on('click', function (e) { 
      e.preventDefault();//阻止a链接的跳转行为 
      $(this).tab('show');//显示当前选中的链接及关联的content 
    });
}

// bootstrap tab如果不是处于'active'状态，那么easyui datagrid表头不会显示，所以在第一次点击
// 任务日志和运行日志标签页时才去加载页面内容，第二次点击该标签页时不再重新加载，当然，前提是不关闭模态框。
function showTab(clickTab) {
	var typ = $(clickTab).attr('href');
	if(typ.indexOf('#') > -1){
		typ = typ.substring(typ.indexOf('#')+1);
	}
	$('#component-body-div #'+ typ +' iframe').each(function(){
		var $curriframe = $(this);
		if(!$curriframe.attr('src')){
			$curriframe.attr('src',$(this).attr('original')); // 第一次打开时加载，第二次打开直接显示。
		}
	});
}

function getQueryString(query){
	var ret = [];
	$.each(query, function(k, val){
		ret.push(k+'='+val);
	});
	return ret.join('&');
}

//导出Excel
$.fn.exportExcel = function(url, params){
	var id = $(this).attr('id');
	var dom = document.createElement('form');
	dom.id = id+'_exportExcel';
	$(document.body).append(dom);
	$.each(params, function(k, val){
		var d = document.createElement('input');
		$(d).attr('type','hidden');
		$(dom).append(d);
		$(d).attr('name', k).val(val);
	});
	$(dom).attr('method','post').attr('target',id).attr('action',url).submit();
	$(dom).remove();
}

//打开进度条
function startProcess(){
	$.messager.progress({text:"操作进行中，请稍候……", interval:100});
}

//关闭进度条
function endProcess(){
	$.messager.progress("close");
}

function getWorkspaceDom(){
	var main;
	if(window == parent){
		if($('#pageTabContent .tab-pane').length>1){
			main = $('#pageTabContent .tab-pane.active iframe')[0]; 
		}else{
			main = $('#pageTabContent .tab-pane iframe')[0];
		}
		return main;
	}else{
		if(parent.$('#pageTabContent .tab-pane').length>1){
			main = parent.$('#pageTabContent .tab-pane.active iframe')[0]; 
		}else{
			main = parent.$('#pageTabContent .tab-pane iframe')[0];
		}
		return main;
	}
}

function getWorkspaceValue(arg1){
	var main = getWorkspaceDom();
	return  main.contentWindow[arg1];
}

/**
 * 调用工作区内方法
 * @param name
 */
function callWorkspaceFunction(name){
	//var args = arguments;
	//var newArgs = [];
	//for(var i = 1; i < args.length;i++){
	//	newArgs.push(args[i]);
	//}
    var newArgs = Array.prototype.slice.call(arguments, 1, arguments.length);
	if(window != parent && typeof graph != 'undefined'){
		window[name].apply(this,newArgs);
	}else{
		var main = getWorkspaceDom();
		main.contentWindow[name] && main.contentWindow[name].apply(null,newArgs);
	}
}

function proxyStepCurrentState(currentStepId, successStepIds){
	var main = getWorkspaceDom();
	main.contentWindow.setStepCurrentState(currentStepId, successStepIds);
}

function hotKeyBind(e){
    // 阻止默认的行为
    //if (e && e.preventDefault) {
    //    e.preventDefault();
    //} else {
    //    e.keyCode = 0;
    //    window.event.returnValue = false;
    //}

    var a = e.keyCode;
	//if(a == 79 && e.ctrlKey){//打开流程 ctrl+o
	//	callWorkspaceFunction('openFlow');
	//}else if(a == 82 && e.ctrlKey){//启动流程 ctrl+r
	//	callWorkspaceFunction('operate4Flow',0,-1);
	//}else if(a == 84 && e.ctrlKey){//停止流程 ctrl+t
	//	callWorkspaceFunction('operate4Flow',0,-1);
	//}else if(a == 78 && e.ctrlKey){ //创建流程 ctrl+n
	//	callWorkspaceFunction('createFlow');
	//}else if(a == 83 && e.ctrlKey){//保存流程 ctrl+s
	//	callWorkspaceFunction('saveFlow');
	//}else if(a == 80 && e.ctrlKey){//暂停流程 ctrl+p
	//	callWorkspaceFunction('pauseFlow',0,-1);
	//}else if(a == 72 && e.ctrlKey){//重跑流程 ctrl+h
	//	callWorkspaceFunction('restartFlow');
	//}else
    if(a == 27){//关闭弹窗
		parent.removeModal();
		$('.modal').modal('hide')
	}
}
