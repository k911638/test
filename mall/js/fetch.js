;
if (window.location.href.indexOf('127.0.0.1') > -1 || window.location.href.indexOf('localhost') > -1) {
    axios.defaults.baseURL = 'http://192.168.0.100:8081/wherebuyAPI/'
} else {
    axios.defaults.baseURL = 'http://192.168.0.100:8081/wherebuyAPI/'
}

const Axios = axios.create({
  timeout: 10000,
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": 'application/json;charset=UTF-8'
  }
  // ,
  // transformRequest: [function (data) {
  //   // 对 data 进行任意转换处理
  //   const accessToken = getCookie("accessToken")
  //   data[accessToken] = accessToken
  //   return data;
  // }]
});

// 添加请求拦截器
// Axios.interceptors.request.use(    
//   config => {
//     const token = getCookie("accessToken");
//     token && (config.headers.Authorization = token);
//     return config;
//   },
//   error => {        
//     return Promise.error(error);    
// })

// 添加响应拦截器
Axios.interceptors.response.use(    
  response => {
    if (response.data.errCode === 1906) {
        window.location.href = '/register/register0.html'
        return false
    }
    // 对响应数据做点什么
    return Promise.resolve(response.data);
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 获取cookie
function getCookie (name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    if(name === 'userId'){
      return Number(unescape(arr[2]));
    }else{
      return unescape(arr[2]);
    }
  } else {
      return null;
  }
}

// 获取地址栏参数
function getUrlParam(paraName) {
  let url = document.location.toString();
  let arrObj = url.split("?");

  if (arrObj.length > 1) {
    let arrPara = arrObj[1].split("?");
    let arr;
      for (let i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");

          if (arr != null && arr[0] == paraName) {
              return arr[1];
          }
      }
      return "";
  } else {
      return "";
  }
}
