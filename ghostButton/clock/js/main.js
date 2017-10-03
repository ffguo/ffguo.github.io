<<<<<<< HEAD
var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=500;
var RADIUS=8;
var MAGRIN_LEFT=30;
var MAGRIN_TOP=60;

const endTime=new Date(2015,2,10,12,23,45);
var curShowTimeSeconds = 0;

var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload=function ()
{
	WINDOW_WIDTH=document.documentElement.clientWidth-10;
	WINDOW_HEIGHT=document.documentElement.clientHeight-20;
	MAGRIN_LEFT=Math.round(WINDOW_WIDTH/10);
	MAGRIN_TOP=Math.round(WINDOW_HEIGHT/5);
	RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;

	var canvas=document.getElementById('canvas');
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;

	var context=canvas.getContext('2d');
	curShowTimeSeconds=getCurrentShowSeconds();

	setInterval(function(){
		reader(context);
		update();
	},50);
};

function getCurrentShowSeconds()
{
	var curTime=new Date();
	/*var ret=endTime.getTime()-curTime.getTime();
	ret=Math.round(ret/1000);

	return ret>0 ? ret : 0;*/
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();

	return ret;
}

function update()
{
	var nextShowTimes=getCurrentShowSeconds();

	var nextHours=parseInt(nextShowTimes/3600);
	var nextMinutes=parseInt((nextShowTimes-nextHours*60*60)/60);
	var nextSeconds=nextShowTimes%60;

	var curHours=parseInt(curShowTimeSeconds/3600);
	var curMinutes=parseInt((curShowTimeSeconds-curHours*60*60)/60);
	var curSeconds=curShowTimeSeconds%60;

	if(nextSeconds!=curSeconds)
	{
		curShowTimeSeconds=nextShowTimes;

		if(parseInt(nextHours/10) != parseInt(curHours/10))
		{
			addBalls(MAGRIN_LEFT,MAGRIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(nextHours%10) != parseInt(curHours%10))
		{
			addBalls(MAGRIN_LEFT+15*(RADIUS+1),MAGRIN_TOP,parseInt(curHours%10));
		}

		if(parseInt(nextMinutes/10) != parseInt(curMinutes/10))
		{
			addBalls(MAGRIN_LEFT+39*(RADIUS+1),MAGRIN_TOP,parseInt(curMinutes/10));
		}
		if(parseInt(nextMinutes%10) != parseInt(curMinutes%10))
		{
			addBalls(MAGRIN_LEFT+54*(RADIUS+1),MAGRIN_TOP,parseInt(curMinutes%10));
		}

		if(parseInt(nextSeconds/10) != parseInt(curSeconds/10))
		{
			addBalls(MAGRIN_LEFT+78*(RADIUS+1),MAGRIN_TOP,parseInt(curSeconds/10));
		}
		if(parseInt(nextSeconds%10) != parseInt(curSeconds%10))
		{
			addBalls(MAGRIN_LEFT+93*(RADIUS+1),MAGRIN_TOP,parseInt(curSeconds%10));
		}
	}

	updateBalls();
}

function updateBalls()
{
	for (var i = 0; i < balls.length; i++) {
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if(balls[i].y>WINDOW_HEIGHT-RADIUS)
		{
			balls[i].y=WINDOW_HEIGHT-RADIUS;
			balls[i].vy=-balls[i].vy*0.75;
		}
	};

	var cnt=0;
	for (var i = 0; i < balls.length; i++) {
		if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH)
			balls[cnt++]=balls[i];
	};

	while(balls.length>cnt)
	{
		balls.pop();
	}
}

function addBalls(x,y,num)
{
	for (var i = 0; i < digit[num].length; i++) 
		for (var j = 0; j < digit[num][i].length; j++) 
			if(digit[num][i][j]==1)
			{
				var eBall={
					x:x+(RADIUS+1)+2*(RADIUS+1)*j,
					y:y+(RADIUS+1)+2*(RADIUS+1)*i,
					g:1.5+Math.random(),
					vx:Math.pow(-1, Math.ceil(Math.random()*100))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*10)]
				};
				balls.push(eBall);
			}
			
}

