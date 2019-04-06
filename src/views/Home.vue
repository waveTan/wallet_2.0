<template>
  <div class="home">
    <h3 class="title">{{addressInfo.address}}<span v-show="addressInfo.alias">({{addressInfo.alias}})</span><i
            class="iconfont icon-fuzhi clicks"></i></h3>
    <el-tabs v-model="homeActive" @tab-click="handleClick" class="w1200">
      <el-tab-pane label="资产列表" name="homeFirst" v-loading="assetsListLoading">
        <el-select v-model="value" placeholder="资产类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <el-table :data="addressAssetsData" stripe border>
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
          <el-table-column prop="balance" label="可用" align="center">
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
          <!--<div class="page-total">显示1-20 共 1000</div>-->
          <div class="page-total">显示1-20 共 {{addressAssetsData.length}}</div>
          <el-pagination v-show="addressAssetsData.length > 10" class="fr" background
                         @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         layout=" prev, pager, next, jumper"
                         :total="addressAssetsData.length">
          </el-pagination>
        </div>

      </el-tab-pane>
      <el-tab-pane label="交易列表" name="homeSecond">
        <div class="filter">
          <el-select v-model="value" placeholder="资产类型">
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
          <el-table-column prop="createTime" label="时间" align="center">
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
  import moment from 'moment'
  import {timesDecimals,getLocalTime,superLong} from './../api/util'

  export default {
    name: 'home',
    data() {
      return {
        //tab默认选中
        homeActive: 'homeFirst',
        //默认账户信息
        addressInfo: "",
        //资产加载动画
        assetsListLoading: true,
        //账户资产列表
        addressAssetsData: [],
        options: [
          {value: '选项1', label: '普通资产'},
          {value: '选项2', label: '合约资产'}
        ],
        value: '',

        //交易数据
        txListData: [],
        //页码
        pageNumber:1,
        //条数
        pageSize:10,
        //总条数
        pageCount:0,
        //类型
        type:0,
        //隐藏共识奖励
        isHide:true,

        value3: true,
        currentPage4: 4,
      };
    },
    components: {},
    created() {
      this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      setInterval(() => {
        this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      }, 500);
      this.getAddressInfoByNode(this.addressInfo.address);
    },
    mounted() {

    },
    watch: {
      addressInfo(val, old) {
        if (val.address !== old.address) {
          this.getAddressInfoByNode(this.addressInfo.address);
        }
      }
    },
    methods: {

      /**
       * 获取地址网络信息
       * @param address
       **/
      getAddressInfoByNode(address) {
        this.$post('/', 'getAccount', [address])
          .then((response) => {
            //console.log(response);
            this.addressAssetsData = [];
            let newAssetsList = {};
            if (response.hasOwnProperty("result")) {
              newAssetsList.account = "NULS";
              newAssetsList.type = 0;
              newAssetsList.total = timesDecimals(response.result.totalBalance);
              newAssetsList.locking = timesDecimals(response.result.consensusLock + response.result.timeLock);
              newAssetsList.balance = timesDecimals(response.result.balance);
            } else {
              newAssetsList.account = "NULS";
              newAssetsList.type = 0;
              newAssetsList.total = 0;
              newAssetsList.locking = 0;
              newAssetsList.balance = 0;
            }
            this.addressAssetsData.push(newAssetsList);
            this.assetsListLoading = false;
          })
          .catch((error) => {
            console.log(error);
          });

      },

      /**
       * tab 切换
       * @param tab
       **/
      handleClick(tab) {
        if(tab.name ==='homeSecond'){
          this.getTxlistByAddress(this.pageNumber,this.pageSize,this.addressInfo.address,this.type,this.isHide)
        }
      },

      /**
       * 获取地址交易信息
       * @param pageSize
       * @param pageRows
       * @param address
       * @param type
       * @param isHide
       **/
      getTxlistByAddress(pageSize,pageRows,address,type,isHide) {
        this.$post('/', 'getAccountTxs', [pageSize,pageRows,address,type,isHide])
          .then((response) => {
            console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.createTime = moment(getLocalTime(item.createTime)).format('YYYY-MM-DD HH:mm:ss');
                item.txid = superLong(item.txHash,8);
                item.balance = timesDecimals(item.balance);
              }
              this.txListData = response.result.list
            }
          })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
    }
  }
</script>
<style lang="less">
  @import "./../assets/css/style";

  .home {
    background-color: @Bcolour1;
    .title {
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
