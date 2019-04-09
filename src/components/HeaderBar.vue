<template>
  <div class="header">
    <div class="w1200">
      <div class="logo">
        <img class="click" :src=logoSvg>
      </div>
      <div class="nav">
        <el-menu mode="horizontal" :default-active="navActive" @select="handleSelect">
          <el-menu-item index="home">{{$t('nav.wallet')}}</el-menu-item>
          <el-menu-item index="transfer">{{$t('nav.transfer')}}</el-menu-item>
          <el-menu-item index="consensus">{{$t('nav.consensus')}}</el-menu-item>
          <el-menu-item index="contract" disabled>{{$t('nav.contracts')}}</el-menu-item>
          <!--<el-submenu index="5" disabled>
            <template slot="title">{{$t('nav.application')}}</template>
            <el-menu-item index="2-1">应用1</el-menu-item>
            <el-menu-item index="2-2">应用2</el-menu-item>
            <el-menu-item index="2-3">应用3</el-menu-item>
          </el-submenu>-->
        </el-menu>
      </div>
      <div class="tool">
        <el-menu mode="horizontal" :default-active="navActive" @select="handleSelect">
          <el-submenu index="address" class="user">
            <template slot="title"><i class="iconfont icon-zhanghu_icon"></i></template>

            <el-menu-item v-for="item in addressList" :key="item.address" :index="item.address">
              <i class="el-icon-check" :class="item.selection ? '' : 'transparent' "></i>
              {{item.address}}<span v-show="item.alias">({{item.alias}})</span>
            </el-menu-item>
            <el-menu-item index="address" class="tc">more</el-menu-item>
          </el-submenu>
          <el-submenu index="22">
            <template slot="title">设置</template>
            <el-menu-item index="2-1">系统设置</el-menu-item>
            <el-menu-item index="2-2">服务节点</el-menu-item>
          </el-submenu>
          <el-submenu index="lang">
            <template slot="title">{{this.lang ==="en" ? "Eng":"中文"}}</template>
            <el-menu-item index="cn">中文</el-menu-item>
            <el-menu-item index="en">English</el-menu-item>
          </el-submenu>
          <li class="el-menu-item">|</li>
          <el-menu-item index="24">帮助</el-menu-item>
        </el-menu>

      </div>
    </div>
    <div class="cb"></div>
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
        navActive: '1',
        //地址列表
        addressList: [],
        //语言选择
        lang: 'cn'
      };
    },
    components: {},
    created() {
      this.getAddressList();
    },
    mounted() {
      setInterval(() => {
        this.getAddressList();
      }, 500)
    },
    methods: {

      /**
       * 菜单导航
       * @param key
       * @param keyPath
       */
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
        if (keyPath.length > 1) {
          if (keyPath[0] === "address") {
            if (keyPath[1] === "address") {
              this.$router.push({
                name: keyPath[1]
              })
            } else {
              for (let itmes of this.addressList) {
                //清除选中
                if (itmes.selection) {
                  itmes.selection = false;
                  localStorage.setItem(itmes.address, JSON.stringify(itmes))
                }
                //添加选中
                if (itmes.address === keyPath[1]) {
                  itmes.selection = true;
                  localStorage.setItem(itmes.address, JSON.stringify(itmes))
                }
              }
            }
          } else if (keyPath[0] === "lang") {
            this.selectLanguage(key)
          }
        } else {
          this.$router.push({
            name: key
          })
        }
      },

      /**
       * 获取账户列表
       */
      getAddressList() {
        this.addressList = [];
        for (let i = localStorage.length - 1; i >= 0; i--) {
          if (localStorage.getItem(localStorage.key(i)) !== 'SILENT') {
            this.addressList.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
          }
        }
        for (let itmes of this.addressList) {
          if (itmes.selection) {
            sessionStorage.clear();
            sessionStorage.setItem(itmes.address, JSON.stringify(itmes))
          }
        }
      },

      /**
       * 语言切换
       * @param e
       * @param Boolean
       */
      selectLanguage(e) {
        this.lang = e;
        this.$i18n.locale = this.lang;
      },
    },
    watch: {}
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  .header {
    border-bottom: 1px solid @Dcolour;
    height: 80px;
    .logo {
      width: 120px;
      float: left;
      img {
        margin: 20px 0 0 0;
        width: 100%;
      }
    }
    .nav {
      width: 600px;
      margin: 10px 0 0 0;
      float: left;
    }
    .tool {
      width: 340px;
      margin: 10px 0 0 0;
      float: right;
      background-color: #e6a23c;
      .user {
        .el-submenu__title {
          .el-icon-arrow-down {
            margin: 35px 0 0 -16px
          }
        }
      }
    }
  }
</style>
