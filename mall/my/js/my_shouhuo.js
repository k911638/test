;
$(function() {
	var prompt = $('.pop_window1');
	var $list = $('#list');
	var accessToken = $.cookie("accessToken");
	var accountId = $.cookie("accountId");
	var userId = $.cookie("userId");
	var geturl = 'http://192.168.0.100:8081/wherebuyAPI/';
	//请求地址参数
	$.ajax({
			url: geturl + 'user/address/getUserAddr.do',
			type: 'post',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify({
				"accessToken": accessToken,
				"userId": userId
			}),
		})
		.done(function({
			data,
			respCode
		}) {
			console.log(respCode);
			if (respCode != "S" || data.length == 0) {
				$list.empty();
				prompt.children().html("您暂无收货地址").end().show(function() {
					const this_ = $(this);
					setTimeout(function() {
						this_.hide();
					}, 1000);
				});
				return;
			}
			console.log(data);
			// $list.empty();

			// for (var i = 0; i < data.length; i++) {
			// 	var $li = $(` <div class="delivery_add">
			//             <div class="delivery_name"><span>${data[i].receiverName}</span>${data[i].mobile}</div>
			//             <div class="delivery_address">${data[i].addressTwo}</div>
			//             <div class="delivery_state"><input type="radio" name="default" id="default${i}" ><label for="default${i}">设为默认</label><button>删除</button><em style="display:none">${data[i].receiveAddressId}</em></div>
			//         	</div>`);
			// 	$li.appendTo($list);
			// }
			//再次请求拿默认地址
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
					console.log(obj);
					if (obj.respCode != "S") {
						console.log("默认地址返回参数出错");
						return;
					}
					$list.empty();

					for (var i = 0; i < data.length; i++) {
						if (obj.data.receiveAddressId == data[i].receiveAddressId) {
							var $li = $(` <div class="delivery_add">
		            <div class="delivery_name"><span>${data[i].receiverName}</span>${data[i].mobile}</div>
		            <div class="delivery_address">${data[i].addressTwo}</div>
		            <div class="delivery_state"><input type="radio" name="default" id="default${i}" checked="checked"><label for="default${i}">设为默认</label><button>删除</button><em style="display:none">${data[i].receiveAddressId}</em></div>
		        	</div>`);
							$li.prependTo($list); //放到子节点前面
						} else {
							var $li = $(` <div class="delivery_add">
		            <div class="delivery_name"><span>${data[i].receiverName}</span>${data[i].mobile}</div>
		            <div class="delivery_address">${data[i].addressTwo}</div>
		            <div class="delivery_state"><input type="radio" name="default" id="default${i}" ><label for="default${i}">设为默认</label><button>删除</button><em style="display:none">${data[i].receiveAddressId}</em></div>
		        	</div>`);
							$li.appendTo($list);
						}
					}
				})
				.fail(function() {
					prompt.children().html("网络出错").end().show(function() {
						const this_ = $(this);
						setTimeout(function() {
							this_.hide();
						}, 900);
					});
				});


		})
		.fail(function() {
			prompt.children().html("请求地址出错").end().show(function() {
				const this_ = $(this);
				setTimeout(function() {
					this_.hide();
				}, 900);
			});
		});

	//设为默认
	$list.delegate('input', 'click', function() {
		var id = $(this).next().next().next().text();

		$.ajax({
				url: geturl + 'user/address/accGoodsAddrDef.do',
				type: 'post',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify({
					"accessToken": accessToken,
					"receiveAddressId": id,
					"userId": userId
				}),
			})
			.done(function({
				respCode
			}) {
				if (respCode == "S") {
					prompt.children().html("修改成功").end().show(function() {
						const this_ = $(this);
						setTimeout(function() {
							this_.hide();
						}, 600);
					});
				}
			})
			.fail(function() {
				console.log("error");
			});

	});

	//删除地址
	$list.delegate('button', 'click', function() {
		var id = $(this).next().text();
		const this_ = $(this);
		$.ajax({
				url: geturl + 'user/address/deleteGoodsAddrDef.do',
				type: 'post',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify({
					"accessToken": accessToken,
					"receiveAddressId": id,
					"userId": userId
				}),
			})
			.done(function({
				respCode
			}) {
				if (respCode == "S") {
					this_.parent().parent().remove();
				} else {
					prompt.children().html("删除失败").end().show(function() {
						const this_ = $(this);
						setTimeout(function() {
							this_.hide();
						}, 600);
					});
				}

			})
			.fail(function() {
				prompt.children().html("网络出错").end().show(function() {
					const this_ = $(this);
					setTimeout(function() {
						this_.hide();
					}, 800);
				});
			});

	});


	//新增地址
	$(".new_add").click(function() {
		if ($list.children().length > 2) {
			prompt.children().html("收货地址不能超过3个").end().show(function() {
				const this_ = $(this);
				setTimeout(function() {
					this_.hide();
				}, 800);
			});
		} else {
			window.location.href = "my_addshouhuo.html";
		}
	});


	//返回
	$(".member_fanhui").click(function() {
		if (document.referrer.indexOf("order") != -1) {
			window.location.href = document.referrer;
		} else {
			window.location.href = "../my/my.html";
		}
	});
});