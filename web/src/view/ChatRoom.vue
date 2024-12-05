<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import {
  connectWebSocket,
  sendMessage,
  addMessageListener,
  removeMessageListener,
  getOnlineUsers,
  getsenderId
} from "../websocket";
import request from '../util/request';
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

const userId = localStorage.getItem("userID"); // 当前用户 ID

let receiverId=ref(''); // 示例目标用户 ID
let onlineUsers = ref([])
let senderId = ref('')
const messages = ref([]); // 聊天消息数组
const inputMessage = ref(""); // 用户输入消息
const chatWindow = ref(null); // 聊天窗口 DOM 引用

//收到消息
const onMessageReceived = (msg) => {
      senderId = getsenderId()
      messages.value.push(msg); // 将收到的消息添加到列表
    if (msg.type === 'onlineUsers'){
      messages.value.shift()
      receiverId = getOnlineUsers().filter(id => id !== userId);
      onlineUsers = getOnlineUsers()
    }
    scrollToBottom();
};

//获取聊天记录
const chatRoomHistory = async () => {
  try{
    const response = await request.get('/mainPart/chatRoomHistory'); // 请求获取聊天记录
    messages.value = response.data; // 假设返回的数据是消息数组
    // const newMessages = response.data
    //     // 将每条消息添加到 messages 列表
    // newMessages.forEach(msg => {
    //   messages.value.push({
    //     senderId: msg.senderId,
    //     receiverId: msg.receiverId,
    //     content: msg.content,
    //     createdAt:msg.createdAt || new Date().toISOString() // 使用 API 返回的创建时间，若没有则使用当前时间
    //   });
    // });
    console.log(messages.value);
    
    scrollToBottom(); // 加载完后滚动到底部
  }catch(error){
    console.error("无法加载历史消息", error)
  }
}

// 初始化 WebSocket 连接
onMounted(() => {
  connectWebSocket(userId);
  // 添加消息监听器
  chatRoomHistory();
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
    createdAt:  new Date().toISOString(),
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
const inputRef = ref(null);
//emoji
const showEmojiPicker = ref(false);
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value; // 切换选择器显示状态
};
let cursorPosition = 0; // 用于保存光标位置
//更新焦点位置
const updateCursorPosition = () => {
  nextTick(() => { // 确保在 DOM 更新后执行
    
    // const inputElement = inputRef.value; // 获取输入框
    const inputElement = inputRef.value?.$el?.querySelector('input')
    console.log(inputRef.value);
    
    if (inputElement) {
      cursorPosition = inputElement.selectionStart; // 获取当前光标位置
      console.log('Current cursor position:', cursorPosition); // 输出光标位置
    }
  });
};
const onVue3EmojiPicker = (emoji) => {
  const input = document.querySelector(".input-box input"); // 获取输入框 DOM
  const selectionStart = input.selectionStart; // 获取当前光标位置
  const selectionEnd = input.selectionEnd;

  // 插入表情到光标位置
  inputMessage.value =
    inputMessage.value.slice(0, selectionStart) +
    emoji.i +
    inputMessage.value.slice(selectionEnd);

  // 更新光标位置到表情后面
  nextTick(() => {
    input.setSelectionRange(selectionStart + emoji.i.length, selectionStart + emoji.i.length);
    input.focus();
  });
};

const close = () => {
  showEmojiPicker.value = false
}
</script>



<template>
  <div class="chat-container">
    <!-- 顶部标题栏 -->
    <div class="chat-header">
      <div class="chat-title">智航站咨询室({{ onlineUsers.length }})</div>
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
        :src="msg.senderId === userId ? `/avatars/${userId}.png` : `/avatars/${senderId}.png`"
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
      <svg @click="toggleEmojiPicker" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="#0891b2" d="M15.5 23q-2.6 0-4.587-1.55T8.275 17.5q1.125.05 2.225-.225t2.1-.775h4.1q.025-.275.038-.537t.012-.538q0-.225-.012-.462T16.7 14.5h-1.475q.4-.45.738-.95t.612-1.05H20.1q-.5-.75-1.2-1.312t-1.575-.863q.125-.5.163-1.025t.012-1.025q2.4.65 3.95 2.638T23 15.5q0 3.125-2.187 5.313T15.5 23m-2.375-2.55q-.175-.5-.312-.975t-.238-.975H10.9q.425.625.987 1.125t1.238.825m2.375.35q.3-.55.513-1.125t.362-1.175h-1.75q.15.6.375 1.175t.5 1.125m2.375-.35q.675-.325 1.238-.825T20.1 18.5h-1.675q-.125.5-.25.975t-.3.975m.825-3.95h2.2q.05-.25.075-.488T21 15.5t-.025-.513t-.075-.487h-2.2q.025.225.038.463t.012.462q0 .275-.012.538t-.038.537M8.5 16q-3.125 0-5.313-2.187T1 8.5t2.188-5.312T8.5 1t5.313 2.188T16 8.5t-2.187 5.313T8.5 16M6 8q.425 0 .713-.288T7 7t-.288-.712T6 6t-.712.288T5 7t.288.713T6 8m2.5 4.4q1.2 0 2.138-.675T12 10H5q.425 1.05 1.363 1.725T8.5 12.4M11 8q.425 0 .713-.288T12 7t-.288-.712T11 6t-.712.288T10 7t.288.713T11 8"/></svg>
      <!-- <button @click="toggleEmojiPicker">Select Emoji</button> -->
      <div v-if="showEmojiPicker">
        <EmojiPicker :native="true" @select="onVue3EmojiPicker" class="emoji" />
      </div>
      <el-input
        v-model="inputMessage"
        placeholder="请输入消息..."
        @keyup.enter="send"
        class="input-box"
        ref="inputRef"
        @click="updateCursorPosition"
        @input="updateCursorPosition"
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
  position: relative;
}

.input-box {
  flex: 1;
  margin-right: 20px;
}

.emoji {
  position: absolute;
  bottom: 54px;
  left: 1px;
}
</style>