function reader(cxt)
{
	cxt.clearRect(0,0,canvas.width,canvas.height);

	//当前的时间
	/*var myDate=new Date();
	var hours=myDate.getHours();
	var minutes=myDate.getMinutes();
	var seconds=myDate.getSeconds();*/

	var hours=parseInt(curShowTimeSeconds/3600);
	var minutes=parseInt((curShowTimeSeconds-hours*60*60)/60);
	var seconds=curShowTimeSeconds%60;

	readerDigit(MAGRIN_LEFT,MAGRIN_TOP,parseInt(hours/10),cxt);
	readerDigit(MAGRIN_LEFT+15*(RADIUS+1),MAGRIN_TOP,parseInt(hours%10),cxt);
	readerDigit(MAGRIN_LEFT+30*(RADIUS+1),MAGRIN_TOP,10,cxt);
	readerDigit(MAGRIN_LEFT+39*(RADIUS+1),MAGRIN_TOP,parseInt(minutes/10),cxt);
	readerDigit(MAGRIN_LEFT+54*(RADIUS+1),MAGRIN_TOP,parseInt(minutes%10),cxt);
	readerDigit(MAGRIN_LEFT+69*(RADIUS+1),MAGRIN_TOP,10,cxt);
	readerDigit(MAGRIN_LEFT+78*(RADIUS+1),MAGRIN_TOP,parseInt(seconds/10),cxt);
	readerDigit(MAGRIN_LEFT+93*(RADIUS+1),MAGRIN_TOP,parseInt(seconds%10),cxt);

	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,Math.PI*2);
		cxt.closePath();

		cxt.fill();
	};
}

function readerDigit (x,y,num,cxt) {

	cxt.fillStyle='rgb(0,102,153)';

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j]==1)
			{
				cxt.beginPath();
				cxt.arc(x+(RADIUS+1)+2*(RADIUS+1)*j,y+(RADIUS+1)+2*(RADIUS+1)*i,RADIUS,0,Math.PI*2);
				cxt.closePath();

				cxt.fill();
			}
		};
	};
=======
var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=500;
var RADIUS=8;
var MAGRIN_LEFT=30;
var MAGRIN_TOP=60;

const endTime=new Date(2015,2,10,12,23,45);
var curShowTimeSeconds = 0;

var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload=function ()
{
	WINDOW_WIDTH=document.documentElement.clientWidth-10;
	WINDOW_HEIGHT=document.documentElement.clientHeight-20;
	MAGRIN_LEFT=Math.round(WINDOW_WIDTH/10);
	MAGRIN_TOP=Math.round(WINDOW_HEIGHT/5);
	RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;

	var canvas=document.getElementById('canvas');
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;

	var context=canvas.getContext('2d');
	curShowTimeSeconds=getCurrentShowSeconds();

	setInterval(function(){
		reader(context);
		update();
	},50);
};

function getCurrentShowSeconds()
{
	var curTime=new Date();
	/*var ret=endTime.getTime()-curTime.getTime();
	ret=Math.round(ret/1000);

	return ret>0 ? ret : 0;*/
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();

	return ret;
}

