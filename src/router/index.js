import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Detail from '@/components/detail'
import Profile from '@/components/profile'
import List from '@/components/list'
import CrmLogin from '@/components/crm/login'
import CrmIndex from '@/components/crm/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'index',
      component: Index
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    // 以下为CRM路由配置
    {
      path: '/crmlogin',
      name: 'Crmlogin',
      component: CrmLogin
    },
    {
      path: '/crmindex',
      name: 'Crmindex',
      component: CrmIndex
    }
  ]
})
