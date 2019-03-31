import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/Login'
import Container from '@/Container'
import NotFound from '@/components/NotFound'
import HelloWorld from '@/components/HelloWorld'
import DFU from '@/components/DFU'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'Login',
      hidden: true
    },
    {
      path: '/',
      component: Container,
      name: 'Container',
      children: [
        { path: '/DFU', component: DFU, name: 'DFU' },
        { path: '/HelloWorld', component: HelloWorld, name: 'HelloWorld' }
      ]
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})
