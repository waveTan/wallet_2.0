<template>
  <div class="new_consensus bg-gray">

    <div class="bg-white">
      <div class="w1200">
        <p class="bread clicks font14"><i class="el-icon-arrow-left"></i>共识</p>
        <h3 class="title">创建节点</h3>
      </div>
    </div>

    <div class="w1200 bg-white mt_20">
      <el-form :model="transferForm" :rules="transferRules" ref="transferForm">
        <el-form-item label="创建地址:">
          <el-input v-model="transferForm.fromAddress" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="奖励地址:" prop="toAddress">
          <el-input v-model="transferForm.toAddress">
          </el-input>
        </el-form-item>
        <el-form-item label="出块地址:" prop="toAddress">
          <el-input v-model="transferForm.toAddress">
          </el-input>
        </el-form-item>
        <el-form-item label="保证金(NULS):" prop="amount">
          <el-input v-model="transferForm.amount ">
          </el-input>
        </el-form-item>
        <el-form-item label="佣金比例(%):">
          <el-input v-model="transferForm.amount ">
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
          <el-button type="success" @click="submitForm('transferForm')">确 定</el-button>
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

  .new_consensus {
    .mt_20{
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
