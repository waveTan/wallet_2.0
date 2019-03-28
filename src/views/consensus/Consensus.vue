<template>
  <div class="consensus bg-gray">
    <h3 class="title">TTakMrubBXi998CZgaYdTy2Nrqwd2ptq<span>(wave)</span><i class="iconfont icon-fuzhi clicks"></i></h3>
    <div class="card w1200">
      <div class="card-info left fl">
        <h5 class="card-title font18">我的共识</h5>
        <ul>
          <li>总委托 <label><u class="td click" @click="toUrl('consensusList')">123456.123456</u><span class="fCN">NULS</span></label></li>
          <li>可用余额 <label>123456.123456<span class="fCN">NULS</span></label></li>
          <li>总共识奖励 <label>123456.123456<span class="fCN">NULS</span></label></li>
        </ul>
      </div>
      <div class="card-info right fr">
        <h5 class="card-title font18">所有共识 <span class="font16 click fr" @click="toUrl('newConsensus')">创建</span></h5>
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
          <el-select v-model="value" placeholder="资产类型">
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

        <div class="node">
          <div class="node_info click" @click="toUrl('consensusInfo')">
            <h4 class="bg-gray">
              <i class="el-icon-check"></i>
              8FDFSF6SDF
              <i class="el-icon-edit-outline"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white">
              <li>别名<span>wave</span></li>
              <li>佣金比例 <span>10%</span></li>
              <li>总委托量<span>87654321.32145678</span></li>
              <li>参与人数<span>50</span></li>
              <li>保证金<span>5000000</span></li>
              <li>信用值<span>0.8</span></li>
            </ul>
          </div>
          <div class="node_info">
            <h4 class="bg-gray">
              <i class="el-icon-check"></i>
              8FDFSF6SDF
              <i class="el-icon-edit-outline"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white">
              <li>别名<span>wave</span></li>
              <li>佣金比例 <span>10%</span></li>
              <li>总委托量<span>87654321.32145678</span></li>
              <li>参与人数<span>50</span></li>
              <li>保证金<span>5000000</span></li>
              <li>信用值<span>0.8</span></li>
            </ul>
          </div>
          <div class="node_info">
            <h4 class="bg-gray">
              <i class="el-icon-check"></i>
              8FDFSF6SDF
              <i class="el-icon-edit-outline"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white">
              <li>别名<span>wave</span></li>
              <li>佣金比例 <span>10%</span></li>
              <li>总委托量<span>87654321.32145678</span></li>
              <li>参与人数<span>50</span></li>
              <li>保证金<span>5000000</span></li>
              <li>信用值<span>0.8</span></li>
            </ul>
          </div>
          <div class="node_info">
            <h4 class="bg-gray">
              <i class="el-icon-check"></i>
              8FDFSF6SDF
              <i class="el-icon-edit-outline"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white">
              <li>别名<span>wave</span></li>
              <li>佣金比例 <span>10%</span></li>
              <li>总委托量<span>87654321.32145678</span></li>
              <li>参与人数<span>50</span></li>
              <li>保证金<span>5000000</span></li>
              <li>信用值<span>0.8</span></li>
            </ul>
          </div>
          <div class="node_info">
            <h4 class="bg-gray">
              <i class="el-icon-check"></i>
              8FDFSF6SDF
              <i class="el-icon-edit-outline"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white">
              <li>别名<span>wave</span></li>
              <li>佣金比例 <span>10%</span></li>
              <li>总委托量<span>87654321.32145678</span></li>
              <li>参与人数<span>50</span></li>
              <li>保证金<span>5000000</span></li>
              <li>信用值<span>0.8</span></li>
            </ul>
          </div>
          <div class="node_info">
            <h4 class="bg-gray">
              <i class="el-icon-check"></i>
              8FDFSF6SDF
              <i class="el-icon-edit-outline"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white">
              <li>别名<span>wave</span></li>
              <li>佣金比例 <span>10%</span></li>
              <li>总委托量<span>87654321.32145678</span></li>
              <li>参与人数<span>50</span></li>
              <li>保证金<span>5000000</span></li>
              <li>信用值<span>0.8</span></li>
            </ul>
          </div>
          <div class="node_info">
            <h4 class="bg-gray">
              <i class="el-icon-check"></i>
              8FDFSF6SDF
              <i class="el-icon-edit-outline"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white">
              <li>别名<span>wave</span></li>
              <li>佣金比例 <span>10%</span></li>
              <li>总委托量<span>87654321.32145678</span></li>
              <li>参与人数<span>50</span></li>
              <li>保证金<span>5000000</span></li>
              <li>信用值<span>0.8</span></li>
            </ul>
          </div>
          <div class="node_info">
            <h4 class="bg-gray">
              <i class="el-icon-check"></i>
              8FDFSF6SDF
              <i class="el-icon-edit-outline"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white">
              <li>别名<span>wave</span></li>
              <li>佣金比例 <span>10%</span></li>
              <li>总委托量<span>87654321.32145678</span></li>
              <li>参与人数<span>50</span></li>
              <li>保证金<span>5000000</span></li>
              <li>信用值<span>0.8</span></li>
            </ul>
          </div>
          <div class="cb"></div>
        </div>

      </el-tab-pane>
      <el-tab-pane label="我的节点" name="consensusSecond">
        <div class="filter">
          <el-select v-model="value" placeholder="资产类型">
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

        <div class="node">
          <div class="node_info">
            <h4 class="bg-gray">
              <i class="el-icon-check"></i>
              8FDFSF6SDF
              <i class="el-icon-edit-outline"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white">
              <li>别名<span>wave</span></li>
              <li>佣金比例 <span>10%</span></li>
              <li>总委托量<span>87654321.32145678</span></li>
              <li>参与人数<span>50</span></li>
              <li>保证金<span>5000000</span></li>
              <li>信用值<span>0.8</span></li>
            </ul>
          </div>
          <div class="node_info">
            <h4 class="bg-gray">
              <i class="el-icon-check"></i>
              8FDFSF6SDF
              <i class="el-icon-edit-outline"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white">
              <li>别名<span>wave</span></li>
              <li>佣金比例 <span>10%</span></li>
              <li>总委托量<span>87654321.32145678</span></li>
              <li>参与人数<span>50</span></li>
              <li>保证金<span>5000000</span></li>
              <li>信用值<span>0.8</span></li>
            </ul>
          </div>
          <div class="node_info">
            <h4 class="bg-gray">
              <i class="el-icon-check"></i>
              8FDFSF6SDF
              <i class="el-icon-edit-outline"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white">
              <li>别名<span>wave</span></li>
              <li>佣金比例 <span>10%</span></li>
              <li>总委托量<span>87654321.32145678</span></li>
              <li>参与人数<span>50</span></li>
              <li>保证金<span>5000000</span></li>
              <li>信用值<span>0.8</span></li>
            </ul>
          </div>
          <div class="node_info">
            <h4 class="bg-gray">
              <i class="el-icon-check"></i>
              8FDFSF6SDF
              <i class="el-icon-edit-outline"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white">
              <li>别名<span>wave</span></li>
              <li>佣金比例 <span>10%</span></li>
              <li>总委托量<span>87654321.32145678</span></li>
              <li>参与人数<span>50</span></li>
              <li>保证金<span>5000000</span></li>
              <li>信用值<span>0.8</span></li>
            </ul>
          </div>
          <div class="cb"></div>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'consensus',
    data() {
      return {
        consensusActive: 'consensusFirst',
        options: [
          {value: '选项1', label: '普通资产'},
          {value: '选项2', label: '合约资产'}
        ],
        value: '',
        search: '',
      };
    },
    components: {},
    methods: {
      /**
       * 连接跳转
       * @param name
       */
      toUrl(name){
        //console.log(name)
        this.$router.push({
          name: name
        })
      },

      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";
  .consensus {

    .card {
      margin: -20px auto 0;
      height: 200px;
      .left, .right {
        width: 590px;
      }
    }
    .node {
      margin: 0 0 100px 0;
      .node_info{
        border: @BD1;
        width: 285px;
        height: 175px;
        margin: 20px 20px 0 0;
        float: left;
        &:nth-child(4n){
          margin: 20px 0 0 0;
        }
        h4{
          height: 32px;
          line-height: 32px;
          padding: 0 20px;
          .follow{
            float: right;
            padding-top: 5px;
          }
        }
        ul{
          padding: 0 0 2px 0;
          li{
            height: 23px;
            line-height: 23px;
            padding: 0 0 0 30px;
            font-size: 12px;
            span{
              display:block;
              float: right;
              text-align: left;
              width: 160px;
            }
          }

        }
      }
    }

  }
</style>
