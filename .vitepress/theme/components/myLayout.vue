<script setup>
import DefaultTheme from 'vitepress/theme'
import { useSidebar } from 'vitepress/theme'

const { Layout } = DefaultTheme

const { hasSidebar } = useSidebar()

function toggleSidebar() {
  if (typeof document !== 'undefined') {
    const isHidden = document.documentElement.classList.toggle('custom-sidebar-hidden')
    try {
      localStorage.setItem('sidebar-hidden', isHidden ? 'true' : 'false')
    } catch (e) {} // 加上 try-catch 防止浏览器隐私模式报错
  }
}

</script>

<template>
  <Layout>
    <template #nav-bar-title-after>
      <button 
        v-if="hasSidebar"
        type="button"
        class="custom-sidebar-toggle" 
        @click.prevent.stop="toggleSidebar" 
        title="收起/展开侧边栏"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
        </svg>
      </button>
    </template>
  </Layout>
</template>