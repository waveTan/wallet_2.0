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
            <el-option label="WAVE" value="WAVE">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转账金额:" prop="amount">
          <el-input v-model="transferForm.amount ">
          </el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="transferForm.remarks">
          </el-input>
        </el-form-item>
        <el-form-item class="form-next">
          <el-button type="success" @click="submitForm('transferForm')">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        transferForm: {
          fromAddress: 'TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o',
          toAddress: '',
          type: 'NULS',
          amount: '',
          remarks: '',
        },
        transferRules: {
          toAddress: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          amount: [
            {type: 'date', required: true, message: '请输入转账金额', trigger: 'blur'}
          ],
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
          }
        }
      }
    }
  }

</style>
