    	function rem(){
	//获到到html元素
	var html = document.documentElement;
	var w = html.offsetWidth;
	//公式：基准值/标准网页大小*当前网页的宽度
	html.style.fontSize = 100/750*w + "px";
}
rem() //当网页在打开时就执行它
//网页窗口在改变大小时,也执行它
window.onresize = rem;