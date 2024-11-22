<template>
    <div>
      <div id="box">
        <div 
          v-for="(char, index) in characters" 
          :key="index" 
          class="child"
          @click="toggleGlow(index)"
        >
          <input type="checkbox" v-model="checkedItems[index]" style="display: none;" /> <!-- 隐藏复选框 -->
          <div 
            class="item" 
            :class="{ glow: checkedItems[index] }"
          >
            {{ char }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const text = ref('我是小智,为你答疑解惑哦'); // 初始文本
      const characters = ref(text.value.split('')); // 存储分割后的字符
      const checkedItems = ref(new Array(characters.value.length).fill(false)); // 用于存储复选框的状态
  
      const toggleGlow = (index) => {
        checkedItems.value[index] = !checkedItems.value[index]; // 切换复选框状态
      };
  </script>
  
  <style scoped>
  body {
    padding: 0;
    margin: 0; 
    height: 100vh;
    background: #18191f;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #box {
    position: relative;
    display: flex;
  }
  
  .text-input {
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
    height: 80px;
    width: 400px;
    background: #18191f;
    color: #555;
    font-size: 46px;
    line-height: 80px;
    text-align: left;
    cursor: pointer;
    margin: 0 auto;
    border-radius: 20px;
    box-shadow: -1px -1px 4px rgba(255, 255, 255, 0.05),
      4px 4px 6px rgba(0, 0, 0, 0.2),
      inset -1px -1px 4px rgba(255, 255, 255, 0.05),
      inset 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
  
  .child {
    display: flex;
    align-items: center;
    margin-bottom: 5px; /* 每个字符之间的间距 */
  }
  
  .item {
    position: relative;
    height: 80px;
    width: 80px;
    background: #18191f;
    color: #555;
    font-size: 46px;
    line-height: 80px;
    text-align: center;
    cursor: pointer;
    margin: 0 4px;
    border-radius: 20px;
    box-shadow: -1px -1px 4px rgba(255, 255, 255, 0.05),
      4px 4px 6px rgba(0, 0, 0, 0.2),
      inset -1px -1px 4px rgba(255, 255, 255, 0.05),
      inset 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
  
  .glow {
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.05),
      inset 4px 4px 6px rgba(0, 0, 0, 0.2);
    color: yellow;
    text-shadow: 0 0 15px yellow, 0 0 25px yellow;
    animation: glow 1.5s ease-in-out infinite;
  }
  
  @keyframes glow {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
  </style>