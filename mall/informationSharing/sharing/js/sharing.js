var app = new Vue({
	el:"#sharing",
	data () {
	  return {
	  	play: false
	  }
	},
	methods: {
	  no () {
	  	this.play = true
	  },
	  cancel(){
	  	this.play = false
	  },
	  determine(){
	  	this.play = false
	  }
	}
})