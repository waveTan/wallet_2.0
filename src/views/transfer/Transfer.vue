<template>
  <div class="transfer bg-gray">
    <h3 class="title">NULS 转账</h3>
    <div class="w1200 bg-white">
      <el-form :model="transferForm" :rules="transferRules" ref="transferForm">
        <el-form-item label="付款地址:">
          <el-input v-model="transferForm.fromAddress" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="收款地址:" prop="toAddress">
          <el-input v-model="transferForm.toAddress">
            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="资产类型:">
          <el-select v-model="transferForm.type">
            <el-option label="NULS" value="NULS">
            </el-option>
            <!-- <el-option label="WAVE" value="WAVE">
             </el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item label="转账金额:" prop="amount">
          <span class="balance font12 fr">可用余额：{{addressInfo.balance}}</span>
          <el-input v-model="transferForm.amount " @change="countFee">
          </el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="transferForm.remarks" @change="countFee">
          </el-input>
        </el-form-item>
        <div class="font14">
          <el-tooltip placement="top">
            <div slot="content">该手续费值是根据当前NULS网络预估的，实际消耗可能小于该值，多余部分将会通过共识奖励退回</div>
            <i class="el-icon-warning"></i>
          </el-tooltip>
          手续费：{{fee}} <span class="fCN">NULS</span>
        </div>
        <el-form-item class="form-next">
          <el-button type="success" @click="submitForm('transferForm')">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>

    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
    <el-dialog title="转账确认" :visible.sync="transferVisible" width="40rem">
      <div class="bg-white">
        <div class="div-data">
          <p>付款地址：</p>
          <label>{{transferForm.fromAddress}}</label>
        </div>
        <div class="div-data">
          <p>收款地址：</p>
          <label>{{transferForm.toAddress}}</label>
        </div>
        <div class="div-data">
          <p>手续费：</p>
          <label>{{fee}} <span class="fCN">NULS</span></label>
        </div>
        <div class="div-data">
          <p>金额：</p>
          <label class="yellow">{{transferForm.amount}} <span class="fCN">NULS</span></label>
        </div>
        <div class="div-data">
          <p>备注：</p>
          <label>{{transferForm.remarks}}</label>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="transferVisible = false">取 消</el-button>
        <el-button type="success" @click="confirmTraanser">确认提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import nuls from 'nuls-sdk-js'
  import sdk from 'nuls-sdk-js/lib/api/sdk';
  import {timesDecimals, RightShiftEight, Plus, Times} from '@/api/util'
  import Password from '@/components/PasswordBar'

  export default {


    data() {
      let validateToAddress = (rule, value, callback) => {
        let patrn = /^(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{20,50}$/;
        if (value === '') {
          callback(new Error('请输入收款地址'))
        } else if (!patrn.exec(value)) {
          callback(new Error('请输入正确的收款地址'))
        } else {
          callback()
        }
      };
      let validateAmount = (rule, value, callback) => {
        let patrn = /^([1-9][\d]{0,72}|0)(\.[\d]{1,72})?$/;
        if (value === '') {
          callback(new Error('请输入金额'))
        } else if (!patrn.exec(value)) {
          callback(new Error('金额必须为数字'))
        } else if (parseFloat(value) < 0.01) {
          callback(new Error('金额必须大于0.001'))
        } else {
          setTimeout(() => {
            if (parseInt(RightShiftEight(value).toString()) > parseInt(RightShiftEight(this.addressInfo.balance).toString())) {
              callback(new Error('金额不能大于可用余额'))
            } else {
              callback()
            }
          }, 200);
        }
      };
      return {
        addressInfo: '', //默认账户信息
        balanceInfo: '',//账户余额信息
        //转账数据
        transferForm: {
          fromAddress: '',
          toAddress: 'tNULSeBaMnXoAkNEhqjYv7k7A8PEKPAmXXXVWv',
          type: 'NULS',
          amount: 88,
          remarks: 'wave test 88 nuls',
        },
        //验证信息
        transferRules: {
          toAddress: [
            {validator: validateToAddress, trigger: ['blur', 'change']}
          ],
          amount: [
            {validator: validateAmount, trigger: ['blur', 'change']}
          ],
        },
        //手续费
        fee: 0,
        //转账确认弹框
        transferVisible: false,
      };
    },
    created() {
      this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      setInterval(() => {
        this.addressInfo = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
      }, 500);
      this.transferForm.fromAddress = this.addressInfo.address
    },
    watch: {
      addressInfo(val, old) {
        if (val.address !== old.address && old.address) {
          this.transferForm.fromAddress = this.addressInfo.address
        }
      }
    },
    components: {
      Password,
    },
    methods: {

      /**
       * 转账功能下一步
       * @param formName
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.transferVisible = true
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      /**
       * 弹框确认提交
       *
       **/
      async confirmTraanser() {
        this.getNulsBalance(1, this.transferForm.fromAddress);
        this.$refs.password.showPassword(true)
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
       *  获取密码框的密码
       * @param password
       **/
      async passSubmit(password) {
        let inputs = [];
        let amount = Times(this.transferForm.amount, 100000000);
        let fee = Times(this.fee, 100000000);

        if (this.balanceInfo.balance < Number(Plus(amount + fee).toString())) {
          return {success: false, data: "Your balance is not enough."}
        }
        //组装input
        inputs.push({
          address: this.transferForm.fromAddress,
          assetsChainId: 2,
          assetsId: 1,
          amount: Number(Plus(amount, fee).toString()),
          locked: 0,
          nonce: this.balanceInfo.nonce
        });

        //组装output
        let outputs = [
          {
            address: this.transferForm.toAddress, assetsChainId: 2,
            assetsId: 1, amount: Number(amount.toString()), lockTime: 0
          }
        ];

        let params = {
          type: 2,
          pri: sdk.decrypteOfAES(this.addressInfo.aesPri, password),
          pub: this.addressInfo.pub,
          remark: this.transferForm.remarks,
          inputs: inputs,
          outputs: outputs,
        };
        let hex = await nuls.transactionSignature(params);
        this.validateTx(hex);
        this.transferVisible = false;
      },

      /**
       * 计算手续费
       * @param fromAddress
       * @param amount
       */
      async countFee(fromAddress = this.transferForm.fromAddress, amount = this.transferForm.amount, remark = this.transferForm.remarks) {
        if (amount) {
          console.log(fromAddress);
          console.log(remark);
          /* const inputUtxoInfo = await nuls.getInputUtxo(fromAddress, amount);
           setTimeout(()=>{
             console.log(inputUtxoInfo);
           },1000);*/

          //判断是否零钱过多
          /* if (inputUtxoInfo.length >= 6000) {
             return {success: false, data: "Too much change to consume"}
           } else {
             //计算手续费 （124 + 50  * inputs.length + 38 * outputs.length + remark.bytes.length ）/1024
             const fee = Math.ceil((124 + 50 * inputUtxoInfo.length + 38 * 2 + +utils.stringToByte(remark).length) / 1024) * 100000;
             this.fee = timesDecimals(fee);
             return fee;
           }*/

          const fee = 100000;
          this.fee = timesDecimals(fee);
          return fee;
        }
      },

      /**
       * 验证交易
       *  @param txHex
       **/
      async validateTx(txHex) {
        //console.log(txHex);
        await this.$post('/', 'validateTx', [txHex])
          .then((response) => {
            //console.log(response);
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
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              if (response.result.value) {
                this.toUrl("txList");
              }
            }
          })
          .catch((error) => {
            console.log("broadcastTx:" + error)
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
    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .transfer {
    .w1200 {
      border: @BD1;
      margin: -20px auto 0;
      border-radius: 2px;
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
            .balance {
              margin: 10px 0 0 0;
            }
          }
        }
      }
    }
    .el-dialog__wrapper {
      .el-dialog__body {
        padding: 0;
        .bg-white {
          padding: 40px 0;
          .div-data {
            font-size: 1rem;
            line-height: 2rem;
            p {
              width: 35%;
              margin: 0;
              min-height: auto;
              padding: 0;
              float: left;
              text-align: right;
            }
            label {
              width: auto;
              .fCN {
                color: #5daf34;
              }
            }
          }
        }

      }
      .dialog-footer {
        padding: 1rem 0;
        .el-button {
          width: 200px;
        }
      }
    }
  }

</style>
