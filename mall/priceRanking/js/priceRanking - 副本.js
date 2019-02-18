let app = new Vue({
  el: '#app',
  data () {
    return {
      dialogShow: false,
      typeId: 1,
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
        }
      ],
      curList: []
    }
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
    }
  },
  methods: {
    changeArea () {
      this.typeId = 2
      this.dialogShow = true
      this.getArea()
    },
    getArea () {
      axios.get('/Arealist').then(res => {
        this.regions[this.curIndex].list = res.data.data
      }).catch(err => {
        console.error(err)
      })
    },
    select (list) {
      this.regions[this.curIndex].name = list.name
      this.regions[this.curIndex].id = list.id
      if (this.curIndex < 2) {
        this.curIndex++
        this.regions[this.curIndex].name = '请选择'
        this.regions[this.curIndex].list = list.child
      } else if (this.curIndex === 2) {
        this.curIndex++
        this.regions[this.curIndex].name = '请选择'
        Address.region(list.id).then(res => {
          this.regions[this.curIndex].list = res.data
          this.curList = res.data
        })
      } else {
        let region = this.regions
        this.$emit('region', {
          province: region[0].name,
          province_id: region[0].id,
          city: region[1].name,
          city_id: region[1].id,
          district: region[2].name,
          district_id: region[2].id,
          area: region[3].name,
          area_id: region[3].id
        })
        this.close()
      }
    },
    changeTab (index) {
      this.curIndex = index
      this.regions[index].name = '请选择'
      for (let i = index + 1; i < 4; i++) {
        this.regions[i] = {
          id: 0,
          name: '',
          list: []
        }
      }
    },
    close () {
      this.curIndex = 0
      this.regions[0].name = '请选择'
      for (let i = 1; i < 4; i++) {
        this.regions[i] = {
          id: 0,
          name: '',
          list: []
        }
      }
      this.$emit('input', false)
    }
  }
})