$(function (){
	var $time = $('#time'),
	$btn = $('#btn'),
	status = 'init',
	name = GetUrlParms().name,
	time = 5000,
	count = 0
	isEnd = false;

	$btn.on('touchstart click', function (){
		if (!isEnd)
		{
			switch(status){
				case 'init':
					start();
					break;
				case 'started':
					$btn.html(++count);
					break;
			}
		}
		else
		{
			alert(name + "请重新开始吧！");
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
				isEnd = true;
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

	function GetUrlParms()
	{
		var args=new Object();   
		var query=location.search.substring(1);//获取查询串   
		var pairs=query.split("&");//在逗号处断开   
		for(var  i=0;i<pairs.length;i++)   
		{   
			var pos=pairs[i].indexOf('=');//查找name=value   
				if(pos==-1)   continue;//如果没有找到就跳过   
				var argname=pairs[i].substring(0,pos);//提取name   
				var value=pairs[i].substring(pos+1);//提取value   
				args[argname]=decodeURI(value);//存为属性   
		}
		return args;
	}
})


