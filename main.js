var canvasWidth = 400;
var canvsHeight = canvasWidth;
var r = canvsHeight/2;
var rem = canvasWidth / 200;

var oClock = document.getElementById("clock");
var ctx = oClock.getContext("2d");

oClock.width = canvasWidth;
oClock.height = canvsHeight;

function drawBackground(){
	ctx.save();
	ctx.translate(r, r);

	ctx.beginPath();
	ctx.arc(0, 0, r-5*rem, 0, 2*Math.PI, false);
	ctx.lineWidth = 10*rem;
	ctx.stroke();

	var clockNums = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
	ctx.font = 18*rem+"px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	for (var i = 0; i < clockNums.length; i++) {
		var clockNum = clockNums[i];
		var rad = Math.PI / 6;
		var x = (r-30*rem) * Math.cos(rad*i);
		var y = (r-30*rem) * Math.sin(rad*i);
		
		ctx.fillText(clockNum, x, y);
	};

	for (var i = 0; i < 60; i++) {
		var rad = Math.PI / 30;
		var x = (r-18*rem) * Math.cos(rad*i);
		var y = (r-18*rem) * Math.sin(rad*i);
		ctx.beginPath();
		if(i%5 == 0){
			ctx.fillStyle = "#000";
		}else{
			ctx.fillStyle = "#ccc";
		}
		ctx.arc(x, y, 1*rem, 0, 2*Math.PI, false);
		ctx.fill();
	};
}

function drawHour(hour, minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI/12*hour;
	var mRad = 2*Math.PI/12/60*minute;
	ctx.rotate(rad+mRad);
	ctx.moveTo(0, -2*rem);
	ctx.lineTo(0, -r/2);
	ctx.lineWidth = 10*rem;
	ctx.lineCap = "round";
	ctx.strokeStyle = "#000";
	ctx.stroke();
	ctx.restore();
}

function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI/60*minute;
	ctx.rotate(rad);
	ctx.moveTo(0, -2*rem);
	ctx.lineTo(0, -r + 40*rem);
	ctx.lineWidth = 6*rem;
	ctx.lineCap = "round";
	ctx.strokeStyle = "#000";
	ctx.stroke();
	ctx.restore();
}

function drawSecond(second){
	ctx.save();
	var rad = 2*Math.PI/60*second;
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.rotate(rad);
	ctx.moveTo(-2*rem, 20*rem);
	ctx.lineTo(2*rem, 20*rem);
	ctx.lineTo(1*rem, -r + 18*rem);
	ctx.lineTo(-1*rem, -r + 18*rem);
	ctx.fill();
	ctx.restore();
}

function drawDot(){
	ctx.beginPath();
	ctx.arc(0, 0, 3*rem, 0, 2*Math.PI, false);
	ctx.fillStyle = "#fff";
	ctx.fill();
}

function run(){
	ctx.clearRect(0, 0, canvasWidth, canvsHeight);
	var time = new Date();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();
	drawBackground();
	drawHour(hour, minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}


setInterval(run, 1000);
run();