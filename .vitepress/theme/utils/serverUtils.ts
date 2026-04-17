import fg from 'fast-glob'
import matter from 'gray-matter'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export interface SidebarGroup {
  text: string
  items: { text: string; link: string }[]
  collapsed?: boolean
}

function formatTitle(rawName: string): string {
  if (!rawName) return ''
  const formatted = rawName.replace(/-/g, ' ').replace(/_/g, '-')
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export async function getNotesSidebar() {
  const files = await fg(['notes/**/*.md'], {
    ignore: ['**/node_modules/**']
  })

  // 构建一个虚拟的根节点 (Trie Root)
  const root: Record<string, any> = { items: {} }

  const rootText = 'Hi'

  for (const file of files) {
    const content = await readFile(file, 'utf-8')
    const { data } = matter(content)
    
    let title = data.title
    if (!title) {
      title = formatTitle(path.basename(file, '.md'))
    }
    
    
    const link = `/${file.replace('.md', '')}`

    // 获取相对于 notes 的路径段，例如: ['algo', 'solutions', '1.md']
    const relativePath = path.relative('notes', file)
    // 兼容 Windows 和 Linux 的路径分隔符
    const parts = relativePath.split(path.sep).join('/').split('/') 

    let currentNode = root
    
    // 遍历前面的文件夹层级，按需创建内部节点
    for (let i = 0; i < parts.length - 1; i++) {
      const folderName = parts[i]
      if (!currentNode.items[folderName]) {

        currentNode.items[folderName] = {
          // 文件夹首字母大写
          text: formatTitle(folderName),
          collapsed: true,
          items: {}
        }
      }
      currentNode = currentNode.items[folderName]
    }

    // 处理最后的叶子节点（文件）
    const fileName = parts[parts.length - 1]
    
    // 特殊处理根目录的 welcome.md 等文件
    if (parts.length === 1) {
       if (!root.items['General']) {
           root.items['General'] = { text: rootText, collapsed: false, items: {} }
       }
       root.items['General'].items[fileName] = { text: title, link }
    } else {
       // 将文件节点插入到对应的文件夹节点下
       currentNode.items[fileName] = { text: title, link }
    }
  }

  // 深度优先遍历 (DFS)：将对象树转换为 VitePress 需要的数组树
  function objectToArray(node: any): any[] {
    if (!node.items) return []
    
    // 按字母顺序排序同级目录和文件
    return Object.keys(node.items).sort().map(key => {
      const child = node.items[key]
      if (child.link) {
        return child // 叶子节点直接返回
      } else {
        return {
          text: child.text,
          collapsed: child.collapsed,
          items: objectToArray(child) // 递归转换子树
        }
      }
    })
  }

  // 提取最终生成的侧边栏数组，并确保 General 排在最前面
  const finalSidebar = objectToArray(root)
  finalSidebar.sort((a, b) => {
    if (a.text === rootText) return -1
    if (b.text === rootText) return 1
    return 0
  })

  return finalSidebar
}