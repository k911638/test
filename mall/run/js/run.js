$(function() {

	//检测
	var $pop_window = $(".pop_window");

	var reads = $.cookie('layuser');
	var re = /^1[3-9][0-9]\d{8}$/;
	if (!re.test(reads)) {
		$pop_window.children().html("你没有登录").end().show(function() {
			setTimeout(function() {
				window.location.href = "../register/register0.html";
			}, 3500);
		});

	}

	// 登录验证
	var error_user = true;
	var error_techang = true;
	var error_hobby = true;
	// var error_phone=true;
	var error_ress = true;
	var error_motto = true;
	var error_img = true;
	var $useryzm = $('#user_name'); //check名字
	$useryzm.focus(function() {
		$(this).next().css({
			visibility: 'hidden'
		});
	});
	$useryzm.blur(function() {
		check_yzm();
	});

	function check_yzm() {
		var val = $useryzm.val();
		var re = /^[^ ]+$/;
		if (val.length < 4 && val.length > 0 && re.test(val)) {
			error_user = false;
		} else {
			$useryzm.next().html('请输入正确用户名').css({
				visibility: 'visible'
			});
			error_user = true;
		}
	}

	var $techang = $('#techang'); //check特长
	$techang.focus(function() {
		$(this).next().css({
			visibility: 'hidden'
		});
	});
	$techang.blur(function() {
		check_techang();
	});

	function check_techang() {
		var val = $techang.val();
		var re = /^[^ ]+$/;
		if (val.length > 0 && re.test(val)) {
			error_techang = false;
		} else {
			$techang.next().html('特长不能为空,不能有空格').css({
				visibility: 'visible'
			});
			error_techang = true;
		}
	}
	var $hobby = $('#hobby');
	$hobby.focus(function() {
		$(this).next().css({
			visibility: 'hidden'
		});
	});
	$hobby.blur(function() {
		check_hobby();
	});

	function check_hobby() {
		var hobbyval = $hobby.val();
		var re = /^[^ ]+$/;
		if (hobbyval.length > 0 && re.test(hobbyval)) {
			error_hobby = false;
		} else {
			$hobby.next().html('请输入爱好').css({
				visibility: 'visible'
			});
			error_hobby = true;
		}
	}

	// var $phone=$('#phone');//check phone
	// $phone.focus(function(){
	// 	$(this).next().css({visibility:'hidden'});
	// });
	// $phone.blur(function(){
	// 	check_phone();
	// });
	// function check_phone(){
	// 	var val=$phone.val();
	// 	var re = /^1[3-9][0-9]\d{8}$/;

	// 	if(re.test(val)){
	// 		error_phone=false;
	// 	}
	// 	else{
	// 		$phone.next().html('请输入正确的11位手机号').css({visibility:'visible'});
	// 		error_phone=true;
	// 	}
	// }

	var $ress = $('#ress'); //区域
	// $ress.focus(function(){
	// 	$(this).next().css({visibility:'hidden'});
	// });
	// $ress.blur(function(){
	// 	check_ress();
	// });
	// function check_ress(){
	// 	var ressval=$ress.val();
	// 	if(ressval.length>0 && ressval.length<30){
	// 		error_ress=false;
	// 		$ress.next().css({visibility:'hidden'});
	// 	}
	// 	else{
	// 		$ress.next().html('请输入您所在的区域：如龙华区').css({visibility:'visible'});
	// 		error_ress=true;
	// 	}
	// }

	var $motto = $('#motto'); //格言
	$motto.focus(function() {
		$(this).next().css({
			visibility: 'hidden'
		});
	});
	$motto.blur(function() {
		check_motto();
	});

	function check_motto() {
		var mottoval = $motto.val();
		if (mottoval.length > 0 && mottoval.length < 16) {
			error_motto = false;
		} else {
			$motto.next().html('请输入3字-16字的格言').css({
				visibility: 'visible'
			});
			error_motto = true;
		}
	}
	// 表单提交
	$('.reg_sub input').click(function() {
		if (error_user == false && error_techang == false && error_hobby == false && error_motto == false && error_ress == false && error_img == false) {
			var formData = new FormData();
			var file = $(".reg_form").find("input")[6].files[0];
			var user = $useryzm.val();
			var techang = $techang.val();
			var hobby = $hobby.val();
			var mibiles = $phone.val();
			var motto = $motto.val();
			var ress = $ress.val();
			formData.append('pic', file);
			formData.append('user', user);
			formData.append('techang', techang);
			formData.append('hobby', hobby);
			formData.append('mibiles', mibiles);
			formData.append('motto', motto);
			formData.append('ress', ress);
			$.ajax({
					url: '/path/to/file',
					type: 'post',
					processData: false,
					contentType: false,
					async: false,
					dataType: 'json',
					data: formData

				})
				.done(function(data) {
					if (data == true) {
						$.cookie('layrun', "isrun", {
							expires: 7,
							path: '/'
						});
						$pop_window.children().html("成功提交申请").end().show(function() {
							setTimeout(function() {
								$pop_window.hide();
							}, 800);
						});
					} else {
						$pop_window.children().html("提交失败，你已参选").end().show(function() {
							setTimeout(function() {
								$pop_window.hide();
							}, 800);
						});
					}
				})
				.fail(function() {
					$pop_window.children().html("提交失败，可能网络掉线了").end().show(function() {
						setTimeout(function() {
							$pop_window.hide();
						}, 800);
					});
				});
		} else {
			return false;
		}
	});



	//footer
	$(".footer").delegate('ul', 'click', function() {
		var ix = $(this).index();
		switch (ix) {
			case 0:
				window.location.href = "../spokesman/spokesman.html";
				break;
			case 1:
				window.location.href = "../ranking/ranking.html";
				break;
			case 2:
				return;
				break;
			case 3:
				window.location.href = "../the_rules/the_rules.html";
		}
	});
	//返回
	$(".fanhui").click(function() {
		window.location.href = document.referrer;
	});
	//图片
	var $file = $("#file");
	$file.change(function() {
		loadImg();
	});

	function loadImg() {
		//获取文件
		var animateimg = $("#file").val();
		var imgarr = animateimg.split('\\'); //分割
		var myimg = imgarr[imgarr.length - 1]; //去掉 // 获取图片名
		var houzui = myimg.lastIndexOf('.'); //获取 . 出现的位置
		var ext = myimg.substring(houzui, myimg.length).toUpperCase(); //切割后缀，大写
		var file = $(".reg_form").find("input")[6].files[0];
		if (file != undefined) {
			if (ext != '.PNG' && ext != '.GIF' && ext != '.JPG' && ext != '.JPEG' && ext != '.BMP') {
				$file.next().html('文件类型错误,请上传图片类型').css({
					visibility: 'visible'
				});
				return;
			} else {
				$file.next().css({
					visibility: 'hidden'
				});
				error_img = false;
				//创建读取文件的对象
				var reader = new FileReader();

				//创建文件读取相关的变量
				var imgFile;

				//为文件读取成功设置事件
				reader.onload = function(e) {

					imgFile = e.target.result;

					$("#imgContent").attr('src', imgFile);
				};
				//正式读取文件
				reader.readAsDataURL(file);
			}
		} else {
			$file.next().html('图片不能为空').css({
				visibility: 'visible'
			});
			$("#imgContent").attr('src', "");
			error_img = true;
		}
	}

	//地址
	$ress.click(function() {
		$(".pw1_con").show();
		$("#pop_window1").animate({
			top: "15rem"
		});
	});
	//取消
	$("#btn_con input").click(function() {
		if ($(this).index() == 0) {
			$("#pop_window1").animate({
				top: "33.4rem"
			}, function() {
				$(".pw1_con").hide();
				$("#ress").val("");
				error_ress = true;
				$ress.next().html('请输入您所在的区域').css({
					visibility: 'visible'
				});
			});
		} else {
			var shi = $("#select0 option:selected").text();
			var qu = $("#select1 option:selected").text();
			var jie = $("#select2 option:selected").text();
			var xiaoqu = $("#select3 option:selected").text();
			if (shi == "请选择" || qu == "请选择" || jie == "请选择" || xiaoqu == "请选择") {
				return;
			} else {
				$("#ress").val(shi + qu + jie + xiaoqu);
				$("#pop_window1").animate({
					top: "33.4rem"
				}, function() {
					$(this).parent().hide();
				});
				error_ress = false;
				$ress.next().css({
					visibility: 'hidden'
				});
			}
		}
	});

});