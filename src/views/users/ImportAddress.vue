<template>
  <div class="import_address bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <p class="bread  clicks font14"><i class="el-icon-arrow-left"></i>钱包管理</p>
        <h3 class="title">导入钱包</h3>
      </div>
    </div>
    <div class="w1200 mt_20 bg-white">
      <div class="radio">
        <el-radio v-model="radio" label="1">Keystore 导入</el-radio>
        <el-radio v-model="radio" label="2">私钥导入</el-radio>
      </div>

      <div class="btn mb_100"  v-show="radio==='1'">
        <el-button type="success">选择keystore文件</el-button>
      </div>

      <div class="w630" v-show="radio==='2'">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="mb_100" >
          <el-form-item label="请输入你的私钥:" prop="age">
            <el-input type="textarea" v-model="ruleForm2.age"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="form-next">
            <el-button type="success" @click="submitForm('ruleForm2')">导入钱包</el-button>
          </el-form-item>
        </el-form>


      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      let checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('私钥不能为空'));
        }
      };
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
        radio: '1',
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
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
  .import_address{
    .mt_20{
      border: @BD1;
      .radio{
        width: 300px;
        text-align: center;
        margin: 50px auto;
      }
    }
  }
</style>
