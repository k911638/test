$(function () {

	//返回
	$(".member_fanhui").click(function () {
		window.history.go(-1);
	});

	//司机端跳转
	$('#driver_side').click(function () {
		window.location.href = ""
	});

	//社区网点跳转
	$('#community_network').click(function () {
		window.location.href = ""
	});

	//供应商跳转
	$('#supplier').click(function () {
		window.location.href = ""
	});

	//价格纠错跳转
	$('#price_error').click(function () {
		window.location.href = ""
	});

	//信息分享跳转
	$('#info_share').click(function () {
		window.location.href = ""
	});

	//采买任务跳转
	$('#purchasing_task').click(function () {
		window.location.href = ""
	});

	//配送任务跳转
	$('#distribution_task').click(function () {
		window.location.href = ""
	});

	//成为采买员跳转
	$('#purchasing').click(function () {
		window.location.href = "../my/member_info_buyer.html"
	});

	//成为配送员跳转
	$('#delivery_clerk').click(function () {
		window.location.href = "../my/member_info_deliveryer.html"
	});

	//开通线上商店跳转
	$('#online_shop').click(function () {
		window.location.href = "../my/member_info_shop.html"
	});
	
	//成为价格分享员跳转
	$('#share_clerk').click(function () {
		window.location.href = "../my/member_info_share.html"
	});

})