$(function(){
    //返回
    $(".member_fanhui").click(function () {
        window.history.go(-1);
    });
    
    //选择原因底部弹出
    var $reason = document.querySelector("#reason");
    $reason.addEventListener('click',function(){
        var $layer = document.querySelector(".layer");
        $layer.classList.add('layer_in');
    });
    
    //取消按钮
    $("#btn_cancel").click(function(){        
        $(".layer").removeClass('layer_in');
    });

    //确定按钮
    $("#btn_ok").click(function(){
        let val = $('input[name="reason"]:checked').prev().html();
        $('#reason').html(val);
        $(".layer").removeClass("layer_in");
    });

});