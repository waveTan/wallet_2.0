<template>
  <div class="frozen_list bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <BackBar backTitle="钱包"></BackBar>
        <h3 class="title">冻结列表</h3>
      </div>
    </div>

    <div class="w1200 mt_20">
      <el-table :data="txListData" stripe border>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope"><span>{{ $t('type.'+scope.row.type) }}</span></template>
        </el-table-column>
        <el-table-column label="txHash" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="click" @click="toUrl('transferInfo',scope.row.txHash)">{{scope.row.txHashs}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
        </el-table-column>
        <el-table-column prop="values" label="金额" align="center">
        </el-table-column>
        <el-table-column prop="height" label="解冻高度/时间" align="center">
        </el-table-column>
        <el-table-column prop="freezing" label="冻结原因" align="center">
        </el-table-column>
      </el-table>
      <div class="pages">
        <div class="page-total">显示1-20 共 {{pageTotal}}</div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" class="fr" background
                       v-show="pageTotal>pageSize"
                       :page-size=pageSize
                       layout=" prev, pager, next, jumper"
                       :total=pageTotal>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {timesDecimals, getLocalTime, superLong} from '@/api/util'
  import BackBar from '@/components/BackBar'

  export default {
    data() {
      return {
        txListData: [],//冻结列表
        pageIndex: 1, //页码
        pageSize: 20, //每页条数
        pageTotal: 0,//总页数
        addressInfo: [], //账户信息
        type: 0, //交易类型，type=0时，返回所有交易
        isHidden: false, //是否隐藏共识奖励交易，默认是不隐藏，这个参数只能是type=0时有效
        currentPage4: 4,
      };
    },
    created() {

      this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      setInterval(() => {
        this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      }, 500);


    },
    mounted() {
      this.getTxListByAddress(this.pageIndex, this.pageSize, this.addressInfo.address, this.type, this.isHidden);
    },
    components: {
      BackBar
    },
    methods: {
      /**
       * 获取地址的交易列表
       * @param pageIndex
       * @param pageSize,
       * @param address,
       * @param type
       * @param isHidden
       **/
      getTxListByAddress(pageIndex, pageSize, address, type, isHidden) {
        this.$post('/', 'getAccountTxs', [pageIndex, pageSize, address, type, isHidden])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.createTime = moment(getLocalTime(item.createTime)).format('YYYY-MM-DD HH:mm:ss');
                item.txHashs = superLong(item.txHash, 16);
                item.balance = timesDecimals(item.balance);
                item.values = timesDecimals(item.values);
              }
              this.pageTotal = response.result.totalCount;
              this.txListData = response.result.list;
            }
          })
          .catch((error) => {
            console.log("getAccountTxs:"+error);
          });

      },

      /**
       * 连接跳转
       * @param name
       * @param param
       */
      toUrl(name,param) {
        //console.log(name)
        this.$router.push({
          name: name,
          query: {'hash': param}
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped>

</style>
