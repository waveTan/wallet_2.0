<template>
  <div class="header">
    <div class="w1200">
      <div class="logo">
        <img class="click" :src=logoSvg>
      </div>
      <div class="nav">
        <el-menu mode="horizontal" :default-active="navActive" @select="handleSelect">
          <el-menu-item index="home">钱包</el-menu-item>
          <el-menu-item index="transfer">转账</el-menu-item>
          <el-menu-item index="consensus">共识</el-menu-item>
          <el-menu-item index="contract">合约</el-menu-item>
          <el-submenu index="5">
            <template slot="title">应用</template>
            <el-menu-item index="2-1">应用1</el-menu-item>
            <el-menu-item index="2-2">应用2</el-menu-item>
            <el-menu-item index="2-3">应用3</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="tool">
        <el-menu mode="horizontal" :default-active="navActive" @select="handleSelect">
          <el-submenu index="21" class="user">
            <template slot="title"><i class="iconfont icon-zhanghu_icon"></i></template>
            <el-menu-item index="2-1"><i class="el-icon-check"></i>TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o</el-menu-item>
            <el-menu-item index="2-2"><i class="el-icon-share"></i>TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o</el-menu-item>
            <el-menu-item index="2-3"><i class="el-icon-share"></i>TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o</el-menu-item>
          </el-submenu>
          <el-submenu index="22">
            <template slot="title">设置</template>
            <el-menu-item index="2-1">系统设置</el-menu-item>
            <el-menu-item index="2-2">服务节点</el-menu-item>
          </el-submenu>
          <el-submenu index="23">
            <template slot="title">Eng</template>
            <el-menu-item index="中文">中文</el-menu-item>
            <el-menu-item index="English">English</el-menu-item>
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
       * @param key
       * @param keyPath
       */
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.$router.push({
          name: key
        })
      }
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
