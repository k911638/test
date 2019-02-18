let app = new Vue({
	el: '#app',
	data () {
		return {
			navList: null,			
			curIndex: 0,
			twoList: null,
			curTwo: 0,
      goodslist: null
		}
	},
	created () {
	  this.getClassList()
	},
	methods: {
		// 返回
    goback () {
      window.history.go(-1);
    },
		getAddress () {
			window.location.href='/index.html'
		},
		getClassList () {
			Axios.post('/goods/category/showCategory.do', {
        parentId: -1
      }).then(res => {
        this.setNavList (res)
				this.getClassPage ()				
			}).catch(err => {
        console.error(err)
      })
		},
		setNavList (res) {
			let list = res.data
      this.navList = list
    },
    changeIndex (index) {
			if (this.curIndex!==index) {
				this.curIndex = index
				this.curTwo = 0
				this.getClassPage()
			}			
		},
		getClassPage () {
			Axios.post('/goods/category/showCategory.do', {
				parentId: this.navList[this.curIndex].categoryId
			}).then(res => {
				let two = res.data
				this.twoList = two
				this.getGoodsPage ()
			}).catch(err => {
        console.error(err)
      })
		},
		changeTwo (index) {
			if (this.curTwo!==index) {
				this.curTwo = index
				this.getGoodsPage()
			}			
		},
		getGoodsPage () {
			Axios.post('/goods/category/showCategory.do', {
				parentId: this.twoList[this.curTwo].categoryId
			}).then(res => {
				let goods = res.data
				this.goodslist = goods
			}).catch(err => {
        console.error(err)
      })
    }
	}	
})
