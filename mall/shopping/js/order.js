	$(document).ready(function() {
		var geturl = 'http://192.168.0.100:8081/wherebuyAPI/';
		var go_order = "../order/member_order.html";
		//服务费的显示与隐藏	
		$(".fuwu").click(function() {
			$(".zezhao").show();

		});

		$(".ding").click(function() {
			$(".zezhao").hide();
		});
		//支付方式的显示与隐藏			
		$(".pay").click(function() {
			$(".zezhao-1").show();
		});

		$(".ding-1").click(function() {
			$(".zezhao-1").hide();
		});

		//送达时间的显示与隐藏			
		$(".btom").click(function() {
			$(".zezhao-2").show();
		});

		$(".ding-2").click(function() {
			$(".zezhao-2").hide();
		});

		//请求地址
		var $shouhuo = $(".dizhzi-right");

		var accessToken = $.cookie("accessToken");
		var accountId = $.cookie("accountId");
		var userId = $.cookie("userId");
		var receiveAddressId;
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
					$shouhuo.empty();
					receiveAddressId = obj.data.receiveAddressId;
					var $lis = $(`<h2>
							收货人:<em id="canshu0">${obj.data.receiverName}</em>
							<span id="canshu">${obj.data.mobile}</span>
						</h2>
						<p>收货地址：<em id="canshu1">${obj.data.addressTwo}</em></p>`);
					$lis.appendTo($shouhuo);
				} else {

				}

			})
			.fail(function() {
				console.log("error");
			});

		$shouhuo.click(function() {
			window.location.href = "../my/my_shouhuo.html";
		});

		//请求选中商品
		var $list = $(".shop_content");
		$.ajax({
				url: geturl + 'goods/shopCar/toOrder.do',
				type: 'POST',
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
				console.log(data);
				if (respCode != "S") {
					return;
				}
				$list.empty();
				for (let i = 0; i < data.shopCars.length; i++) {
					var $li = $(`<div>
							<div class="shop_photo">
								<img src="${data.shopCars[i].goodsSkuImage}"/>
							</div>
							<div class="shop_info">
								<h3>${data.shopCars[i].goodsBrand} ,${data.shopCars[i].goodsName}</h3>
								<p>最低价：<em>${data.shopCars[i].minPrice}</em>元   ${data.shopCars[i].minSupermarketName}</p>
								<p>最高价：<em>${data.shopCars[i].maxPrice}</em>元   ${data.shopCars[i].maxSupermarketName}</p>
								<span style="display:none" class="canshu2">${data.shopCars[i].shoppingCarId}</span>
								<div>
									<div class="shop_price">
										<em>差价率：${data.shopCars[i].spreadRate}%</em>
										
									</div>
									<div class="count">
										<p class="ss">数量：  X<em>${data.shopCars[i].quantity}</em></p>
										<p class="xx">合计：￥<em>${data.shopCars[i].heJiPrice}</em></p>
									</div>
								</div>
							</div>
						</div>`);
					$li.appendTo($list);
				}
				//计算价格
				var allzuigao = 0;
				var allzuidi = 0;
				var allshuliang = 0;
				$(".shop_info").each(function() {
					var zuidijia = parseFloat($(this).children().eq(1).children().text());
					var zuigaojia = parseFloat($(this).children().eq(2).children().text());
					var shuliang = parseFloat($(this).children().eq(4).children().eq(1).children().eq(0).children().text());
					var heji0 = (zuidijia * shuliang).toFixed(2);
					var heji1 = (zuigaojia * shuliang).toFixed(2);
					$(this).children().eq(4).children().eq(1).children().eq(1).children().text(heji0);
					var chajialv = (((zuigaojia - zuidijia) / zuidijia) * 100).toFixed(2);
					$(this).children().eq(4).children().eq(0).children().text("差价率：" + chajialv + "%");

					allzuidi = parseFloat(allzuidi) + parseFloat(heji0);
					allzuigao = parseFloat(allzuigao) + parseFloat(heji1);
					allshuliang = parseInt(allshuliang) + parseInt(shuliang);
					$("#canshu5").text((allzuigao - allzuidi).toFixed(2));
					fuwufei0 = parseFloat(data.serviceFee);
					fujiafei0 = parseFloat(data.additionalFees);
					$("#canshu6").text(fuwufei0); //服务费
					$("#canshu7").text(fujiafei0); //附加费
					$("#canshu8").text(getdate(data.deliveryTime));
					$(".footer #canshu10").text((allzuidi + fuwufei0 + fujiafei0).toFixed(2));
					$(".footer #canshu9").text(allshuliang);
				});

			})
			.fail(function() {
				console.log("error");
			});
		var fuwufei0;
		var fujiafei0;
		//时间转换
		function getdate(date) {
			var now = date ? new Date(date) : new Date(),
				y = now.getFullYear(),
				m = now.getMonth() + 1,
				d = now.getDate();
			return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
		}
		//制保留2位小数，如：2，会在2后面补上00.即2.00 
		function toDecimal2(x) {
			var f = parseFloat(x);
			if (isNaN(f)) {
				return false;
			}
			var f = Math.round(x * 100) / 100;
			var s = f.toString();
			var rs = s.indexOf('.');
			if (rs < 0) {
				rs = s.length;
				s += '.';
			}
			while (s.length <= rs + 2) {
				s += '0';
			}
			return s;
		}

		//提交订单
		var $zezhao_3 = $(".zezhao-3");
		$(".payg").click(function() {

			var sheng = $("#canshu5").text();
			var fuwufei = toDecimal2(fuwufei0);
			var fujiafei = toDecimal2(fujiafei0);
			console.log(fuwufei, fujiafei);
			//var daodatime = $("#canshu8").text();
			var liuyan = $("#ress").val();

			var allprice = $("#canshu10").text();


			var pay = $("input[name='checks']:checked").prev().text(); //获取支付方式
			switch (pay) {
				case "微信支付":
					pay = "WECHAT_PAY";
					break;
				case "支付宝支付":
					pay = "ALIPAY";
					break;
				case "银联支付":
					pay = "UNION_PAY";
					break;
				case "现金支付":
					pay = "CASH_PAY";
			}

			console.log(pay);
			$.ajax({
					url: geturl + 'goods/order/addOrder.do',
					type: 'post',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					data: JSON.stringify({
						"accessToken": accessToken,
						"userId": userId,
						"receiveAddressId": receiveAddressId,
						"saveAmount": sheng,
						"serviceFee": fuwufei,
						"extraFee": fujiafei,
						"remark": liuyan,
						"amount": allprice,
						"pay": pay
					}),
				})
				.done(function(data) {
					if (data.respCode != "S") {
						go_order = "";
						$zezhao_3.children().children().eq(1).html("抱歉，下单失败！").end().end().end().show();
						return;
					}
					go_order = "../order/member_order.html";
					$zezhao_3.children().children().eq(1).html("恭喜，下单成功！您可以通过全部订单查看您的订单详情").end().end().end().show();
					console.log(data);
				})
				.fail(function() {
					go_order = "";
					$zezhao_3.children().children().eq(1).html("抱歉，网络掉线，下单失败！").end().end().end().show();
					console.log("error");
				});

		});
		//确定
		$(".ding-3").click(function() {
			$zezhao_3.hide();
			window.location.href = go_order;
		});

		//支付方式
		$("#biaoge").delegate('input', 'click', function() {
			$(".pay em").html($(this).prev().text());
		});


		//返回
		$(".fanhui").click(function() {
			window.location.href = "../shopping/shopping.html";
		});



	});