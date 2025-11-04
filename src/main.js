import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css' // 或者使用默认样式
import './assets/common.css'

const app = createApp(App)

// 全局引入 Ant Design Vue
app.use(Antd)

// 全局挂载路由方法
app.config.globalProperties.$route = {
  // 跳转到指定路径
  push: (path) => {
    router.push(path)
  },
  
  // 跳转到命名路由
  to: (name, params = {}, query = {}) => {
    router.push({ name, params, query })
  },
  
  // 带参数的路径跳转
  go: (path, query = {}) => {
    router.push({ path, query })
  },
  
  // 返回上一页
  back: () => {
    router.back()
  },
  
  // 前进
  forward: () => {
    router.forward()
  },
  
  // 替换当前路由
  replace: (path) => {
    router.replace(path)
  },
  
  // 获取当前路由信息
  getCurrent: () => {
    return router.currentRoute.value
  }
}

app.use(router)
app.mount('#app')