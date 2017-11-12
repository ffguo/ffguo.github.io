const ImportDate = new Date(2017,9,11,22,21,45);	//2017年10月11日

window.onload = function ()
{
	UpdateCurrentDate();
	setInterval(UpdateCurrentDate, 1000);
};

function UpdateCurrentDate() {
	var oDate = document.getElementById("date");
	var dateHtml = GetCurrentDateHTML();
	oDate.innerHTML = dateHtml;
}

function GetCurrentDateHTML() {
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