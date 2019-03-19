<template>
  <div class="header">
    <b-navbar toggleable="lg">
      <b-navbar-brand>
        <img class="logo click" :src=logoSvg>
      </b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"/>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item @click="toNav('wallet')" :class="navActive ==='wallet' ? 'active':''">钱包</b-nav-item>
          <b-nav-item @click="toNav('transfer')" :class="navActive ==='transfer' ? 'active':''">转账</b-nav-item>
          <b-nav-item @click="toNav('consensus')" :class="navActive ==='consensus' ? 'active':''">共识</b-nav-item>
          <b-nav-item @click="toNav('contract')" :class="navActive ==='contract' ? 'active':''">合约</b-nav-item>
          <b-nav-item @click="toNav('application')" :class="navActive ==='application' ? 'active':''">应用</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown>
            <template slot="button-content"><i class="iconfont icon-zhanghu_icon"></i></template>
            <b-dropdown-item class="small"><i class="iconfont icon-weituoxinxi"></i> Nse8qUCgvTj4taDt4jqZQbo3EqjMWaVe(bolang)</b-dropdown-item>
            <b-dropdown-item class="small"><i class="iconfont"></i> Nse8qUCgvTj4taDt4jqZQbo3EqjMWaVe(wave)</b-dropdown-item>
            <b-dropdown-item class="small"><i class="iconfont"></i> Nse8qUCgvTj4taDt4jqZQbo3EqjMWaVe(wave88)</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="设置" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item>
            <span class="pc">|</span>
          </b-nav-item>

          <b-nav-item>
            <span>帮助</span>
          </b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>

<script>
  import * as config from '../config.js'
  import logo from './../assets/img/logo.svg'
  import testnetLogo from './../assets/img/logo-test-black.svg'

  export default {
    data() {
      return {
        //logo
        logoSvg: config.RUN_DEV ? logo : testnetLogo,
        //菜单选中
        navActive: 'wallet'
      };
    },
    components: {},
    created() {

    },
    mounted() {
    },
    methods: {

      /**
       * 菜单导航
       * @param name
       */
      toNav(name) {
        this.navActive = name;
        if(name ==='contract' ){
          this.$router.push({
            name: 'contract',
          })
        }
      }
    },
    watch: {}
  }
</script>

<style lang="scss">
  @import "./../assets/css/style";

  .header {
    border-bottom: 1px solid $Mcolour;
    .navbar {
      max-width: 1200px;
      margin: 0 auto;
      .logo {
        width: 5.5rem;
      }
    }
  }
</style>
