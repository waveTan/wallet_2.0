<template>
  <div class="new_address bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <p class="bread  clicks font14"><i class="el-icon-arrow-left"></i>钱包管理</p>
        <h3 class="title">设置别名</h3>
      </div>
    </div>
    <div class="new w1200 mt_20 bg-white">
      <div class="w630">
        <h3 class="tc mzt_20">{{this.$route.query.address}}</h3>
        <div class="tip bg-gray">
          <p><i></i>请设置密码用以导入账户、转账、参与共识等重要行为验证</p>
          <p><i></i>请认真保存钱包密码，NULS钱包不存储密码，也无法帮您找回，请务必牢记</p>
        </div>
        <el-form :model="aliasForm" status-icon :rules="aliasRules" ref="aliasForm" class="mb_20">
          <el-form-item label="别名" prop="alias">
            <el-input type="text" v-model="aliasForm.alias" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="form-next">
            <el-button type="success" @click="submitAliasForm('aliasForm')">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
  </div>
</template>

<script>
  import nuls from 'nuls-sdk-js'
  import {inputsOrOutputs, validateAndBroadcast} from '@/api/requestData'
  import Password from '@/components/PasswordBar'

  export default {
    data() {
      let validateAlias = (rule, value, callback) => {
        let patrn = /^(?!_)(?!.*?_$)[a-z0-9_]+$/;
        if (value === '') {
          callback(new Error('请输入别名'));
        } else if (!patrn.exec(value)) {
          callback(new Error('请输入别名(只允许使用小写字母、数字、下划线（下划线不能在两端）)'));
        } else {
          callback();
        }
      };
      return {
        aliasForm: {
          alias: '',
        },
        aliasRules: {
          alias: [
            {validator: validateAlias, trigger: 'blur'}
          ]
        },
        addressInfo: '', //默认账户信息
        balanceInfo: '',//账户余额信息
      };
    },
    created() {
      this.addressInfo = JSON.parse(localStorage.getItem(this.$route.query.address));
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
       * 创建地址
       * @param formName
       */
      submitAliasForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getNulsBalance(1, this.$route.query.address);
            this.$refs.password.showPassword(true);
          } else {
            return false;
          }
        });
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
              this.$refs.password.showPassword(true);
            } else {
              this.$message({message: "获取账户余额失败:" + response, type: 'error', duration: 1000});
            }
          })
          .catch((error) => {
            this.$message({message: "获取账户余额失败：" + error, type: 'error', duration: 1000});
          });
      },

      /**
       *  获取密码框的密码
       * @param password
       **/
      async passSubmit(password) {

        let transferInfo = {
          fromAddress: this.addressInfo.address,
          toAddress: 'tNULSeBaMkqeHbTxwKqyquFcbewVTUDHPkF11o',
          assetsChainId: 2,
          assetsId: 1,
          amount: 100000000,
          fee: 100000
        };
        let inOrOutputs = await inputsOrOutputs(transferInfo, this.balanceInfo, 3);
        let aliasInfo = {
          fromAddress: this.addressInfo.address,
          alias: this.aliasForm.alias
        };
        let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, '', 3, aliasInfo);
        let txhex = await nuls.transactionSerialize(nuls.decrypteOfAES(this.addressInfo.aesPri, password), this.addressInfo.pub, tAssemble);
        console.log(txhex);
        //验证并广播交易
        await validateAndBroadcast(txhex).then((response) => {
          if (response.success) {
            this.toUrl("txList");
          } else {
            this.$message({message: "验证并广播交易错误：" + response.data, type: 'error', duration: 1000});
          }
        }).catch((err) => {
          this.$message({message: "验证并广播交易异常：" + err, type: 'error', duration: 1000});
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

  .new_address {
    .new {
      border: @BD1;
      .step {
        height: 50px;
        margin: 100px 140px 0 140px;
        li {
          float: left;
          width: 20%;
          height: 50px;
          text-align: center;
          .dotted {
            margin: 20px 0 0 0;
            border-bottom: 2px dotted @Dcolour;
          }
          .Ndotted {
            border-bottom-color: @Ncolour;
          }
          .Ncolor {
            color: @Ncolour;
          }
          .ico {
            i {
              font-size: 30px;
            }
          }
        }

      }
      .tip {
        margin: 40px auto;
        padding: 20px 30px;
        p {
          i {
            width: 5px;
            height: 5px;
            display: block;
            float: left;
            margin: 9px 10px 0 0;
            border-radius: 5px;
            background: #000000;
          }
        }
      }
      .step_tow {
        .title {
          height: 30px;
          line-height: 30px;
          margin: 40px auto 0;
        }
        .tip {
          margin: 40px auto;
        }
        .btn {
          .el-button--info {
            margin: 50px 0 20px 0 !important;
          }
        }
      }
    }
  }

</style>
