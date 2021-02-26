/*
 * 
 * 　　┏┓　　　┏┓+ +
 * 　┏┛┻━━━┛┻┓ + +
 * 　┃　　　　　　　┃ 　
 * 　┃　　　━　　　┃ ++ + + +
 *  ████━████ ┃+
 * 　┃　　　　　　　┃ +
 * 　┃　　　┻　　　┃
 * 　┃　　　　　　　┃ + +
 * 　┗━┓　　　┏━┛
 * 　　　┃　　　┃　　　　　　　　　　　
 * 　　　┃　　　┃ + + + +
 * 　　　┃　　　┃
 * 　　　┃　　　┃ +  神兽保佑
 * 　　　┃　　　┃    代码无bug　　
 * 　　　┃　　　┃　　+　　　　　　　　　
 * 　　　┃　 　　┗━━━┓ + +
 * 　　　┃ 　　　　　　　┣┓
 * 　　　┃ 　　　　　　　┏┛
 * 　　　┗┓┓┏━┳┓┏┛ + + + +
 * 　　　　┃┫┫　┃┫┫
 * 　　　　┗┻┛　┗┻┛+ + + +
 * 
 * 
 * @Author: 酋小怪
 * @Date: 2020-12-25 11:01:46
 * @LastEditTime: 2020-12-28 16:16:57
 * @LastEditors: 酋小怪
 * @Description: In User Settings Edit
 * @FilePath: \loan-apply-cli-ts\src\router\index.ts
 */



import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from '../views/index.vue'

import { isInWeiXin } from '@/utils/wx'
import {useDocumentTitle} from '@/hooks/useDocumentTitle'

//引入 nprogress
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 引入样式



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    meta: {
      index: 0,
      title: ''
    }
  },
  {
    path: '/wxEnv',
    name: 'wxEnv',
    component: () => import('@/views/wxEnv.vue'),
    meta: {
      index: 0,
      title: 'ERROR BROWSER'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'page-404',
    component: (resolve) => require(['@/views/404'], resolve),
    meta: {
      index: 0,
      title: '404'

    }
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  // ${//to and from are Route Object,next() must be called to resolve the hook}
  NProgress.start()
  const isInWX = process.env.NODE_ENV === 'development' ? true : isInWeiXin();
  if (isInWX) {
    next()
  } else {
    if (to.name === 'wxEnv') {
      next()
    } else {
      next({
        name: 'wxEnv',
        replace: true
      })
    }
  }

})
router.afterEach(route => {
  // ${//these hooks do not get a next function and cannot affect the navigation}
  NProgress.done()
  if (route.meta.title) {
    useDocumentTitle(route.meta.title)
    
  }
  try { window.scrollTo(0, 0); } catch (err) {
    alert(err)
    alert('window.scrollTo')
  }


})
export default router
