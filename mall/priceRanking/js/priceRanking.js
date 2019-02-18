let app = new Vue({
  el: '#app',
  data () {
    return {
      dialogShow: false,
      typeId: 1,
      oldId: '',
      curIndex: 0,
      regions: [
        {
          id: 0,
          name: '请选择',
          list: []
        },
        {
          id: 0,
          name: '',
          list: []
        },
        {
          id: 0,
          name: '',
          list: []
        },
        {
          id: 0,
          name: '',
          list: []
        },
        {
          id: 0,
          name: '',
          list: []
        },
        {
          id: 0,
          name: '',
          list: []
        }
      ],
      curList: [],
      goodslist: null,
      sreachValue: "",
      Top: "",
      Left: "",
      Height: "",
      brandlist: null,
      accessToken: "",
      userId: null      
    }
  },
  created () {
    this.getData()
  },
  watch: {
    curIndex (val) {
      this.curList = this.regions[val].list
    },
    regions: {
      deep: true,
      handler (val) {
        this.curList = val[this.curIndex].list
      }
    },
    sreachValue (val) {
      if (val!=="") {
        this.getBrandName(val)
      }
    }
  },
  computed: {    
    Style () {      
      return this.sreachValue === "" ? {
        top: this.Top + this.Height
      } : {
        top: this.Top + this.Height
      }
    }
  },
  methods: {
    // 返回
    goback () {
      window.history.go(-1);
    }, 
    // 获取综合数据
    getData () {
      this.userId = Number(getCookie("userId"))
      this.accessToken = getCookie("accessToken")
      Axios.post('/goods/goods/differenceRanking.do', {
        // accessToken: this.accessToken,
        userId: this.userId
      }).then(res => {
        this.goodslist = res.data
      }).catch(err => {
        console.error(err)
      })
    },
    // 点击综合
    changeAll () {
      this.typeId = 1
      this.getData()
    },
    // 点击区域
    changeArea () {
      this.oldId = this.typeId
      this.typeId = 2
      this.dialogShow = true
      this.getArea()
    },
    // 获取区域数据
    getArea () {
      Axios.post('/area/area/getAllArea.do', {
        accessToken: this.accessToken
      }).then(res => {
        this.regions[this.curIndex].list = res.data
      }).catch(err => {
        console.error(err)
      })
    },
    // 点击分类
    changeCategory () {
      this.oldId = this.typeId
      this.typeId = 3
      this.dialogShow = true
      this.getCategory()
    },
    // 获取分类数据
    getCategory () {
      Axios.post('/goods/category/showAllCategory.do').then(res => {
        this.regions[this.curIndex].list = res.data
      }).catch(err => {
        console.error(err)
      })
    },
    // 点击品牌
    changeBrand () {
      this.goodslist = null
      this.typeId = 4
      this.$nextTick(() => {
        this.sreachValue = ""
        this.Top = this.$refs.sreachInput.getBoundingClientRect().top
        this.Height = this.$refs.sreachInput.getBoundingClientRect().height
      })
    },
    // 品牌输入框获取品牌列表数据
    getBrandName (val) {
      Axios.post('/brand/brand/searchBrand.do', {
        brandName: val
      }).then(res => {
        this.brandlist = res.data
      }).catch(err => {
        console.error(err)
      })
    },
    // 品牌列表点击获取商品列表
    getBrand (index) {
      Axios.post('/goods/goods/differenceRanking.do', {
        // accessToken: this.accessToken,
        userId: this.userId,
        brandId: this.brandlist[index].brandId
      }).then(res => {
        this.goodslist = res.data
      }).catch(err => {
        console.error(err)
      })
    },
    // 区域和分类分级获取数据
    select (list) {
      this.regions[this.curIndex].name = list.name
      if (list.hasOwnProperty("code") || list.hasOwnProperty("smallCommunityId")) { // 区域按分级获取数据
        this.regions[this.curIndex].id = list.code
        if (this.curIndex < 4) {
          this.curIndex++
          this.regions[this.curIndex].name = '请选择'
          this.regions[this.curIndex].list = list.child
        } else if (this.curIndex === 4) { // 区域最后一级获取小区数据
          this.curIndex++
          this.regions[this.curIndex].name = '请选择'
          Axios.post('/area/SmallCommunity/getSmallCommunity.do', {
            accessToken: this.accessToken,
            areaCode: list.code
          }).then(res => {            
            this.curList = res.data
          }).catch(err => {
            console.error(err)
          })          
        } else {
          Axios.post('/goods/goods/differenceRanking.do', { // 按小区Id获取商品列表数据
            // accessToken: this.accessToken,
            userId: this.userId,
            communityId: list.communityId
          }).then(res => {            
            this.goodslist = res.data
          }).catch(err => {
            console.error(err)
          })  
          this.close()
          this.typeId = 2
        }
      } else { // 分类按分级获取数据
        this.regions[this.curIndex].id = list.categoryId
        if (this.curIndex < 2) {
          this.curIndex++
          this.regions[this.curIndex].name = '请选择'
          this.regions[this.curIndex].list = list.children
        } else if (this.curIndex === 2) { // 按3级分类Id获取商品列表数据
          Axios.post('/goods/goods/differenceRanking.do', {
            // accessToken: this.accessToken,
            userId: this.userId,
            categoryId: list.categoryId
          }).then(res => {            
            this.goodslist = res.data
          }).catch(err => {
            console.error(err)
          })
          this.close()
          this.typeId = 3
        }
      }
    },
    // 区域和分类弹框tab切换处理
    changeTab (index) {
      this.curIndex = index
      this.regions[index].name = '请选择'
      for (let i = index + 1; i < 6; i++) {
        this.regions[i] = {
          id: 0,
          name: '',
          list: []
        }
      }
    },
    // 区域和分类弹框关闭按钮
    close () {
      this.curIndex = 0
      this.regions[0].name = '请选择'
      for (let i = 1; i < 6; i++) {
        this.regions[i] = {
          id: 0,
          name: '',
          list: []
        }
      }
      this.curList = null
      this.dialogShow = false
      this.typeId = this.oldId
    }
  }
})