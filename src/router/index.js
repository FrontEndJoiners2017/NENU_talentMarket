import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store' //引入store
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
// 市场走访管理
import markInterview from '@/pages/markInterview/markInterviewHome'
import markInterviewAdd from '@/pages/markInterview/markInterviewAdd'
import markInterviewDetails from '@/pages/markInterview/markInterviewDetails'
// 单位情况分析
import caseAnalysis from '@/pages/caseAnalysis/caseAnalysisHome'
import caseAnalysisDetails from '@/pages/caseAnalysis/caseAnalysisDetails'
//系统管理√
import peoManagement from '@/pages/sysManagement/peoManagement_Main'
import { Store } from 'vuex';

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
      name: 'DFU',
      meta:{
        requiresAuth: true
      }
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
      name: 'eduIndus',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/comRank/nonEduIndus',
      component: nonEduIndus,
      name: 'nonEduIndus',
      meta: {
        requiresAuth: true
      }
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
      path:'/signCity',
      component: signCity,
      name: 'signCity',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/intentionCity',
      component: intentionCity,
      name: 'intentionCity',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sourceCity',
      component: sourceCity,
      name: 'sourceCity',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/formerInterview',
      component: formerInterview,
      name: 'formerInterview',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cityVisit',
      component: cityVisit,
      name: 'cityVisit',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cityClassify',
      component: cityClassify,
      name: 'cityClassify',
      meta: {
        requiresAuth: true
      }
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
      meta: {
        requiresAuth: true
      }
    },
    { 
      path: '/markInterview/Add', 
      component: markInterviewAdd, 
      name: 'markInterviewAdd',
      meta: {
        requiresAuth: true
      }
    },
    { path: '/markInterview/Details', 
      component: markInterviewDetails, 
      name: 'markInterviewDetails',
      meta: {
        requiresAuth: true
      }
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
      meta: {
        requiresAuth: true
      }
    },
    { 
      path: '/caseAnalysis/Details', 
      component: caseAnalysisDetails, 
      name: 'caseAnalysisDetails',
      meta: {
        requiresAuth: true
      }
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
      name: 'peoManagement',
      meta: {
        requiresAuth: true
      }
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
  const isLogined = store.getters.getIsLogined    //获取登录状态
  /*如果进入需要登录的页面，就判断是否已经登录，如果登录》next，如果没登录》Login*/
  if (to.meta.requiresAuth) {
    if (isLogined) {
      next()
    } else {
      next('/Login')
    }
  } else {
    next()
  }
})

export default router;