import Vue from 'vue'
import VueRouter from 'vue-router'
// 一级分类
import Login from '@/Login'   //登录页面
import Container from '@/Container'   //视图容器
import NotFound from '@/components/NotFound'    //NotFound
// 公共页面
import HelloWorld from '@/components/HelloWorld'    //HelloWorld
import DFU from '@/components/DFU'    //主页 描述页面
// 分页面
// 市场走访管理
import markInterviewHome from '@/pages/markInterview/markInterviewHome'
import markInterviewAdd from '@/pages/markInterview/markInterviewAdd'
import markInterviewDetails from '@/pages/markInterview/markInterviewDetails'
// 单位情况分析
import caseAnalysisHome from '@/pages/caseAnalysis/caseAnalysisHome'
import caseAnalysisDetails from "@/pages/caseAnalysis/caseAnalysisDetails"
// 城市分类排名
import signCity from '@/pages/classRank/signCity'
import signCityDetails from '@/pages/classRank/signCityDetails'
import intentionCity from '@/pages/classRank/intentionCity'
import intentionCityDetails from '@/pages/classRank/intentionCityDetails'
import sourceCity from '@/pages/classRank/sourceCity'
import sourceCityDetails from '@/pages/classRank/sourceCityDetails'
//系统管理
import peoManagement_Main from '@/pages/sysManagement/peoManagement_Main'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    //登录路由
    {
      path: '/Login',
      component: Login,
      name: 'Login',
      hidden: true
    },
    //重定向
    {
      path: '/',  // 默认进入路由
      redirect: '/DFU'   //重定向
    },
    {
      path: '/',
      component: Container,
      name: 'Container',
      children: [
        { path: '/DFU', component: DFU, name: 'DFU' },
        { path: '/HelloWorld', component: HelloWorld, name: 'HelloWorld' },
        
        { path: '/markInterviewHome', component: markInterviewHome, name: 'markInterviewHome' },
        { path: '/markInterviewAdd', component: markInterviewAdd, name: 'markInterviewAdd' },
        { path: '/markInterviewDetails', component: markInterviewDetails, name: 'markInterviewDetails' },
      
        { path: '/caseAnalysisHome', component: caseAnalysisHome, name: 'caseAnalysisHome' },
        { path: '/caseAnalysisDetails', component: caseAnalysisDetails, name: 'caseAnalysisDetails' },
        
        { path: '/peoManagement_Main', component: peoManagement_Main, name: 'peoManagement_Main'},
        
        { path: '/signCity', component: signCity, name: 'signCity' },
        { path: '/signCityDetails', component: signCityDetails, name: 'signCityDetails' },
        { path: '/intentionCity', component: intentionCity, name: 'intentionCity' },
        { path: '/intentionCityDetails', component: intentionCityDetails, name: 'intentionCityDetails' },
        { path: '/sourceCity', component: sourceCity, name: 'sourceCity' },
        { path: '/sourceCityDetails', component: sourceCityDetails, name: 'sourceCityDetails' },
      ]
    },
    
    //404NotFound页面
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

// 全局路由守卫
router.beforeEach((to, from, next) => {
  console.log('navigation-guards');
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  const nextRoute = ['DFU', 'HelloWorld', 'markInterviewHome', 'markInterviewAdd', 'markInterviewDetails', 'caseAnalysisHome', 'caseAnalysisDetails'];
  let isLogin = global.isLogin;  // 是否登录
  // 未登录状态；当路由到nextRoute指定页时，跳转至Login
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!isLogin) {
      console.log('what fuck');
      router.push({ name: 'Login' })
    }
  }
  // 已登录状态；当路由到Login时，跳转至home 
  if (to.name === 'Login') {
    if (isLogin) {
      router.push({ name: 'DFU' });
    }
  }
  next();
});

export default router;