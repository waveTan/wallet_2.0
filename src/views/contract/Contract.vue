<template>
  <div class="contract">
    <h3 class="title">TTakMrubBXi998CZgaYdTy2Nrqwd2ptq<span>(wave)</span><i class="iconfont icon-fuzhi clicks"></i></h3>

    <el-tabs v-model="contractActive" @tab-click="handleClick" class="w1200">
      <el-tab-pane label="我的合约" name="contractFirst">
        我的合约
      </el-tab-pane>
      <el-tab-pane label="查找合约" name="contractSecond">
        查找合约
      </el-tab-pane>
      <el-tab-pane label="部署合约" name="contractThird">
        部署合约
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        contractActive: 'contractFirst'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="less">
  @import "./../../assets/css/style";
  .contract{
    background-color: @Bcolour1;
    .el-tabs {
      margin: 30px auto 0;
    }
  }

</style>
