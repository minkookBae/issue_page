import Vue from 'vue'
import Router from 'vue-router'
import Issues from '@/components/Issues'
import NewIssue from '@/components/NewIssue'
import EditIssue from '@/components/EditIssue'
import Hello from '@/views/Hello'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Issues',
      name: 'Issues',
      component: Issues
    },
    {
      path: '/Issues/new',
      name: 'NewIssue',
      component: NewIssue
    },
    {
      path: '/Issues/:id',
      name: 'EditIssue',
      component: EditIssue
    }
  ]
})
