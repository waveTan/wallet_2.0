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
      <div class="logout bg-white" v-show="addressInfo.address === nodeInfo.agentAddress">
        <el-button type="danger" @click="stopNode">注销节点</el-button>
      </div>
    </div>
    <div class="cb"></div>

    <div class="entrust w1200 bg-white" v-show="jionNode">
      <div class="entrust_add w630">
        <el-form :model="jionNodeForm" status-icon :rules="jionNodeRules" ref="jionNodeForm">
          <el-form-item label="委托金额(NULS):" prop="amount">
            <span class="balance font12 fr">可用余额：{{addressInfo.balance}}</span>
            <el-input v-model.number="jionNodeForm.amount">
            </el-input>
          </el-form-item>
          <div class="font14">
            手续费：{{fee}} <span class="fCN">NULS</span>
          </div>
          <el-form-item class="form-next">
            <el-button type="success" @click="jionNodeSubmitForm('jionNodeForm')">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="entrust_list w1200 bg-white" v-show="!jionNode">
      <div class="top_total font12">
        总委托量：255633 <span class="fCN">NULS</span>
      </div>

      <div class="top_ico">
        <i class="el-icon-plus click" @click="showNodeList"></i>
      </div>
      <el-table :data="nodeDepositData" stripe border>
        <el-table-column prop="blockHeight" label="高度" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="加入时间" align="center">
        </el-table-column>
        <el-table-column prop="amount" label="金额(NULS)" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <label class="click tab_bn" @click="cancelDeposit(scope.row)">退出</label>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <div class="page-total">显示1-20 共 {{pageTotal}}</div>
        <el-pagination class="fr" background v-show="pageTotal>pageSize" @current-change="nodeDepositPages"
                       :page-size="pageSize"
                       layout=" prev, pager, next, jumper"
                       :total="pageTotal">
        </el-pagination>
      </div>
    </div>

    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
  </div>
</template>

