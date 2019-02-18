;
$(function() {
	var error_phone = true;
	var $pop_window = $(".pop_window");
	var is_go = false;
	var accessToken = $.cookie('accessToken');
	var userId = $.cookie("userId");
	var geturl = 'http://192.168.0.100:8081/wherebuyAPI/';
	var addressOne;
	//确认增加
	$(".ok").click(function() {
		var user_name = $("#user_name").val();
		var sex = $("input[name='sex']:checked").index(); //1是男，3是女
		sex == 1 ? sex = 1 : sex = 0; //改为男是1，女是0
		var phone = $("#phone").val();
		var menpai = $("#menpai").val();

		var re = /^1[3-9][0-9]\d{8}$/;
		if (re.test(phone) && user_name != "" && addressOne && menpai != "") {
			$.ajax({
					url: geturl + 'user/address/addReceiveAddress.do',
					type: 'post',
					dataType: 'json',
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify({
						"accessToken": accessToken,
						"userId": userId,
						"receiverName": user_name,
						"addressOne": addressOne,
						"addressTwo": menpai,
						"sex": sex,
						"mobile": phone
					})
				})
				.done(function(data) {
					if (data.respCode == "S") {
						is_go = true;
						$pop_window.children().children().eq(1).text("增加成功").css({
							color: "green"
						});
						$pop_window.show();
					} else {
						is_go = false;
						$pop_window.children().children().eq(1).text("增加失败").css({
							color: "red"
						});
						$pop_window.show();
					}
				})
				.fail(function() {
					console.log("error");
				});

		} else {
			console.log("错误");
		}
	});

	//收货地址弹框
	const sheng = $('.address_xuan').children().eq(0);
	const address_view = $(".address_view");
	const address_con = $(".address_con");

	//拿省
	$("#trigger4").click(function() {
		address_con.show().children().animate({
			top: 0
		});
		$.ajax({
				url: geturl + 'area/area/getArea.do',
				type: 'post',
				contentType: 'application/json;charset=utf-8',
				dataType: 'json',
				data: JSON.stringify({
					parent: '1000',
					accessToken: accessToken
				}),
			})
			.done(function(data) {
				console.log(data);
				if (data.respCode != "S") {
					var lis = $(`<p>${"请重新登录"}<em></em></p>`);
					lis.appendTo(sheng);
					return;
				}
				sheng.empty()
				for (let i = 0; i < data.data.length; i++) {
					var li = $(`<p>${data.data[i].name}<em>${data.data[i].code}</em></p>`);
					li.appendTo(sheng);
				}
			})
			.fail(function() {
				console.log("error");
			});
	});


	//关闭
	$(".address_con img").click(function() {
		var this_ = $(this).parent().parent();
		this_.children().animate({
				top: "33.35rem"
			},
			function() {
				this_.hide().children().eq(1).children().empty().hide().eq(0).show().end().end().end().eq(0).children().text("");
			});
	});
	//拿市，区，街，小区
	$(".address_xuan").delegate('p', 'click', function() {
		var this_ = $(this);
		var parent = this_.children().text();
		var ix = parseInt(this_.parent().index());
		//contents() 查找匹配元素内部所有的子节点（包括文本节点)过滤掉子节点
		var contstr = this_.contents().filter(function(index, content) {
			return content.nodeType === 3;
		}).text();
		address_view.children().eq(ix).text(contstr).nextAll().text("");
		if (ix < 3) {
			this_.parent().nextAll().empty();
			$.ajax({
					url: geturl + 'area/area/getArea.do',
					type: 'post',
					contentType: 'application/json;charset=utf-8',
					dataType: 'json',
					data: JSON.stringify({
						parent: parent,
						accessToken: accessToken
					}),
				})
				.done(function(data) {
					console.log(data);
					if (data.respCode != "S") {
						return;
					}
					this_.parent().next().show().siblings().hide();
					for (let i = 0; i < data.data.length; i++) {
						var li = $(`<p>${data.data[i].name}<em>${data.data[i].code}</em></p>`);
						li.appendTo(this_.parent().next());
					}
				})
				.fail(function() {
					console.log("error");
				});
		} else if (ix == 4) {
			address_con.children().animate({
					top: "33.35rem"
				},
				function() {
					address_con.hide().children().eq(1).children().empty().hide().eq(0).show().end().end().end().eq(0).children().text("");
				});
			addressOne = parent;
			console.log(addressOne);
			var resss = address_view.children().eq(2).text() + address_view.children().eq(3).text() + address_view.children().eq(4).text();
			$("#trigger4").val(resss);
		} else if (ix == 3) {
			this_.parent().nextAll().empty();
			$.ajax({
					url: geturl + 'area/SmallCommunity/getSmallCommunity.do',
					type: 'post',
					contentType: 'application/json;charset=utf-8',
					dataType: 'json',
					data: JSON.stringify({
						areaCode: parent,
						accessToken: accessToken
					}),
				})
				.done(function(data) {
					console.log(data);
					if (data.respCode != "S") {
						return;
					}
					for (let i = 0; i < data.data.length; i++) {
						var li = $(`<p>${data.data[i].name}<em>${data.data[i].smallCommunityId}</em></p>`);
						li.appendTo(this_.parent().next());
					}
					this_.parent().next().show().siblings().hide();
				})
				.fail(function() {
					console.log("error");
				});
		}

	});
	//弹框确认
	$(".pop_window input").click(function() {
		console.log("asas")
		if (is_go) {
			window.location.href = document.referrer;
		} else {
			$pop_window.hide();
		}
	});
	// $(".pop_window img").click(function() {
	// 	$pop_window.hide();
	// });


	//返回
	$(".member_fanhui").click(function() {
		window.location.href = document.referrer;
	});
});