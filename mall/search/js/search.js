$(function(){
	var $pop_window = $(".pop_window");
	var gourl = "../register/register0.html";

	//检测
	// var reads=$.cookie('layuser');
	// var re = /^1[3-9][0-9]\d{8}$/;
	// if(!re.test(reads)){
	// 	$pop_window.children().children().eq(1).text("请先登录").next().val("去登录").end().end().end().end().show();
	// 	setTimeout(function(){
	// 		window.location.href = "../register/register0.html";
	// 	},1500);
		
			
	// }else{
	// 	$pop_window.children().children().eq(1).text("请填写收货地址").next().val("去填写").end().end().end().end().show(); //占领屏幕
	// 	$.ajax({
	// 		url: 'http://127.0.0.1:3000/json',
	// 		type: 'GET',
	// 		dataType: 'json',
	// 		data: {"user": reads},
	// 	})
	// 	.done(function(obj) {
	// 		if(obj.state==1){
	// 			$pop_window.hide();
	// 		}else{
	// 			gourl = "../my/my_addshouhuo.html";
	// 			setTimeout(function(){
	// 				window.location.href = "../my/my_addshouhuo.html";
	// 			},3000);
	// 		}
	// 	})
	// 	.fail(function() {
	// 		console.log("error");
	// 	});
		
	// }
	
	


	//search type
	$(".search_type").delegate('li', 'click', function() {
		
		var ix = $(this).index();
		switch(ix){
			case 0:
				window.location.href="./search_pinpai.html";
				break;
			case 1:
				window.location.href="./search_shangpin.html";
				break;
			case 2:
				window.location.href="./searchCategory.html";
				break;
			case 3:
				window.location.href="./custom_Order.html";
		}
	});



	$(".footer").delegate('ul', 'click', function(){
		var ix = $(this).index();
		switch(ix){
			case 0:
				window.location.href="../";
			break;
			case 1:
				window.location.href="../msg/msg.html";
			break;
			case 2:
			return;
			case 3:
				window.location.href="../shopping/shopping.html";
			break;
			case 4:
				window.location.href = "../my/my.html";	
		}		
	});
	//定位
	$(".dingwei").click(function() {
		window.location.href = gourl;
	});
	//弹框确认
	$(".pop_window input").click(function() {
		$pop_window.hide();
		window.location.href = gourl;
	});
	$(".pop_window img").click(function() {
		window.location.href = gourl;
	});
})