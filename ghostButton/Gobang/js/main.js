var chessBords = [];
var wins = [];
var myWin = [];
var comWin = [];
var WHO = true;
var over = false;

//初始化棋盘
for (var i = 0; i < 15; i++) {
	chessBords[i] = [];
	wins[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBords[i][j] = 0;
		wins[i][j] = [];
	};
};

//设置赢法
var count = 0;
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i][j+k][count] = true;
		};
		count++;
	};
};

for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[j+k][i][count] = true;
		};
		count++;
	};
};

for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i+k][j+k][count] = true;
		};
		count++;
	};
};

for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			wins[i+k][j-k][count] = true;
		};
		count++;
	};
};

console.log(count);
//初始化赢的数量
for (var i = 0; i < count; i++) {
	comWin[i] = 0;
	myWin[i] = 0;
};

var chess = document.getElementById("chess");
var context = chess.getContext("2d");

context.strokeStyle = "#BFBFBF";

var logo = new Image();
logo.src = "images/logo.jpg";
logo.onload = function() {
	context.drawImage(logo, 0, 0, 450, 450);
	drawChessBorder();
}

function drawChessBorder(){		//画棋盘
	for (var i = 0; i < 15; i++) {
		context.moveTo(15 + i * 30, 15);
		context.lineTo(15 + i * 30, 435);
		context.stroke();
		context.moveTo(15, 15 + i * 30);
		context.lineTo(435, 15 + i * 30);
		context.stroke();
	};
}

function oneStep(x, y, who){	//x索引，y索引，who黑白棋
	context.beginPath();
	context.arc(15 + x * 30, 15 + y * 30, 13, 0, 2*Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15 + x * 30, 15 + y * 30, 13, 15 + x * 30, 15 + y * 30, 0);	//创建渐变对象x,y,r
	if(who){
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	}else{
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}
	context.fillStyle = gradient;
	context.fill();
}

chess.onclick = function (e){
	if(over){
		return;
	}
	if(!WHO){
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if(chessBords[i][j] == 0){
		oneStep(i, j, true);
		chessBords[i][j] = 1;
		checkWin(i, j, true);
	}
	if(!over){
		WHO = !WHO;
		computerAI();
	}
}

function computerAI(){
	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u = 0, v = 0;

	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}

	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if (chessBords[i][j]==0) {
				for (var k = 0; k < count; k++) {
					if(wins[i][j][k]){
						if (myWin[k]==1) {
							myScore[i][j] += 200;
						}else if(myWin[k]==2){
							myScore[i][j] += 400;
						}else if(myWin[k]==3){
							myScore[i][j] += 2000;
						}else if(myWin[k]==4){
							myScore[i][j] += 10000;
						}

						if (comWin[k]==1) {
							computerScore[i][j] += 220;
						}else if(comWin[k]==2){
							computerScore[i][j] += 420;
						}else if(comWin[k]==3){
							computerScore[i][j] += 2100;
						}else if(comWin[k]==4){
							computerScore[i][j] += 20000;
						}
					}
				}
				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;
				}else if(myScore[i][j] == max){
					if(computerScore[i][j] > computerScore[u][v]){
						u = i;
						v = j;
					}
				}
				if(computerScore[i][j] > max){
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if(computerScore[i][j] == max){
					if(myScore[i][j] > myScore[u][v]){
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u, v, false);
	chessBords[u][v] = 1;
	checkWin(u, v, false);
	if(!over){
		WHO = !WHO;
	}
}

function checkWin(i, j, who){
	if(who){
		for (var k = 0; k < count; k++) {
			if(wins[i][j][k]){
				myWin[k]++;
				comWin[k] = 6;
				if(myWin[k] == 5){
					alert('恭喜你击败了阿尔法超！');
					over = true;
				}
			}
		};
	}else{
		for (var k = 0; k < count; k++) {
			if(wins[i][j][k]){
				comWin[k]++;
				myWin[k] = 6;
				if(comWin[k] == 5){
					alert('阿尔法超：愚蠢的人类，你输了！');
					over = true;
				}
			}
		};
	}
}