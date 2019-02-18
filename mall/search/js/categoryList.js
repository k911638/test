let app = new Vue({
  el: '#app',
  data () {
    return {
      dialogShow: false,
      otherMarket: false,
      cartShow: false,
      searchValue: '',
      goodslist: null,
      marketlist: null,
      spreadRate: '',
      num: 1,
      curIndex: 0,
      errMsg: '',
      name: '',
      userId: null,
      accessToken: ''
    }
  },
  watch: {
    errMsg: function (newerrMsg, olderrMsg) {
      setTimeout(function() { 
        app.errMsg = ''    
      }, 1000);
    }
  },
	created () {
    this.listShow()
	},
  methods: {
    // 返回
    goback () {
      window.history.go(-1);
    },
    // 页面加载
    listShow () {
      let id = Number(getUrlParam("id"))
      this.userId = getCookie("userId")
      this.accessToken = getCookie("accessToken")
      Axios.post('/goods/goods/searchgoodsList.do', {
        // accessToken: this.accessToken,
        userId: this.userId,
        categoryId: id 
      }).then(res => {
        let list = res.data
        this.goodslist = list				
			}).catch(err => {
        console.error(err)
      })
    },
    // 搜索按钮
    submit () {
      let id = Number(getUrlParam("id"))
      if (this.searchValue!=='') {
        Axios.post('/goods/goods/searchgoodsList.do', {
          // accessToken: this.accessToken,
          userId: this.userId,
          goodsName: this.searchValue,
          categoryId: id
        }).then(res => {
          let list = res.data
          this.goodslist = list        			
        }).catch(err => {
          console.error(err)
        })
      }      
    },
    // 其它超市按钮
    otherPrice (index) {
      this.name = this.goodslist[index].name
      Axios.post('/goods/goods/supermarketPriceList.do', {
        // accessToken: this.accessToken,
        userId: this.userId,
        goodsSkuId: this.goodslist[index].goodsSkuId
      }).then(res => {
        let list = res.data.supermarketGoodsList
        this.spreadRate = res.data.spreadRate        
        this.marketlist = list
        this.dialogShow = true
        this.otherMarket = true
			}).catch(err => {
        console.error(err)
      })
    },
    // 加入购物车按钮
    cartdialogShow (index) {
      this.dialogShow = true
      this.cartShow = true
      this.curIndex = index
    },
    // 取消按钮
    btnCancel () {
      this.dialogShow = false
      this.otherMarket = false
      this.cartShow = false
    },
    // 加号按钮
    btnPlus () {
      if (this.num<99) {
        this.num = this.num + 1
      }
    },
    btnReduce () { // 减号按钮
      if (this.num>0) {
        this.num = this.num - 1
      }
    },
    // 加入购物车确定按钮
    btnOk () {
      Axios.post('/goods/shopCar/addShopCar.do', {
      //  accessToken: this.accessToken,
        userId: this.userId,
        goodsSkuId: this.goodslist[this.curIndex].goodsSkuId,
        quantity: this.num
      }).then(res => {        
        this.errMsg = "您已提交成功<br/>请到购物车查看"
      }).catch(err => {
        console.error(err)
      })
      this.dialogShow = false
      this.cartShow = false
      this.num = 1
    }
  }
})