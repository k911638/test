$(function () {

	//返回
	$(".member_fanhui").click(function () {
		window.history.go(-1);
	});

	//身份证正面
	var $file = $("#idcard_front");
	$file.change(function () {
		loadImg();
	});

	function loadImg() {
		//获取文件
		var file = $("#idcard1").find("input")[0].files[0];

		if (file != undefined) {
			error_img = false;
			//创建读取文件的对象
			var reader = new FileReader();

			//创建文件读取相关的变量
			var imgFile;

			//为文件读取成功设置事件
			reader.onload = function (e) {

				imgFile = e.target.result;

				$("#idcardf").attr('src', imgFile);
			};

			//正式读取文件
			reader.readAsDataURL(file);
		} else {
			error_img = true;
		}
	}

	//身份证反面
	var $file1 = $("#idcard2");
	$file1.change(function () {
		loadImg1();
	});

	function loadImg1() {
		//获取文件
		var file1 = $("#idcard2").find("input")[0].files[0];

		if (file1 != undefined) {
			error_img = false;
			//创建读取文件的对象
			var reader1 = new FileReader();

			//创建文件读取相关的变量
			var imgFile1;

			//为文件读取成功设置事件
			reader1.onload = function (e) {

				imgFile1 = e.target.result;

				$("#idcardb").attr('src', imgFile1);
			};

			//正式读取文件
			reader1.readAsDataURL(file1);
		} else {
			error_img = true;
		}
	}

	var buyeradd = $('#trigger1').html();
	if (buyeradd == ("请输入您的住址")) {
		$('#trigger1').css("color", "rgba(153, 153, 153, 1)");
	} else {
		$('#trigger1').click(function () {
			if (buyeradd == ("请输入您的住址")) {
				$('#trigger1').css("color", "rgba(153, 153, 153, 1)");
			} else {
				$('#trigger1').css("color", "rgba(51, 51, 51, 1)");
			}
		});
	}

})