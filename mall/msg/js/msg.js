;$(function(){
	//弹窗
	var $pop_window = $(".pop_window");
	

	//返回
	$(".fanhui").click(function() {
		window.location.href=document.referrer;
	});


//检测
	const $list = $("#list");
	var reads=$.cookie('layuser');
	var re = /^1[3-9][0-9]\d{8}$/;
	if(re.test(reads)){
		$pop_window.show();
		setTimeout(function(){
			window.location.href = "../register/register0.html";//登录地址
		},3500);
		
			
	}else{
		$.ajax({
			url: 'http://127.0.0.1:3000/json',
			type: 'GET',
			dataType: 'json',
			data: {"user": reads},
		})
		.done(function(obj) {
			console.log(obj);
			// $list.empty();
			for(var i=0;i<obj.length;i++){
				var $li = $(`<li name="abc">
						<img src="${obj[i].url}" alt="去哪买logo" / >
						<div>
							<h5>我的自定义下单<em>(待处理)</em><em class="fr">${obj[i].date}</em></h5>
							<p>正在处理，预计处理时间60分钟</p>
						</div>
					</li>`);
				$li.appendTo($list);
			}
		})
		.fail(function() {
			console.log("error");
		});
	}
	

//点击消息
	$list.delegate('li', 'click', function(){
		var msgtype = $(this).children().eq(1).children().eq(0).text();
		if(msgtype[0]==="我"){
			console.log($(this).attr("name"));
			//window.location.href = "../index.html";
		}else{
			//window.location.href = "../index.html";
		}
		
	});
	
	//footer
	$(".footer").delegate('ul', 'click', function(){
		var ix = $(this).index();

		switch(ix){
			case 0:
				window.location.href = "../index.html";
			break;
			case 1:
				return;
			break;
			case 2:
				window.location.href = "../search/search.html";
			break;
			case 3:
				window.location.href="../shopping/shopping.html";
			case 4:
				window.location.href = "../my/my.html";
			
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