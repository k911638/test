$(function() {
	var $pop = $('.pop_window1');
	var userId = $.cookie('userId')
	var accessToken = $.cookie('accessToken')

	//返回
	$(".member_fanhui").click(function() {
		window.location.href = "my.html";
	});


//请求用户数据
	let userInfo = {
		data: localStorage.getItem("userInfo"),
		getData() {
			let self = this
			console.log(self.data)
			if (self.data) {
				self.setInfo()
				return false
			}

			new ajax({
				url: 'user/user/userInfo.do',
				type: 'post',
				dataType: 'json',
				data: JSON.stringify({
					userId: userId,
					accessToken: accessToken
				}),
				success: function (obj) {
					if (obj.respCode == 'S') {
						self.data = obj.data
						localStorage.setItem("userInfo",JSON.stringify(obj.data))
						self.setInfo()
					}
				}
			})
		},
		setInfo(){
			let self = this
			let userInfo = JSON.parse(localStorage.getItem('userInfo'))
			$('#portrait').attr('src',userInfo.headImage)
			$('.nickname').html(userInfo.nickname)
			$('.member_birthday span').html(userInfo.birthday)
			$('.member_sex span').html(userInfo.sex)
		}
	}

	userInfo.getData()


	$(".member_info").delegate('li', 'click', function() {
		const ix = $(this).index();
		switch (ix) {
			case 0:
				return;
				break;
			case 1: //昵称
				window.location.href = "member_info_nickname.html";
				break;
			case 2: //生日
				window.location.href = "member_info_birthday.html";
				break;
			case 3: //性别
				window.location.href = "member_info_sex.html";
				break;
			case 4: //住址
				window.location.href = "./my_changzhu.html";
		}

	});

	//图片
	$(".member_info").delegate('#takepicture', 'change', function() {
		loadImg();
	});

	function loadImg() {
		//获取文件
		var file = $(".member_info").find("input")[0].files[0];


		if (file != undefined) {
			error_img = false;
			//创建读取文件的对象
			var reader = new FileReader();

			//创建文件读取相关的变量
			var imgFile;

			//为文件读取成功设置事件
			reader.onload = function(e) {

				imgFile = e.target.result;


				var formData = new FormData();
				formData.append('headFile', file);
				formData.append('userId', userId);
				new ajax({
						url: 'user/user/saveUserInfo.do',
						processData: false,
						contentType: false,
						type: 'post',
						data: formData,
						success:function (data) {
							$("#portrait").attr('src', imgFile);
							localStorage.setItem("userInfo",JSON.stringify(data.data))
						}
					})

			};

			//正式读取文件
			reader.readAsDataURL(file);
		} else {
			error_img = true;
		}
	}



})