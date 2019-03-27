<template>
  <div class="frozen_list bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <p class="bread  clicks font14"><i class="el-icon-arrow-left"></i>钱包</p>
        <h3 class="title">冻结列表</h3>
      </div>
    </div>

    <div class="w1200 mt_20">
      <el-table :data="tableData" stripe border>
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
        <div class="page-total">显示1-20 共 1000</div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" class="fr"
                       :current-page="currentPage4"
                       :page-sizes="[100, 200, 300, 400]"
                       background
                       :page-size="100"
                       layout=" prev, pager, next, jumper"
                       :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {transType: 1, txid: '0020d5baee9d298e2d53....2e8699d94e05ace7c1c3', time: '2019-03-27 11:57:30', heightTime: 565856,freezing:'共识锁定'},
          {transType: 1, txid: '0020d5baee9d298e2d53....2e8699d94e05ace7c1c3', time: '2019-03-27 11:57:30', heightTime: 565856,freezing:'共识锁定'},
          {transType: 1, txid: '0020d5baee9d298e2d53....2e8699d94e05ace7c1c3', time: '2019-03-27 11:57:30', heightTime: 565856,freezing:'共识锁定'},
          {transType: 1, txid: '0020d5baee9d298e2d53....2e8699d94e05ace7c1c3', time: '2019-03-27 11:57:30', heightTime: '2019-03-27 11:57:30',freezing:'共识锁定'},
          {transType: 1, txid: '0020d5baee9d298e2d53....2e8699d94e05ace7c1c3', time: '2019-03-27 11:57:30', heightTime: 565856,freezing:'共识锁定'},
          {transType: 1, txid: '0020d5baee9d298e2d53....2e8699d94e05ace7c1c3', time: '2019-03-27 11:57:30', heightTime: '2019-03-27 11:57:30',freezing:'共识锁定'},
          {transType: 1, txid: '0020d5baee9d298e2d53....2e8699d94e05ace7c1c3', time: '2019-03-27 11:57:30', heightTime: 565856,freezing:'共识锁定'},
        ],
        currentPage4: 4,
      };
    },
    methods: {
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
