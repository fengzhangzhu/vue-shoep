import Vue from 'vue'
import App from './App.vue' //导入APP根组件
import router from './router' //导入路由
import './plugins/element.js' //导入Element组件
//导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'

//导入全局axios包
import axios from 'axios'
//配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    /*将axios挂载到原型对象上
    这样的话，每个vue组件都能通过this访问到http，从而发起Ajax请求*/
    // 在挂载之前设置拦截器，request为请求拦截器
axios.interceptors.request.use(config => {
    console.log(config)
        //预处理
    config.headers.Authorization = window.sessionStorage.getItem('token')
        // 在最后必须 return config
    return config
})
Vue.prototype.$http = axios


Vue.config.productionTip = false

// 注册TreeTable组件,全局可用
Vue.component('tree-table', TreeTable)
    //vue 实例
new Vue({
    router, // 将路由挂载在vue实例中
    render: h => h(App) // 通过render函数将APP根组件渲染到页面
}).$mount('#app')