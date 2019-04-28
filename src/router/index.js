import Vue from 'vue'
import VueRouter from 'vue-router'
// 公共页面
import Login from '@/components/Login'   //登录页面
import NotFound from '@/components/NotFound'    //NotFound
import DFU from '@/components/DFU'    //主页 描述页面
// 城市综合排名√
import eduIndus from '@/pages/comRank/eduIndus/eduIndus_Main'
import nonEduIndus from '@/pages/comRank/nonEduIndus/noneduIndus_Main'
// 城市分类排名
import signCity from '@/pages/classRank/signCity/signCity'
import intentionCity from '@/pages/classRank/intentionCity/intentionCity'
import sourceCity from '@/pages/classRank/sourceCity/sourceCity'
import formerInterview from '@/pages/classRank/formerInterview/formerInterview'
import cityVisit from '@/pages/classRank/cityVisit/cityVisit'
import cityClassify from '@/pages/classRank/cityClassify/cityClassify'
// 城市分类排名 > 公共的详细城市信息页面
import cityDetails from '@/pages/classRank/cityDetails/cityDetails'   
// 市场走访管理
import markInterview from '@/pages/markInterview/markInterviewHome'
import markInterviewAdd from '@/pages/markInterview/markInterviewAdd'
import markInterviewDetails from '@/pages/markInterview/markInterviewDetails'
// 单位情况分析
import caseAnalysis from '@/pages/caseAnalysis/caseAnalysisHome'
import caseAnalysisDetails from '@/pages/caseAnalysis/caseAnalysisDetails'
//系统管理√
import peoManagement from '@/pages/sysManagement/peoManagement_Main'

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
      path: '/Login',
      component: Login,
      name: 'Login',
      hidden: true
    },
    {
      path: '/',  // 默认进入路由
      redirect: '/DFU'   //重定向
    },
    {
      path: '/DFU',
      component: DFU,
      name: 'DFU'
    },
    /**
     * 城市综合排名
     * comRank
     * |--eduIndus
     * |--nonedulndes
     * @author ??????
     */
    {
      path: '/comRank/eduIndus',
      component: eduIndus,
      name: 'eduIndus'
    },
    {
      path: '/comRank/nonEduIndus',
      component: nonEduIndus,
      name: 'nonEduIndus'
    },
    /**
     * 城市分类排名
     * classRank
     * |--signCity
     * |      |--signCityDetails
     * |
     * |--intentionCity
     * |      |--intentionCityDetails
     * |
     * |--sourceCity
     * |      |--sourceCityDetails
     * |
     * |--formerInterview
     * |--cityVisit
     * |--cityClassify
     * @author NaLI
     * @author HaichuanCHU
     */
    {
      path: '/cityDetails',
      component: cityDetails,
      name: 'cityDetails'
    },
    {
      path:'/signCity',
      component: signCity,
      name:'signCity'
    },
    {
      path: '/intentionCity',
      component: intentionCity,
      name: 'intentionCity'
    },
    {
      path: '/sourceCity',
      component: sourceCity,
      name: 'sourceCity'
    },
    {
      path: '/formerInterview',
      component: formerInterview,
      name: 'formerInterview'
    },
    {
      path: '/cityVisit',
      component: cityVisit,
      name: 'cityVisit'
    },
    {
      path: '/cityClassify',
      component: cityClassify,
      name: 'cityClassify'
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
      component: markInterview,
      name: 'markInterview',
    },
    { 
      path: '/markInterview/Add', 
      component: markInterviewAdd, 
      name: 'markInterviewAdd' 
    },
    { path: '/markInterview/Details', 
      component: markInterviewDetails, 
      name: 'markInterviewDetails' 
    },
    /**
     * 单位情况分析
     * caseAnalysis
     * |--Details
     * @author TingtingWU
     */
    {
      path: '/caseAnalysis',
      component: caseAnalysis,
      name: 'caseAnalysis',
    },
    { 
      path: '/caseAnalysis/Details', 
      component: caseAnalysisDetails, 
      name: 'caseAnalysisDetails' 
    },
    /**
     * 系统管理
     * sysManagement
     * |--peoManagement
     * @author TingtingWU
     */
    {
      path: '/sysManagement/peoManagement',
      component:peoManagement,
      name:'peoManagement'
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
// router.beforeEach((to, from, next) => {
//   console.log('navigation-guards');
//   // to: Route: 即将要进入的目标 路由对象
//   // from: Route: 当前导航正要离开的路由
//   // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

//   const nextRoute = ['DFU', 'HelloWorld', 'markInterviewHome', 'markInterviewAdd', 'markInterviewDetails', 'caseAnalysisHome', 'caseAnalysisDetails'];
//   let isLogin = global.isLogin;  // 是否登录
//   // 未登录状态；当路由到nextRoute指定页时，跳转至Login
//   if (nextRoute.indexOf(to.name) >= 0) {
//     if (!isLogin) {
//       router.push({ name: 'Login' })
//     }
//   }
//   // 已登录状态；当路由到Login时，跳转至home 
//   if (to.name === 'Login') {
//     if (isLogin) {
//       router.push({ name: 'DFU' });
//     }
//   }
//   next();
// });

export default router;