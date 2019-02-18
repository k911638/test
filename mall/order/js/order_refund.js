let app = new Vue({
  el: '#app',
  data () {
    return {
      orderList: null
    }
  },
  created () {
	  this.getOrderList()
  },
  methods: {
    // 返回
    goback () {
      window.history.go(-1);
    }, 
    getOrderList () {
      let accessToken = getCookie("accessToken")
      let userId = getCookie("userId")
      Axios.post('/goods/order/afterSale.do', {
      //  accessToken: accessToken,
        userId: userId
      }).then(res => {
        let list = res.data
        this.orderList = list
			}).catch(err => {
        console.error(err)
      })
    }
  }
})