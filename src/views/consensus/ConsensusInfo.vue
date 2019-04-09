<template>
  <div class="consensus_info bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <p class="bread  clicks font14"><i class="el-icon-arrow-left"></i>共识</p>
        <h3 class="title">4DWF86DSFE<i class="el-icon-star-off"></i></h3>
      </div>
    </div>

    <div class="card_long mt_20 w1200 bg-white" v-show="false">
      <h5 class="card-title font18">节点信息 <i class="el-icon-edit-outline"></i></h5>
      <ul>
        <li>创建地址 <label>TTarKL8DjsoXmn2EAYTnzC5KK8oxNULS</label></li>
        <li>保证金 <label>12345678.12345678<span class="fCN">NULS</span></label></li>
        <li>奖励地址 <label>TTarKL8DjsoXmn2EAYTnzC5KK8oxNULS</label></li>
        <li>创建时间 <label>2019-03-27 14:00:20</label></li>
        <li>奖励地址 <label>TTarKL8DjsoXmn2EAYTnzC5KK8oxNULS</label></li>
        <li>参与人数 <label>88</label></li>
        <li>创建者别名 <label>wave</label></li>
        <li>总奖励 <label><u class="click td">12345678.12345678</u><span class="fCN">NULS</span></label></li>
        <li>佣金比例
          <label>10%
            <el-tooltip placement="top">
              <div slot="content">该手续费值是根据当前NULS网络预估的，实际消耗可能小于该值，多余部分将会通过共识奖励退回</div>
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </label>
        </li>
        <li>节点惩罚 <label><u class="click td">40 黄牌</u></label></li>
        <li>信用值 <label>0.9</label></li>
        <li></li>
        <p class="cb"></p>
      </ul>
      <div class="logout bg-white">
        <el-button type="danger">注销节点</el-button>
      </div>
    </div>
    <div class="cb"></div>

    <div class="entrust w1200 bg-white" v-show="true">
      <div class="entrust_add w630">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2">
          <el-form-item label="委托金额(NULS):" prop="age">
            <span class="balance font12 fr">可用余额：12345678.46557812</span>
            <el-input v-model.number="ruleForm2.age"></el-input>
          </el-form-item>
          <div class="font14">
            手续费：0.002 <span class="fCN">NULS</span>
          </div>
          <el-form-item class="form-next">
            <el-button type="success" @click="submitForm('ruleForm2')">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="entrust_list w1200 bg-white">
      <div class="top_total font12">
        总委托量：255633 <span class="fCN">NULS</span>
      </div>

      <div class="top_ico">
        <i class="el-icon-plus click" @click="toUrl('newAddress')"></i>
      </div>
      <el-table :data="tableData" stripe border>
        <el-table-column prop="height" label="高度" align="center">
        </el-table-column>
        <el-table-column prop="joinTime" label="加入时间" align="center">
        </el-table-column>
        <el-table-column prop="amount" label="金额(NULS)" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <label class="click tab_bn">退出</label>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <div class="page-total">显示1-20 共 1000</div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" class="fr"
                       :current-page="currentPage4"
                       :page-sizes="[100, 200, 300, 400]"
                       background
                       :page-size="100"
                       layout=" prev, pager, next, jumper"
                       :total="400">
        </el-pagination>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      let checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('委托金额不能为空！'));
        }
      };

      return {
        ruleForm2: {
          age: ''
        },
        rules2: {
          age: [
            {validator: checkAge, trigger: 'blur'}
          ]
        },
        tableData: [
          {height: '23568', joinTime: '2019-03-27 14:00:20', amount: 235568.23588},
          {height: '23568', joinTime: '2019-03-27 14:00:20', amount: 235568.23588},
        ],
        currentPage4: 4,
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
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
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
