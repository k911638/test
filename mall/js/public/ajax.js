let ajax = function(options) {

    let setting = {
        url: '',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function(data) {

        },
        error: function(err) {
            console.log(err)
        },
        complete: function (XHR, TS) {
            if (XHR.responseText) {
                let data = JSON.parse(XHR.responseText)
                if (data.code == 1906) {
                    window.location.href = '/register/register0.html'
                }
            }
        }
    };

    $.extend(setting, options);

    if (window.location.href.indexOf('127.0.1') > -1 || window.location.href.indexOf('localhost') > -1) {
        setting.url = 'http://192.168.0.100:8081/wherebuyAPI/' + setting.url
    } else {
        setting.url = 'http://192.168.0.100:8081/wherebuyAPI/' + setting.url
    }

    let post = /post/ig;
    let put = /put/ig;
    if ((post.test(setting.type) || put.test(setting.type)) && setting.stringify !== false) {
        // setting.data = JSON.stringify(setting.data)
    }
console.log(setting.data)
    $.ajax(setting)
}

window.ajax = ajax