<script>
  import moment from 'moment'
  import sdk from 'nuls-sdk-js/lib/api/sdk';
  import txs from 'nuls-sdk-js/lib/model/txs';
  import {timesDecimals, getLocalTime, Times, Plus, Minus} from '@/api/util'
  import Password from '@/components/PasswordBar'

  export default {
    data() {
      let checkAmount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('委托金额不能为空'));
        } else {
          callback()
        }
      };

      return {
        addressInfo: {},//账户信息
        balanceInfo: {},//账户余额信息
        nodeInfo: {},//节点详情
        fee: 0.001,//手续费
        outInfo: '',//退出信息
        passwordType:0,//输入密码后的提交类型 0:加入委托 1:退出委托 2:注销节点
        jionNode: false,//是否显示加入共识
        nodeDepositData: [],//委托列表
        pageIndex: 1, //页码
        pageSize: 5, //每页条数
        pageTotal: 0,//总页数
        jionNodeForm: {
          amount: 2002
        },
        jionNodeRules: {
          amount: [
            {validator: checkAmount, trigger: 'blur'}
          ]
        },
      };
    },
    created() {
      this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      setInterval(() => {
        this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      }, 500);

      this.getNodeInfoByHash(this.$route.query.hash);
      this.getNodeDepositByHash(this.pageIndex, this.pageSize, this.$route.query.hash)
    },
    mounted() {
      //this.getConsensusNodes(this.pageIndex, this.pageSize, this.type);
    },
    components: {
      Password,
    },
    methods: {

      /**
       * 根据hash获取节点详情信息
       * @param hash
       **/
      getNodeInfoByHash(hash) {
        this.$post('/', 'getConsensusNode', [hash])
          .then((response) => {
            //console.log(response);
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
            console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let itme of response.result.list) {
                itme.amount = timesDecimals(itme.amount);
                itme.fee = timesDecimals(itme.fee);
                itme.createTime = moment(getLocalTime(itme.createTime)).format('YYYY-MM-DD HH:mm:ss');
              }
              this.nodeDepositData = response.result.list;
              if (response.result.totalCount === 0) {
                this.jionNode = true
              }
              this.pageTotal = response.result.totalCount;
            }
          })
          .catch((error) => {
            console.log("getConsensusDeposit:" + error);
          });

      },

      /**
       * 委托列表分页
       * @param val
       **/
      nodeDepositPages(val) {
        this.pageIndex = val;
        this.getNodeDepositByHash(this.pageIndex, this.pageSize, this.$route.query.hash);
      },

      /**
       * 显示加入共识
       **/
      showNodeList() {
        this.jionNode = true;
        this.getNodeDepositByHash(this.pageIndex, this.pageSize, this.$route.query.hash);
      },

      /**
       * 加入共识
       * @param formName
       **/
      jionNodeSubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getNulsBalance(1, this.addressInfo.address);
            this.$refs.password.showPassword(true)
          } else {
            return false;
          }
        });
      },

      /**
       *退出共识
       * @param hash
       **/
      cancelDeposit(outInfo) {
        this.outInfo = outInfo;
        this.getNulsBalance(1, this.addressInfo.address);
        this.$refs.password.showPassword(true)
      },

      /**
       *  注销节点
       **/
      stopNode(){
        console.log("停止节点");
        this.getNulsBalance(1, this.addressInfo.address);
        this.$refs.password.showPassword(true);
        this.passwordType = 3;
      },

      /**
       *  获取密码框的密码
       * @param password
       **/
      async passSubmit(password) {

        let inputs = [];
        let outputs = [];
        let amount = Times(this.jionNodeForm.amount, 100000000);
        let fee = Times(this.fee, 100000000);

        if(this.passwordType ===0){ //加入共识

        }else if(this.passwordType ===1){ //退出共识

        }else if(this.passwordType ===2) { //注销节点

        }else {
          console.log("交易类型错误")
        }


        if (this.balanceInfo.balance < Number(Plus(amount + fee).toString())) {
          return {success: false, data: "Your balance is not enough."}
        }
        //组装input
        if (this.jionNode) {

        } else {
          console.log(Number(Times(this.outInfo.amount,100000000).toString()));
          inputs.push({
            address: this.addressInfo.address,
            assetsChainId: 2,
            assetsId: 1,
            amount: Number(Times(this.outInfo.amount,100000000).toString()),
            locked: -1,
            nonce: this.outInfo.txHash.substring(this.outInfo.txHash.length - 16)//这里是hash的最后16个字符
          });
        }

        //组装output
        if (this.jionNode) {
          outputs.push({
            address: this.addressInfo.address, assetsChainId: 2,
            assetsId: 1, amount: Number(amount.toString()), lockTime: -1
          });
        }else {
          outputs.push({
            address: this.addressInfo.address, assetsChainId: 2,
            assetsId: 1, amount: Number(Times(Minus(this.outInfo.amount, 0.001), 100000000).toString()), lockTime: -1
          });
        }


        let depositInfo = {
          address: this.addressInfo.address,
          agentHash: this.$route.query.hash,
          deposit: Number(amount.toString())
        };


        let txhex = '';
        if (this.jionNode) {
          let tt = new txs.DepositTransaction(depositInfo);
          tt.time = new Date().valueOf();
          tt.setCoinData(inputs, outputs);
          tt.remark = "";
          sdk.signatureTx(tt, sdk.decrypteOfAES(this.addressInfo.aesPri, password), this.addressInfo.pub);
          txhex = tt.txSerialize().toString('hex');
        } else {
          let tt = new txs.WithdrawTransaction(this.outInfo.txHash);
          tt.time = new Date().valueOf();
          tt.setCoinData(inputs, outputs);
          tt.remark = "";
          sdk.signatureTx(tt, sdk.decrypteOfAES(this.addressInfo.aesPri, password), this.addressInfo.pub);
          txhex = tt.txSerialize().toString('hex');
        }

        this.validateTx(txhex);
      },

      /**
       * 获取转出账户余额信息
       *  @param assetsId
       *  @param address
       **/
      async getNulsBalance(assetsId = 1, address) {
        await this.$post('/', 'getAccountBalance', [assetsId, address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              this.balanceInfo = {'balance': response.result.balance, 'nonce': response.result.nonce};
            }
          })
          .catch((error) => {
            console.log("getAccountBalance:" + error)
          });
      },

      /**
       * 验证交易
       *  @param txHex
       **/
      async validateTx(txHex) {
        //console.log(txHex);
        await this.$post('/', 'validateTx', [txHex])
          .then((response) => {
            console.log(response);
            if (response.hasOwnProperty("result")) {
              if (response.result.value) {
                this.broadcastTx(txHex);
              } else {
                console.log("签名失败！")
              }
            } else {
              console.log("交易验证失败！")
            }
          })
          .catch((error) => {
            console.log("validateTx:" + error);
          });
      },

      /**
       * 广播交易
       *  @param txHex
       **/
      async broadcastTx(txHex) {
        await this.$post('/', 'broadcastTx', [txHex])
          .then((response) => {
            console.log(response);
            if (response.hasOwnProperty("result")) {
              if (response.result.value) {
                this.jionNode = false;
              }
            }
          })
          .catch((error) => {
            console.log("broadcastTx:" + error)
          });
      },
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
