<template>
  <div class="home w1200">
    <b-card>
      <b-tabs>
        <b-tab title="账户资产" active>
          <b-dropdown text="资产类型">
            <b-dropdown-item href="#">An item</b-dropdown-item>
            <b-dropdown-item href="#">Another item</b-dropdown-item>
          </b-dropdown>
          <b-table striped hover responsive  :items="items">
            <template slot="actions" slot-scope="row">
              <b-button variant="link">转账</b-button>|<b-button variant="link">收款</b-button>
            </template>

          </b-table>
        </b-tab>
        <b-tab title="交易列表">

          <b-dropdown text="所有资产">
            <b-dropdown-item href="#">An item</b-dropdown-item>
            <b-dropdown-item href="#">Another item</b-dropdown-item>
          </b-dropdown>
          <b-dropdown text="所有交易">
            <b-dropdown-item href="#">An item</b-dropdown-item>
            <b-dropdown-item href="#">Another item</b-dropdown-item>
          </b-dropdown>
          <b-dropdown text="收入/支出">
            <b-dropdown-item href="#">An item</b-dropdown-item>
            <b-dropdown-item href="#">Another item</b-dropdown-item>
          </b-dropdown>

          <b-form-checkbox-group switches v-model="selected" name="switches1" :options="options" />

          <b-table striped hover :items="items"/>

          <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router/>

        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        selected: [], // Must be an array reference!
        options: [
          { text: 'Red', value: 'red' }
        ],
        items: [
          {Account: 'nuls', Account_Type: '基础资产', Total: 2000, Locking: 2000, Usable: 55555,actions:''},
          {Account: 'wave', Account_Type: '合约资产', Total: 2000, Locking: 2000, Usable: 55555,actions:''},
          {Account: 'ese', Account_Type: '合约资产', Total: 2000, Locking: 2000, Usable: 55555,actions:''},
          {Account: 'nulss', Account_Type: '基础资产', Total: 2000, Locking: 2000, Usable: 55555,actions:''}
        ]
      }
    },
    components: {},
    methods: {
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
