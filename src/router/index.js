import Vue from 'vue'
import Router from 'vue-router'
// 一级分类
import Login from '@/Login'   //登录页面
import Container from '@/Container'   //视图容器
import NotFound from '@/components/NotFound'    //NotFound
// 公共页面
import HelloWorld from '@/components/HelloWorld'    //HelloWorld
import DFU from '@/components/DFU'    //主页 描述页面
// 市场走访管理
import markInterviewAdd from '@/pages/markInterview/markInterviewAdd'   //
import markInterviewHome from '@/pages/markInterview/markInterviewHome'   //
import markInterviewDetails from '@/pages/markInterview/markInterviewDetails'   //
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
        { path: '/HelloWorld', component: HelloWorld, name: 'HelloWorld' },
        { path: '/markInterviewHome', component: markInterviewHome, name: 'markInterviewHome' },
        { path: '/markInterviewDetails', component: markInterviewDetails, name: 'markInterviewDetails' },
        { path: '/markInterviewAdd', component: markInterviewAdd, name: 'markInterviewAdd' }
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
