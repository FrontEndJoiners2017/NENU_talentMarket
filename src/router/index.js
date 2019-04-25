import Vue from 'vue'
import VueRouter from 'vue-router'
//
import Navigation from '@/components/Navigation'
import Header from '@/components/Header'
// 一级分类
import Login from '@/Login'   //登录页面
import Container from '@/Container'   //视图容器
import NotFound from '@/components/NotFound'    //NotFound
// 公共页面
import HelloWorld from '@/components/HelloWorld'    //HelloWorld
import DFU from '@/components/DFU'    //主页 描述页面
// 分页面
// 市场走访管理
import markInterview from '@/pages/markInterview/markInterviewHome'
import markInterviewAdd from '@/pages/markInterview/markInterviewAdd'
import markInterviewDetails from '@/pages/markInterview/markInterviewDetails'
// 单位情况分析
import caseAnalysis from '@/pages/caseAnalysis/caseAnalysisHome'
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
    /**
     * 首页 DFU
     * 登录 Login
     * 重定向 /
     * @author ShunhangHU
     */
    {
      path: '/',
      components:{
        default: DFU,
        nav: Navigation,
        header: Header
      },
      name: DFU
    },
    // {
    //   path: '/',
    //   component: Container,
    //   name: 'Container',
    //   children: [
    //     { path: '/DFU', component: DFU, name: 'DFU' },
    //     { path: '/HelloWorld', component: HelloWorld, name: 'HelloWorld' },
    //   ]
    // },
    {
      path: '/Login',
      component: Login,
      name: 'Login',
      hidden: true
    },
    {
      path: '/',  // 默认进入路由
      redirect: '/DFU'   //重定向
    },
    /**
     * 市场走访管理
     * markInterview
     * |--Add
     * |--Details
     * @author WenqingXU
     */
    {
      path: '/markInterview',
      components:{
        default: markInterview,
        nav: Navigation,
        header: Header
      },
      name: 'markInterview',
      children: [
        { path: '/markInterview/Add', component: markInterviewAdd, name: 'markInterviewAdd'},
        { path: '/markInterview/Details', component: markInterviewDetails, name: 'markInterviewDetails'}
      ]
    },

    /**
     * 单位情况分析
     * caseAnalysis
     * |--Details
     * @author WenqingXU
     */
    // {
    //   path: '/caseAnalysis',
    //   component: caseAnalysis,
    //   name: 'caseAnalysis',
    //   children: [
    //     { path: '/caseAnalysis/Details', component: caseAnalysisDetails, name: 'caseAnalysisDetails'}
    //   ]
    // },
    
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