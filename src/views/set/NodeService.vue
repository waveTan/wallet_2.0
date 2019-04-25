<template>
  <div class="node_service bg-gray" v-loading="loading"
       element-loading-text="节点切换中....">
    <h3 class="title">节点服务列表</h3>

    <div class="w1200 mt_20" v-loading="nodeServiceLoading">
      <div class="top_ico">
        <i class="el-icon-plus click" @click="nodeServiceDialog = true"></i>
      </div>
      <el-table :data="nodeServiceData" stripe border>
        <el-table-column prop="name" label="名称" align="center">
        </el-table-column>
        <el-table-column prop="urls" label="地址" align="center">
        </el-table-column>
        <el-table-column prop="delay" label="延迟" align="center">
        </el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <span @click="editState(scope.row)">
              <i class="iconfont click" :class="scope.row.state === 0 ? 'iconduankailianjie' : 'el-icon-check'"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.isDelete">
              <label class="click tab_bn">修改</label>
              <span class="tab_line">|</span>
              <label class="click tab_bn">移除</label>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
          <el-form-item>
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
  import axios from 'axios'

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
        loading: false,//切换时加载动画
        nodeServiceData: [
          {name: '官方', urls: 'http://192.168.1.192:18003/', delay: '10ms', state: 1, isDelete: false},
          {name: '官方', urls: 'http://192.168.1.37:18003/', delay: '10ms', state: 0, isDelete: false},
        ],
        nodeServiceLoading: true,
        //弹框
        nodeServiceDialog: false,
        nodeServiceForm: {
          name: '',
          urls: '',
          resource: ''
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

    created() {
      this.getDelay();
    },
    mounted() {

    },
    methods: {

      /**
       * 连接或断开
       **/
      editState(rows) {
        if (rows.state === 0) {
          this.loading = true;
          for (let item of this.nodeServiceData) {
            item.state = 0
          }
          rows.state = 1;
          localStorage.setItem("urls", JSON.stringify(rows));
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        }
      },

      /**
       * 获取延迟毫秒
       **/
      async getDelay() {
        for (let item of this.nodeServiceData) {
          if (item.state === 1) {
            localStorage.setItem("urls", JSON.stringify(item))
          }
          let startTime = (new Date()).valueOf();
          let endTime = 0;
          const params = {jsonrpc: "2.0", method: "getBestBlockHeader", "params": [2], "id": 5898};
          await axios.post(item.urls, params)
            .then(function (response) {
              //console.log(response);
              if (response.data.hasOwnProperty("result")) {
                endTime = (new Date()).valueOf();
                item.delay = endTime - startTime + "ms";
              } else {
                item.delay = "请求超时";
              }
            })
            .catch(function (error) {
              item.delay = "连接失败";
              console.log("getBestBlockHeader:" + error);
            });
          this.nodeServiceLoading = false;
        }
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

  .node_service {
    .el-dialog__wrapper {
      .el-dialog__body {
        padding-bottom: 50px;
        .bg-white {
          margin: 20px auto 0;
          padding: 20px;

          .btns {
            .el-form-item__content {
              .el-button {
                width: 180px;
                span {
                  color: @Bcolour;
                }
              }
              .el-button--default {
                span {
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
