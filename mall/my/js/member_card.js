$(function () {

	//返回
	$(".member_fanhui").click(function () {
		window.history.go(-1);
	});

	//身份证正面
	var $file = $("#idcard_front");
	$file.change(function () {
		loadImg("#idcard1", "#idcard_front", "#idcardf");
	});

	//身份证反面
	var $file1 = $("#idcard_back");
	$file1.change(function () {
		loadImg("#idcard2", "#idcard_back", "#idcardb");
	});

	function loadImg(divid, inputid, imgid) {
		//获取文件
		var animateimg = $(inputid).val();
		var imgarr = animateimg.split('\\'); //分割
		var myimg = imgarr[imgarr.length - 1]; //去掉 // 获取图片名
		var houzui = myimg.lastIndexOf('.'); //获取 . 出现的位置
		var ext = myimg.substring(houzui, myimg.length).toUpperCase(); //切割后缀，大写
		var file = $(divid).find("input")[0].files[0];
		if (file !== undefined) {
			if (ext != '.PNG' && ext != '.GIF' && ext != '.JPG' && ext != '.JPEG' && ext != '.BMP') {
				toolTip_box('文件类型错误<br>请上传正确的图片类型');
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
				reader.onload = function (e) {

					imgFile = e.target.result;

					$(imgid).attr('src', imgFile);
				};
				//正式读取文件
				reader.readAsDataURL(file);
			}
		} else {
			toolTip_box('请上传身份证正反面照片');
			error_img = true;
		}
	}

	//提示信息弹窗
	function toolTip_box(tips_text) {
		var tips_text
		var layer = document.createElement('div');
		layer.className = "layer";
		layer.innerHTML =
			'<div class="layerbg"></div>' +
			'<div class="layer_tips">' +
			'<h1>提示</h1><div class="tips"></div><div class="layer_button"><span class="layer_cancel">确定</span></div>' +
			'</div>';
		$(".member_con").after(layer);
		$('.tips').html(tips_text);
		$('.layerbg').show();
		$('.layer_tips').show();
		const tipsdiv = document.querySelector('.tips');
		const tipsStyles = getComputedStyle(tipsdiv);
		const tipsheight = String(tipsStyles.getPropertyValue('height')).trim();
		const tipslineheight = String(tipsStyles.getPropertyValue('line-height')).trim();
		if (tipsheight !== tipslineheight) {
			$('.layer_tips').css('height', '6.5rem');
		}
		$(".layer_cancel").click(function () {
			$('.layerbg').hide();
			$('.layer_tips').hide();
		});
	}

	// 提交验证
	var error_user = true;
	var error_phone = true;
	var error_ress = true;
	var error_address = true;
	var error_img = true;
	var $useryzm = $('#user_name'); //check名字
	var $phone = $('#phone'); //check phone
	var $ress = $('#trigger1'); //区域
	var $detailed_add = $('#detailed_add'); //详细地址
	var $idcardf = $('#idcardf');
	var $idcardb = $('#idcardb');
	$useryzm.blur(function () {
		check_yzm();

	});

	function check_yzm() {
		var val = $useryzm.val();
		var re = /^[^ ]+$/;
		if (val.length < 4 && val.length > 0 && re.test(val)) {
			error_user = false;
		} else {
			toolTip_box('请输入正确的姓名');
			error_user = true;
		}
	}

	$phone.blur(function () {
		check_phone();
	});

	function check_phone() {
		var val = $phone.val();
		var re = /^1[3|4|5|8][0-9]\d{8}$/;

		if (re.test(val)) {
			error_phone = false;
		} else {
			toolTip_box('请输入正确的11位手机号');
			error_phone = true;
		}
	}

	var ressval = $ress.val();

	$detailed_add.blur(function () {
		check_detailed_add();
	});

	function check_detailed_add() {
		var detailed_addval = $detailed_add.val();
		if (detailed_addval.length > 0 && detailed_addval.length < 16) {
			error_detailed_add = false;
		} else {
			toolTip_box('请输入详细的单元楼门牌号');
			error_detailed_add = true;
		}
	}
	// 表单提交
	$('.card_ok').click(function () {
		if (error_user == false && error_phone == false && error_detailed_add == false && error_ress == false && error_img == false) {
			var user = $useryzm.val();
			var mibiles = $phone.val();
			var address = $ress.val() + $detailed_add.val();
			var idcard = [];
			idcard[0] = $("#idcard_front").files[0];
			idcard[1] = $("#idcard_back").files[0];
			FormData.append("name", user);
			FormData.append("mibiles", mibiles);
			FormData.append("address", address);
			FormData.append("file", idcard);
			$.ajax({
					url: '/path/to/file',
					type: 'post',
					data: formData,
					processData: false,
					contentType: false,
					async: false,
				})
				.done(function (data) {
					if (data == true) {
						$.cookie('layrun', "isrun", {
							expires: 7,
							path: '/'
						});
						toolTip_box('已经提交系统审核<br>稍后会以短信的方式通知您');
					} else {
						toolTip_box('提交失败，你已经是采买员了');
					}
				})
				.fail(function () {
					toolTip_box('提交失败，可能网络掉线了');
				});
		} else {
			return false;
		}
	});
})