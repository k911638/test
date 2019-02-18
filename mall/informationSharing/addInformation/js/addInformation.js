var app = new Vue({
	el:"#price",
	data () {
	  return {
	  	play: false,
	  	play1: false,
	  	play2: false,
	  	value1: "",
	  	valuelist: [
	  	  {value: "正常价"},
	  	  {value: "促销价"},
	  	  {value: "处理价"},
	  	  {value: "会员价"},
	  	]
	  }
	},
	methods: {
	  reverseMessage (index) {
        this.value1 = this.valuelist[index].value
      },
		event () {
	  	this.play1 = true
	 },
	  cancel1(){
	  	this.play1 = false
	  },
	  upload () {
	  	this.play = true
	  },
	  cancel(){
	  	this.play = false
	  },
	  upload1 () {
	  	this.play2 = true
	  },
	  cancel11(){
	  	this.play2 = false
	  }
	}
})

