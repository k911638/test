;$(function(){
	//商品订单状态选择
	$("#shangpin_type").delegate('li', 'click', function() {
		var ix = $(this).addClass('order_current').siblings().removeClass('order_current').end().index();
		$(this).parent().parent().nextAll().hide().eq(ix).show();
		
	});


	//返回
	$(".member_fanhui").click(function() {
		window.location.href = "../my/my.html";
	});

});