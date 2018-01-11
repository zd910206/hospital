var pageNum = 1;

/**
 * Add a Tab
 * @param title name of tab
 */
function addPageTab(id, title, url, attr){
	//tab is exist?
	if($('#page_'+id).length == 0){
		pageNum++;
		$('#pageTab').append(
			  $('<li><a href="#page_' + id + '" data-toggle="tab" title="' + title + '" conf-id="'+id+'">' +
					  title + '&nbsp;' +
						'<button class="close" title="关闭" type="button">×</button>' +
						'</a></li>'));
				var ctx_url = url;
		 		if(!/^http/.test(url)){
		 			ctx_url = ctx + ctx_url;
		 		}
				var tabContent = '<div class="tab-pane" id="page_' + id + '" data-src="' + ctx_url + '">' +
    			'<iframe scrolling="no" title="'+title+'"  id="subIframe_'+ id + '" frameborder="0" src="' + ctx_url + '" style="width:100%;height:' + ($(window).height() - 90) + 'px;" '+
    			(typeof(attr) != 'undefined' ? attr : '')
    			+'></iframe>' +
    			'</div>';
		 	
			$('#pageTabContent').append($(tabContent));
			
			$('#pageTab a[href="#page_' + id + '"]').tab('show');
			
			showActivedTabContent(id);
	}else{
		$('#pageTab a[href="#page_' + id + '"]').tab('show');
		showActivedTabContent(id);
	}
}

function showActivedTabContent(id, title){
	//hidden other div,show only current actived tab
	$('.tab-pane').each(function(){
		$(this).css('display', 'none');
	});
	
	$('#menu li').each(function(){
		$(this).removeClass('active');
	});
	
	if(title == 'flowConfig'){
		$('#page1').addClass('active');
		$('.tab-pane.active').css('display', 'block');
	}else{
		$('#page_' + id).addClass('active');
		$('.tab-pane.active').css('display', 'block');
	}
}
 
/**
* Reset numbering on tab buttons
*/
function reNumberPages() {
    pageNum = 1;
    var tabCount = $('#pageTab > li').length;
    $('#pageTab > li').each(function() {
        var pageId = $(this).children('a').attr('href');
        var title = $(this).children('a').attr('title');
        if (pageId == "#page1") {
            return true;
        }
        pageNum++;
        $(this).children('a').html(title + '&nbsp;' +
            '<button class="close" title="关闭" type="button">×</button>');
    });
}

function selectTabByTitle(title){
	$('#pageTab li a').each(function(){
		var tabName = $(this).attr('title');
		if(title == tabName){
			$(this).tab('show');
			showActivedTabContent(null, title);
		}
	});
}

$(function(){
	/**
	* Remove a Tab
	*/
	$('#pageTab').on('click', ' li a .close', function(e) {
	    var tabId = $(this).parents('li').children('a').attr('href');
	    $(this).parents('li').remove('li');
	    $(tabId).remove();
	    reNumberPages();
	    
	    var paneID = $('#pageTab a:last').attr('href');
	    var src = $(paneID).attr('data-src');
	    $(paneID +" iframe").attr("src", src);
	    
	    $('#pageTab a:last').tab('show');//最后一个tab被显示
	    showActivedTabContent();
	});
	 
	/**
	 * Click Tab to show its contents
	 */
	$("#pageTab").on("click", "a", function(e) {
		if(navigator.userAgent.indexOf('Firefox') >= 0) { 
			//注释掉这些，防止点击Tabs页，使页面刷新
		    e.preventDefault();
/*		    var paneID = $(e.target).attr('href');
		    var src = $(paneID).attr('data-src');
		    $(paneID +" iframe").attr("src", src);*/
		} 
	    $(this).tab('show');
	    showActivedTabContent(null,this.title);
	});
});