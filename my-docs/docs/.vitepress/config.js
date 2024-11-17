// docs/.vitepress/config.js

export default {
  title: '开发笔记',        // 网站标题
  description: '记录开发过程中的点滴', // 网站描述
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Web', link: '/notes/Web/01' },
      { text: 'Server', link: '/notes/Server/01' }
    ],

    sidebar: {
      '/notes/Web/': [
        {
          text: '前端开发笔记',
          collapsible: true,
          items: [
            { text: 'Web01', link: '/notes/Web/01' },
            { text: 'Web02', link: 'notes/Web/02' }
          ]
        }
      ],
      '/notes/Server/': [
        {
          text: '后台开发笔记',
          items: [
            { text: '', link: '/notes/backend/node' },
          ]
        }
      ]
    }
  }
}
