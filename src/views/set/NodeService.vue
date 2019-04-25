<template>
  <div class="node_service bg-gray">
    <h3 class="title">节点服务列表</h3>

    <div class="w1200 mt_20">
      <div class="top_ico">
        <i class="el-icon-plus click" @click="nodeServiceDialog = true"></i>
      </div>
      <el-table :data="tableData" stripe border>
        <el-table-column prop="name" label="名称" align="center">
        </el-table-column>
        <el-table-column prop="urls" label="地址" align="center">
        </el-table-column>
        <el-table-column prop="delay" label="延迟" align="center">
        </el-table-column>
        <el-table-column prop="state" label="状态" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <label class="click tab_bn">修改</label>
            <span class="tab_line">|</span>
            <label class="click tab_bn">移除</label>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages" v-show="false">
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

    <el-dialog title="添加节点服务地址" width="40%"
               :visible.sync="nodeServiceDialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
    >
      <span>您输入的非官方地址可能无法正常使用，因此造成的损失将由您自己承担</span>

      <div class="bg-white">
        <el-form :model="nodeServiceForm" status-icon :rules="nodeServiceRules" ref="nodeServiceForm">
          <el-form-item label="名称" prop="name">
            <el-input v-model.number="nodeServiceForm.name"></el-input>
          </el-form-item>
          <el-form-item label="服务地址" prop="urls">
            <el-input type="text" v-model="nodeServiceForm.urls" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="btns tl">
            <el-button type="success" @click="submitForm('nodeServiceForm')">测试连接</el-button>
          </el-form-item>
          <el-form-item >
            <el-radio-group v-model="nodeServiceForm.resource">
              <el-radio label="立即使用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="btns tc">
            <el-button>取 消</el-button>
            <el-button type="success" @click="submitForm('nodeServiceForm')">确 定</el-button>
          </el-form-item>
          <div class="cb"></div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      let checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('名称不能为空'));
        }
      };
      let validateUrls = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('地址不能为空'));
        } else {
          callback();
        }
      };
      return {
        tableData: [
          {name: '官方', urls: 'https://apiserver.nuls.io', delay: '10ms', state: 1},
          {name: '官方', urls: 'https://apiserver.nuls.io', delay: '10ms', state: 0},
          {name: '官方', urls: 'https://apiserver.nuls.io', delay: '10ms', state: 0},
          {name: '官方', urls: 'https://apiserver.nuls.io', delay: '10ms', state: 0},
          {name: '官方', urls: 'https://apiserver.nuls.io', delay: '10ms', state: 0},
        ],
        currentPage4: 4,
        //弹框
        nodeServiceDialog: false,
        nodeServiceForm: {
          name: '',
          urls: '',
          resource:''
        },
        nodeServiceRules: {
          name: [
            {validator: checkName, trigger: 'blur'}
          ],
          urls: [
            {validator: validateUrls, trigger: 'blur'}
          ]
        }
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

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
  .node_service{
    .el-dialog__wrapper{
      .el-dialog__body{
        padding-bottom: 50px;
        .bg-white{
          margin: 20px auto 0;
          padding: 20px;

          .btns{
            .el-form-item__content{
              .el-button{
                width: 180px;
                span{
                  color: @Bcolour;
                }
              }
              .el-button--default{
                span{
                  color: @Fcolour;
                }
              }
            }
          }

        }
      }

    }
  }

</style>
