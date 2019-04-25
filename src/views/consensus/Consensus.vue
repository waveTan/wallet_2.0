<template>
  <div class="consensus bg-gray">
    <h3 class="title">
      {{addressInfo.address}}
      <span v-show="addressInfo.alias">({{addressInfo.alias}})</span>
      <i class="iconfont icon-fuzhi clicks" @click="copy(addressInfo.address)"></i>
    </h3>
    <div class="card w1200">
      <div class="card-info left fl">
        <h5 class="card-title font18">我的共识</h5>
        <ul>
          <li>总委托 <label><u class="td click" @click="toUrl('consensusList')">{{addressInfo.consensusLock}}</u><span
                  class="fCN">NULS</span></label></li>
          <li>可用余额 <label>{{addressInfo.balance}}<span class="fCN">NULS</span></label></li>
          <li>总共识奖励 <label>{{addressInfo.totalReward}}<span class="fCN">NULS</span></label></li>
        </ul>
      </div>
      <div class="card-info right fr">
        <h5 class="card-title font18">所有共识 <span class="font16 click fr" @click="toUrl('newConsensus')">创建</span></h5>
        <ul>
          <li>共识节点 <label>{{nodeCount.agentCount}}</label></li>
          <li>总节点数 <label>{{nodeCount.totalCount}}</label></li>
          <li>总委托量 <label>{{nulsCount.consensusTotal}}<span class="fCN">NULS</span></label></li>
        </ul>
      </div>
    </div>
    <div class="cb"></div>
    <el-tabs v-model="consensusActive" @tab-click="handleClick" class="w1200">
      <el-tab-pane label="所有节点" name="consensusFirst">
        <div class="filter">
          <SelectBar v-model="nodeStatusRegion" :typeOptions="nodeStatusOptions" typeName="nodeStatus"
                     @change="changeNodeStatus">
          </SelectBar>
          <SelectBar v-model="nodeTypeRegion" :typeOptions="nodeTypeOptions" typeName="nodeType"
                     @change="changeNodeType">
          </SelectBar>
          <el-input placeholder="请选择输入ID\别名\地址...." class="search" v-model="search" suffix-icon="el-icon-search">
            <i class="iconfont icon-search_icon fr click"></i>
          </el-input>
        </div>
        <div class="node">
          <div class="node_info" v-for="item in allNodeData" :key="item.agentId">
            <h4 class="bg-gray">
              <i class="iconfont iconwo"></i>&nbsp;
              <span class="uppercase">{{item.agentId}}</span>&nbsp;
              <i class="iconfont" :class="item.type ===0 ? 'icondaigongshi fred' : 'icongongshizhong fCN'"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white click" @click="toUrl('consensusInfo',item.txHash)">
              <li>别名<span>{{item.agentAlias}}</span></li>
              <li>佣金比例 <span>{{item.commissionRate}}%</span></li>
              <li>总委托量<span>{{item.totalDeposit}}</span></li>
              <li>参与人数<span>{{item.depositCount}}</span></li>
              <li>保证金<span>{{item.deposit}}</span></li>
              <li>信用值<span>{{item.creditValue}}</span></li>
            </ul>
          </div>
          <div class="cb"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的节点" name="consensusSecond">
        <div class="node">
          <div class="node_info" v-for="item in myNodeData" :key="item.agentId">
            <h4 class="bg-gray">
              <i class="iconfont iconwo"></i>&nbsp;
              <span class="uppercase">{{item.agentId}}</span>&nbsp;
              <i class="iconfont" :class="item.type ===0 ? 'icondaigongshi fred' : 'icongongshizhong fCN'"></i>
              <i class="follow el-icon-star-off"></i>
            </h4>
            <ul class="bg-white click" @click="toUrl('consensusInfo',item.txHash)">
              <li>别名<span>{{item.agentAlias}}</span></li>
              <li>佣金比例 <span>{{item.commissionRate}}%</span></li>
              <li>总委托量<span>{{item.totalDeposit}}</span></li>
              <li>参与人数<span>{{item.depositCount}}</span></li>
              <li>保证金<span>{{item.deposit}}</span></li>
              <li>信用值<span>{{item.creditValue}}</span></li>
            </ul>
          </div>
          <div class="cb"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import SelectBar from '@/components/SelectBar';
  import {timesDecimals, copys} from '@/api/util'

  export default {
    name: 'consensus',
    data() {
      return {
        consensusActive: 'consensusSecond',
        //节点信息
        nodeCount: {agentCount: 0, totalCount: 0},
        //nuls 信息
        nulsCount: {consensusTotal: 0},
        //排序下拉框选择列表
        nodeTypeOptions: [
          {value: 0, label: '0'},
          {value: 1, label: '1'},
          {value: 2, label: '2'},
          {value: 3, label: '3'},
          {value: 4, label: '4'},
        ],
        //排序选中值
        nodeTypeRegion: 0,
        //节点类型排序
        nodeStatusOptions: [
          {value: 0, label: '0'},
          {value: 1, label: '1'},
          {value: 2, label: '2'},
          {value: 3, label: '3'},
        ],
        nodeStatusRegion: 0,

        value: '',
        search: '',
        allNodeData: [],//所有节点信息
        addressInfo: [], //账户信息
        pageIndex: 1, //页码
        pageSize: 20, //每页条数
        pageTotal: 0,//总页数
        type: 0, //交易类型，type=0时，返回所有交易
        myNodeData: [],//我的节点信息
      };
    },
    components: {
      SelectBar
    },
    created() {
      this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      setInterval(() => {
        this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      }, 500);

      this.getConsensusNodeCount();
      this.getCoinInfo();
    },
    mounted() {
      this.getConsensusNodes(this.pageIndex, this.pageSize, this.type);
      this.getConsensusInfoByAddress(this.pageIndex, this.pageSize, this.addressInfo.address);
    },
    methods: {

      /**
       * 根据地址获取共识信息
       * @param pageIndex
       * @param pageSize
       * @param address
       **/
      getConsensusInfoByAddress(pageIndex, pageSize, address) {
        this.$post('/', 'getAccountConsensus', [pageIndex, pageSize, address])
          .then((response) => {
            console.log(response);
            if (response.hasOwnProperty("result")) {
              this.myNodeData = response.result.list
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },

      /**
       * 获取共识数统计信息
       **/
      getConsensusNodeCount() {
        this.$post('/', 'getConsensusNodeCount', [])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              this.nodeCount = response.result
            } else {
              this.nodeCount.agentCount = 0;
              this.nodeCount.totalCount = 0;
            }
          })
          .catch((error) => {
            this.nodeCount.agentCount = 0;
            this.nodeCount.totalCount = 0;
            console.log("getConsensusNodeCount:" + error);
          });
      },

      /**
       * 获取共识委托量统计信息
       **/
      getCoinInfo() {
        this.$post('/', 'getCoinInfo', [])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              this.nulsCount.circulation = timesDecimals(response.result.circulation);
              this.nulsCount.consensusTotal = timesDecimals(response.result.consensusTotal);
              this.nulsCount.total = timesDecimals(response.result.total);
            } else {
              this.nulsCount.circulation = 0;
              this.nulsCount.consensusTotal = 0;
              this.nulsCount.total = 0;
            }
          })
          .catch((error) => {
            this.nulsCount.circulation = 0;
            this.nulsCount.consensusTotal = 0;
            this.nulsCount.total = 0;
            console.log("getCoinInfo:" + error);
          });
      },

      /**
       * 获取共识列表信息
       * @param pageIndex
       * @param pageSize,
       * @param type
       **/
      getConsensusNodes(pageIndex, pageSize, type) {
        this.$post('/', 'getConsensusNodes', [pageIndex, pageSize, type])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let itme of response.result.list) {
                itme.deposit = timesDecimals(itme.deposit);
                itme.agentReward = timesDecimals(itme.agentReward);
                itme.totalDeposit = timesDecimals(itme.totalDeposit);
                itme.totalReward = timesDecimals(itme.totalReward);
              }
              this.allNodeData = response.result.list
            }
          })
          .catch((error) => {
            console.log("getConsensusNodes:" + error);
          });

      },

      /**
       *  根据节点状态排序
       **/
      changeNodeStatus(type) {
        this.nodeStatusRegion = type;
        //this.getConsensusNodes(this.pager.page, this.pager.rows, this.nodeStatusRegion)
      },

      /**
       *  根据数据类型排序
       **/
      changeNodeType(type) {
        this.nodeTypeRegion = parseInt(type);
        /*switch (type) {
          case 1:
            this.nodeTypeSort(this.nodeList, 'creditValue');
            break;
          case 2:
            this.nodeTypeSort(this.nodeList, 'commissionRate');
            break;
          case 3:
            this.nodeTypeSort(this.nodeList, 'totalDeposit');
            break;
          case 4:
            this.nodeTypeSort(this.nodeList, 'bozhengjin');
            break;
          default:
            this.getConsensusNodes(this.pager.page, this.pager.rows, 0, '')
        }*/
      },

      /**
       * 连接跳转
       * @param name
       * @param params
       */
      toUrl(name, params) {
        //console.log(name,params);
        let newQuery = {};
        if (name === 'consensusInfo') {
          newQuery = {hash: params}
        } else {
          newQuery = {}
        }
        this.$router.push({
          name: name,
          query: newQuery
        })
      },

      /**
       * 复制方法
       * @param sting
       **/
      copy(sting) {
        copys(sting);
        this.$message({message: "已经复制完成", type: 'success', duration: 1000});
      },

      /**
       * tab 切换
       * @param tab
       */
      handleClick(tab) {
        if (tab.name === 'consensusFirst') {
          this.getConsensusNodes(this.pageIndex, this.pageSize, this.type);
        } else {
          this.getConsensusInfoByAddress(this.pageIndex, this.pageSize, this.addressInfo.address);
        }
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
      .node_info {
        border: @BD1;
        width: 285px;
        height: 175px;
        margin: 20px 20px 0 0;
        float: left;
        &:nth-child(4n) {
          margin: 20px 0 0 0;
        }
        h4 {
          height: 32px;
          line-height: 32px;
          padding: 0 20px;
          .follow {
            float: right;
            padding-top: 5px;
          }
        }
        ul {
          padding: 0 0 2px 0;
          li {
            height: 23px;
            line-height: 23px;
            padding: 0 0 0 30px;
            font-size: 12px;
            span {
              display: block;
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
