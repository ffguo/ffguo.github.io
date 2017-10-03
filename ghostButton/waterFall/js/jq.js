$(window).on("load",function(){
	waterFall();
	var dataInt={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};
	$(window).on("scroll",function(){
		$.each(dataInt.data, function(index, val) {
			if(checkScrollTop())
			{
				var oBox=$('<div>').addClass('box').appendTo('#main');
				var oPic=$('<div>').addClass('pic').appendTo(oBox);
				$('<img>').attr('src','images/'+$(val).attr('src')).appendTo(oPic);
			}
		});
		waterFall();
	})
});

function waterFall()
{
	var $boxs=$('#main>div');
	var boxW=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/boxW);
	$('#main').css({
		'width': boxW*cols+'px',
		'margin': '0 auto'
	});

	var arryH=[];
	$boxs.each(function(index, value) {
		var boxH=$boxs.eq(index).outerHeight();
		if(index<cols)
		{
			arryH[index]=boxH;
		}
		else
		{
			var minH=Math.min.apply(null, arryH);
			var minIndex=$.inArray(minH, arryH);
			$(value).css({
				'position': 'absolute',
				'top': minH+'px',
				'left': boxW*minIndex+'px'
			});
			arryH[minIndex]+=$boxs.eq(index).outerHeight();
		}
	});
}

function checkScrollTop()
{
	var $lastBox=$('#main>div').last();
	var lastBoxH=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var height=$(window).height();

	return (lastBoxH<scrollTop+height)?true:false;
}