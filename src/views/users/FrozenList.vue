<template>
  <div class="frozen_list bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <p class="bread  clicks font14"><i class="el-icon-arrow-left"></i>钱包</p>
        <h3 class="title">冻结列表</h3>
      </div>
    </div>

    <div class="w1200 mt_20">
      <el-table :data="txListData" stripe border>
        <el-table-column prop="transType" label="类型" align="center">
        </el-table-column>
        <el-table-column label="TxID" align="center" min-width="200">
          <template slot-scope="scope">
            <span class="click" @click="toUrl('frozenList')">{{scope.row.txid}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" align="center">
        </el-table-column>
        <el-table-column prop="heightTime" label="解冻高度/时间" align="center">
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
  export default {
    data() {
      return {
        txListData: [
          /*{
            transType: 1,
            txid: '0020d5baee9d298e2d53....2e8699d94e05ace7c1c3',
            time: '2019-03-27 11:57:30',
            heightTime: 565856,
            freezing: '共识锁定'
          },*/
        ],

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
            console.log(response);
            if (response.hasOwnProperty("result")) {
              this.pageTotal = response.result.totalCount;
              //addressInfo.balance = timesDecimals(response.result.balance);
            }
            //localStorage.setItem(addressInfo.address, JSON.stringify(addressInfo));
          })
          .catch((error) => {
            console.log(error);
            /*localStorage.setItem(addressInfo.address, JSON.stringify(addressInfo));*/
          });

      },


      /**
       * 连接跳转
       * @param name
       */
      toUrl(name) {
        //console.log(name)
        this.$router.push({
          name: name
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
