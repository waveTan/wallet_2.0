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
    created(){
      const _this = this;
      console.log(_this.$electron);
      console.log("*****************");

      _this.$electron.ipcRenderer.send("checkForUpdate");
      _this.$electron.ipcRenderer.on("message", (event, text) => {
        console.log(arguments);
        _this.tips = text;
        alert(text)
      });
      _this.$electron.ipcRenderer.on("downloadProgress", (event, progressObj)=> {
        console.log(progressObj);
        _this.downloadPercent = progressObj.percent || 0;
      });
      _this.$electron.ipcRenderer.on("isUpdateNow", () => {
        _this.$electron.ipcRenderer.send("isUpdateNow");
      });
    },
    beforeDestroy(){
      // this.$electron.ipcRenderer.removeAll(["message", "downloadProgress", "isUpdateNow"]);
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
