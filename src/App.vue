<template>
  <div id="app">
     
      <router-view></router-view>
   
  </div>
</template>
<script>
export default {
  components:{
    
  },
  created(){
    //刷新url地址栏，直接回到首页
    
   
   this.$store.dispatch("initBookshelf")
  }
}
</script>