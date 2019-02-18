$(function() {
	var all_timer = null;
	var $pop10 = $('.pop_window10'); //提示框
	var geturl = 'http://192.168.0.100:8081/wherebuyAPI/';
	//获取验证码
	$("#yzm_btn").stop().click(function() {
		clearTimeout(all_timer); //函数截流
		all_timer = setTimeout(function() {
			if (error_phone == false) {
				getCode();
			}
		}, 200);
	});
	var xinxi = null;
	var wait = 120;

	function get_code_time() {
		if (wait == 0) { //出口
			xinxi = null;
			$("#yzm_btn").removeAttr("disabled"); //移除disabled属性
			$("#yzm_btn").val("获取验证码");
			wait = 120;
		} else {
			$("#yzm_btn").attr("disabled", true); //按钮不可触发
			$("#yzm_btn").val("剩(" + wait + ")秒");
			wait--;
			setTimeout(get_code_time, 1000); //入口
		}
	}

	function getCode() {
		var phone = $("#phone").val(); //输入框值
		var reg = /^1[3-9][0-9]\d{8}$/;
		if (!reg.test(phone)) { //校验手机号码格式
			$phone.next().html('请输入正确手机').css({
				visibility: 'visible',
				color: 'red'
			});
			return false;
		}
		//获取验证码
		$.ajax({
				url: geturl + 'account/account/getValidCode.do',
				type: 'post',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify({
					mobile: phone
				}),
			})
			.done(function(data) {
				if (data != null && typeof(data) != "undefined") {

					if (data.respCode === "S" && data.data === "发送成功") {
						xinxi = "ok";
						get_code_time(); //发送成功则出发get_code_time（）函数
						$useryzm.parent().next().html('获取成功，请输入手机验证码').css({
							visibility: 'visible',
							color: 'green'
						});
					} else {
						$useryzm.parent().next().html('短信验证码发送失败！手机可能已经注册。').css({
							visibility: 'visible',
							color: 'red'
						});
					}
				} else {
					$useryzm.parent().next().html('短信验证码发送失败！手机可能已经注册。').css({
						visibility: 'visible',
						color: 'red'
					});
				}
			})
			.fail(function() {
				console.log("error");
			});
	}



	// 登录验证
	var error_user = true;
	var error_pwd = true;
	var error_cpwd = true;
	var error_phone = true;
	var error_allow = false;
	var $useryzm = $('#user_yzm'); //check用户验证码
	$useryzm.focus(function() {
		$(this).parent().next().css({
			visibility: 'hidden'
		});
	});
	$useryzm.blur(function() {
		check_yzm();
	});

	function check_yzm() {
		var val = $useryzm.val();
		var re = /^\d+$/;
		if (re.test(val) && xinxi == "ok") {
			error_user = false;
		} else {
			$useryzm.parent().next().html('请先获取验证码').css({
				visibility: 'visible'
			});
			error_user = true;
		}
	}
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
	var $cpwd = $('#cpwd'); //重复密码
	$cpwd.focus(function() {
		$(this).next().css({
			visibility: 'hidden'
		});
	});
	$cpwd.blur(function() {
		check_cpwd();
	});

	function check_cpwd() {
		var pwdval = $pwd.val();
		var cpwdval = $cpwd.val();
		if (pwdval == cpwdval) {
			error_cpwd = false;
		} else {
			$cpwd.next().html('两次密码输入不一致').css({
				visibility: 'visible'
			});
			error_cpwd = true;
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
		// 			if (data.user == true) {
		// 				$phone.next().html('恭喜，可以注册！').css({
		// 					visibility: 'visible',
		// 					color: 'green'
		// 				});
		error_phone = false;
		// 			} else {
		// 				$phone.next().html('用户名已经存在！').css({
		// 					visibility: 'visible',
		// 					color: 'red'
		// 				});
		// 				error_phone = true;
		// 			}
		// 		})

		// 		.fail(function() {
		// 			$phone.next().html('验证失败，可能网络掉线了').css({
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

		// }
	}
	var $error_tip = $('.error_tip'); //check allow
	$('#allow').click(function() {
		if ($(this).prop('checked') == true) {
			error_allow = false;
			$error_tip.css({
				visibility: 'hidden'
			});
		} else {
			error_allow = true;
			$error_tip.html('请勾选同意协议').css({
				visibility: 'visible'
			});
		}
	});
	$('.reg_sub input').stop().click(function() { // 提交
		if (error_user == false && error_pwd == false && error_cpwd == false && error_phone == false && error_allow == false && xinxi != null) {
			var yzm = $useryzm.val();
			var pwd = $pwd.val();
			var mobiles = $phone.val();
			$.ajax({
					url: geturl + 'account/account/registOrchangePwd.do',
					type: 'post',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					data: JSON.stringify({
						mobile: mobiles,
						password: pwd,
						code: yzm
					})
				})
				.done(function(data) {
					console.log(data);
					if (data.respCode == "S") {
						$pop10.children().text("注册成功，即将跳转登录").end().show(function() {
							const this_ = $(this);
							setTimeout(function() {
								this_.hide();
								window.location.href = "./register0.html";
							}, 1000);
						});

					} else {
						pop_win10("注册失败");
					}
				})
				.fail(function() {
					pop_win10("请求失败，可能网络掉线了");
				});



		} else {
			return false;
		}

	});


	$('#allow').next().click(function() {
		pop_win10("最终解释权归邻阿姨科技有限公司所有。");
	});

	//返回
	$(".fanhui").click(function() {
		window.location.href = document.referrer;
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