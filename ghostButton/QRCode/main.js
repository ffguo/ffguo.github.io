//var data=['超超，我喜欢你','wacc520941','超超，我爱你','超超，520941'];
var data = ['大哥好帅', '我是大哥的小迷妹', '大哥哥，要抱抱~'];

window.onload=function ()
{
	beginfun();
};


function beginfun()
{
	var oTitle=document.getElementById('title'),
		random=Math.floor(Math.random()*data.length);
	oTitle.innerHTML=data[random];
}