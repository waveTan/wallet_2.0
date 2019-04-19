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

  </div>
</template>

<script>
  import nuls from 'nuls-sdk-js'

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
        //新建的地址信息
        newAddressInfo: '',
      };
    },
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

      /**
       * 创建地址
       * @param formName
       */
      submitAliasForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.aliasForm.alias);
          } else {
            return false;
          }
        });
      },

      /**
       * 进入钱包
       */
      goWallet() {
        let addressInfo = {
          address: this.newAddressInfo.address,
          aesPri: this.newAddressInfo.aesPri,
          pub: this.newAddressInfo.pub,
          alias: '',
          remark: '',
        };
        localStorage.setItem(this.newAddressInfo.address, JSON.stringify(addressInfo));
        this.toUrl('home')
      }
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
