
<template>
  <div class="container">
    <div class="chatBox">
      <div class="chat-container" id="chatContainer">
        <div v-for="(msg, index) in messages" :key="index" class="chat-message">
          <div v-if="msg.type === 'user'" class="userIconfont icfont">
            <i class="iconfont icon-user"></i>
          </div>
          <div v-if="msg.type === 'ai'" class="aiIconfont icfont">
            <i class="iconfont icon-ChatGPT"></i>
          </div>
          <div :class="msg.type === 'user' ? 'user-message message' : 'ai-message message'">
            <p>{{ msg.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="userOption">
      <input
        type="text"
        class="styled-input"
        v-model="inputText"
        placeholder="输入内容..."
      />
      <button class="styled-button" @click="sendMessage" :disabled="isSending">提交</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputText = ref('');
const messages = ref([{ type: 'ai', text: '你好！我是聊天助手。' }]);
const isSending = ref(false);

const sendMessage = async () => {
  const value = inputText.value.trim();
  if (value === '') return;

  messages.value.push({ type: 'user', text: value });
  inputText.value = '';
  isSending.value = true;

  try {
    const response = await fetch('http://localhost:3000/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });

    const data = await response.json();
    if (data.status === 500) {
      messages.value.push({ type: 'ai', text: '服务器错误，请稍后重试！' });
    } else {
      messages.value.push({ type: 'ai', text: data.res });
    }
  } catch (error) {
    messages.value.push({ type: 'ai', text: '对不起，无法访问服务器' });
  } finally {
    isSending.value = false;
  }
};
</script>

<style>
* {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: rgb(16, 16, 20);
        }

        .chat-container {
            width: 100%;
            max-width: 100vw;
            margin: auto;
            border: 1px solid #ccc;
            padding: 10px;
            height: 650px;
            overflow-y: scroll;
            background-color: rgb(16, 16, 20);
        }

        .chat-message {
            margin-bottom: 10px;
            padding: 5px;
            border-radius: 5px;
        }

        .iconfont {
            font-size: 20px;
        }

        .icfont {

            color: #ccc;
        }

        .user-message {
            position: relative;
            left: 0;
            text-align: right;
            background-color: rgb(161, 220, 149);
            color: #000;
        }

        .ai-message {
            background-color: rgb(30, 30, 32);
            color: rgb(235, 235, 235);
            text-align: left;
        }

        .message {
            display: inline-block;
            max-width: 800px;
            border-radius: 30px;
            padding: 12px 25px;
        }

        .userOption {
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .styled-input {
            flex-grow: 0;
            width: 35vw;
            padding: 10px;
            /* margin-bottom: 10px; */
            margin-right: 12px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .styled-input:focus {
            outline: none;
            border-color: #007bff;
        }

        .styled-button {
            padding: 10px 20px;
            border: none;
            /* background-color: #007bff; */
            color: black;
            border-radius: 5px;
            cursor: pointer;
        }
</style>
