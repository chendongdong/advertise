<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
<style lang="scss">
  html,body{
    font-size:10px;
  }
  #app {
    width:100vw;
    height:100vh;
    position: relative;
  }
</style>
