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

  export default {
    components: {
      HeaderBar,
      BottomBar
    },
    created() {

    },
    methods: {}
  }
</script>

<style lang="scss">
  @import "assets/css/base";
</style>
