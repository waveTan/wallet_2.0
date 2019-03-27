<template>
  <div class="consensus bg-gray">
    <h3 class="title">TTakMrubBXi998CZgaYdTy2Nrqwd2ptq<span>(wave)</span><i class="iconfont icon-fuzhi clicks"></i></h3>
    <div class="card w1200">
      <div class="card-info left fl">
        <h5 class="card-title font18">我的共识</h5>
        <ul>
          <li>总委托 <label class="click">123456.123456<span class="fCN">NULS</span></label></li>
          <li>可用余额 <label>123456.123456<span class="fCN">NULS</span></label></li>
          <li>总共识奖励 <label>123456.123456<span class="fCN">NULS</span></label></li>
        </ul>
      </div>
      <div class="card-info right fr">
        <h5 class="card-title font18">所有共识 <span class="font16 click fr">创建</span></h5>
        <ul>
          <li>共识节点 <label>100</label></li>
          <li>总节点数 <label>1234</label></li>
          <li>总委托量 <label>123456.123456<span class="fCN">NULS</span></label></li>
        </ul>
      </div>
    </div>

    <div class="cb"></div>
    <el-tabs v-model="consensusActive" @tab-click="handleClick" class="w1200">
      <el-tab-pane label="所有节点" name="consensusFirst">
        <div class="filter">
          <el-select v-model="value" placeholder="资产类型" >
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="资产类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

          <el-input placeholder="请选择输入ID\别名\地址...." class="search" v-model="search" suffix-icon="el-icon-search">
            <i class="iconfont icon-search_icon fr click"></i>
          </el-input>

        </div>

      </el-tab-pane>
      <el-tab-pane label="我的节点" name="consensusSecond">我的节点</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name:'consensus',
    data() {
      return {
        consensusActive: 'consensusFirst',
        options: [
          {value: '选项1', label: '普通资产'},
          {value: '选项2', label: '合约资产'}
        ],
        value: '',
        search:'',
      };
    },
    components: {},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style lang="less">
  .consensus {

    .card {
      margin: -20px auto 0;
      height: 200px;
      .left, .right {
        width: 590px;
      }
    }

  }
</style>
