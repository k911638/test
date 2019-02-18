$(function(){
    //返回
    $(".member_fanhui").click(function () {
        window.history.go(-1);
    });
    
    //选择原因底部弹出
    var $reason = document.querySelector("#reason");
    $reason.addEventListener('click',function(){
        var $layer = document.querySelector(".relayer");
        $layer.classList.add('layer_in');
    });
    
    //取消按钮
    $("#btn_cancel").click(function(){        
        $(".relayer").removeClass('layer_in');
    });

    //确定按钮
    $("#btn_ok").click(function(){
        let val = $('input[name="reason"]:checked').prev().html();
        $('#reason').html(val);
        $(".relayer").removeClass("layer_in");
    });

    //凭证
	var $file = $("#idcard_front");
	$file.change(function () {
		loadImg("#idcard1", "#idcard_front", "#idcardf");
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
			toolTip_box('请上传凭证');
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

});