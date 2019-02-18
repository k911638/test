;$(function(){
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
	                    <div class="order_list_top bd_bottom clearfix"><span>正在查询商品</span>2018/11/28</div>
	                    <div class="order_box">
	                        <div class="order_h3">蓝月亮 洗衣液 3kg 自然清香蓝月亮 洗衣液 3kg 自然清香</div>
	                        <div class="order_tips">温馨提示：您提交的商品正在查询中，请稍后前往此页查看，我们也会将查询结果下发至您的手机，请注意查收。</div>
	                        <button class="order_dot" >联系网点</button>
	                    </div>
	                </li>`);
			}else if(obj.state==1){
				var $li = $(`<li class="jg">
	                    <div class="order_list_top bd_bottom clearfix"><span>商品查询成功</span>2018/11/28</div>
	                    <div class="order_audit_goods clearfix">
	                        <img src="../image/lanyueliang.png">
	                        <div class="order_h3">蓝月亮 洗衣液 3kg 自然清香蓝月亮 洗衣液 3kg 自然清香</div>
	                        <div class="order_min">最低价：99.28元<span>大润发</span></div>
	                        <button class="order_other" name="${obj.id}">查看其它超市价格</button><button class="order_cart" >加入购物车</button>
	                    </div>
	                </li>`);
			}else if(obj.state==2){
				var $li = $(`<li class="muyou">
	                    <div class="order_list_top bd_bottom clearfix"><span>商品查询失败</span>2018/11/28</div>
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


	//查看其它超市价格
	$list.delegate('.order_other', 'click', function() {
		const id = $(this).attr("name");
		$.ajax({
			url: 'http://127.0.0.1:3000/json',
			type: 'GET',
			dataType: 'json',
			data: {id}
		})
		.done(function(data) {
			$(".pop_window0").empty();

			var chaoshi0="暂无信息",chaoshi1="暂无信息",chaoshi2="暂无信息",chaoshi3="暂无信息",chaoshi4="暂无信息",price0="暂无信息",price1="暂无信息",price2="暂无信息",price3="暂无信息",price4="暂无信息",maxprice;
			const len = data.length;
		
			for(var i=0;i<len;i++){
				if(len-i==5){
					chaoshi0 = data[i];
					maxprice = data[i].price;
				}else if(len-i==4){
					chaoshi1 = data[i];
				}else if(len-i==3){
					chaoshi2 = data[i];
				}else if(len-i==2){
					chaoshi3 = data[i];
				}else if(len-i==1){
					chaoshi4 = data[i];
				}
			}
			len<4?maxprice=data[0].price:null;
			


			var chajia = (parseFloat(price0)*100-parseFloat(price4)*100)/100;
			chajia = chajia.toFixed(2); //四舍五入两位
			var chajialv = (chajia*100/parseFloat(price4)).toFixed(2);


			var $lis = $(`<div><h3>其它超市价格</h3>
          <h5> ${data.name}&nbsp</h5>
          <p><span>${chaoshi0}：</span><span>${price0}元</span></p>
          <p><span>${chaoshi1}：</span><span>${price1}元</span></p>
          <p><span>${chaoshi2}：</span><span>${price2}元</span></p>
          <p><span>${chaoshi3}：</span><span>${price3}元</span></p>
          <p><span>${chaoshi4}：</span><span>${price4}元</span></p>
          <p class="chajialv">差价率：${chajialv}%</p>
        </div>
        <input type="button" name="" value="确定">`);


			$lis.appendTo(".pop_window0");
			$(".pop0_con").show();
		})
		.fail(function() {
			console.log("error");
		});
	});
	//查看其它超市价格弹框确认
	$(".pop_window0").delegate("input","click",function() {
		$(".pop0_con").hide();
	});

	//加入购物车
	var $pop1_con = $(".pop1_con");
	var shangpinID = null;
	var chaoshi = null;
	var price_ = null;
	var name_ = null;
	$("#list").delegate('.order_cart', 'click', function(){
		
		$(".shuliang p").text(1);
		shangpinID = $(this).prev().attr("name");
		chaoshi = $(this).prev().prev().children().eq(1).text();
		price_ = $(this).prev().prev().children().eq(0).text();
		name_ = $(this).prev().prev().prev().text();
		$pop1_con.show();
		
	});


	//选择购买数量
	const $pop10 = $('.pop_window10');
	$("#pop_window1_btn input").click(function() {
		if($(this).index()==0){
			shangpinID = null;
			$pop1_con.hide();
		}else{
				
			var id = shangpinID;
			var num = $(".shuliang p").text();
			var price = $(".zuidi").children().eq(0).text();
			var chaoshi = $(".zuidi").children().eq(1).text();
			
			if(id=='undefined' || id==undefined){
				console.log(id,num);
				$pop1_con.hide();
				return;
			}
			$.ajax({
				url: 'http://127.0.0.1:3000/json',
				type: 'get',
				dataType: 'json',
				data: {"id":id,"num":num,"chaoshi":chaoshi,"price":price,"name_":name_}
			})
			.done(function() {
				$pop1_con.hide();
				$pop10.children().html("成功加入购物车").end().show(function() {
					const this_ = $(this);
					setTimeout(function(){
						this_.hide();
					},800);
				});
			})
			.fail(function() {
				$pop1_con.hide();
				console.log("error");
			});
		
			
		}
	});
	//选择商品数量
	$(".shuliang img").click(function() {
		if($(this).index()==0){
			var num = parseInt($(this).next().text())-1
			num = num>0 ? num : 1 ;

			$(this).next().text(num);
		}else{
			var num = parseInt($(this).prev().text())+1
			num = num>9999 ? 9999 : num;
			$(this).prev().text(num);
		}
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