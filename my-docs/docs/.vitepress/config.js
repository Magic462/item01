// docs/.vitepress/config.js

export default {
  title: 'My Demo',        // 网站标题
  description: 'Just playing around.', // 网站描述
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is VitePress?', link: '/introduction/what-is-vitepress' },
          { text: 'Getting Started', link: '/introduction/getting-started' }
        ]
      },
      {
        text: 'Guide',
        items: [
          { text: 'Markdown Syntax', link: '/guide/markdown' },
          { text: 'Custom Configurations', link: '/guide/config' }
        ]
      }
    ]
  }
}
