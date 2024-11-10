// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import vue from '@vitejs/plugin-vue'
// import ElementPlus from 'unplugin-element-plus/vite'
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const sassEmbedded = require('sass-embedded');

// // https://vitejs.dev/config/
// export default defineConfig({
//   // base:'/@view/',
//   plugins: [
//     ElementPlus({ useSource: true }),
//     AutoImport({
//       resolvers: [ElementPlusResolver()],
//     }),
//     Components({
//       //配置elementPlus采用sass样式配色系统
//       resolvers: [ElementPlusResolver()],
//     }),
//     vue(),
//     {
//       name: 'vite-plugin-sass-embedded',
//       config: () => {
//         return {
//           css: {
//             preprocessorOptions: {
//               scss: {
//                 additionalData: '@use "element-plus/theme-chalk/style/element/index.scss" as *;',
//                 // 设置为现代 API
//                 // api: 'modern',
//               },
//             },
//           },
//         };
//       },
//     },
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
// })


import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const sassEmbedded = require('sass-embedded');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({ useSource: true }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    {
      name: 'vite-plugin-sass-embedded',
      config: () => {
        return {
          css: {
            preprocessorOptions: {
              scss: {
                 additionalData: '$injectedColor: red;', // 确保路径正确
              },
            },
          },
        };
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});