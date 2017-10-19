$(function (){
	var $time = $('#time'),
	$btn = $('#btn'),
	status = 'init',
	time = 5000,
	count =0;

	$btn.on('touchstart click', function (){
		switch(status){
			case 'init':
				start();
				break;
			case 'started':
				$btn.html(++count);
				break;
		}
	})

	function start(){
		status = 'started';
		$btn.html(++count);
		var counter = setInterval(timer, 7),
			curTime;

		function timer(){
			time -= 7;
			if(time <= 0){
				time = 0;
				clearInterval(counter);
			}

			curTime = (time / 1000).toFixed(3);
			if(curTime == '0.000'){
				$time.html('时间到');
				//SetScore(count);
				confirm('夏颖，你爱我吗？\n爱我=>"确定"\n非常爱我=>"取消"');
				alert("我也爱你~\n夏颖，未来无论发生什么，我会一直陪着你~永远不要说分手这样的傻话了~");
			}else{
				$time.html(curTime + '秒');
			}
		}
	}

	function SetScore(score)
	{
	    $.post("GetScore.ashx", { "action": "SetMaxScore", "score": score }, function (data) {
	        var datas = data.split(":");
	        var state = datas[0];
	        var maxScore = datas[1];
	        if(state == "ok")
	        {
	            alert("恭喜你获得最高分：" + score);
	        }
	        else
	        {
	            alert("得分" + score + "，很遗憾，距离最高分" + maxScore + "还差" + (maxScore - score) + "分，继续努力哦！");
	        }
	    })
	}
})


