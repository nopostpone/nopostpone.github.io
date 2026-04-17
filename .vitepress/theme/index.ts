import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import type { Theme } from 'vitepress'

import AboutMe from './components/AboutMe.vue'
import myLayout from './components/myLayout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  // 直接使用我们封装好的 Vue 组件作为布局基座
  Layout: myLayout,
  enhanceApp({ app }) {
    // 关键：将组件注册到全局 Vue 实例中
    app.component('AboutMe', AboutMe) 
  }
} satisfies Theme