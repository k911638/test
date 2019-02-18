var app = new Vue({
	el:"#history",
	data () {
	  return {
	  	play: false
	  }
	},
	methods: {
	  test () {
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