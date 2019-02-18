;$(function(){

	$.ajax({
		url: 'http://127.0.0.1:3000/json',
		type: 'GET',
		dataType: 'json',
		data: {param1: 'value1'},
	})
	.done(function(data) {
		if(data==0){

		}else{
			// $('.address').empty();
			var $li = $(` <ul>
	                <li><span>联系人：</span>${data.name}</li>
	                <li><span>性别：</span>${data.sex}</li>
	                <li><span>手机号：</span>${data.phone}</li>
	                <li><span>常住地址：</span>${data.ress}</li>
	                <li><span>门牌号：</span>${data.menpai}</li>
	            </ul>`);
			$li.prependTo(".address");
		}
	})
	.fail(function() {
		console.log("error");
	});
	
	//修改常住地址
	$(".address button").click(function() {
		window.location.href = "/my/my_changzhu.html";
	});

	//返回
	$(".member_fanhui").click(function() {
		window.history.go(-1);
	});
});