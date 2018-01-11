$(function(){
	//进度条根据数值显示颜色
	$('.progress').each(function(i,obj){//剩余空间
		var w = $(obj).find('.progress-data-remaining').text();
		var ww = w.replace('%','');
		var clazz;
		if(ww > 10 && ww <= 20){
			clazz = 'progress-bar-warning';
		}else if(ww <= 10){
			clazz = 'progress-bar-danger';
		}else if(ww > 20){
			clazz = 'progress-bar-success';
		}
		$(obj).find('.progress-remaining').addClass(clazz).css("width", w);
	});

	$('.progress').each(function(i,obj){//使用空间
		var w = $(obj).find('.progress-data-used').text();
		var ww = w.replace('%','');
		var clazz;
		if(ww >= 90){
			clazz = 'progress-bar-danger';
		}else if(ww >=60 && ww < 90){
			clazz = 'progress-bar-warning';
		}else if(ww < 60){
			clazz = 'progress-bar-success';
		}
		$(obj).find('.progress-used').addClass(clazz).css("width", w);
	});

	$('.progress-data-label').each(function(i,obj){
		var w = $(obj).attr('percent');
		var ww = w.replace('%','');
		var clazz;
		if(ww >= 90){
			clazz = 'progress-bar-danger';
		}else if(ww >=80 && ww < 90){
			clazz = 'progress-bar-warning';
		}else if(ww < 80){
			clazz = 'progress-bar-success';
		}
		$(obj).addClass(clazz);
	});

	$('.progress').each(function(i,obj){//完成
		var w = $(obj).find('.progress-data-complete').text();
		$(obj).find('.progress-complete').addClass('progress-bar-success').css("width", w);
	});
	
});

function renderProgressBar(progress) {
    var clazz;
    if (progress >= 90) {
        clazz = 'progress-bar-danger';
    } else if (progress >= 60 && progress < 90) {
        clazz = 'progress-bar-warning';
    } else if (progress < 60) {
        clazz = 'progress-bar-success';
    }
    return clazz;
}