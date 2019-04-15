import Vue from 'vue'
import Router from 'vue-router'
// 一级分类
import Login from '@/Login'   //登录页面
import Container from '@/Container'   //视图容器
import NotFound from '@/components/NotFound'    //NotFound
// 公共页面
import HelloWorld from '@/components/HelloWorld'    //HelloWorld
import DFU from '@/components/DFU'    //主页 描述页面
import Login from '@/Login'
import Container from '@/Container'
import NotFound from '@/components/NotFound'
import HelloWorld from '@/components/HelloWorld'
import DFU from '@/components/DFU'
import markInterviewHome from '@/pages/markInterview/markInterviewHome'
import markInterviewAdd from '@/pages/markInterview/markInterviewAdd'
import markInterviewDetails from '@/pages/markInterview/markInterviewDetails'
import caseAnalysisHome from '@/pages/caseAnalysis/caseAnalysisHome'
import caseAnalysisDetails from "@/pages/caseAnalysis/caseAnalysisDetails"
import signCity from '@/pages/classRank/signCity'
import signCityDetails from '@/pages/classRank/signCityDetails'
import intentionCity from '@/pages/classRank/intentionCity'
import intentionCityDetails from '@/pages/classRank/intentionCityDetails'
import sourceCity from '@/pages/classRank/sourceCity'
import sourceCityDetails from '@/pages/classRank/sourceCityDetails'

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
        { path: '/markInterviewAdd', component: markInterviewAdd, name: 'markInterviewAdd' },
        { path: '/markInterviewDetails', component: markInterviewDetails, name: 'markInterviewDetails' },
        { path: '/caseAnalysisHome', component: caseAnalysisHome, name: 'caseAnalysisHome' },
        { path: '/caseAnalysisDetails', component: caseAnalysisDetails, name: 'caseAnalysisDetails' },
        { path: '/signCity', component: signCity, name: 'signCity' },  
        { path: '/signCityDetails', component: signCityDetails, name: 'signCityDetails' },
        { path: '/intentionCity', component: intentionCity, name: 'intentionCity' },
        { path: '/intentionCityDetails', component: intentionCityDetails, name: 'intentionCityDetails' },
        { path: '/sourceCity', component: sourceCity, name: 'sourceCity' },
        { path: '/sourceCityDetails', component: sourceCityDetails, name: 'sourceCityDetails' },
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
