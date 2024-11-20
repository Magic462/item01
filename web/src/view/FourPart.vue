<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import {
  connectWebSocket,
  sendMessage,
  addMessageListener,
  removeMessageListener,
} from '../websocket';

const userId = 2; // 当前用户 ID
const receiverId = 5; // 目标用户 ID

const messages = ref([]);
const inputMessage = ref('');

// 初始化 WebSocket 连接
onMounted(() => {
  connectWebSocket(userId);

  // 添加消息监听器
  const onMessageReceived = (msg) => {
    const message = JSON.parse(msg);
    messages.value.push(message);
  };
  addMessageListener(onMessageReceived);

  // 移除消息监听器
  onUnmounted(() => {
    removeMessageListener(onMessageReceived);
  });
});

// 发送消息
const send = () => {
  if (inputMessage.value.trim() === '') return;

  sendMessage(userId, receiverId, inputMessage.value);
  messages.value.push({
    senderId: userId,
    receiverId,
    content: inputMessage.value,
    createdAt: new Date().toISOString(),
  });

  inputMessage.value = '';
};
</script>

<template>
<!-- <el-empty :image-size="500" /> -->
<div class="chat">
    <div class="messages">
      <div v-for="msg in messages" :key="msg.createdAt">
        <b>{{ msg.senderId === userId ? 'You' : 'Other' }}:</b> {{ msg.content }}
      </div>
    </div>
    <div class="input">
      <input
        v-model="inputMessage"
        placeholder="Type your message..."
        @keyup.enter="send"
      />
      <button @click="send">Send</button>
    </div>
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background: #f4f4f4;
}
.input {
  display: flex;
  padding: 10px;
  background: #fff;
}
.input input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input button {
  padding: 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>