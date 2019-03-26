<template>
  <div class="address bg-gray">
    <h3 class="title">钱包管理</h3>

    <div class="w1200 mt_20">
      <div class="top_ico">
         <i class="el-icon-plus click" @click="toUrl('newAddress')"></i>
      </div>
      <el-table :data="tableData" stripe border>
        <el-table-column prop="account" label="账户" align="center">
        </el-table-column>
        <el-table-column prop="alias" label="别名" align="center">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <label class="click tab_bn">修改密码</label>
            <span class="tab_line">|</span>
            <label class="click tab_bn">备份</label>
            <span class="tab_line">|</span>
            <label class="click tab_bn">移除</label>
          </template>
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
          {account: 'TTakMrubBXi998CZgaYdTy2Nrqwd2ptq', alias: 'wave', remark: 'bolang'},
          {account: 'TTakMrubBXi998CZgaYdTy2Nrqwd2ptq', alias: 'wave', remark: 'bolang'},
          {account: 'TTakMrubBXi998CZgaYdTy2Nrqwd2ptq', alias: 'wave', remark: 'bolang'},
          {account: 'TTakMrubBXi998CZgaYdTy2Nrqwd2ptq', alias: 'wave', remark: 'bolang'},
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
