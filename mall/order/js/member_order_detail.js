let app = new Vue({
  el: '#app',
  data () {
    return {
      data: null,
      userId: "",
      accessToken: ""
    }
  },
  created () {
	  this.getData()
  },
  methods: {
    // 返回
    goback () {
      window.history.go(-1);
    },
    // 获取数据
    getData () {
      let id = getUrlParam("id")
      this.userId = getCookie("userId")
      this.accessToken = getCookie("accessToken")
      Axios.post('/goods/order/getOrderDetails.do', {
      //  accessToken: this.accessToken,
        userId: this.userId,
        ordersId: id
      }).then(res => {
        this.data = res.data   				
			}).catch(err => {
        console.error(err)
      })
    },
    // 取消订单
    btnCancel () {
      Axios.post('/goods/order/updateOrderStatus.do',{
      //  accessToken: this.accessToken,
        userId: this.userId,
        ordersId: this.data.ordersId,
        userStatus: "CANCELED"
      }).then(res => {
        this.data.userStatus = "CANCELED"
			}).catch(err => {
        console.error(err)
      })
    },
    // 确认收货
    btnOk () {
      Axios.post('/goods/order/updateOrderStatus.do',{
      //  accessToken: this.accessToken,
        userId: this.userId,
        ordersId: this.data.ordersId,
        userStatus: "FINISHED"
      }).then(res => {
        this.data.userStatus = "FINISHED"
			}).catch(err => {
        console.error(err)
      })
    },
    // 再次/继续购买
    btnBuy () {
      Axios.post('/goods/order/againOrders.do',{
      //  accessToken: this.accessToken,
        userId: this.userId,
        ordersId: this.data.ordersId
      }).then(res => {
        window.location.href = ""
			}).catch(err => {
        console.error(err)
      })
    },
    // 全部拒收
    btnAllRejection () {
      let id = this.data.ordersId
      window.location.href = "member_order_allRejection.html?id=" + id
    }
  }
})