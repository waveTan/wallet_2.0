import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/views/Home.vue'], resolve)
    },
    {
      path: '/wallet/frozenList',
      name: 'frozenList',
      component: resolve => require(['@/views/users/FrozenList.vue'], resolve)
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: resolve => require(['@/views/transfer/Transfer.vue'], resolve)
    },
    {
      path: '/transfer/transferInfo',
      name: 'transferInfo',
      component: resolve => require(['@/views/transfer/TransferInfo.vue'], resolve)
    },
    {
      path: '/consensus',
      name: 'consensus',
      component: resolve => require(['@/views/consensus/Consensus.vue'], resolve)
    },
    {
      path: '/contract',
      name: 'contract',
      component: resolve => require(['@/views/contract/Contract.vue'], resolve)
    },
    {
      path: '/address',
      name: 'address',
      component: resolve => require(['@/views/users/Address.vue'], resolve)
    },
    {
      path: '/newAddress',
      name: 'newAddress',
      component: resolve => require(['@/views/users/NewAddress.vue'], resolve)
    },
    {
      path: '/importAddress',
      name: 'importAddress',
      component: resolve => require(['@/views/users/ImportAddress.vue'], resolve)
    },

    {
      path: '/nodeService',
      name: 'nodeService',
      component: resolve => require(['@/views/set/NodeService.vue'], resolve)
    }


  ]
})
