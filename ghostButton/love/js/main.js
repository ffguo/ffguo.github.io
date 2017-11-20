const PicCount = 5;
const MusicCount = 3;
const ImportDate = new Date(2017,9,11,22,21,45);	//2017年10月11日


Init();

//初始化
function Init() {
	document.title = GetGreet();	//设置问候标题
	//设置功能键
	SetSuprise();
	SetMusic();	
	SetPicture();
	//设置时间
	UpdateCurrentDate();
	setInterval(UpdateCurrentDate, 1000);
}

//更新页面的时间
function UpdateCurrentDate() {
	var oDate = document.getElementById("date");
	var dateHtml = GetCurrentDateHTML();
	oDate.innerHTML = dateHtml;
}

//获取与ImportDate的差值
function GetCurrentDateHTML() {
	var curTime = new Date();
	//获取年月日时分秒差值
	var diffTime = curTime.getTime() - ImportDate.getTime();
	diffTime /= 1000;

	var seconds = Math.floor(diffTime % 60),
		minutes = Math.floor(diffTime / 60 % 60),
		hours   = Math.floor(diffTime / 60 / 60 % 24),
		day   	= Math.floor(diffTime / 60 / 60 / 24);

	var html = "";
	html += "<span>" + day + "</span>日";
	html += "<span>" + hours + "</span>时";
	html += "<span>" + minutes + "</span>分";
	html += "<span>" + seconds + "</span>秒";
	
	return html;
}

//获取问候
function GetGreet() {
	var curTime = new Date();
	var hour = curTime.getHours();
	var tip = "";

	if(hour > 16) {
		tip = "晚安";
	}else if(hour >= 12) {
		tip = "午安";
	}else {
		tip = "早安";
	}

	return tip + ", 浪儿";
}

//设置惊喜
function SetSuprise() {
	var oSuprise = document.getElementById("button-surpise");

	oSuprise.onclick = function () {
		alert("蠢~");
	};
}

//设置换下一张
function SetPicture() {
	var oPicture = document.getElementById("button-picture"),
		oBox = document.getElementById("pic-box"),
		aImages = oBox.getElementsByTagName("img");

	oPicture.onclick = function (){
		var index = Math.floor(Math.random() * PicCount);
		for (var i = 0; i < aImages.length; i++) {
			aImages[i].className = "";
		};
		aImages[index].className = 'active';
	};
}

//设置音乐下一首
function SetMusic() {
	var oMusic = document.getElementById("button-music"),
		oPlayer = document.getElementById("music-player");

	oMusic.onclick = function (){
		oPlayer.src = GetRandomMusicUrl();
	};

	oPlayer.onended = function (){
		oPlayer.src = GetRandomMusicUrl();
	};
}

//获取随机音乐地址
function GetRandomMusicUrl() {
	var index = Math.ceil(Math.random() * MusicCount);
	var url = "media/music" + index + ".mp3";
	return url;
}

// **************
// ***暂时不用***
// **************
function GetCurrentDateHTML2() {
	var curTime = new Date();
	//获取年月日时分秒差值
	var diffTime = curTime.getTime() - ImportDate.getTime();
	diffTime /= 1000;

	var seconds = Math.floor(diffTime % 60),
		minutes = Math.floor(diffTime / 60 % 60),
		hours   = Math.floor(diffTime / 60 / 60 % 24),
		day   	= Math.floor(diffTime / 60 / 60 / 24 % 30),
		month   = Math.floor(diffTime / 60 / 60 / 24 / 30 % 12),
		year    = Math.floor(diffTime / 60 / 60 / 24 / 30 / 12);

	var html = "";
	html += (year === 0) ? "" : "<span>" + year + "</span>年";
	html += "<span>" + month + "</span>月";
	html += "<span>" + day + "</span>日";
	html += "<span>" + hours + "</span>时";
	html += "<span>" + minutes + "</span>分";
	html += "<span>" + seconds + "</span>秒";
	
	return html;
}

function GetCurrentDateHTML1() {
	var curTime = new Date();
	//获取年月日时分秒差值
	var diffYear	= curTime.getFullYear() - ImportDate.getFullYear(),
		diffMonth	= curTime.getMonth() - ImportDate.getMonth(),
		diffDay		= curTime.getDay() - ImportDate.getDay(),
		diffHours	= curTime.getHours() - ImportDate.getHours(),
		diffMinutes = curTime.getMinutes() - ImportDate.getMinutes(),
		diffSeconds = curTime.getSeconds() - ImportDate.getSeconds();

	var html = "";
	html += (diffYear === 0) ? "" : "<span>"+diffYear+"</span>年";
	html += (diffYear <= 0 && diffMonth === 0) ? "" : "<span>" + (diffMonth+12)%12 + "</span>月";
	html += (diffYear <= 0 && diffMonth <= 0 && diffDay === 0) ? "" : "<span>" + (diffDay+30)%30 + "</span>日";
	html += "<span>" + (diffHours+24)%24 + "</span>日";
	html += "<span>" + (diffMinutes+60)%60 + "</span>日";
	html += "<span>" + (diffSeconds+60)%60 + "</span>日";
	
	return html;
}