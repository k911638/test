;$(function(){
		var reads = $.cookie('xiangqing')==undefined?1:$.cookie('xiangqing');
		// console.log(reads);
		$.ajax({
			url: 'http://127.0.0.1:3000/xiangqing/',
			type: 'get',
			dataType: 'json',
			data: {id: reads}
		})
		.done(function(data) {
			console.log(data);
			$('.center').empty();
		
			var $li = $(`<div class="xq1">
				<img src="`+data.url0+`" alt="代言人写真" onerror="this.src='../image/ayi0.jpg'">
				<p>我是邻居张阿姨，我为去哪买代言！</p>
			</div>

			<div class="xq2">
				<div class="xq2_div1">
					<ul>
						<li>
							<p>编号：`+data.id+`</p>
							<p>称呼：`+data.name+`</p>
							<p>特长：`+data.techang+`</p>

						</li>
						<li>
							<p>排名：`+data.paiming+`</p>
							<p>票数：`+data.score+`</p>
							<p>爱好：`+data.hobby+`</p>
						</li>
					</ul>
					<p>区域：`+data.ress+`</p>
					<p>格言：<span class="xq_p">`+data.motto+`</span></p>
				</div>
				<ul class="xq2_ul">
					<li><img src="`+data.url1+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu1+`</p></li>
					<li><img src="`+data.url2+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu2+`</p></li>
					<li><img src="`+data.url3+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu3+`</p></li>
					<li><img src="`+data.url4+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu4+`</p></li>
					<li><img src="`+data.url5+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu5+`</p></li>
					<li><img src="`+data.url6+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu6+`</p></li>
					<li><img src="`+data.url7+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu7+`</p></li>
					<li><img src="`+data.url8+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu8+`</p></li>
					<li><img src="`+data.url9+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu9+`</p></li>
					<li><img src="`+data.url10+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu10+`</p></li>
					<li><img src="`+data.url11+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu11+`</p></li>
					<li><img src="`+data.url12+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu12+`</p></li>
					<li><img src="`+data.url13+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu13+`</p></li>
					<li><img src="`+data.url14+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu14+`</p></li>
					<li><img src="`+data.url15+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu15+`</p></li>
					<li><img src="`+data.url16+`" onerror="this.src='../image/guize.png'"><p>`+data.shouhu16+`</p></li>
				</ul>
				<div class="xq2_div2">
					<input type="button" name="" value="选为我的代言人">
				</div>
			</div>`);
			$li.appendTo('.center');
		})
		.fail(function() {
			console.log("error");
		});
		
		





		var $pop_window = $(".pop_window");
		//返回
		$(".fanhui").click(function() {
			window.location.href=document.referrer;
		});
		//投票
		var notoupiao = true;
		$(".xq2_div2 input").click(function(){
			
			var re = /^1[3-9][0-9]\d{8}$/;
			var user1 = $.cookie('layuser');
			var id = $(".xq2_div1 ul").children().eq(0).children().eq(0).html().substring(3);
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
							data.score = $(".xq2_div1 ul").children().eq(1).children().eq(1).html().substring(3);
						}
						$(".xq2_div1 ul").children().eq(1).children().eq(1).html("票数："+data.score);
					})
					.fail(function() {
						$('.pop_window1').children().html("投票失败").end().show(function() {
				          setTimeout(function(){
				            $('.pop_window').hide();
				          },800);
				        });
					})
				}else{
					$('.pop_window1').children().html("你已经投过票了").end().show(function() {
			          setTimeout(function(){
			            $('.pop_window').hide();
			          },800);
			        });
				}
			}else{
				$pop_window.show();
			}
		});

		//弹框确认
		$(".pop_window input").click(function() {
			$pop_window.hide();
			window.location.href = "../register/register.html";
		});
		$(".pop_window img").click(function() {
			$pop_window.hide();
		});

		
	});
