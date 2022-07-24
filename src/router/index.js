import Vue from 'vue'
import VueRouter from 'vue-router'
//导入login组件
import Login from '../components/Login.vue'
//导入Home组件
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Report from '../components/report/Report.vue'

Vue.use(VueRouter)

//路由规则
const routes = [
    // 路由重定向
    { path: '/', redirect: '/login' },
    //新增路由规则
    { path: '/login', component: Login },
    // 添加home子路由
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [{ path: '/welcome', component: Welcome },
            { path: '/users', component: Users },
            { path: '/rights', component: Rights },
            { path: '/roles', component: Roles },
            { path: '/categories', component: Cate },
            { path: '/reports', component: Report },


        ]
    }

]

const router = new VueRouter({
    routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    /*
    to 将要访问的路径
    from 代表从哪个路径跳转而来
    next 是一个函数，表示放行
      next() 放行  next('/login')强制跳转
    */
    if (to.path === '/login') return next()
        //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router