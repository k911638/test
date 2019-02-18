//var btn= document.getElementById("butt")
//btn.onclick=function(){
//	$("center_pop").toggle("show");
//}
$(document).ready(function(){
//	$(".cancel_display1").show()
	$(".phone_area").hide()
//$(".butt").click(function(){
//	$(".center_pop_1").toggle("show");
//	$(".center_pop_1").offset({top:0})
//	});
	
//	$(".cancel_display").click(function(){
//	$(".cancel_display1").toggle("show");
//	$(location).attr("href","account.html")
//	});
	
	
//	$(".phone_drop").click(function(){
//	$(".phone_area").toggle("show");
//	$(".phone_area").offset({top:0})
//	});
	
	$(".phone_drop1").click(function(){
	  $(".phone_area").toggle("show");
//	  $(".phone_drop").offset({top:0})
      $(".phone_switch1").show().addClass("show");
      $(".phone_switch2").hide().removeClass("hide");
	});
	
	$(".phone_switch3").click(function(){
		$(".phone_area").toggle("hidden")
		$(".phone_switch2").show().addClass("show");
      $(".phone_switch1").hide().removeClass("hide");
	})
//	$(".cancel_bott2").click(function(){
//	$(".cancel_display1").toggle("hidden");
//	$(".cancel_display1").offset({top:0})
//	});
})   

