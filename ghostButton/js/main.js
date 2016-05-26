$(function (){
	$('.box .button').hover(function() {
		var oTitle=$(this).attr('data');
		$('.tip em').text(oTitle);
		var pos=$(this).position().left+10;
		var dis=parseInt(($('.tip').outerWidth()-$(this).outerWidth())/2);
		console.log(dis);
		l=pos-dis;
		$('.tip').css('left', l+'px').stop(true).animate({'opacity':1,'top':'145px'}, 500);
	}, function() {
		$('.tip').stop(true).animate({'opacity':0,'top':'100px'}, 500);
	});
})