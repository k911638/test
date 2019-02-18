;$(function(){
	var $pop_window = $(".pop_window");
	const $pop1 = $('.pop_window1');
	var $li=$('.slide li');
	var len=$li.length;
	var nowli=0;
	var prevli=0;
	var timer=null;
	//初始化,根据轮播图生成小圆点	
	var	point=$('.points');
	$li.not(':first').css({left:"18.75rem"});
	$li.each(function(index) {
		var $sli=$('<li>');
		$sli.appendTo(point);
		if (index==0) {
			$sli.addClass('points_active');
		}
	});
	//点击滑动图片
	var $points=$('.points li');
	$points.click(function() {
		nowli=$(this).index();
		move();
		$(this).addClass('points_active').siblings().removeClass('points_active');
	});
	
	//自动播放
	timer=setInterval(autoplay,3000);
	var $con=$('.slide_con');
	$con.mouseenter(function(){   //mouseenter鼠标移入不触发事件冒泡
		clearInterval(timer);
	});
	$con.mouseleave(function(){
		timer=setInterval(autoplay,3000);
	});

	function autoplay(){
		nowli++;
		move();
		$points.eq(nowli).addClass('points_active').siblings().removeClass('points_active');
	}

	function move(){
		if(nowli<0){
			nowli=len-1;
			$li.eq(nowli).css({left:"-18.75rem"});
			$li.eq(prevli).stop().animate({left:"18.75rem"});
			$li.eq(nowli).stop().animate({left:0});
			prevli=nowli;
			return;
		}
		if(nowli>len-1){
			nowli=0;
			$li.eq(nowli).css({left:"18.75rem"});
			$li.eq(prevli).stop().animate({left:"-18.75rem"});
			$li.eq(nowli).stop().animate({left:0});
			prevli=nowli;
			return;
		}
		if (nowli>prevli) {
			$li.eq(nowli).css({left:"18.75rem"});
			$li.eq(prevli).stop().animate({left: "-18.75rem"});
			$li.eq(nowli).stop().animate({left:0});
			prevli=nowli;
			return;
		}
		if(nowli<prevli){
			$li.eq(nowli).css({left:"-18.75rem"});
			$li.eq(prevli).stop().animate({left:"18.75rem"});
			$li.eq(nowli).stop().animate({left:0});
			prevli=nowli;
		}
	}
	//返回
	$(".fanhui").click(function() {
		window.location.href=document.referrer;
	});

	//点击排序
	$(".paixu p").click(function() {
		$(this).addClass('paixu_active').siblings().removeClass('paixu_active');

	});
	
	//点击搜索
	$(".search_btn").click(function(){
		var val = $(this).prev().val();
		var re = /^\d+$/;
		if(re.test(val)){
			qingqiu(val);
		}
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
					if(data.score==undefined || data==null){
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
					$pop1.children().html("投票失败").end().show(function() {
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
	//搜索请求
	function qingqiu(val){
		
		//请求数据
		$.ajax({
			url: 'http://127.0.0.1:3000/json',
			type: 'get',
			dataType: 'json',
			data: {id: val}
		})
		.done(function(data) {
			console.log(data);
			$('.list').empty();
			for(var i=0;i<data.length;i++){
				var $li = $('<li><div class="ranking">'+data[i].ranking+'</div><div><img src="'+data[i].url+'" alt="代言人"></div><div class="list_div"><div><p>编号：'+data[i].id+'</p><p>称呼：'+data[i].name+'</p><p>票数：'+data[i].score+'</p></div><span>选为我的代言人</span></div></li>');
				$li.appendTo('.list');
			}			
		})
		.fail(function() {
			console.log("error");
		});

	}

	//footer
	$(".footer").delegate('ul', 'click', function(){
		var ix = $(this).index();

		switch(ix){
			case 0:
				return;
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