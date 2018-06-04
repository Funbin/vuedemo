// 这里面负责写路由映射，便于管理

// 引入路由模块并使用它
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 创建路由实例并配置路由映射
// path:'*',redirect:'/home'  重定向到path是/home的映射
const router = new VueRouter({
  routes: [{
      path: '/home',
      name: '电影',
      component: require('../views/Home.vue')
    },
    {
      path: '/about',
      name: '测试1',
      component: require('../views/About.vue')
    },
    {
      path: '/test',
      name: '测试2',
      component: require('../views/Test.vue')
    },
    {
      path: '*',
      name: '首页',
      redirect: '/home'
    }
  ]
})

// 输出router
export default router;
