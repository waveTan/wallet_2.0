<template>
  <div class="address bg-gray">
    <h3 class="title">钱包管理</h3>

    <div class="w1200 mt_20">
      <div class="top_ico">
        <i class="el-icon-plus click" @click="toUrl('newAddress')"></i>
      </div>
      <el-table :data="addressList" stripe border>
        <el-table-column prop="address" label="账户" align="center" min-width="200">
        </el-table-column>
        <el-table-column prop="balance" label="余额" align="center">
        </el-table-column>
        <el-table-column label="别名" align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.alias !=='' ">{{scope.row.alias}}</span>
            <span v-show="scope.row.alias ==='' " @click="addAlias(scope.row)">
              <i class="el-icon-edit-outline click"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            <span v-show="scope.row.remark !=='' " @click="editRemark(scope.row)"
                  class="click">{{scope.row.remark}}</span>
            <span v-show="scope.row.remark ==='' " @click="editRemark(scope.row)">
              <i class="el-icon-edit-outline click"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <label class="click tab_bn" @click="editPassword(scope.row)">修改密码</label>
            <span class="tab_line">|</span>
            <label class="click tab_bn">备份</label>
            <span class="tab_line">|</span>
            <label class="click tab_bn" @click="deleteAddress(scope.row)">移除</label>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <div class="page-total">共 {{addressList.length}} 条</div>
        <!--<div class="page-total">显示1-20 共 1000</div>-->
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" class="fr"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        background
                        :page-size="100"
                        layout=" prev, pager, next, jumper"
                        :total="400">
         </el-pagination>-->
      </div>
    </div>

    <el-dialog title="Remarks" width="30rem"
               :visible.sync="remarkDialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
    >

      <div class="address-remark bg-white">
        <el-input v-model="selectAddressInfo.remark" placeholder="请输入备注"></el-input>
        <div class="btn-next">
          <el-button @click="remarkDialog=false">取 消</el-button>
          <el-button type="success" @click='addRemark'>确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
  </div>
</template>

<script>
  import nuls from 'nuls-sdk-js'
  import Password from './../../components/PasswordBar'
  import {timesDecimals} from './../../api/util'

  export default {
    data() {
      return {
        addressList: [],
        remarkDialog: false,
        //操作的地址信息
        selectAddressInfo: '',
      };
    },
    components: {
      Password,
    },
    created() {
      this.getAddressList();
    },
    mounted() {
      this.getAddressLists(this.addressList);
    },
    methods: {

      /**
       * 获取账户列表
       */
      getAddressList() {
        this.addressList = [];
        for (let i = localStorage.length - 1; i >= 0; i--) {
          if (localStorage.getItem(localStorage.key(i)) !== 'SILENT') {
            this.addressList.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
          }
        }
        //循环账户智能有一个是选中的账户
        let countSelection = 0;
        for (let itmes of this.addressList) {
          if (itmes.selection) {
            countSelection++;
            sessionStorage.setItem(itmes.address, JSON.stringify(itmes));
            if (countSelection > 1) {
              itmes.selection = false;
              localStorage.setItem(itmes.address, JSON.stringify(itmes))
            }
          }
        }
        //一个选中的都没就默认第一个
        if (countSelection === 0) {
          this.addressList[0].selection = true;
          localStorage.setItem(this.addressList[0].address, JSON.stringify(this.addressList[0]))
        }
      },

      /**
       * 获取地址网络信息
       * @param addressInfo
       **/
      getAddressInfoByNode(addressInfo) {
        addressInfo.alias = "";
        addressInfo.balance = 0;
        this.$post('/', 'getAccount', [addressInfo.address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              addressInfo.alias = response.result.alias;
              addressInfo.balance = timesDecimals(response.result.balance);
            }
            localStorage.setItem(addressInfo.address, JSON.stringify(addressInfo));
          })
          .catch((error) => {
            console.log("getAccount:"+error);
            localStorage.setItem(addressInfo.address, JSON.stringify(addressInfo));
          });

      },

      /**
       * 循环获取账户余额及别名
       * @param addressList
       **/
      async getAddressLists(addressList) {
        for (let item of addressList) {
          await this.getAddressInfoByNode(item);
        }
      },

      /**
       * 设置别名
       * @param rowInfo
       **/
      addAlias(rowInfo) {
        //todo
        this.toUrl('setAlias', rowInfo.address)
      },

      /**
       *  修改密码
       * @param rowInfo
       **/
      editPassword(rowInfo) {
        this.toUrl('editPassword', rowInfo.address)
      },

      /**
       *  移除账户
       * @param rowInfo
       **/
      deleteAddress(rowInfo) {
        this.selectAddressInfo = rowInfo;
        this.$refs.password.showPassword(true)
      },

      /**
       *  获取密码框的密码
       * @param password
       **/
      passSubmit(password) {
        const pri = nuls.decrypteOfAES(this.selectAddressInfo.aesPri, password);
        const newAddressInfo = nuls.importByKey(pri);
        if (newAddressInfo.address === this.selectAddressInfo.address) {
          localStorage.removeItem(this.selectAddressInfo.address);
          this.getAddressList();
        }
      },

      /**
       *  编辑账户备注弹框
       * @param rowInfo
       */
      editRemark(rowInfo) {
        this.selectAddressInfo = rowInfo;
        this.remarkDialog = true
      },

      /**
       * 账户备注提交
       */
      addRemark() {
        localStorage.setItem(this.selectAddressInfo.address, JSON.stringify(this.selectAddressInfo));
        this.remarkDialog = false;
        this.selectAddressInfo = '';
      },

      /**
       * 连接跳转
       * @param name
       * @param param
       */
      toUrl(name, param) {
        //console.log(name)
        this.$router.push({
          name: name,
          query: {'address': param}
        })
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

  .address {
    .el-dialog__body {
      background-color: @Bcolour;
      padding: 30px 20px 50px 20px;
      .address-remark {
        margin: 50px auto 0;
        .btn-next {
          margin: 40px auto 0;
          text-align: center;
          .el-button {
            width: 9.5rem;
          }
          .el-button--success {
            span {
              color: white;
            }
          }
        }
      }
    }
  }


</style>
