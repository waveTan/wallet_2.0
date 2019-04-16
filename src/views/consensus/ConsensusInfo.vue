<template>
  <div class="consensus_info bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <p class="bread  clicks font14"><i class="el-icon-arrow-left"></i>共识</p>
        <h3 class="title uppercase">{{nodeInfo.agentId}}<i class="el-icon-star-off click"></i></h3>
      </div>
    </div>

    <div class="card_long mt_20 w1200 bg-white">
      <h5 class="card-title font18">节点信息 <i class="el-icon-edit-outline"></i></h5>
      <ul>
        <li>创建地址 <label>{{nodeInfo.agentAddress}}</label></li>
        <li>保证金 <label>{{nodeInfo.deposit}}<span class="fCN">NULS</span></label></li>
        <li>奖励地址 <label>{{nodeInfo.rewardAddress}}</label></li>
        <li>创建时间 <label>{{nodeInfo.createTime}}</label></li>
        <li>打包地址 <label>{{nodeInfo.packingAddress}}</label></li>
        <li>参与人数 <label>{{nodeInfo.depositCount}}</label></li>
        <li>创建者别名 <label>{{nodeInfo.agentAlias}}</label></li>
        <li>总奖励 <label><u class="click td">{{nodeInfo.totalReward}}</u><span class="fCN">NULS</span></label></li>
        <li>佣金比例
          <label>{{nodeInfo.commissionRate}}%
            <el-tooltip placement="top">
              <div slot="content">该手续费值是根据当前NULS网络预估的，实际消耗可能小于该值，多余部分将会通过共识奖励退回</div>
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </label>
        </li>
        <li>节点惩罚 <label><u class="click td"><!--{{nodeInfo.commissionRate}}--> 888黄牌</u></label></li>
        <li>信用值 <label>{{nodeInfo.creditValue}}</label></li>
        <li></li>
        <p class="cb"></p>
      </ul>
      <div class="logout bg-white" v-show="false">
        <el-button type="danger">注销节点</el-button>
      </div>
    </div>
    <div class="cb"></div>

    <div class="entrust w1200 bg-white" v-show="false">
      <div class="entrust_add w630">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2">
          <el-form-item label="委托金额(NULS):" prop="age">
            <span class="balance font12 fr">可用余额：12345678.46557812</span>
            <el-input v-model.number="ruleForm2.age">
            </el-input>
          </el-form-item>
          <div class="font14">
            手续费：0.002 <span class="fCN">NULS</span>
          </div>
          <el-form-item class="form-next">
            <el-button type="success" @click="submitForm('ruleForm2')">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="entrust_list w1200 bg-white">
      <div class="top_total font12">
        总委托量：255633 <span class="fCN">NULS</span>
      </div>

      <div class="top_ico">
        <i class="el-icon-plus click" @click="toUrl('newAddress')"></i>
      </div>
      <el-table :data="nodeDepositData" stripe border>
        <el-table-column prop="blockHeight" label="高度" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="加入时间" align="center">
        </el-table-column>
        <el-table-column prop="amount" label="金额(NULS)" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <label class="click tab_bn">退出</label>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <div class="page-total">显示1-20 共 {{pageTotal}}</div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" class="fr" background
                       v-show="pageTotal>pageSize"
                       :page-size="pageSize"
                       layout=" prev, pager, next, jumper"
                       :total="pageTotal">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import {timesDecimals, getLocalTime} from '@/api/util'

  export default {
    data() {
      let checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('委托金额不能为空！'));
        }
      };

      return {

        nodeInfo: {},//节点详情
        nodeDepositData: [],//委托列表
        pageIndex: 1, //页码
        pageSize: 20, //每页条数
        pageTotal: 0,//总页数

        ruleForm2: {
          age: ''
        },
        rules2: {
          age: [
            {validator: checkAge, trigger: 'blur'}
          ]
        },
      };
    },
    created() {
      this.getNodeInfoByHash(this.$route.query.hash);
      this.getNodeDepositByHash(this.pageIndex, this.pageSize, this.$route.query.hash)
    },
    mounted() {
      //this.getConsensusNodes(this.pageIndex, this.pageSize, this.type);
    },
    methods: {

      /**
       * 根据hash获取节点详情信息
       * @param hash
       **/
      getNodeInfoByHash(hash) {
        this.$post('/', 'getConsensusNode', [hash])
          .then((response) => {
            console.log(response);
            if (response.hasOwnProperty("result")) {
              response.result.agentReward = timesDecimals(response.result.agentReward);
              response.result.deposit = timesDecimals(response.result.deposit);
              response.result.totalDeposit = timesDecimals(response.result.totalDeposit);
              response.result.totalReward = timesDecimals(response.result.totalReward);
              response.result.createTime = moment(getLocalTime(response.result.createTime)).format('YYYY-MM-DD HH:mm:ss');
              this.nodeInfo = response.result;
            }
            //localStorage.setItem(addressInfo.address, JSON.stringify(addressInfo));
          })
          .catch((error) => {
            console.log(error);
            /*localStorage.setItem(addressInfo.address, JSON.stringify(addressInfo));*/
          });

      },

      /**
       * 根据hash获取节点委托列表
       * @param pageIndex
       * @param pageSize
       * @param hash
       **/
      getNodeDepositByHash(pageIndex, pageSize, hash) {
        this.$post('/', 'getConsensusDeposit', [pageIndex, pageSize, hash])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let itme of response.result.list) {
                itme.amount = timesDecimals(itme.amount);
                itme.fee = timesDecimals(itme.fee);
                itme.createTime = moment(getLocalTime(itme.createTime)).format('YYYY-MM-DD HH:mm:ss');
              }
              this.nodeDepositData = response.result.list;
              this.pageTotal = response.result.totalCount;
            }
            //localStorage.setItem(addressInfo.address, JSON.stringify(addressInfo));
          })
          .catch((error) => {
            console.log(error);
            /*localStorage.setItem(addressInfo.address, JSON.stringify(addressInfo));*/
          });

      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
  @import "./../../assets/css/style";

  .consensus_info {
    .logout {
      width: 1160px;
      margin: 5px auto 0;
      padding: 30px 0;
      text-align: center;
      border-top: @BD1;
      .el-button--danger {
        width: 400px;
      }
    }
    .entrust {
      border: @BD1;
      margin: 20px auto 0;
      .entrust_add {
        margin: 30px auto 50px;
        .balance {
          margin: 10px 0 0 0;
        }
      }
    }
    .entrust_list {
      margin: 50px auto 0;
    }
  }

</style>
