# 路由和菜单
使用vue-router、element-plus的menu组件实现路由的跳转
# 路由和菜单的说明
## 路由
在这里使用的是element-plus组件库的menu，系统内所有的路由配置都在`web/src/router/router.js`目录下
## 菜单
菜单是路由的另一种表现形式，不管静态路由还是动态路由，最终都是将路由转换成了菜单，展示在界面上，他们是息息相关的。
# 路由配置
## 基础配置
采用按需加载的方式，即路由懒加载可以提升页面性能

使用 Vue Router 4中的`createWebHistory(import.meta.env.BASE_URL)`，vite中的环境变量`import.meta.env.BASE_URL`，就是vite.config.js中的base变量

以下为示例配置
```
const router = createRouter({·
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/view/LayOut.vue'),
      redirect: '/MainPart',
      children: [
            {
              path: 'OnePart',
              component: () => import('@/view/OnePart.vue')
            },
        ]
    }]
})
```