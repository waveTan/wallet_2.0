<template>
  <div id="app" class="app">
    <HeaderBar>
    </HeaderBar>
    <router-view>
    </router-view>
    <BottomBar>
    </BottomBar>
  </div>
</template>

<script>
  import HeaderBar from './components/HeaderBar'
  import BottomBar from './components/BottomBar'
  //const electron = require('electron');
  export default {
    components: {
      HeaderBar,
      BottomBar
    },
    created() {
     /* console.log(electron.remote.app);
      console.log(electron.remote.app.on);
      console.log(electron.remote.app.getName());*/
      //alert(electron.remote.app.getName());
    },
    methods: {

    }
  }
</script>

<style lang="less">
  @import "assets/css/base.less";
  .app{
    background-color: #ffffff;
  }
</style>
