;$(function(){
	//弹窗
	const $pop_window = $(".pop_window");
	const $pop1 = $(".pop_window1");
	

	//返回
	$(".fanhui").click(function() {
		window.location.href=document.referrer;
	});

	//投票
	var notoupiao = true;
	$("#list").delegate('span', 'click', function(){
		// $.cookie('layuser',13727762666,{expires:7,path:'/'})
		var re = /^1[3-9][0-9]\d{8}$/;
		var user1 = $.cookie('layuser');
		var id = $(this).prev().children().eq(0).html().substring(3);
		var _this = $(this);
		if(re.test(user1)){
			if(notoupiao){
				$.ajax({
					url: 'http://127.0.0.1:3000/json',
					type: 'get',
					dataType: 'json',
					data: {user: user1,id:id}
				})
				.done(function(data) {
					notoupiao = false;
					if(data.score==undefined){
						data.score = _this.prev().children().eq(2).html().substring(3);
					}
	
					_this.prev().children().eq(2).html("票数："+data.score);
					$pop1.children().html("投票成功").end().show(function() {
					setTimeout(function(){
						$pop1.hide();
					},800);
				});
				})
				.fail(function() {
					notoupiao = false;
					$pop1.children().html("你已经投过票了").end().show(function() {
					setTimeout(function(){
						$pop1.hide();
					},800);
				});
				})
			}else{
				$pop1.children().html("你已经投过票了").end().show(function() {
					setTimeout(function(){
						$pop1.hide();
					},800);
				});
			}				
		}else{
			$pop_window.show();
		}
	});
	//详情
	$("#list").delegate('img', 'click', function(){
		var id = $(this).parent().next().children().eq(0).children().eq(0).html().substring(3);
		$.cookie('xiangqing',id,{expires:7,path:'/'});
		window.location.href = "../xiangqing/xiangqing.html";
	});
	
	//footer
	$(".footer").delegate('ul', 'click', function(){
		var ix = $(this).index();
	
		switch(ix){
			case 0:
				window.location.href = "../spokesman/spokesman.html";
			break;
			case 1:
				return;
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
				window.location.href = "../the_rules/the_rules.html";
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