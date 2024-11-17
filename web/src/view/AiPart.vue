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
    const response = await fetch('http://localhost:3007/layout/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: value })
    });

    if (!response.ok) {
      const errorData = await response.json();
      messages.value.push({ type: 'ai', text: errorData.error || '服务器错误，请稍后重试！' });
      return;
    }

    const data = await response.json();
    messages.value.push({ type: 'ai', text: data.res.choices[0].message.content });
  } catch (error) {
    messages.value.push({ type: 'ai', text: '对不起，无法访问服务器' });
  } finally {
    isSending.value = false;
  }
};
</script>

<template>
  <div class="container">
    <div class="chatBox">
      <div class="chat-container" id="chatContainer">
        <div v-for="(msg, index) in messages" :key="index" class="chat-message">
          <div v-if="msg.type === 'user'" class="userIconfont icfont">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="#059669" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="8" r="5" fill="#059669"/><path d="M20 21a8 8 0 1 0-16 0"/><path fill="#059669" d="M12 13a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8"/></g></svg> -->
          </div>
          <div v-if="msg.type === 'ai'" class="aiIconfont icfont">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="#0284c7" fill-rule="evenodd" d="M9.825.638c.183-.836 1.374-.841 1.565-.006l.008.039l.018.078c.22.934.976 1.647 1.922 1.812c.872.152.872 1.404 0 1.556a2.4 2.4 0 0 0-1.925 1.827l-.024.102c-.19.835-1.38.83-1.564-.006l-.019-.088a2.38 2.38 0 0 0-1.918-1.837c-.87-.151-.87-1.401 0-1.552A2.38 2.38 0 0 0 9.804.736L9.818.67l.007-.033Zm.727 7.118a1.9 1.9 0 0 1-1.275-.529a.8.8 0 0 0-.194.186c-.45.596-.977 1.205-1.573 1.8c-.452.452-.91.863-1.362 1.23c-.452-.367-.91-.778-1.362-1.23a18 18 0 0 1-1.23-1.361c.367-.453.779-.91 1.23-1.362a17 17 0 0 1 1.8-1.573a.8.8 0 0 0 .172-.172a1.87 1.87 0 0 1-.61-1.365c-.981-.687-1.951-1.196-2.817-1.461c-.938-.287-2.038-.364-2.759.356c-.467.468-.594 1.104-.558 1.709c.036.606.239 1.272.546 1.948a12 12 0 0 0 1.117 1.92A12 12 0 0 0 .56 9.77c-.307.676-.51 1.342-.546 1.948s.09 1.241.558 1.709s1.104.594 1.709.558c.605-.037 1.272-.239 1.948-.546c.61-.277 1.259-.655 1.92-1.117c.66.462 1.308.84 1.919 1.117c.675.307 1.342.51 1.948.546s1.24-.091 1.708-.559c.721-.72.644-1.82.357-2.758c-.274-.894-.807-1.9-1.529-2.913Zm-7.66-4.403c.576.176 1.263.51 2.007.994a19.5 19.5 0 0 0-2.256 2.256a10 10 0 0 1-.718-1.292c-.263-.58-.392-1.06-.414-1.417c-.021-.359.067-.503.122-.558c.09-.09.423-.238 1.26.017Zm-.967 7.039c.184-.405.425-.84.718-1.292A19.5 19.5 0 0 0 4.9 11.356a10 10 0 0 1-1.291.719c-.58.263-1.06.392-1.417.414c-.36.021-.503-.067-.558-.122s-.143-.2-.122-.558c.022-.357.15-.837.414-1.417Zm6.763 1.683a10 10 0 0 1-1.29-.719A19.5 19.5 0 0 0 9.652 9.1c.483.745.817 1.432.993 2.008c.256.836.108 1.169.018 1.259c-.056.055-.2.143-.558.121c-.358-.02-.838-.15-1.418-.413Zm-3.54-4.223a1 1 0 1 1 2 0a1 1 0 0 1-2 0" clip-rule="evenodd"/></svg> -->
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

<style>
/* * {
    margin: 0;
    margin: 0;
    padding: 0;
} */

/* body {
    font-family: Arial, sans-serif;
    background-color: rgb(16, 16, 20);
} */

.chat-container {
    width: 50%;
    max-width: 100vw;
    margin: auto;
    border: 1px solid #ccc;
    padding: 10px;
    height: 85vh;
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

.aiIconfont {

}
</style>
