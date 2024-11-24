<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import {
  connectWebSocket,
  sendMessage,
  addMessageListener,
  removeMessageListener,
  getOnlineUsers,
} from "../websocket";
// import avatar1 from '../assets/avatar1.jpg'
const userId = localStorage.getItem("userID"); // 当前用户 ID
let receiverId=ref([]); // 示例目标用户 ID

const messages = ref([]); // 聊天消息数组
const inputMessage = ref(""); // 用户输入消息
const chatWindow = ref(null); // 聊天窗口 DOM 引用

// 初始化 WebSocket 连接
onMounted(() => {
  connectWebSocket(userId);
  // 添加消息监听器
  const onMessageReceived =(msg) => {
      messages.value.push(msg); // 将收到的消息添加到列表
    if (msg.type === 'onlineUsers')
    messages.value.shift()
    receiverId = getOnlineUsers(); 
    scrollToBottom();
  };

  addMessageListener(onMessageReceived);

  // 清理监听器
  onUnmounted(() => {
    removeMessageListener(onMessageReceived);
  });
});

// 发送消息
const send = async() => {
  if (inputMessage.value.trim() === "") return;

  // 通过 WebSocket 发送消息
  sendMessage(userId, receiverId, inputMessage.value);
  // 将消息添加到消息列表
  messages.value.push({
    senderId: userId,
    receiverId: receiverId,
    content: inputMessage.value,
    createdAt: new Date().toISOString(),
  });
  await nextTick();
  scrollToBottom();

  inputMessage.value = ""; // 清空输入框
};

// 滚动到底部函数
const scrollToBottom = () => {
  
  if (chatWindow.value) {
    chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
  }
};
</script>



<template>
  <div class="chat-container">
    <!-- 顶部标题栏 -->
    <div class="chat-header">
      <div class="chat-title">智航站咨询室({{ receiverId.length }})</div>
    </div>

    <!-- 消息展示区域 -->
    <div class="chat-messages" ref="chatWindow">
      <div
        v-for="msg in messages"
        :key="msg.createdAt"
        :class="['message', msg.senderId === userId ? 'sent' : 'received']"
      >
        <!-- 头像 -->
        <el-avatar
          :src="msg.senderId === userId ? '/avatars/1.jpg' : 'https://via.placeholder.com/40/0000FF'"
          class="avatar"
        />
        <!-- 消息内容 -->
        <div class="message-content">
          <div class="message-bubble">
            <span>{{ msg.content }}</span>
          </div>
          <div class="timestamp">
            {{ new Date(msg.createdAt).toLocaleTimeString() }}
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="chat-input">
      <el-input
        v-model="inputMessage"
        placeholder="请输入消息..."
        @keyup.enter="send"
        class="input-box"
      />
      <el-button type="primary" @click="send">
        发送
      </el-button>
    </div>
  </div>
</template>



<style scoped>
/* 整体布局 */
.chat-container {
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  height: 90vh;
  width: 80vw;
}

/* 顶部标题栏 */
.chat-header {
  height: 60px;
  background-color: #008c8c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

/* 消息展示区域 */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: linear-gradient(45deg, #00bcd4, #ffeb3d);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.message {
  display: flex;
  align-items: flex-end;
  align-items: center;
  margin-bottom: 15px;
}

.message.sent {
  justify-content: flex-end;
}

.message.received {
  justify-content: flex-start;
}

.message.sent .avatar {
  order: 2; 
  margin-left: 10px; 
  margin-right: 0; 
}
.message.received .avatar {
  order: 0; 
  margin-right: 10px;
  margin-left: 0; 
}
/* .avatar {
  width: 40px;
  height: 40px;
  margin: 0 10px;
} */

/* 消息气泡 */
.message-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message-content .message-bubble {
  display: inline-block; /* 根据内容自动调整宽度 */
  /* max-width: 70%;       设置消息气泡的最大宽度 */
  word-wrap: break-word; /* 当内容超过最大宽度时换行 */
  word-break: break-word; /* 处理长单词或 URL */
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影（可选） */
}



.message.sent .message-bubble {
  background-color: #aee571;
  border-top-right-radius: 0;
}

.message.received .message-bubble {
  background-color: #ffffff;
  border-top-left-radius: 0;
}

/* 时间戳 */
.timestamp {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

/* 输入区域 */
.chat-input {
  display: flex;
  padding: 10px;
  background-color: white;
  align-items: center;
  border-top: 1px solid #ccc;
}

.input-box {
  flex: 1;
  margin-right: 20px;
}
</style>

