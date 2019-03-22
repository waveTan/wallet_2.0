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
      path: '/transfer',
      name: 'transfer',
      component: resolve => require(['@/views/transfer/transfer.vue'], resolve)
    },
    {
      path: '/consensus',
      name: 'consensus',
      component: resolve => require(['@/views/consensus/consensus.vue'], resolve)
    },
    {
      path: '/contract',
      name: 'contract',
      component: resolve => require(['@/views/contract/contract.vue'], resolve)
    }
  ]
})
