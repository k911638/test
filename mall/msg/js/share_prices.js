;$(function(){
	const $pop10 = $(".pop_window10");
//检测
	const $list = $("#list");
	var reads=$.cookie('layuser');
	var re = /^1[3-9][0-9]\d{8}$/;
	if(!re.test(reads)){
		// $pop_window.show();
		// setTimeout(function(){
		// 	window.location.href = "../register/register0.html";
		// },3500);
		console.log("123");
			
	}else{
		$.ajax({
			url: 'http://127.0.0.1:3000/json',
			type: 'GET',
			dataType: 'json',
			data: {"user": reads},
		})
		.done(function(obj) {
		    console.log(obj);
			$list.empty();
			if(obj.state==0){
				var $li = $(`<li class="cx">
	                    <div class="order_list_top bd_bottom clearfix"><span>正在审核</span>2018/11/28</div>
	                    <div class="order_box">
	                        <div class="order_h3">蓝月亮 洗衣液 3kg 自然清香蓝月亮 洗衣液 3kg 自然清香</div>
	                        <div class="order_tips">温馨提示：您提交的商品正在审核中，请稍后前往此页查看，我们也会将查询结果下发至您的信息，请注意查收。</div>
	                        <button class="order_dot" >联系网点</button>
	                    </div>
	                </li>`);
			}else if(obj.state==1){
				var $li = $(`<li class="jg">
	                    <div class="order_list_top bd_bottom clearfix"><span>分享成功</span>2018/11/28</div>
	                    <div class="order_audit_goods clearfix">
	                        <img src="../image/lanyueliang.png">
	                        <div class="order_h3">蓝月亮 洗衣液 3kg 自然清香蓝月亮 洗衣液 3kg 自然清香</div>
	                        <div class="order_min">最低价：99.28元<span>大润发</span></div>
	                        <button class="order_other" name="${obj.id}">没有价格</button><button class="order_cart" >有价格</button>
	                    </div>
	                </li>`);
			}else if(obj.state==2){
				var $li = $(`<li class="muyou">
	                    <div class="order_list_top bd_bottom clearfix"><span>分享失败</span>2018/11/28</div>
	                    <div class="order_box">
	                        <div class="order_h3">蓝月亮 洗衣液 3kg 自然清香蓝月亮 洗衣液 3kg 自然清香</div>
	                        <div class="order_tips"><span>无法查找到此商品，请联系网点</span></div>
	                        <button class="order_dot" >联系网点</button>
	                    </div>
	                </li>`);
			}else{
				$list.empty();
				return;
			}
			$li.appendTo($list);
			
		})
		.fail(function() {
			console.log("error");
		});
	}


	//无价格
	$list.delegate('.order_other', 'click', function() {
		const id = $(this).attr("name");
		$.ajax({
			url: 'http://127.0.0.1:3000/json',
			type: 'GET',
			dataType: 'json',
			data: {"id":id,"price":0}
		})
		.done(function(data) {
			$pop10.children().html("无价格成功").end().show();

			
		})
		.fail(function() {
			console.log("error");
		});
	});


	//有价格
	$("#list").delegate('.order_cart', 'click', function(){
		const id = $(this).prev().attr("name");
		$.ajax({
			url: 'http://127.0.0.1:3000/json',
			type: 'GET',
			dataType: 'json',
			data: {"id":id,"price":1}
		})
		.done(function(data) {
			$pop10.children().html("有价格成功").end().show();

			
		})
		.fail(function() {
			console.log("error");
		});
		
	});


	


	//联系网点
	$list.delegate('.order_dot', 'click', function() {
		$pop10.children().html("无法联系网点").end().show();	
	});
	$pop10.click(function() {
		$(this).hide();
	});
	//返回
	$(".member_fanhui").click(function() {
		window.location.href = "msg.html";
	});
});