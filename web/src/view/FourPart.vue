<script setup>
import pc from '../assets/ban1.png'
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue';
import {
  connectWebSocket,
  sendMessage,
  addMessageListener,
  removeMessageListener,
} from '../websocket';

const router = useRouter(); 

const userId = localStorage.getItem('userID'); // 当前用户 ID
// const receiverId = 2; // 目标用户 ID

const messages = ref([]);
const inputMessage = ref('');

const handleClick = ()=>{
  router.push({ path: `/ChatRoom` });
}
// 初始化 WebSocket 连接
onMounted(() => {
  connectWebSocket(userId);

  // 添加消息监听器
  const onMessageReceived = (msg) => {
    // const message = JSON.parse(msg);
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
<div class="home">
  <div class="chat-room">
    <img :src="pc" class="img">
    <button class="button-container moving-button" @click="handleClick">
      点击我可以进入聊天室哦
    </button>
  </div>
  <div class="single">
    <div class="professor"></div>
    <div class="professor"></div>
    <div class="professor"></div>
  </div>
</div>
<!-- <div class="chat">
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
  </div> -->
</template>

<style scoped>
.img {
  width: 100%; /* 图片宽度自适应 */
  height: 500px; /* 固定高度 */
  object-fit: cover; /* 裁剪图片以适应框架 */
  border-radius: 8px; /* 可选：添加圆角效果 */
}

.moving-button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  animation: moveUpDown 1s infinite alternate;
  background-color: #8bb5dd;
}

@keyframes moveUpDown {
  0% {
    transform: translateY(0); /* 初始位置 */
  }
  100% {
    transform: translateY(-20px); /* 向上移动20px */
  }
}

.single {
  padding: 40px 0px;
  display: flex;
  gap: 30px;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.professor {
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px #E7ECF1;
  padding: 6px;
  width: 300px;
  height: 400px;
}

/* .chat {
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
} */
</style>