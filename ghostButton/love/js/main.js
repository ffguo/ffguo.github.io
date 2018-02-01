const PicCount = 8;
const MusicCount = 3;
const ImportDate = new Date(2017,9,11,22,21,45);	//2017年10月11日

//天气
var weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%202132574&format=json";

var WeatherType = '';
var createSetInterval = null;

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
	//设置天气
	SetWeather();
}

//更新页面的时间
function UpdateCurrentDate() {
	let oDate = document.getElementById("date");
	let dateHtml = GetCurrentDateHTML();
	oDate.innerHTML = dateHtml;
}

//获取与ImportDate的差值
function GetCurrentDateHTML() {
	let curTime = new Date();
	//获取年月日时分秒差值
	let diffTime = curTime.getTime() - ImportDate.getTime();
	diffTime /= 1000;

	let seconds = Math.floor(diffTime % 60),
		minutes = Math.floor(diffTime / 60 % 60),
		hours   = Math.floor(diffTime / 60 / 60 % 24),
		day   	= Math.floor(diffTime / 60 / 60 / 24);

	let html = "";
	html += "<span>" + day + "</span>日";
	html += "<span>" + hours + "</span>时";
	html += "<span>" + minutes + "</span>分";
	html += "<span>" + seconds + "</span>秒";
	
	return html;
}

//获取问候
function GetGreet() {
	let curTime = new Date();
	let hour = curTime.getHours();
	let tip = "";

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
	let oBtnSuprise = document.getElementById("button-surpise");
	let oClose = document.getElementById("close");
	let oMask = document.getElementById("mask");
	let oSuprise = document.getElementById("suprise");

	oBtnSuprise.onclick = function () {
		alert("蠢~");
		oMask.style.display = 'block';
		oSuprise.style.display = 'block';
	};

	oClose.onclick = function () {
		oMask.style.display = 'none';
		oSuprise.style.display = 'none';
	};
}

//设置换下一张
function SetPicture() {
	let oPicture = document.getElementById("button-picture"),
		oBox = document.getElementById("pic-box"),
		aImages = oBox.getElementsByTagName("img");

	oPicture.onclick = function (){
		let index = Math.floor(Math.random() * PicCount);
		console.log(index);
		for (let i = 0; i < aImages.length; i++) {
			aImages[i].className = "";
		};
		aImages[index].className = 'active';
	};
}

//设置音乐下一首
function SetMusic() {
	let oMusic = document.getElementById("button-music"),
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
	let index = Math.ceil(Math.random() * MusicCount);
	let url = "media/music" + index + ".mp3";
	return url;
}


// 启动天气
function SetWeather()
{
	axios.get(weatherUrl)
	    .then(function (response) {
	        var data = response.data;
	        // 获取天气结果
	        var city = data.query.results.channel.location.city;
	        var forecast = data.query.results.channel.item.forecast;
	        WeatherType = forecast[0].text;
	        WeatherType = (WeatherType.indexOf('Snow') >= 0) ? 'Snow' : WeatherType;
	        console.log(WeatherType);
	        WeatherType = WeatherType.toLowerCase();
	    })
	    .then(function (){
	        createWeatherInterval();
	        clearWeatherInterval();
	    })
	    .catch(function (error) {
	        console.log(error);
	    });
}


// 创建下天气定时器
function createWeatherInterval()
{
    createSetInterval = setInterval(createWeathers, 500);
}

// 创建清理天气定时器
function clearWeatherInterval()
{
    setTimeout(() => {
        clearInterval(createSetInterval);
    }, 5000);
    //setInterval(clearWeathers, 3000);
}

// 创建许多天气图标
function createWeathers()
{
    let count = Math.ceil(Math.random() * 20);
    for (let i = 0; i < count; i++) {
        createWeather();
    }
}

// 创建一个天气图标
function createWeather()
{
    let oBox = document.getElementById('weather-box');
    let oWeater = document.createElement('div');
    let disLeft = Math.ceil(Math.random() * (parseInt(screen.width) - 10));
    oWeater.className = 'weather ' + WeatherType;
    oWeater.style.left = disLeft + 'px';
    oBox.appendChild(oWeater);
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