<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  connectWebSocket,
  sendMessage,
  addMessageListener,
  removeMessageListener,
} from "../websocket";

const userId = localStorage.getItem("userID"); // 当前用户 ID
const receiverId = 2; // 示例目标用户 ID

const messages = ref([]);
const inputMessage = ref("");

// 初始化 WebSocket 连接
onMounted(() => {
  connectWebSocket(userId);

  // 添加消息监听器
  const onMessageReceived = (msg) => {
    // 假设 msg 已是 JSON 格式
    messages.value.push(msg);
  };
  addMessageListener(onMessageReceived);

  // 移除消息监听器
  onUnmounted(() => {
    removeMessageListener(onMessageReceived);
  });
});

// 发送消息
const send = () => {
  if (inputMessage.value.trim() === "") return;

  sendMessage(userId, receiverId, inputMessage.value);
  messages.value.push({
    senderId: userId,
    receiverId,
    content: inputMessage.value,
    createdAt: new Date().toISOString(),
  });

  inputMessage.value = "";
};
</script>

<template>
  <el-container class="chat">
    <!-- 消息展示区域 -->
    <el-main class="messages">
      <div v-for="msg in messages" :key="msg.createdAt" class="message">
        <el-avatar
          :src="msg.senderId === userId ? 'https://via.placeholder.com/40' : 'https://via.placeholder.com/40/0000FF'"
          class="avatar"
        />
        <div class="message-content">
          <b>{{ msg.senderId === userId ? "你" : "对方" }}:</b>
          <span>{{ msg.content }}</span>
          <div class="timestamp">{{ new Date(msg.createdAt).toLocaleTimeString() }}</div>
        </div>
      </div>
    </el-main>

    <!-- 输入区域 -->
    <el-footer class="input">
      <el-input
        v-model="inputMessage"
        placeholder="输入消息..."
        @keyup.enter="send"
        class="input-box"
      />
      <el-button type="primary" @click="send" icon="el-icon-send">
        发送
      </el-button>
    </el-footer>
  </el-container>
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
  padding: 20px;
  background: #f4f4f4;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.avatar {
  margin-right: 10px;
}

.message-content {
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  max-width: 70%;
  position: relative;
}

.message-content b {
  display: block;
  margin-bottom: 5px;
}

.message-content .timestamp {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
  text-align: right;
}

.input {
  display: flex;
  padding: 10px;
  background: #fff;
  align-items: center;
}

.input-box {
  flex: 1;
  margin-right: 10px;
}
</style>
