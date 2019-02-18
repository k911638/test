;$(function(){
	//点击
	$(".member_set").delegate('li', 'click', function() {
		var ix = $(this).index();
		switch(ix){
			case 0:
				window.location.href = "member_info.html";
			break
			case 1:
			break
			case 2:
			break
			case 3:

		}
	});
	//退出账号
	$(".new_add").click(function() {
		$.cookie('layuser',"",{expires:0,path:'/'});
		
		$('.pop_window1').children().html("您已退出账号").end().show(function() {
			const this_ = $(this);
			setTimeout(function(){
				this_.hide();
				window.location.href = "../";
			},800);
		});
	});


	//返回
	$(".member_fanhui").click(function() {
		window.location.href="my.html";
	});
});