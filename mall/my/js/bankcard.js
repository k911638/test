$(function () {

    // 提交验证
    var error_name = true;
    var error_cardNo = true;
    var cardbank = null;
    var cardcardType = null;
    var $cardNo = $('#cardNo');

    var cardNolist = $('.bankcardbg').find('li');
    for (let i = 0; i < cardNolist.length; i++) {
        let cardNo = cardNolist[i].innerHTML;
        let cardNohide = cardNo.slice(0, cardNo.length - 4);
        let cardNoshow = cardNo.substr(cardNo.length - 4);
        cardNohide = "●●●● ●●●● ●●●● "
        cardNolist[i].innerHTML = cardNohide + cardNoshow;
    }

    //提示信息弹窗
    function toolTipbox(tips_text) {
        var layer = document.createElement('div');
        layer.className = "layer";
        layer.innerHTML =
            '<div class="layerbg"></div>' +
            '<div class="layer_tips">' +
            '<h1>提示</h1><div class="tips"></div><div class="layer_button"><span class="layer_cancel">确定</span></div>' +
            '</div>';
        $(".member_con").after(layer);
        $('.tips').html(tips_text);
        $('.layerbg').show();
        $('.layer_tips').show();
        var tipsdiv = document.querySelector('.tips');
        var tipsStyles = getComputedStyle(tipsdiv);
        var tipsheight = String(tipsStyles.getPropertyValue('height')).trim();
        var tipslineheight = String(tipsStyles.getPropertyValue('line-height')).trim();
        if (tipsheight !== tipslineheight) {
            $('.layer_tips').css('height', '6.5rem');
        }
        $(".layer_cancel").click(function () {
            $('.layerbg').hide();
            $('.layer_tips').hide();
        });
    }

    //输入银行卡号4位后加空格
    $cardNo.keyup(function () {
        this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
    });

    //验证银行卡号
    function cardNoCheck() {
        var cardNo = $cardNo.val().replace(/\s+/g, "");
        var httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
        var url = 'https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=' + cardNo + '&cardBinCheck=true';
        httpRequest.open('GET', url, true); //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
        httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var json = httpRequest.responseText; //获取到json字符串，还需解析
                var obj = JSON.parse(json);
                if (obj.validated === false) {
                    toolTipbox('请输入正确的银行卡号');
                    error_cardNo = true;
                } else {
                    error_cardNo = false;
                    cardbank = obj.bank;
                    cardcardType = obj.cardType;
                }
            }
        };
    }

    //卡号input失去焦点验证银行卡号
    $cardNo.blur(function () {
        var cardNo = $cardNo.val();
        if (cardNo.length === 0) {
            error_cardNo = true;
        } else {
            cardNoCheck();
        }
    });

});