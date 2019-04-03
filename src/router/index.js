import Vue from 'vue'
import Router from 'vue-router'
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
