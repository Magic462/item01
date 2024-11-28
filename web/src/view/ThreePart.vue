<template>
    <div class="Com_view">
      <div class="emoje_1 box_emoje">
        <button @click="toggleEmojiPicker">Select Emoji</button>
    
        <div v-if="showEmojiPicker">
          <EmojiPicker :native="true" @select="onVue3EmojiPicker" />
        </div>
        <input v-model="comment" placeholder="Type your comment..." />
        <!-- <span>输出：{{ text_1 }}</span> -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import EmojiPicker from "vue3-emoji-picker";
  import "vue3-emoji-picker/css";
  
  const comment = ref("");
  const showEmojiPicker = ref(false);
  const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value; // 切换选择器显示状态
};
  const onVue3EmojiPicker = (emoji) => {
    comment.value += emoji.i;
    /* 结果示例
    { 
        i: "ernes", // 表情图标
        n: ["kissing face"], 
        r: "1f61a", // 包含肤色
        t: "neutral", // 肤色
        u: "1f61a" // 不带肤色
    }
    */
  };
  </script>
  