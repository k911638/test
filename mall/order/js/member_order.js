let app = new Vue({
  el: '#app',
  data () {
    return {
      orderList: null,
      typeid: parseInt(getUrlParam("typeid")) || 1,
      types: [{
        typeid: 1,
        type: "ALL",
        name: '全部'
      }, {
        typeid: 2,
        type: "WAIT_QUERY",
        name: '待查询'
      }, {
        typeid: 3,
        type: "IN_PROGRESS",
        name: '进行中'
      }, {
        typeid: 4,
        type: "FINISHED",
        name: '已完成'
      }, {
        typeid: 5,
        type: "CANCELED",
        name: '已取消'
      }],
      transitionName: 'page-left',
      curIndex: 0,
      userStatus: "",
      tipsText: "",
      dialogShow: false,
      errMsg: "",
      userId: "",
      accessToken: ""
    }
  },computed: {
    typeTitle () {
      switch (this.typeid) {
        case 1:
          return '全部订单'
        case 2:
          return '正在查询价格订单'
        case 3:
          return '进行中订单'
        case 4:
          return '已完成订单'
        case 5:
          return '已取消订单'
      }
    },
    typeName () {
      switch (this.typeid) {
        case 1:
          return ''
        case 2:
          return '待查询价格的'
        case 3:
          return '进行中的'
        case 4:
          return '已完成的'
        case 5:
          return '已取消的'
      }
    }
  },
  watch: {
    errMsg: function (newerrMsg, olderrMsg) {
      setTimeout(function() { 
        app.errMsg = ''    
      }, 2000);
    }
  },
  created () {
	  this.getOrderList(this.typeid)
  },
  methods: {
    // 返回
    goback () {
      window.history.go(-1);
    },   
    // 获取订单
    getOrderList (type) {
      let typeName = ''
      switch (type) {
        case 1:
          typeName = 'ALL'
          break
        case 2:
          typeName = 'WAIT_QUERY'
          break
        case 3:
          typeName = 'IN_PROGRESS'
          break
        case 4:
          typeName = 'FINISHED'
          break
        case 5:
          typeName = 'CANCELED'
          break
      }
      this.userId = getCookie("userId")
      this.accessToken = getCookie("accessToken")
      Axios.post('/goods/order/getOrderList.do',{
      //  accessToken: this.accessToken,
        userId: this.userId,
        userStatus: typeName
      }).then(res => {
        let list = res.data
        this.orderList = list
			}).catch(err => {
        console.error(err)
      })
    },
    // 获取待查询订单
    getConfirmlist () {
      // this.typeName = '正在查询价格订单'
    },
    changeTab (typeid, type) {
      document.querySelector('.page-con').scrollTo(0, 0)
      this.transitionName = typeid > this.typeid ? 'page-left' : 'page-right'
      this.typeid = typeid
      if (type==='WAIT_QUERY') {
        this.getConfirmlist()
      } else {
        this.getOrderList(typeid)
      }      
    },
    btnCancelOrder (index) {
      this.curIndex = index
      this.userStatus = "CANCELED"
      this.tipsText = "您确定要取消订单吗?"
      this.dialogShow = true
    },
    btnConfirmlOrder (index) {
      this.curIndex = index
      this.userStatus = "FINISHED"
      this.tipsText = "您确定要确认收货吗?"
      this.dialogShow = true
    },
    btnCancel () {
      this.dialogShow = false
    },
    btnOk () {
      Axios.post('/goods/order/updateOrderStatus.do',{
      //  accessToken: this.accessToken,
        userId: this.userId,
        ordersId: this.orderList[this.curIndex].ordersId,
        userStatus: this.userStatus
      }).then(res => {
        this.orderList[this.curIndex].userStatus = this.userStatus
        this.dialogShow = false
			}).catch(err => {
        console.error(err)
      })
    },
    btnBuy (index) {
      Axios.post('/goods/order/againOrders.do',{
      //  accessToken: this.accessToken,
        userId: this.userId,
        ordersId: this.orderList[index].ordersId
      }).then(res => {
        this.errMsg = "商品已加入购物车<br>请到购物车结算！"
			}).catch(err => {
        console.error(err)
      })
    },
    toView (id) {
      window.location.href = 'member_order_detail.html?id=' + id
    }
  }
})