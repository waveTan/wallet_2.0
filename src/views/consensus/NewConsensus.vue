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
  import nuls from 'nuls-sdk-js'
  import {getNulsBalance, inputsOrOutputs, validateAndBroadcast} from '@/api/requestData'
  import {Times} from '@/api/util'
  import Password from '@/components/PasswordBar'

  export default {
    data() {
      return {
        addressInfo: {},//账户信息
        balanceInfo: {},//账户余额信息
        //创建节点表单
        createrForm: {
          rewardAddress: '',
          blockAddress: '',
          amount: '',
          rate: '',
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
      async submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            getNulsBalance(this.addressInfo.address).then((response) => {
              if (response.success) {
                this.balanceInfo = response.data;
                this.$refs.password.showPassword(true)
              } else {
                this.$message({message: "获取账户余额失败:" + response, type: 'error', duration: 1000});
              }
            }).catch((error) => {
              this.$message({message: "获取账户余额失败：" + error, type: 'error', duration: 1000});
            });
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

        let transferInfo = {
          fromAddress: this.addressInfo.address,
          assetsChainId: 2,
          assetsId: 1,
          amount: Number(Times(this.createrForm.amount, 100000000).toString()),
          fee: 100000
        };
        let inOrOutputs = await inputsOrOutputs(transferInfo, this.balanceInfo, 4);
        let txhex = '';
        if (inOrOutputs.success) {
          let agent = {
            agentAddress: this.addressInfo.address,
            packingAddress: this.createrForm.blockAddress,
            rewardAddress: this.addressInfo.address,
            commissionRate: Number(this.createrForm.rate),
            deposit: Number(Times(this.createrForm.amount, 100000000).toString())
          };
          let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, '', 4, agent);
          txhex = await nuls.transactionSerialize(nuls.decrypteOfAES(this.addressInfo.aesPri, password), this.addressInfo.pub, tAssemble);
        } else {
          this.$message({message: "input和outputs组装错误：" + inOrOutputs.data, type: 'error', duration: 1000});
        }
        //console.log(txhex);
        //验证并广播交易
        await validateAndBroadcast(txhex).then((response) => {
          if (response.success) {
            //console.log(response.hash);
            this.$router.push({
              name: "txList"
            })
          } else {
            this.$message({message: "验证并广播交易错误：" + response.data, type: 'error', duration: 1000});
          }
        }).catch((err) => {
          this.$message({message: "验证并广播交易异常：" + err, type: 'error', duration: 1000});
        });
      }
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
