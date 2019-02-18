;
$(function() {
	var $pop10 = $('.pop_window10'); //提示框
	var pages = 1;
	const fenye = 10; //分页数
	const $list = $("#list");
	var val = "";
	const $pop_window = $(".pop_window");
	const $pop_window0 = $(".pop_window0");
	var accessToken = $.cookie("accessToken");
	var accountId = $.cookie("accountId");
	var userId = $.cookie("userId");
	var receiveAddressId;
	var geturl = 'http://192.168.0.100:8081/wherebuyAPI/';
	//请求地址数据
	if (!accessToken || !accessToken) {
		$.ajax({
				url: gerurl + 'user/address/accGoodsAddrDef.do',
				type: 'post',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify({
					"accessToken": accessToken,
					"userId": userId
				}),
			})
			.done(function(obj) {
				if (obj.state == "S") {
					receiveAddressId = obj.data[0].receiveAddressId;
				} else {
					pop_win10("您还没有收货地址");
					setTimeout(function() {
						window.location.href = "../my/my_addshouhuo.html";
					}, 1500);
				}
			})
			.fail(function() {
				pop_win10("网络出错");
			});
	}

	// 点击搜索
	$(".search_btn").click(function() {
		val = $('.search_con input').val();
		pages = 1;
		if (val == "") {
			return;
		}
		qingqiu(pages);
	});

	//搜索历史清空
	$(".history_1 img").click(function() {
		$(".history_2").empty();
	});

	//查看其它超市价格
	$list.delegate('button', 'click', function() {
		var id = $(this).next().text();
		$.ajax({
				url: geturl + 'goods/goods/getGoodsPrices.do',
				type: 'post',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify({
					goodsSkuId: id,
					accessToken: accessToken
				})
			})
			.done(function({
				data,
				respCode
			}) {
				if (!respCode) {
					pop_win10("系统繁忙");
					return;
				}
				var moren = "暂无信息";
				$pop_window0.empty();
				var $lis = $(`<div>
					<h3>其它超市价格</h3>
					<h5>${data.brandName} &nbsp ${data.name}&nbsp</h5>
					<p><span>${data.supermarketGoodsList[0]?data.supermarketGoodsList[0].supermarketName : moren}：</span><span>${data.supermarketGoodsList[0]?parseFloat(data.supermarketGoodsList[0].price)/100 : ""}元</span></p>
					<p><span>${data.supermarketGoodsList[1]?data.supermarketGoodsList[1].supermarketName : moren}：</span><span>${data.supermarketGoodsList[1]?parseFloat(data.supermarketGoodsList[1].price)/100 : ""}元</span></p>
					<p><span>${data.supermarketGoodsList[2]?data.supermarketGoodsList[2].supermarketName : moren}：</span><span>${data.supermarketGoodsList[2]?parseFloat(data.supermarketGoodsList[2].price)/100 : ""}元</span></p>
					<p><span>${data.supermarketGoodsList[3]?data.supermarketGoodsList[3].supermarketName : moren}：</span><span>${data.supermarketGoodsList[3]?parseFloat(data.supermarketGoodsList[3].price)/100 : ""}元</span></p>
					<p><span>${data.supermarketGoodsList[4]?data.supermarketGoodsList[4].supermarketName : moren}：</span><span>${data.supermarketGoodsList[4]?parseFloat(data.supermarketGoodsList[4].price)/100 : ""}元</span></p>
					<p class="chajialv">差价率：${data.spreadRateString}</p>
				</div>
				<input type="button" name="" value="确定">`);
				$lis.appendTo($pop_window0);
				$pop_window0.parent().show();
			})
			.fail(function() {
				pop_win10("网络掉线了");
			});
	});
	//弹框确认
	$pop_window0.delegate("input", "click", function() {
		$pop_window0.parent().hide();
	});

	//加入购物车
	var shangpinID = null;
	var num = 1;
	var $pop1_con = $(".pop1_con");
	$list.delegate('span', 'click', function() {
		num = 1;
		$(".shuliang p").text(num);
		shangpinID = $(this).prev().text();
		$pop1_con.show();
	});


	//取消/确认购买
	$("#pop_window1_btn input").click(function() {
		if ($(this).index() == 0) {
			shangpinID = null;
			$pop1_con.hide();
		} else {
			var id = shangpinID;
			$.ajax({
					url: geturl + 'goods/shopCar/addShopCar.do',
					type: 'post',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					data: JSON.stringify({
						"goodsSkuId": id,
						"quantity": num,
						"accessToken": accessToken,
						"userId": userId,
						"receiveAddressId": receiveAddressId
					})
				})
				.done(function({
					respCode
				}) {
					if (respCode != "S") {
						pop_win10("购买失败,请重新登录");
						return;
					}
					$pop1_con.hide();
					pop_win10("成功加入购物车");
				})
				.fail(function() {
					pop_win10("网络出错，购买失败");
				});


		}
	});
	//选择商品数量
	$(".shuliang img").click(function() {
		if ($(this).index() == 0) {
			num = parseInt($(this).next().text()) - 1;
			num = num > 0 ? num : 1;
			$(this).next().text(num);
		} else {
			num = parseInt($(this).prev().text()) + 1;
			num = num > 9999 ? 9999 : num;
			$(this).prev().text(num);
		}
	});


	//搜索请求
	function qingqiu(pages) {
		//隐藏历史
		if (pages == 1) {
			$list.empty();
			$('.history').hide().next().show();
		}
		//请求数据
		pop_win10("正在加载...");
		$.ajax({
				url: geturl + 'goods/goods/getGoodsByName.do',
				type: 'post',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify({
					"name": val,
					"pages": pages,
					"accessToken": accessToken
				})
			})
			.done(function(data) {
				$list.show();
				console.log(data);

				if (data.respCode != "S") {
					pop_win10("系统繁忙");
					return;
				}
				$pop10.hide();
				for (var i = 0; i < data.data.length; i++) {
					var $li = $(`<li>
				<div>
					<img src="${data.data[i].image}">
				</div>
				<div> 
					<h3>${data.data[i].name}</h3>
					<p class="zuidi">最低价<em>${data.data[i].minPriceString}</em>元 &nbsp<em>${data.data[i].minSupermarketName}</em></p>
					<button>查看其它超市价格</button>
					<h6 style="display:none">${data.data[i].goodsSkuId}</h6>
					<span>加入购物车</span>
				</div>
			</li>`);
					$li.appendTo($list);
				}
				pages < fenye ? chufa = true : chufa = false;
				//添加搜索历史
				if (val != '') {
					var lishi = $('<li>' + val + '</li>');
					lishi.appendTo(".history_2");
				}
			})
			.fail(function() {
				console.log("error");
			})
	}

	//返回
	$(".fanhui").click(function() {
		window.location.href = document.referrer;
	});
	//登录弹框
	$(".pop_window input").click(function() {
		$pop_window.hide();
		window.location.href = "../register/register0.html/";
	});
	$(".pop_window img").click(function() {
		$pop_window.hide();
	});

	//滚动到底
	var chufa = true;
	const $center = $(".center");
	var timer = null;
	$center.scroll(function() {
		clearTimeout(timer);
		timer = setTimeout(function() {
			const results = $center.scrollTop() + $center.height() - $list.height();
			//console.log(results);
			if (chufa && (results == 2 || results == 1 || results == 0 || results == 3 || results == -2)) {
				pages++;
				chufa = false;
				qingqiu(pages);
			} else if (pages >= fenye && (results == 2 || results == 1 || results == 0 || results == 3 || results == -2)) {
				pop_win10("木有了，别拉了");
			}
		}, 100);
	});


	//提示弹框
	function pop_win10(msg) {
		if (!msg) {
			msg = "暂无服务，敬请期待";
		}
		$pop10.children().text(msg).end().show(function() {
			const this_ = $(this);
			setTimeout(function() {
				this_.hide();
			}, 1000);
		});
	}
	$pop10.click(function() {
		$(this).hide();
	});

})