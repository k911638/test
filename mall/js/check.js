;
(function() {

    const login = {
        // 加载登录弹窗样式
        loadStyle(url) {
            let link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = url;
            let head = document.getElementsByTagName('head')[0];
            head.appendChild(link);
        },

        //登录检测弹窗结构
        html() {
            let pops_window = document.createElement('div')
            pops_window.setAttribute('class', 'pops_window')
            let pops_windowBg = document.createElement('div')
            pops_windowBg.setAttribute('class', 'pops_windowBg')
            let pops_windowContainer = document.createElement('div')
            pops_windowContainer.setAttribute('class', 'pops_windowContainer')
            let pops_windowBox = document.createElement('div')
            pops_windowBox.setAttribute('class', 'pops_windowBox')
            let pops_windowTitle = document.createElement('h1')
            pops_windowTitle.innerText = '温馨提示'
            pops_windowTitle.setAttribute('class', 'pops_windowTitle')
            let pops_windowGo = document.createElement('p')
            pops_windowGo.innerText = '请先登录'
            pops_windowGo.setAttribute('class', 'pops_windowGo')
            let pops_windowButton = document.createElement('div')
            pops_windowButton.setAttribute('class', 'pops_windowButton')
            let pops_windowCancel = document.createElement('span')
            pops_windowCancel.setAttribute('class', 'pops_windowCancel')
            let pops_windowOk = document.createElement('span')
            pops_windowOk.setAttribute('class', 'pops_windowOk')
            let pops_windowBtnCancel = document.createElement('a')
            pops_windowBtnCancel.setAttribute('href', '/index.html')
            pops_windowBtnCancel.innerText = '取消'
            let pops_windowSubmit = document.createElement('a')
            pops_windowSubmit.setAttribute('href', '/register/register0.html')
            pops_windowSubmit.innerText = '去登录'
            pops_window.append(pops_windowBg)    
            pops_windowBox.append(pops_windowTitle)
            pops_windowBox.append(pops_windowGo)
            pops_windowBox.append(pops_windowButton)
            pops_windowButton.append(pops_windowCancel)
            pops_windowButton.append(pops_windowOk)
            pops_windowCancel.append(pops_windowBtnCancel)
            pops_windowOk.append(pops_windowSubmit)
            pops_windowContainer.append(pops_windowBox)
            pops_window.append(pops_windowContainer)
            return pops_window
        },


        //登录检测初始化
        init() {
            let self = this;
            self.loadStyle('/css/public/check.css');
            let accessToken = self.getCookie("accessToken");
            let accountId = self.getCookie("accountId");
            let userId = self.getCookie("userId");
            if (!accessToken || !userId || !accountId) {

                if (window.location.href.indexOf('accessToken') && window.location.href.indexOf('accessToken') > -1) {
                    return false
                }

                document.body.append(self.html())


                setTimeout(function() {
                    // window.location.href = "/register/register0.html";
                }, 3500);
            }
        },

        // 获取cookie的方法
        getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        }

         
    };

    // 登录初始化
    login.init()
}());