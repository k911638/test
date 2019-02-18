var app = new Vue({
    el: "#search",
    data() {
        return {
            listData:[],
            showPriceShareBox: false,
            showPriceAuditBox: false
        }
    },
    mounted() {
        this.searchData()
    },
    methods: {
        searchData() {
            let self = this
            axios.post('goods/goods/vagueGoodsSku.do',{goodsName:'可乐',})
                .then(function (data) {
                    if(data.respCode == 'S'){
                        self.listData = data.data
                    }else{
                        self.listData = []
                    }
                    console.log(data)
                    console.log(self.listData)
                })
        }
        ,
        play() {
            this.view = true
        },
        cross() {
            this.view = false
        },
        immediately() {
            this.view1 = true
        },
        cancel() {
            this.view1 = false
        }
    }
})