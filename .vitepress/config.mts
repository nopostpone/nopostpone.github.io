import { defineConfig } from 'vitepress'
import { getNotesSidebar } from './theme/utils/serverUtils'
import { katex } from '@mdit/plugin-katex'

export default async () => {
  const notesSidebarItems = await getNotesSidebar()

  return defineConfig({
    title: "nopostpone",
    // 1. 注入 KaTeX 样式表，这是公式正常显示的前提
    head: [
      ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css' }],
      ['script', {}, `
        try {
          if (localStorage.getItem('sidebar-hidden') === 'true') {
            document.documentElement.classList.add('custom-sidebar-hidden')
          }
        } catch (e) {}
      `],
    ],
    markdown: {
      config: (md) => {
        // 2. 使用 KaTeX 插件
        md.use(katex)
      }
    },
    themeConfig: {
      // 只要你在 /notes/ 路径下，就会显示这个全自动侧边栏
      sidebar: {
        '/notes/': notesSidebarItems
      },
      outline: 'deep',

      nav: [
        { text: 'Notes', link: '/notes/introduction.md' },
        { text: 'Archives', link: '/archives/index.md' },
        { text: 'About', link: '/about/index.md' },
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/nopostpone' }
      ]
    }
  })
}


// // https://vitepress.dev/reference/site-config
// export default defineConfig({
//   title: "Note",
//   description: "A VitePress Site",
//   themeConfig: {
//     // https://vitepress.dev/reference/default-theme-config
//     nav: [
//       { text: 'Home', link: '/' },
//       { text: 'Examples', link: '/markdown-examples' }
//     ],

//     sidebar: [
//       {
//         text: 'Examples',
//         items: [
//           { text: 'Markdown Examples', link: '/markdown-examples' },
//           { text: 'Runtime API Examples', link: '/api-examples' }
//         ]
//       }
//     ],

//   }
// })
