<script setup>
  import { onMounted, ref } from 'vue';
import wangEditor from 'wangeditor';

// 创建一个 ref 用于绑定编辑器容器
const editorContainer = ref(null);
let editor = null;

onMounted(() => {
  // 初始化编辑器
  editor = new wangEditor(editorContainer.value);

  // 配置全屏模式
  editor.config.fullScreen = true; // 开启全屏模式
  editor.config.onCreated = () => {
    console.log('编辑器创建完成');
  };

  // 初始化并渲染
  editor.create()
})
</script>
<template>
   <div>
    <!-- 编辑器容器 -->
    <div ref="editorContainer"></div>
  </div>
</template>
<style scoped>
   
</style>