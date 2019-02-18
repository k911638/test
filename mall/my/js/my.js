;$(function () {
    var $pop_window = $(".pop_window");
    var gourl = "../register/register0.html";

    let userId = $.cookie('userId')
    let accessToken = $.cookie('accessToken')

    // 检测
    // var reads=$.cookie('layuser');
    // var re = /^1[3-9][0-9]\d{8}$/;
    // if(!re.test(reads)){
    // 	$pop_window.show();
    // 	setTimeout(function(){
    // 		window.location.href = "../register/register0.html";
    // 	},3500);
    // }

    //弹框确认
    $(".pop_window input").click(function () {
        $pop_window.hide();
        window.location.href = gourl;
    });
    $(".pop_window img").click(function () {
        window.location.href = gourl;
    });


//请求用户数据
    let userInfo = {
        data: localStorage.getItem("userInfo"),
        getData() {
            let self = this
            console.log(self.data)
            if (self.data) {
                self.setInfo()
                return false
            }

            new ajax({
                url: 'user/user/userInfo.do',
                type: 'post',
                dataType: 'json',
                data: JSON.stringify({
                    userId: userId,
                    // accessToken: accessToken
                }),
                success: function (obj) {
                    if (obj.respCode == 'S') {
                        self.data = obj.data
                        localStorage.setItem("userInfo",JSON.stringify(obj.data))
                        self.setInfo()
                    }
                }
            })
        },
        setInfo(){
            let self = this
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            $('#portrait').attr('src',userInfo.headImage)
            $('.nickname').html(userInfo.nickname)
        }
    }

    userInfo.getData()


    //footer
    $(".footer").delegate('ul', 'click', function () {
        var ix = $(this).index();
        switch (ix) {
            case 0:
                window.location.href = "../index.html";
                break;
            case 1:
                window.location.href = "../msg/msg.html";
                break;
            case 2:
                window.location.href = "../search/search.html";
                break;
            case 3:
                window.location.href = "../shopping/shopping.html";
                break;
            case 4:

        }

    });

});