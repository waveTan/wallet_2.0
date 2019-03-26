<template>
  <div class="new_address bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <p class="bread  clicks font14"><i class="el-icon-arrow-left"></i>钱包管理</p>
        <h3 class="title">创建钱包</h3>
      </div>
    </div>
    <div class="new w1200 mt_20 bg-white">
      <ul class="step">
        <li>
          <p class="dotted Ndotted"></p>
        </li>
        <li>
          <p class="ico"><i class="el-icon-view Ncolor"></i></p>
          <h6 class="Ncolor">设置密码</h6>
        </li>
        <li>
          <p class="dotted" :class="!isFirst ? 'Ndotted':''"></p>
        </li>
        <li>
          <p class="ico"><i class="el-icon-location-outline" :class="!isFirst ? 'Ncolor':''"></i></p>
          <h6 :class="!isFirst ? 'Ncolor':''">备份</h6>
        </li>
        <li>
          <p class="dotted"></p>
        </li>
      </ul>
      <div class="cb"></div>

      <div class="w630" v-show="isFirst">
        <div class="tip bg-gray">
          <p><i></i>请设置密码用以导入账户、转账、参与共识等重要行为验证</p>
          <p><i></i>请认真保存钱包密码，NULS钱包不存储密码，也无法帮您找回，请务必牢记</p>
        </div>
        <div class="cb"></div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="mb_20">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <div class="font12">点击下一步，你已经同意了<span class="click">用户协议</span></div>
          <el-form-item class="form-next">
            <el-button type="success" @click="submitForm('ruleForm2')">下一步</el-button>
            <el-button type="text" @click="toUrl('importAddress')">导入钱包</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="step_tow w630" v-show="!isFirst">
        <h3 class="title">您的账户地址：<span>TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o</span><i class="iconfont icon-fuzhi clicks"></i>
        </h3>
        <div class="tip bg-gray">
          <p>请勿遗失！ NULS将无法帮助您找回遗失的密钥</p>
          <p>请勿向他人分享！ 如在恶意网站使用此文件，您的资金可能面临被盗窃的风险</p>
          <p>请制作备份！ 以防您的电脑故障</p>
        </div>

        <div class="btn mb_20">
          <el-button type="success">Keystore备份</el-button>
          <el-button type="text">明文私钥备份</el-button>

          <el-button type="info">下一步</el-button>
        </div>
      </div>

    </div>


    <el-dialog title="安全警告" width="40%"
               :visible.sync="centerDialogVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
    >
      <span>私钥未经加密，备份存在风险，请保存到安全的地方，建议使用Keystore进行备份</span>
      <p class="bg-white">
        2b3bdfbf2ef67e3214daeb70cebc28f9197841860d5c3d81e40b165403957da2
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="centerDialogVisible = false">复制</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        //第一步
        isFirst: true,
        //弹框
        centerDialogVisible: false,
        ruleForm2: {
          pass: '',
          checkPass: '',
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      };
    },
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
