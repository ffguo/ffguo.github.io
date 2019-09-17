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
		var url = location.href;
		var name = "";
		if(url.split('=').length === 2)
		{
			name = decodeURI(url.split('=')[1]);
		}

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
				alert("恭喜" + name + "获得分数：" + count);
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


