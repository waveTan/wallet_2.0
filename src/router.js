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
      path: '/contract',
      name: 'contract',
      component: resolve => require(['@/views/contract/index.vue'], resolve)
    }
  ]
})
