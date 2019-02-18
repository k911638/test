$(function () {

	//返回
	$(".member_fanhui").click(function () {
		window.location.href = document.referrer;
	});

	//左边商品分类选择当前
	$('.buy_left ul li').click(function () {
		$(this).addClass("prolist_current").siblings().removeClass("prolist_current");
		var proID = $(this).index();
		$("div.prolist").eq(proID).css("display","block").siblings().css("display","none");
		$("div.prolist").eq(proID).find('li').children().first().addClass("title_current").siblings().css("display","block");
	});
	
	//右边商品列表选择
	$(".prolist_title").click(function () {
		$(this).addClass("title_current").parent().siblings().children(".prolist_title").removeClass("title_current").end();
		$(this).next().css("display","block").parent().siblings().children(".prolist_pro").css("display","none");
	});

	//初始化
	$(".buy_left ul li").eq(0).addClass("prolist_current");
	$("div.prolist").eq(0).css("display", "block");
	$("div.prolist").eq(0).find('li').children().first().addClass("title_current").siblings().css("display","block");

	//其它超市弹出
	$(".shop_price").click(function () {
		var layerh3 = $(this).parent().find('h3').html();
		$(".layer_other h3").html(layerh3);
		$(".layerbg").css("display","block");
		$(".layer_other").css("display","block");
	});

	//其它超市确定
	$(".buy_sure span").click(function () {
		$(".layerbg").css("display","none");
		$(".layer_other").css("display","none");
	});

	//加入购物车弹出
	$(".count").click(function () {
		$(".layerbg").css("display","block");
		$(".layer_cart").css("display","block");
	});

	//购物车取消
	$(".layer_cancel").click(function () {
		$(".layerbg").css("display","none");
		$(".layer_cart").css("display","none");
	});

	var num = $(".layer_cart h3").html();
	num = Number(num);
	$(".layer_reduce").click(function () {
		num = num - 1;
		$(".layer_cart h3").html(num);
	});
	$(".layer_plus").click(function () {
		num = num + 1;
		$(".layer_cart h3").html(num);
	});


	$(".footer").delegate('ul', 'click', function(){
		var ix = $(this).index();
		switch(ix){
			case 0:
			window.location.href="../";
			break;
			case 1:

			break;
			case 2:
			return;
			break;
			case 3:

			break;
			case 4:
			window.location.href="../register/register.html/";
			break;
		}		
	});
})