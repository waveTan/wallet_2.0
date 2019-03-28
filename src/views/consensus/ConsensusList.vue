<template>
  <div class="consensus_list bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <p class="bread clicks font14"><i class="el-icon-arrow-left"></i>共识</p>
        <h3 class="title">共识明细</h3>
      </div>
    </div>

    <div class="w1200 mt_20">
      <div class="top_total font12">
        总委托量：255633 <span class="fCN">NULS</span>
      </div>
      <el-table :data="tableData" stripe border>
        <el-table-column prop="height" label="高度" align="center">
        </el-table-column>
        <el-table-column prop="joinTime" label="加入时间" align="center">
        </el-table-column>
        <el-table-column prop="node" label="节点" align="center">
        </el-table-column>
        <el-table-column prop="amount" label="金额(NULS)" align="center">
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
          {height: '23568', joinTime: '2019-03-27 14:00:20',node:'DSFEW55DF@2D', amount: 235568.23588},
          {height: '23568', joinTime: '2019-03-27 14:00:20',node:'DSFEW55DF@2D', amount: 235568.23588},
          {height: '23568', joinTime: '2019-03-27 14:00:20',node:'DSFEW55DF@2D', amount: 235568.23588},
          {height: '23568', joinTime: '2019-03-27 14:00:20',node:'DSFEW55DF@2D', amount: 235568.23588},
          {height: '23568', joinTime: '2019-03-27 14:00:20',node:'DSFEW55DF@2D', amount: 235568.23588},
          {height: '23568', joinTime: '2019-03-27 14:00:20',node:'DSFEW55DF@2D', amount: 235568.23588},
        ],
        currentPage4: 4,
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

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style lang="less">

</style>
