var oIndex=1;

function next()
{
	if(oIndex<6)
	{
		var oPageNow=document.getElementById('page'+oIndex);
		oPageNow.style.webkitTransform="rotateX(-90deg)";

		oIndex++;
		var oPageNex=document.getElementById('page'+oIndex);
		oPageNex.style.webkitTransform="rotateX(0deg)";
	}
}

function pre()
{
	if(oIndex>1)
	{
		var oPageNow=document.getElementById('page'+oIndex);
		oPageNow.style.webkitTransform="rotateX(90deg)";

		oIndex--;
		var oPagePre=document.getElementById('page'+oIndex);
		oPagePre.style.webkitTransform="rotateX(0deg)";
	}
}