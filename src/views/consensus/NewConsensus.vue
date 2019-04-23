<template>
  <div class="new_consensus bg-gray">

    <div class="bg-white">
      <div class="w1200">
        <p class="bread clicks font14"><i class="el-icon-arrow-left"></i>共识</p>
        <h3 class="title">创建节点</h3>
      </div>
    </div>

    <div class="w1200 bg-white mt_20">
      <el-form :model="createrForm" :rules="createrRules" ref="createrForm">
        <el-form-item label="创建地址:">
          <el-input v-model="addressInfo.address" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="奖励地址:" prop="rewardAddress">
          <el-input v-model="createrForm.rewardAddress">
          </el-input>
        </el-form-item>
        <el-form-item label="出块地址:" prop="blockAddress">
          <el-input v-model="createrForm.blockAddress">
          </el-input>
        </el-form-item>
        <el-form-item label="保证金(NULS):" prop="amount">
          <el-input v-model="createrForm.amount">
          </el-input>
        </el-form-item>
        <el-form-item label="佣金比例(%):" prop="rate">
          <el-input v-model="createrForm.rate">
          </el-input>
        </el-form-item>
        <div class="font14">
          <el-tooltip placement="top">
            <div slot="content">该手续费值是根据当前NULS网络预估的，实际消耗可能小于该值，多余部分将会通过共识奖励退回</div>
            <i class="el-icon-warning"></i>
          </el-tooltip>
          手续费：0.02 <span class="fCN">NULS</span>
        </div>
        <el-form-item class="form-next">
          <el-button type="success" @click="submitForm('createrForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
  </div>
</template>

<script>
  import sdk from 'nuls-sdk-js/lib/api/sdk';
  import txs from 'nuls-sdk-js/lib/model/txs';
  import {Times, Plus} from '@/api/util'
  import Password from '@/components/PasswordBar'

  export default {
    data() {
      return {
        addressInfo: {},//账户信息
        balanceInfo: {},//账户余额信息
        fee: 0.001,//手续费
        //创建节点表单
        createrForm: {
          rewardAddress: 'tNULSeBaMuV8h5ksk4j4tWyG2LTRgScBUFgzbe',
          blockAddress: 'tNULSeBaMuV8h5ksk4j4tWyG2LTRgScBUFgzbe',
          amount: '20000',
          rate: '10',
        },
        createrRules: {
          rewardAddress: [
            {required: true, message: '请输入奖励地址', trigger: 'blur'},
          ],
          blockAddress: [
            {required: true, message: '请输入出块地址', trigger: 'blur'},
          ],
          amount: [
            {required: true, message: '请输入保证金', trigger: 'blur'}
          ],
          rate: [
            {required: true, message: '请输入佣金比例', trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      setInterval(() => {
        this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      }, 500);

    },
    mounted() {

    },
    components: {
      Password,
    },
    methods: {
      submitForm(formName) {
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
       *  获取密码框的密码
       * @param password
       **/
      async passSubmit(password) {

        let inputs = [];
        let amount = Times(this.createrForm.amount, 100000000);
        let fee = Times(this.fee, 100000000);
        if (this.balanceInfo.balance < Number(Plus(amount + fee).toString())) {
          return {success: false, data: "Your balance is not enough."}
        }

        inputs.push({
          address: this.addressInfo.address,
          assetsChainId: 2,
          assetsId: 1,
          amount: Number(Plus(amount, fee).toString()),
          locked: 0,
          nonce: this.balanceInfo.nonce
        });

        let outputs = [
          {
            address: this.addressInfo.address, assetsChainId: 2,
            assetsId: 1, amount: Number(amount.toString()), lockTime: -1
          }
        ];

        let agent = {
          agentAddress: this.addressInfo.address,
          packingAddress: this.createrForm.blockAddress,
          rewardAddress: this.addressInfo.address,
          commissionRate: Number(this.createrForm.rate),
          deposit: Number(Times(this.createrForm.amount, 100000000).toString())
        };
        console.log(agent);

        let tt = new txs.CreateAgentTransaction(agent);
        tt.time = new Date().valueOf();
        tt.setCoinData(inputs, outputs);
        tt.remark = "";
        sdk.signatureTx(tt, sdk.decrypteOfAES(this.addressInfo.aesPri, password), this.addressInfo.pub);
        let txhex = tt.txSerialize().toString('hex');
        console.log(txhex);
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

  .new_consensus {
    .mt_20 {
      border: @BD1;
      .el-form {
        width: 600px;
        margin: 50px auto;
        .el-form-item {
          .el-form-item__content {
            .el-select {
              width: 100%;
              .el-input__inner {
                width: 100%;
              }
            }
          }
        }
      }
    }

  }
</style>
