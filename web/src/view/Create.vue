<template>
  <el-button type="primary" @click="uploadArticle">上传文章</el-button>
  <el-button type="primary" @click="toggleMdMode">{{ mdMode ? '切换为 HTML 模式' : '转换为 MD 语法' }}</el-button>
  <div class="editor-container">
    <div ref="editorContainer" class="editor"></div>
    <div class="preview" v-html="previewHtml"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import wangEditor from 'wangeditor';
import { marked } from 'marked';
import { upload } from '../api/CreatPart'; // 假设你有一个上传 API

const editorContainer = ref(null);
const previewHtml = ref('');
let editor = null;
const mdMode = ref(false); // 状态变量，判断是否为 Markdown 模式

onMounted(() => {
  // 初始化编辑器
  editor = new wangEditor(editorContainer.value);

  // 开启全屏模式
  editor.config.fullScreen = true;

  // 设置 onChange 事件
  editor.config.onchange = () => {
    let content = editor.txt.html(); // 获取编辑器的 HTML 内容
    if (mdMode.value) {
      // content = editor.txt.text()
      //将空段落转换为两个换行符并提取段落内容
      const markdownContent = content.replace(/<p>(.*?)<\/p>/g, '$1\n\n').replace(/<br\s*\/?>/g, '\n')
      previewHtml.value = marked(markdownContent); // 将 Markdown 转换为 HTML
    } else {
      previewHtml.value = content;
    }
  };

  editor.config.onCreated = () => {
    console.log('编辑器创建完成');
  };

  // 初始化并渲染
  editor.create();
});

// 上传文章
const uploadArticle = async () => {
  const content = editor.txt.html(); // 获取编辑器的 HTML 内容
  const markdownContent = mdMode.value ? content.replace(/<[^>]+>/g, '') : content; // 提取纯文本内容
  const htmlContent = marked(markdownContent); // 将 Markdown 转换为 HTML

  try {
    const response = await upload({ content: htmlContent }); // 将内容发送到服务器
    if (response.status === 200) {
      alert('上传成功');
      console.log('上传成功:', response.data);
    } else {
      console.error('上传失败:', response.statusText);
    }
  } catch (error) {
    console.error('网络错误:', error);
  }
};

// 切换 Markdown 模式
const toggleMdMode = () => {
  // const content = editor.txt.html(); // 获取当前 HTML 内容

  //   if (mdMode.value) {
  //       // 如果当前是 Markdown 模式，切换为 HTML 模式
  //       mdMode.value = false;
  //   } else {
  //       // 如果当前是 HTML 模式，切换为 Markdown 模式
  //       // 将 HTML 转换为 Markdown
  //       const markdownContent = content
  //           .replace(/<p>(.*?)<\/p>/g, '$1\n\n') // 将段落转换为 Markdown
  //           .replace(/<br\s*\/?>/g, '\n'); // 将 <br> 替换为换行符
  //             console.log(markdownContent);
              
  //       editor.txt.html(markdownContent); // 更新编辑器内容为 Markdown
  //       mdMode.value = true; // 切换为 Markdown 模式
  //   }
  confirm ('记得保存内容')
  editor.txt.html('')
  mdMode.value = !mdMode.value; // 切换模式
};

</script>

<style scoped>
.editor-container {
  display: flex;
  height: 100vh;
  text-align: left; /* 段落文字左对齐 */
}

.editor {
  flex: 1;
  border-right: 1px solid #ccc;
  padding: 10px;
}

.preview {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f9f9f9;
}
</style>