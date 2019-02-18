;$(function(){
	//弹窗
	var $pop_window = $(".pop_window");
	

	//返回
	$(".fanhui").click(function() {
		window.location.href=document.referrer;
	});

	
	//footer
	$(".footer").delegate('ul', 'click', function(){
		var ix = $(this).index();

		switch(ix){
			case 0:
				window.location.href = "../spokesman/spokesman.html";
			break;
			case 1:
				window.location.href = "../ranking/ranking.html";
			break;
			case 2:
			// $.cookie('layuser',13727762666,{expires:7,path:'/'});
			var reads=$.cookie('layuser');
			var re = /^1[3-9][0-9]\d{8}$/;
			if(re.test(reads)){
				window.location.href = "../run/run.html";
			}else{
				$pop_window.show();
			}
			
			break;
			case 3:
				return;
		}
	});

	//弹框确认
	$(".pop_window input").click(function() {
		$pop_window.hide();
		window.location.href = "../register/register0.html";
	});
	$(".pop_window img").click(function() {
		$pop_window.hide();
	});
});