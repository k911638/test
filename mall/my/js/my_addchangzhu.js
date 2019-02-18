;
$(function() {
	var error_phone = true;
	var $pop = $('.pop_window1');



	$(".ok").click(function() {
		var user_name = $("#user_name").val();
		var sex = $("input[name='sex']:checked").index(); //1是男，3是女
		sex == 1 ? sex = 1 : sex = 0; //改为男是1，女是0
		var phone = $("#phone").val();
		var ress = $("#trigger4").val();
		var menpai = $("#menpai").val();
		console.log(user_name, sex, phone, ress, menpai)

		var re = /^1[3-9][0-9]\d{8}$/;
		if (re.test(phone) && user_name != "" && ress != "" && menpai != "") {
			$.ajax({
					url: 'http://127.0.0.1:3000/json',
					type: 'GET',
					dataType: 'json',
					data: {
						"user_name": user_name,
						"sex": sex,
						"phone": phone,
						"ress": ress,
						"menpai": menpai
					},
				})
				.done(function(data) {
					if (data != "") {
						$pop.children().html("保存成功").end().show(function() {
							const this_ = $(this);
							setTimeout(function() {
								this_.hide();
								window.location.href = "../";
							}, 800);
						});
					} else {
						$pop.children().html("保存失败").end().show(function() {
							const this_ = $(this);
							setTimeout(function() {
								this_.hide();
							}, 800);
						});
					}
				})
				.fail(function() {
					console.log("error");
				});

		} else {
			$pop.children().html("保存失败，输出有误").end().show(function() {
				const this_ = $(this);
				setTimeout(function() {
					this_.hide();
				}, 800);
			});
		}
	});



	//返回
	$(".member_fanhui").click(function() {
		window.location.href = "my_changzhu.html";
	});
});