# nopostpone.github.io

基于 [VitePress](https://vitepress.dev/) 搭建的个人博客，用于存档算法竞赛、深度学习、计算机视觉等方向的笔记。

## 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/nopostpone/nopostpone.github.io.git
cd nopostpone.github.io

# 2. 安装依赖（使用 pnpm）
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 构建静态文件
pnpm build

# 5. 预览构建产物
pnpm preview
```

## 目录结构

```
.
├── .vitepress/
│   ├── config.mts          # VitePress 配置（导航栏、侧边栏、KaTeX）
│   └── theme/
│       ├── index.ts          # 自定义主题入口
│       ├── style.css         # 全局样式与 CSS 变量
│       ├── components/
│       │   ├── myLayout.vue  # 自定义 Layout（侧边栏折叠按钮）
│       │   └── AboutMe.vue   # About 页面组件
│       └── utils/
│           └── serverUtils.ts # 自动生成侧边栏工具函数
├── notes/                   # 笔记内容（按目录分类）
│   ├── introduction.md
│   ├── algorithms/
│   └── deep-learning/
├── about/                   # About 页面
├── archives/                # 归档页面
├── public/                  # 静态资源
└── index.md                 # 首页
```

## 添加新笔记

在 `notes/` 目录下创建 `.md` 文件，侧边栏会自动更新。文件支持在 frontmatter 中指定标题：

```yaml
---
title: 自定义标题
---
```

若不指定 `title`，则自动使用文件名作为标题。

## 技术栈

- [VitePress](https://vitepress.dev/) — 静态站点生成器
- [Vue 3](https://vuejs.org/) — 自定义主题组件
- [KaTeX](https://katex.org/) — 数学公式渲染
- [pnpm](https://pnpm.io/) — 包管理器
