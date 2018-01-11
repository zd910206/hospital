/*
 *    固定位置 
 */

$.fn.fixed = function(){
	
	$(document.body).css('padding-bottom','49px');
	
	this.css({
		'position':'fixed',
		'margin-bottom':'0',
		'padding':'5px 0 10px'
	});
	
	
	
	
/*	this.resize(function(e){
		
		console.log(e.pageY);
		
	})*/
	
	/*this.each(function(){
		
		
	})*/
};


$(function(){
	$('.fixed').fixed();
})