function update()
{
	var nextShowTimes=getCurrentShowSeconds();

	var nextHours=parseInt(nextShowTimes/3600);
	var nextMinutes=parseInt((nextShowTimes-nextHours*60*60)/60);
	var nextSeconds=nextShowTimes%60;

	var curHours=parseInt(curShowTimeSeconds/3600);
	var curMinutes=parseInt((curShowTimeSeconds-curHours*60*60)/60);
	var curSeconds=curShowTimeSeconds%60;

	if(nextSeconds!=curSeconds)
	{
		curShowTimeSeconds=nextShowTimes;

		if(parseInt(nextHours/10) != parseInt(curHours/10))
		{
			addBalls(MAGRIN_LEFT,MAGRIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(nextHours%10) != parseInt(curHours%10))
		{
			addBalls(MAGRIN_LEFT+15*(RADIUS+1),MAGRIN_TOP,parseInt(curHours%10));
		}

		if(parseInt(nextMinutes/10) != parseInt(curMinutes/10))
		{
			addBalls(MAGRIN_LEFT+39*(RADIUS+1),MAGRIN_TOP,parseInt(curMinutes/10));
		}
		if(parseInt(nextMinutes%10) != parseInt(curMinutes%10))
		{
			addBalls(MAGRIN_LEFT+54*(RADIUS+1),MAGRIN_TOP,parseInt(curMinutes%10));
		}

		if(parseInt(nextSeconds/10) != parseInt(curSeconds/10))
		{
			addBalls(MAGRIN_LEFT+78*(RADIUS+1),MAGRIN_TOP,parseInt(curSeconds/10));
		}
		if(parseInt(nextSeconds%10) != parseInt(curSeconds%10))
		{
			addBalls(MAGRIN_LEFT+93*(RADIUS+1),MAGRIN_TOP,parseInt(curSeconds%10));
		}
	}

	updateBalls();
}

function updateBalls()
{
	for (var i = 0; i < balls.length; i++) {
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if(balls[i].y>WINDOW_HEIGHT-RADIUS)
		{
			balls[i].y=WINDOW_HEIGHT-RADIUS;
			balls[i].vy=-balls[i].vy*0.75;
		}
	};

	var cnt=0;
	for (var i = 0; i < balls.length; i++) {
		if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH)
			balls[cnt++]=balls[i];
	};

	while(balls.length>cnt)
	{
		balls.pop();
	}
}

function addBalls(x,y,num)
{
	for (var i = 0; i < digit[num].length; i++) 
		for (var j = 0; j < digit[num][i].length; j++) 
			if(digit[num][i][j]==1)
			{
				var eBall={
					x:x+(RADIUS+1)+2*(RADIUS+1)*j,
					y:y+(RADIUS+1)+2*(RADIUS+1)*i,
					g:1.5+Math.random(),
					vx:Math.pow(-1, Math.ceil(Math.random()*100))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*10)]
				};
				balls.push(eBall);
			}
			
}

function reader(cxt)
{
	cxt.clearRect(0,0,canvas.width,canvas.height);

	//当前的时间
	/*var myDate=new Date();
	var hours=myDate.getHours();
	var minutes=myDate.getMinutes();
	var seconds=myDate.getSeconds();*/

	var hours=parseInt(curShowTimeSeconds/3600);
	var minutes=parseInt((curShowTimeSeconds-hours*60*60)/60);
	var seconds=curShowTimeSeconds%60;

	readerDigit(MAGRIN_LEFT,MAGRIN_TOP,parseInt(hours/10),cxt);
	readerDigit(MAGRIN_LEFT+15*(RADIUS+1),MAGRIN_TOP,parseInt(hours%10),cxt);
	readerDigit(MAGRIN_LEFT+30*(RADIUS+1),MAGRIN_TOP,10,cxt);
	readerDigit(MAGRIN_LEFT+39*(RADIUS+1),MAGRIN_TOP,parseInt(minutes/10),cxt);
	readerDigit(MAGRIN_LEFT+54*(RADIUS+1),MAGRIN_TOP,parseInt(minutes%10),cxt);
	readerDigit(MAGRIN_LEFT+69*(RADIUS+1),MAGRIN_TOP,10,cxt);
	readerDigit(MAGRIN_LEFT+78*(RADIUS+1),MAGRIN_TOP,parseInt(seconds/10),cxt);
	readerDigit(MAGRIN_LEFT+93*(RADIUS+1),MAGRIN_TOP,parseInt(seconds%10),cxt);

	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,Math.PI*2);
		cxt.closePath();

		cxt.fill();
	};
}

function readerDigit (x,y,num,cxt) {

	cxt.fillStyle='rgb(0,102,153)';

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j]==1)
			{
				cxt.beginPath();
				cxt.arc(x+(RADIUS+1)+2*(RADIUS+1)*j,y+(RADIUS+1)+2*(RADIUS+1)*i,RADIUS,0,Math.PI*2);
				cxt.closePath();

				cxt.fill();
			}
		};
	};
>>>>>>> 2ec686c41f29bf4e57ac6c56e2c9679573fbf228
}