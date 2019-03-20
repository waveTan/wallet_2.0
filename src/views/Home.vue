<template>
  <div class="home bg-gray">
    <h4 class="address_title bg-white">TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o(<span>wave</span>) <i
            class="iconfont icon-fuzhi fCN"></i></h4>
    <b-tabs class="w1200">
      <b-tab title="账户资产" active>
        <b-dropdown :text=addressType class="select">
          <b-dropdown-item @click="tos('基础账户')">基础账户</b-dropdown-item>
          <b-dropdown-item @click="tos('合约账户')">合约账户</b-dropdown-item>
        </b-dropdown>
        <b-table striped hover responsive :items="items" :fields="fields">
          <template slot="account" slot-scope="row">
            <p style="min-width: 50px">{{row.item.account}}</p>
          </template>
          <template slot="type" slot-scope="row">
            <p style="min-width: 50px">{{row.item.type}}</p>
          </template>
          <template slot="total" slot-scope="row">
            <p style="min-width: 150px">{{row.item.total}}</p>
          </template>
          <template slot="locking" slot-scope="row">
            <p style="min-width: 150px">{{row.item.locking}}</p>
          </template>
          <template slot="usable" slot-scope="row">
            <p style="min-width: 150px">{{row.item.usable}}</p>
          </template>
          <template slot="actions" slot-scope="row">
            <p style="min-width: 120px">
              <b-button variant="link" @click="transform(row.item.account)">转账</b-button>
              <b-button variant="link">收款</b-button>
            </p>
          </template>
        </b-table>
      </b-tab>
      <b-tab title="交易列表" class="tx_list">

        <b-dropdown text="所有资产" class="select">
          <b-dropdown-item href="#">An item</b-dropdown-item>
          <b-dropdown-item href="#">Another item</b-dropdown-item>
        </b-dropdown>
        <b-dropdown text="所有交易" class="select">
          <b-dropdown-item href="#">An item</b-dropdown-item>
          <b-dropdown-item href="#">Another item</b-dropdown-item>
        </b-dropdown>
        <b-dropdown text="所有收支" class="select">
          <b-dropdown-item href="#">收入</b-dropdown-item>
          <b-dropdown-item href="#">支出</b-dropdown-item>
        </b-dropdown>

        <b-form-checkbox-group switches v-model="selected" name="switches1" :options="options" class="hide_switches"/>

        <b-table striped hover responsive :items="txList">

        </b-table>

        <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router/>

      </b-tab>
    </b-tabs>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        addressType: '全部资产',

        selected: [], // Must be an array reference!
        options: [
          {text: 'Reds', value: 'red'}
        ],
        fields: [
          {key: 'account', label: '资产'},
          {key: 'type', label: '类型'},
          {key: 'total', label: '余额'},
          {key: 'locking', label: '锁定'},
          {key: 'usable', label: '可用'},
          {key: 'actions', label: '操作'}
        ],
        items: [
          {account: 'nuls', type: '普通', total: 12345678.123456789, locking:  12345678.123456789, usable:  12345678.123456789, actions: ''},
          {account: 'wave', type: '合约', total: 2000, locking: 2000, usable: 55555, actions: ''},
          {account: 'btc', type: '普通', total: 2000, locking: 2000, usable: 55555, actions: ''},
          {account: 'etc', type: '合约', total: 2000, locking: 2000, usable: 55555, actions: ''},
        ],
        txList: [
          {account: 'nuls', type: '转账', txid: 'afsd....ssadf', time:  '2019-01-10 13:45:58', transaction_addres:'TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o', change: 500,balance:1234578.12345678,state:1},
          {account: 'nuls', type: '转账', txid: 'afsd....ssadf', time:  '2019-01-10 13:45:58', transaction_addres:'TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o', change: 500,balance:1234578.12345678,state:1},
          {account: 'nuls', type: '转账', txid: 'afsd....ssadf', time:  '2019-01-10 13:45:58', transaction_addres:'TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o', change: 500,balance:1234578.12345678,state:1},
          {account: 'nuls', type: '转账', txid: 'afsd....ssadf', time:  '2019-01-10 13:45:58', transaction_addres:'TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o', change: 500,balance:1234578.12345678,state:1},
          {account: 'nuls', type: '转账', txid: 'afsd....ssadf', time:  '2019-01-10 13:45:58', transaction_addres:'TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o', change: 500,balance:1234578.12345678,state:1},
          {account: 'nuls', type: '转账', txid: 'afsd....ssadf', time:  '2019-01-10 13:45:58', transaction_addres:'TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o', change: 500,balance:1234578.12345678,state:1},
        ]
      }
    },
    components: {},
    methods: {
      tos(name) {
        this.addressType = name
      },

      transform(address){
        console.log(address)
      },

      linkGen(pageNum) {
        if (pageNum === 1) {
          return '?'
        } else {
          return '?page=' + pageNum
        }
      }
    }
  }
</script>
<style lang="scss">
  .home {
    width: 100%;
    margin: 0 0 100px 0;
    .tabs {
      margin: 2.2rem auto 0;
      @media (max-width: 768px) {
        margin: 1rem auto 0;
      }
      .tx_list{
        .select{
          margin: 10px 10px 10px 0 ;
          @media (max-width: 768px) {
            margin: 0.5rem;
          }
        }
        .hide_switches{
          @media (max-width: 768px) {
            margin: -1.8rem 0 0 0;
          }
        }
      }
    }
  }
</style>
