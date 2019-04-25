<template>
  <div class="consensus_list bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <BackBar backTitle="共识"></BackBar>
        <h3 class="title">共识明细</h3>
      </div>
    </div>

    <div class="w1200 mt_20">
      <div class="top_total font12">
        总委托量：255633 <span class="fCN">NULS</span>
      </div>
      <el-table :data="consensusData" stripe border v-loading="consensusDataLoading">
        <el-table-column prop="blockHeight" label="高度" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="加入时间" align="center">
        </el-table-column>
        <el-table-column label="Hash" align="center" min-width="200">
          <template slot-scope="scope">
            <span class="click " @click="toUrl('transferInfo',scope.row.txHash)">{{scope.row.txHashs}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额(NULS)" align="center">
        </el-table-column>
      </el-table>
      <div class="pages">
        <div class="page-total">
          显示 {{pageIndex-1 === 0 ? 1 : (pageIndex-1) *pageSize}}-{{pageIndex*pageSize}}
          共 {{pageTotal}}
        </div>

        <el-pagination v-show="pageTotal > pageSize" @current-change="consensusPages" class="fr"
                       :current-page="pageIndex"
                       :page-size="pageSize"
                       background
                       layout=" prev, pager, next, jumper"
                       :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

  import moment from 'moment'
  import {timesDecimals, getLocalTime, superLong,} from '@/api/util'
  import BackBar from '@/components/BackBar'
  export default {
    data() {
      return {
        consensusData: [],
        addressInfo: {},//账户信息
        consensusDataLoading: true,//委托类别加载动画
        pageIndex: 1, //页码
        pageSize: 20, //每页条数
        pageTotal: 0,//总页数
      };
    },
    created() {
      this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      setInterval(() => {
        this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      }, 500);
      this.getNodeDepositByHash(this.pageIndex, this.pageSize, this.addressInfo.address)
    },
    components: {
      BackBar
    },
    methods: {

      /**
       * 根据hash获取节点委托列表
       * @param pageIndex
       * @param pageSize
       * @param address
       * @param hash
       **/
      getNodeDepositByHash(pageIndex, pageSize, address) {
        this.$post('/', 'getAccountDeposit', [pageIndex, pageSize, address, ''])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let itme of response.result.list) {
                itme.amount = timesDecimals(itme.amount);
                itme.txHashs = superLong(itme.txHash,20);
                itme.createTime = moment(getLocalTime(itme.createTime)).format('YYYY-MM-DD HH:mm:ss');
              }
              this.consensusData = response.result.list;
              this.pageTotal = response.result.totalCount;
              this.consensusDataLoading = false;
            }else {
              this.consensusDataLoading = false;
            }
          })
          .catch((error) => {
            console.log("getConsensusDeposit:" + error);
          });
      },

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
      consensusPages(val) {
        console.log(`每页 ${val} 条`);
      },
    }
  }
</script>

<style lang="less">

</style>
