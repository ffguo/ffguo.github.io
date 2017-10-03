var data=['超超，我喜欢你','wacc520941','超超，我爱你','超超，520941'];

window.onload=function ()
{
	beginfun();
};


function beginfun()
{
	var oTitle=document.getElementById('title'),
		random=Math.floor(Math.random()*4);
	oTitle.innerHTML=data[random];
}