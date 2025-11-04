import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import ColorPicker from '../views/colorPicker/index.vue'
import ChineseConversation from '../views/chineseConversation/index.vue'
import UrlToAudit from '../views/urlToAudit/index.vue'

const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: 'ColorPicker', // 注意：这里不需要斜杠
        name: 'ColorPicker',
        component: ColorPicker,
      },
      {
        path: 'ChineseConversation',
        name: 'ChineseConversation',
        component: ChineseConversation,
      },
      {
        path: 'UrlToAudit',
        name: 'UrlToAudit',
        component: UrlToAudit,
      },
    ]
  },
  // 关于页
  {
    path: '/about',
    name: 'About',
    component: About
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router