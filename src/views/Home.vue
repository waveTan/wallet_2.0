<template>
  <div class="home">
    <h3 class="title">TTakMrubBXi998CZgaYdTy2Nrqwd2ptq<span>(wave)</span><i class="iconfont icon-fuzhi clicks"></i></h3>
    <el-tabs v-model="homeActive" @tab-click="handleClick" class="w1200">
      <el-tab-pane label="资产列表" name="homeFirst">
        <el-select v-model="value" placeholder="资产类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <el-table :data="tableData" stripe border>
          <el-table-column prop="account" label="资产" align="center">
          </el-table-column>
          <el-table-column prop="type" label="类型" align="center">
          </el-table-column>
          <el-table-column prop="total" label="总额" align="center">
          </el-table-column>
          <el-table-column label="锁定" align="center">
            <template slot-scope="scope">
              <span class="click" @click="toUrl('frozenList')">{{scope.row.locking}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="useble" label="可用" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template>
              <label class="click tab_bn">转账</label>
              <span class="tab_line">|</span>
              <label class="click tab_bn">收款</label>
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

      </el-tab-pane>
      <el-tab-pane label="交易列表" name="homeSecond">
        <div class="filter">
          <el-select v-model="value" placeholder="资产类型" >
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="资产类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="资产类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

          <el-switch v-model="value3" active-text="" inactive-text="隐藏共识奖励" :width="35">
          </el-switch>
        </div>

        <el-table :data="txListData" stripe border>
          <el-table-column prop="account" label="资产" align="center" width="100">
          </el-table-column>
          <el-table-column prop="type" label="类型" align="center" width="100">
          </el-table-column>
          <el-table-column label="TxID" align="center">
            <template slot-scope="scope">
              <span class="click " @click="toUrl('transferInfo')">{{scope.row.txid}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间" align="center">
          </el-table-column>
          <el-table-column prop="tAddress" label="交易地址" align="center">
          </el-table-column>
          <el-table-column prop="amount" label="金额" align="center">
          </el-table-column>
          <el-table-column prop="balance" label="余额" align="center">
          </el-table-column>
          <el-table-column prop="state" label="状态" align="center" width="100">
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

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        homeActive: 'homeSecond',
        options: [
          {value: '选项1', label: '普通资产'},
          {value: '选项2', label: '合约资产'}
        ],
        value: '',
        tableData: [
          {account: 'NULS', type: '基础资产', total: 12345678.123456789, locking: 12345678.12345678, useble: 12345678.12345678},
          {account: 'WAVE', type: '合约资产', total: 12345678.123456789, locking: 12345678, useble: 12345678.12345678},
          {account: 'TCN', type: '基础资产', total: 12345678, locking: 12345678.12345678, useble: 12345678},
          {account: 'BYV', type: '合约支出', total: 12345678.123456789, locking: 12345678, useble: 12345678.12345678},
        ],
        currentPage4: 4,

        txListData:[
          {account: 'NULS', type: '转账交易', txid: '0020d5bae....ce7c1c3', time:'2019-03-27 11:57:30', tAddress:'TTaysJK...QRNULS',amount:12345678.12345678,balance:12345678.12345678,state:2},
          {account: 'wave', type: '合约交易', txid: '0020d5bae....ce7c1c3', time:'2019-03-27 11:57:30', tAddress:'TTaysJK...QRNULS',amount:12345678.12345678,balance:12345678.12345678,state:2},
          {account: 'BTC', type: '共识奖励', txid: '0020d5bae....ce7c1c3', time:'2019-03-27 11:57:30', tAddress:'TTaysJK...QRNULS',amount:12345678.12345678,balance:12345678.12345678,state:2},
          {account: 'BTT', type: '设置别名', txid: '0020d5bae....ce7c1c3', time:'2019-03-27 11:57:30', tAddress:'TTaysJK...QRNULS',amount:12345678.12345678,balance:12345678.12345678,state:2},
        ],
        value3: true,
      };
    },
    components: {},
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

      handleClick(tab, event) {
        console.log(tab, event);
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
  @import "./../assets/css/style";

  .home {
    background-color: @Bcolour1;
    .title{
      height: 100px;
    }
    .el-tabs {
      margin: 30px auto 0;
      .el-select {
        margin: 5px 10px 15px 0;
      }
    }
  }
</style>
