;
$(function() {
	var gourl = "../register/register0.html";
	var geturl = 'http://192.168.0.100:8081/wherebuyAPI/';
	var $pop10 = $('.pop_window10'); //提示框
	//检测
	var $pop_window = $(".pop_window");
	var accessToken = $.cookie("accessToken");
	var accountId = $.cookie("accountId");
	var userId = $.cookie("userId");
	var receiveAddressId;
	if (accessToken) {

		gourl = "../my/my_addshouhuo.html";
		//请求地址数据
		if (accessToken || accessToken) {
			$.ajax({
					url: geturl + 'user/address/getDefaultReceiveAddress.do',
					type: 'post',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					data: JSON.stringify({
						"accessToken": accessToken,
						"userId": userId
					}),
				})
				.done(function(obj) {
					if (obj.respCode == "S") {
						receiveAddressId = obj.data.receiveAddressId;
						//$pop_window.hide();
						get_goods(accessToken, userId, receiveAddressId); //拿购物车数据
					} else {
						$pop_window.children().children().eq(1).text("请填写收货地址").next().val("去填写").end().end().end().end().show(); //占领屏幕
						setTimeout(function() {
							window.location.href = "../my/my_addshouhuo.html";
						}, 4500);
					}
				})
				.fail(function() {
					pop_win10("网络掉线了");
				});
		}
	}


	//编辑
	var $list = $("#list");
	$("#bianji").click(function() {
		$(this).hide().next().show();
		$list.animate({
			left: "-2.9rem"
		});
	});
	$("#quxiao").click(function() {
		$(this).hide().prev().show();
		$list.animate({
			left: "0"
		});
	});

	//点击checkbox,单选
	var $zongjia = $("#total span");
	$list.delegate('.Checkbox', 'change', function() {
		var is = $(this).is(":checked");
		if (is) {
			var selectStatus = "SELECTED";
			const id = $(this).parent().nextAll(".textcon").children().eq(3).text();
			var shu = parseInt($(this).parent().nextAll(".textcon").children().find("#shu").text()); //拿数量
			var price = parseFloat($(this).parent().nextAll(".textcon").children().find("#price").text()) * shu; //单价乘以数量
			var allprice = (parseFloat($zongjia.text()) * 100 + price * 100) / 100;
			allprice = allprice.toFixed(2); //四舍五入排除
			//排除负数
			if (allprice > 0 || allprice == 0) {
				$zongjia.text(allprice);
				qingqiu(shu, id, accessToken, selectStatus);
			} else {
				selectStatus = "NOT_SELECT";
				$zongjia.text(0);
				quanxuan(accessToken, userId, receiveAddressId, selectStatus);
			}
		} else {
			var selectStatus = "NOT_SELECT";
			const id = $(this).parent().nextAll(".textcon").children().eq(3).text();
			var shu = parseInt($(this).parent().nextAll(".textcon").children().find("#shu").text());
			var price = parseFloat($(this).parent().nextAll(".textcon").children().find("#price").text()) * shu;
			var allprice = (parseFloat($zongjia.text()) * 100 - price * 100) / 100;
			allprice = allprice.toFixed(2);
			if (allprice > 0 || allprice == 0) {
				$zongjia.text(allprice);
				qingqiu(shu, id, accessToken, selectStatus);
			} else {
				selectStatus = "NOT_SELECT";
				$zongjia.text(0);
				quanxuan(accessToken, userId, receiveAddressId, selectStatus);
			}
		}
	});


	//编辑删除
	$list.delegate('span', 'click', function() {
		const shoppingCarId = $(this).prev().children().eq(3).text();
		$(this).parent().parent().remove();
		del_goods(shoppingCarId, accessToken);
	});
	//删除单个商品
	function del_goods(shoppingCarId, accessToken) {
		$.ajax({
				url: geturl + 'goods/shopCar/deleteShopcar.do',
				type: 'post',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify({
					"shoppingCarId": shoppingCarId,
					"accessToken": accessToken
				})
			})
			.done(function(data) {
				console.log(data);
			})
			.fail(function() {
				pop_win10("系统繁忙");
			});
	}


	//点击商品数量
	$list.delegate('#img2,#img3', 'click', function() {
		var ix = $(this).index();
		var is = $(this).parent().parent().prevAll('.checkcon').children().is(":checked");
		var id = $(this).parent().next().text();
		var chaoshi = $(this).parent().prev().children().eq(1).text();
		if (is) {
			//选中状态计算价格
			var selectStatus = "SELECTED";
			if (ix == 0) {
				var shu = parseInt($(this).next().text()) - 1;
				var price = parseFloat($(this).parent().prev().children().text());
				var all = parseFloat($zongjia.text());
				var allprice = (all - price).toFixed(2);
				$zongjia.text(allprice);
				//排除负数
				if (shu == 0 || shu < 0) {
					shu = 0;
					$(this).parent().parent().parent().parent().remove();
					del_goods(id, accessToken);
				} else {
					$(this).next().text(shu);
					qingqiu(shu, id, accessToken, selectStatus);
				}

			} else {
				var shu = parseInt($(this).prev().text()) + 1;
				var price = parseFloat($(this).parent().prev().children().text());
				var all = parseFloat($zongjia.text());
				var allprice = (all + price).toFixed(2);
				$zongjia.text(allprice);

				var shu = parseInt($(this).prev().text()) + 1;

				$(this).prev().text(shu);
				qingqiu(shu, id, accessToken, selectStatus);

			}
		} else {
			//非选中状态不计算价格，只做数量
			var selectStatus = "NOT_SELECT";
			if (ix == 0) {
				var shu = parseInt($(this).next().text()) - 1;
				//排除负数
				if (shu == 0 || shu < 0) {
					shu = 0;
					$(this).parent().parent().parent().parent().remove();
					del_goods(id, accessToken);
				} else {
					$(this).next().text(shu);
					qingqiu(shu, id, accessToken, selectStatus);
				}

			} else {
				var shu = parseInt($(this).prev().text()) + 1;

				$(this).prev().text(shu);
				qingqiu(shu, id, accessToken, selectStatus);
			}
		}
	});

	//全选
	$("#quanxuan").change(function() {
		var is = $(this).is(":checked");
		if (is) {
			//全选 
			$zongjia.text(0);
			var selectStatus = "SELECTED";
			quanxuan(accessToken, userId, receiveAddressId, selectStatus);
			$(":checkbox[class=Checkbox]").prop("checked", true).each(function() {
				var shu = parseInt($(this).parent().nextAll(".textcon").children().find("#shu").text()); //数量
				var price = parseFloat($(this).parent().nextAll(".textcon").children().find("#price").text()) * shu; //单价乘以数量
				var allprice = (parseFloat($zongjia.text()) * 100 + price * 100) / 100;
				allprice = allprice.toFixed(2); //四舍五入排除
				//排除负数
				if (allprice > 0 || allprice == 0) {
					$zongjia.text(allprice);
				} else {
					$zongjia.text(0);
				}
			});
		} else {
			//取消全选
			var selectStatus = "NOT_SELECT";
			quanxuan(accessToken, userId, receiveAddressId, selectStatus);
			$(":checkbox[class=Checkbox]").prop("checked", false);
			$zongjia.text(0);
		}
	});
	//全选请求
	function quanxuan(accessToken, userId, receiveAddressId, selectStatus) {
		$.ajax({
				url: geturl + 'goods/shopcar/shopcarSelectAll.do',
				type: 'post',
				dataType: 'josn',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify({
					"accessToken": accessToken,
					"userId": userId,
					"receiveAddressId": receiveAddressId,
					"selectStatus": selectStatus
				}),
			})
			.done(function() {
				console.log("success");
			})
			.fail(function() {
				pop_win10("系统繁忙");
			});

	}

	//修改数量请求
	function qingqiu(shu, id, accessToken, selectStatus) {
		$.ajax({
				url: geturl + 'goods/shopCar/updateGoodsNum.do',
				type: 'post',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify({
					"quantity": shu,
					"shoppingCarId": id,
					"accessToken": accessToken,
					"selectStatus": selectStatus
				})
			})
			.done(function(data) {
				console.log(data.data);
			})
			.fail(function() {
				pop_win10("系统繁忙");
			});
	}
	//请求商品数据
	function get_goods(accessToken, userId, receiveAddressId) {
		$.ajax({
				url: geturl + 'goods/shopCar/listAdd.do',
				type: 'post',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify({
					"accessToken": accessToken,
					"userId": userId,
					"receiveAddressId": receiveAddressId
				}),
			})
			.done(function({
				data,
				respCode
			}) {
				if (respCode != "S") {
					$list.empty();
					return;
				}
				$list.empty();
				for (var i = 0; i < data.ShoppingCars.length; i++) {
					var $li = $(`<li>
							<div class="text0" id="text0">
								<div class="checkcon">
							       <input type="checkbox"class="Checkbox" id="check1" name='checkbox' ${data.ShoppingCars[i].selectStatus=="SELECTED"?"checked":""} /}>
								</div>
								<img src="${data.ShoppingCars[i].goodsSkuImage}" alt="商品" class="img1"/>
								<div class="textcon">
									<h3>${data.ShoppingCars[i].goodsBrand} &nbsp${data.ShoppingCars[i].goodsName} </h3>
									<p>最低价：&nbsp<em id="price">${data.ShoppingCars[i].minPrice}</em>元&nbsp <em id="chaoshi">${data.ShoppingCars[i].minSupermarketName}</em></p>
									<div class="shuliang">
										<img src="../image/jian.png" alt="" id="img2">
										<em id="shu">${data.ShoppingCars[i].quantity}</em>
										<img src="../image/jia.png" alt="" id="img3">
									</div>
									<em class="shanpinid">${data.ShoppingCars[i].shoppingCarId}</em>
								</div>
								<span>删除</span>
							</div>
						</li>`);
					$li.appendTo($list);
				}
				$(':checkbox:checked').each(function() {
					var shu = parseInt($(this).parent().nextAll(".textcon").children().find("#shu").text()); //数量
					var price = parseFloat($(this).parent().nextAll(".textcon").children().find("#price").text()) * shu; //单价乘以数量
					var allprice = (parseFloat($zongjia.text()) * 100 + price * 100) / 100;
					allprice = allprice.toFixed(2); //四舍五入排除
					//排除负数
					if (allprice > 0 || allprice == 0) {
						$zongjia.text(allprice);
					} else {
						$zongjia.text(0);
					}
				});
			})
			.fail(function() {
				pop_win10("系统繁忙");
			});
	}

	//点击结算
	$(".quan-r button").click(function() {
		window.location.href = "./order.html";
	});

	var $pop_window = $(".pop_window");
	$(".footer").delegate('ul', 'click', function() {
		var ix = $(this).index();
		switch (ix) {
			case 0:
				window.location.href = "../index.html";
				break;
			case 1:
				window.location.href = "../msg/msg.html";
				break;
			case 2:
				window.location.href = "../search/search.html";
				break;
			case 3:
				return;
				break;
			case 4:
				window.location.href = "../my/my.html";
		}

	});

	//弹框确认
	$(".pop_window input").click(function() {
		$pop_window.hide();
		window.location.href = gourl;
	});
	$(".pop_window img").click(function() {
		window.location.href = gourl;
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

});