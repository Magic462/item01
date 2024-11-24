import { createRouter, createWebHistory } from 'vue-router';
// import Home from './views/Home.vue'; // 假设你有 Home.vue 组件
// import About from './views/About.vue'; // 假设你有 About.vue 组件

const router = createRouter({
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
        {
          path: 'MainPart',
          component: () => import('@/view/MainPart.vue')
        },
        {
          path: 'FourPart',
          component: () => import('@/view/FourPart.vue'),
        },
        {
          path: 'TwoPart',
          component: () => import('@/view/TwoPart.vue')
        },
        {
          path: 'ThreePart',
          component: () => import('@/view/ThreePart.vue')
        },
        {
          path: 'ChatRoom',
          component: () => import('@/view/ChatRoom.vue'),
        },
        // {
        //   path: 'SettingPart/:userId',
        //   component: () => import('@/view/SettingPart.vue')
        // },
        {
          path: 'CommentPart/:commentId',
          component: () => import('@/view/CommentPart.vue')
        },
        {
          path: 'AiPart',
          component: () => import('@/view/AiPart.vue')
        },
      ]
    },
    {
      path: '/create',
      component: () => import('@/view/Create.vue')
    },
    {
      path: '/login',
      component: () => import('@/view/Login.vue')
    }
  ]
});

export default router;