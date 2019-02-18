;$(function () {
    var $pop = $('.pop_window1');
    var userId = $.cookie('userId')
    var accessToken = $.cookie('accessToken')


    $(".member_header").delegate('span', 'click', function () {

        const ix = $(this).index();
        switch (ix) {
            case 0:
                window.location.href = "member_info.html";
                break
            case 1:
                const val = $("#dateSelectorOne").val();
                const user = $.cookie('layuser');
                if (val == "") {
                    $pop.children().html("生日不能为空").end().show(function () {
                        const this_ = $(this);
                        setTimeout(function () {
                            this_.hide();
                            return;
                        }, 800);
                    });
                } else {
                    let param = new FormData();
                    param.append('userId', userId);
                    param.append('accessToken', accessToken);
                    param.append('birthday', val);
                    new ajax({
                        url: 'user/user/saveUserInfo.do',
                        type: 'post',
                        processData: false,
                        contentType: false,
                        data: param,
                        success: function (data) {
                            localStorage.setItem("userInfo",JSON.stringify(data.data))
                            $pop.children().html("保存成功").end().show(function () {
                                const this_ = $(this);
                                setTimeout(function () {
                                    this_.hide();
                                    window.location.href = "member_info.html";
                                }, 800);
                            })
                        }
                    })
                }

        }
    });
});