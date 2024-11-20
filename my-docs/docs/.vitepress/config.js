// docs/.vitepress/config.js

export default {
  title: '开发笔记',        // 网站标题
  description: '记录开发过程中的点滴', // 网站描述
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Web', link: '/notes/Web/route-menu' },
      { text: 'Server', link: '/notes/Server/01' }
    ],

    sidebar: {
      '/notes/Web/': [
        {
          text: '基础',
          collapsible: true,
          items: [
            { text: '路由和菜单', link: '/notes/Web/route-menu' },
            { text: '配置', link: '/notes/Web/configure' }
          ]
        },
        {
          text: '进阶',
          collapsible: true,
          items: [
            { text: '登录注册', link: '/notes/Web/login-register' },
            { text: '请求与拦截器', link: '/notes/Web/request' }
          ]
        },
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
