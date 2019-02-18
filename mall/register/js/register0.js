$(function() {

	// 登录验证

	var error_pwd = true;
	var geturl = 'http://192.168.0.100:8081/wherebuyAPI/';;
	var error_phone = true;


	var $pwd = $('#pwd'); //check密码
	$pwd.focus(function() {
		$(this).next().css({
			visibility: 'hidden'
		});
	});
	$pwd.blur(function() {
		check_pwd();
	});

	function check_pwd() {
		var val = $pwd.val();
		var re = /^[a-zA-Z0-9_@\$\*\.]{6,16}$/;
		if (re.test(val)) {
			error_pwd = false;
		} else {
			$pwd.next().html('密码为6-16为数字或字母或特殊字符').css({
				visibility: 'visible'
			});
			error_pwd = true;
		}
	}

	var $phone = $('#phone'); //check phone
	$phone.focus(function() {
		$(this).next().css({
			visibility: 'hidden'
		});
	});
	$phone.blur(function() {
		check_phone();
	});

	function check_phone() {
		// var val = $phone.val();
		// var re = /^1[3-9][0-9]\d{8}$/;
		// if (re.test(val)) {
		// 	$.ajax({
		// 			url: 'http://127.0.0.1:3000/zhuce',
		// 			type: 'post',
		// 			dataType: 'json',
		// 			data: {
		// 				mobiles: val
		// 			}
		// 		})
		// 		.done(function(data) {
		// 			if (data.user == false) {

		error_phone = false;
		// 			} else {
		// 				$phone.next().html('用户名不存在，请先注册！').css({
		// 					visibility: 'visible',
		// 					color: 'red'
		// 				});
		// 				error_phone = true;
		// 			}
		// 		})

		// 		.fail(function() {
		// 			$phone.next().html('验证失败!').css({
		// 				visibility: 'visible',
		// 				color: 'red'
		// 			});

		// 			error_phone = true;
		// 		});
		// } else {
		// 	$phone.next().html('请输入正确手机').css({
		// 		visibility: 'visible',
		// 		color: 'red'
		// 	});
		// 	error_phone = true;
		// }
	}
	// 提交
	$('.reg_sub input').click(function() {
		if (error_pwd == false && error_phone == false) {
			var pwds = $pwd.val();
			var user = $phone.val();
			$.ajax({
					url: geturl + 'account/account/login.do',
					type: 'post',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					data: JSON.stringify({
						"mobile": user,
						"password": pwds
					}),
				})
				.done(function(data) {
					console.log(data);
					if (data.respCode == "S") {

						window.location.href = data.data;

					} else {
						$pwd.next().html('账号/密码错误！').css({
							visibility: 'visible'
						});

					}

				})
				.fail(function() {
					$phone.next().html('用户名不存在，请先注册').css({
						visibility: 'visible'
					});
				});
		} else {
			return false;
		}

	});


	//微信登录
	// $(".wx img").click(function() {

	// 	//发送ajax获取微信授权页面地址,并载入
	// 	var papam = "{}";
	// 	new ajax({
	// 		url: "user/weixin/getAuthUrl.do",
	// 		type: "POST",
	// 		contentType: 'application/json;charset=utf-8',
	// 		data: papam,
	// 		dataType: 'json',
	// 		//async: false,
	// 		success: function(data) {
	// 			console.log(data);
	// 			window.location.href = data.data;
	// 		}
	// 	});

	// });
	//微信登录
	$(".wx img").click(function() {

		//发送ajax获取微信授权页面地址,并载入
		var papam = "{}";
		$.ajax({
			url: "http://www.laykj.cn/qnm2/user/weixin/getAuthUrl.do",
			type: "POST",
			contentType: 'application/json;charset=utf-8',
			data: papam,
			dataType: 'json',
			//async: false,
			success: function(data) {
				console.log(data);
				window.location.href = data.data;
			}
		});

	});

	//返回
	$(".fanhui").click(function() {
		window.location.href = "../";
	});

	//返回
	$(".fanhui").click(function() {
		window.location.href = "../";
	});



})