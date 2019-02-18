;
(function() {
	var calc = function() {
		var docElement = document.documentElement; //获取整个html
		var clientWidthValue = docElement.clientWidth; //docElement.clientWidth表示浏览器窗口宽度
		docElement.style.fontSize = 20 * (clientWidthValue / 375) + 'px'; //根据窗口宽度给值字体大小
	}
	calc(); // 先运行一次函数
	window.addEventListener('resize', calc); //启动窗口监听，每当resize窗口变动就运行calc函数
})();