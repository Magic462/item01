import { createRouter, createWebHistory } from 'vue-router';
// import Home from './views/Home.vue'; // 假设你有 Home.vue 组件
// import About from './views/About.vue'; // 假设你有 About.vue 组件

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:'/',
      component: ()=>import('@/view/LayOut.vue'),
      redirect:'/MainPart',
      children:[
        {
          path:'UserPart',
          component: ()=>import('@/view/UserPart.vue')
        },
        {
          path:'MainPart',
          component: ()=>import('@/view/MainPart.vue')
        },
        {
          path:'OneModule',
          component: ()=>import('@/view/OneModule.vue')
        },
        {
          path:'TwoModule',
          component: ()=>import('@/view/TwoModule.vue')
        },
        {
          path:'ThreeModule',
          component: ()=>import('@/view/ThreeModule.vue')
        },
        {
          path:'SettingPart/:userId',
          component: ()=>import('@/view/SettingPart.vue')
        },
        {
          path:'CommentPart/:commentId',
          component: ()=>import('@/view/CommentPart.vue')
        },
      ]
    },
  ]
});

export default router;