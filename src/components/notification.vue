<template>
  <transition name="fade">
    <div
      class="notification"
      v-if="show">
      {{text}}
    </div>
  </transition>
</template>

<script>
  export default {
  	data(){
  		return {
  			show: false
      }
    },
    props: {
    	text: {type: String}
    },
    watch: {
    	text(){
    		this.show = true;
        setTimeout(()=>{this.show = false}, 5000)
      }
    }
  }
</script>