<script setup>
import pc from '../assets/ban1.png'
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, onBeforeUnmount, useId} from 'vue';
import {
  connectWebSocket,
  sendMessage,
  addMessageListener,
  removeMessageListener,
} from '../websocket';

const router = useRouter(); 
const showChatBox = ref(false); // 控制聊天框的显示
const userId = localStorage.getItem('userID'); // 当前用户 ID
// const receiverId = 2; // 目标用户 ID

const messages = ref([]);
const userMessage = ref('')
const teacherMessages = [{
  from: 'teacher',
  text: '你好呀同学',
  avatar: '/avatars/2.png'
}, {
  from: 'teacher',
  text: '我是大学智航站的助教欣欣老师，你有什么学习上的问题都可以咨询我哦',
  avatar: '/avatars/2.png'
}, {
  from: 'teacher',
  text:'也可以点击进入聊天室，会有专门的专家和老师们为你答疑解惑，规划学习路线哟~',
  avatar:'/avatars/2.png'
  }]

  let messageIndex = 0
  const intervalId = setInterval(() => {
    if (messageIndex < teacherMessages.length) {
      messages.value.push(teacherMessages[messageIndex]);
      messageIndex++;
    } else {
      
      clearInterval(intervalId); // 停止定时器
    }
  }, 1000); // 每秒推送一条消息

const handleClick = ()=>{
  router.push({ path: `/ChatRoom` });
}
//点击咨询
const handleConsult = (text) => {
  userMessage.value = text;  // 将咨询文字填入输入框
  showChatBox.value = true;  // 显示聊天框
  send()
};
// 初始化 WebSocket 连接
onMounted(() => {
  connectWebSocket(userId);

  // 添加消息监听器
  const onMessageReceived = (msg) => {
    // const message = JSON.parse(msg);
    
    messages.value.push(msg);
    if (msg.type === 'onlineUsers')
    messages.value.shift()
  };
  addMessageListener(onMessageReceived);

  // 移除消息监听器
  onUnmounted(() => {
    removeMessageListener(onMessageReceived);
  });
});

//发送消息
const send = async () => {
  messages.value.push({
    from: 'user',
    text: userMessage.value,
    avatar:`/avatars/${userId}.png`
  })
  userMessage.value=''
}


const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // 判断是否到达底部
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        showChatBox.value = true;
      }
};
     // 添加滚动监听器
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    // 移除滚动监听器
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

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
    <div class="professor">
      <div class="pro-header1">
        学习规划
      </div>
      <div class="body">
        <div class="l-body" @click="handleConsult('学校和专业如何选择更有把握？')">
          学校和专业如何选择更有把握？
          <div class="botton">立即咨询 ></div>
        </div>
        <div class="l-body" @click="handleConsult('考研一手咨询如何及时获取？')">
          考研一手咨询如何及时获取？
          <div class="botton">立即咨询 ></div>
        </div>
        <div class="l-body" @click="handleConsult('长线备考如何制定复习计划？')">
          长线备考如何制定复习计划？
          <div class="botton">立即咨询 ></div>
        </div>
        <div class="l-body" @click="handleConsult('备考过程中疑难不断何处求解？')">
          备考过程中疑难不断何处求解？
          <div class="botton">立即咨询 ></div>
        </div>
        <div class="l-body" @click="handleConsult('长期备考如何制定复习计划？')">
          长期备考如何制定复习计划？
          <div class="botton">立即咨询 ></div>
        </div>
      </div>
    </div>
    <div class="professor">
      <div class="pro-header2">
        就业规划
      </div>
      <div class="body">
        <div class="m-body" @click="handleConsult('如何把握好金九银十？')">
          如何把握好金九银十？
          <div class="botton">立即咨询 ></div>
        </div>
        <div class="m-body" @click="handleConsult('春招补录还有机会吗？')">
          春招补录还有机会吗？
          <div class="botton">立即咨询 ></div>
        </div>
        <div class="m-body" @click="handleConsult('如何做好大学生就业规划？')">
          如何做好大学生就业规划？
          <div class="botton">立即咨询 ></div>
        </div>
        <div class="m-body" @click="handleConsult('双非本科如何冲刺大厂？')">
          双非本科如何冲刺大厂？
          <div class="botton">立即咨询 ></div>
        </div>
        <div class="m-body" @click="handleConsult('就业形势真的越来越严峻了吗？')">
          就业形势真的越来越严峻了吗？
          <div class="botton">立即咨询 ></div>
        </div>
      </div>
    </div>
    <div class="professor">
      <div class="pro-header3">
        竞赛规划
      </div>
      <div class="body">
        <div class="r-body" @click="handleConsult('课内课程和竞赛该如何抉择？')">
          课内课程和竞赛该如何抉择？
          <div class="botton">立即咨询 ></div>
        </div>
        <div class="r-body" @click="handleConsult('竞赛对就业对考研有什么好处？')">
          竞赛对就业对考研有什么好处？
          <div class="botton">立即咨询 ></div>
        </div>
        <div class="r-body" @click="handleConsult('如何科学制定一个竞赛计划？')">
          如何科学制定一个竞赛计划？
          <div class="botton">立即咨询 ></div>
        </div>
        <div class="r-body" @click="handleConsult('参与实验室为何有利于竞赛？')">
          参与实验室为何有利于竞赛？
          <div class="botton">立即咨询 ></div>
        </div>
        <div class="r-body" @click="handleConsult('哪里可以清晰认识各种竞赛？')">
          哪里可以清晰认识各种竞赛？
          <div class="botton">立即咨询 ></div>
        </div>
      </div>
    </div>
  </div>
  <div>

    <transition name="fade">
      <div v-if="showChatBox" class="chat-box">
        <div class="chat-header">
          <span>名师咨询</span>
          <button @click="showChatBox = false" class="close-btn">×</button>
        </div>
        <div class="chat-content">
          <div class="messages">
            <div
              v-for="(msg, index) in messages"
              :key="index"
              :class="{'user-msg': msg.from === 'user', 'agent-msg': msg.from === 'teacher'}"
            >
              <img :src="msg.avatar" class="avatar" />
              <span class="message-text">{{ msg.text }}</span>
            </div>
          </div>
          <input
            type="text"
            class="chat-input"
            placeholder="请输入您的消息..."
            v-model="userMessage"
            @keyup.enter="send"
          />
        </div>
      </div>
    </transition>
  </div>
</div>

</template>

<style scoped>
.img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 8px;
}

.moving-button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  animation: moveUpDown 1s infinite alternate;
  background-color: #8bb5dd;
}

.single {
  padding: 40px 0px;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
}

.professor {
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px #e7ecf1;
  padding: 4px;
  width: 300px;
  height: 400px;
}

.chat-box {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 300px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  font-size: 19px;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

.chat-content {
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  max-height: 500px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 用户消息样式 */
.user-msg {
  display: flex;
  align-items: flex-end;
  /* justify-content: flex-end; 用户消息靠右 */
  gap: 10px; /* 文本和头像的间距 */
  text-align: right; /* 字体右对齐 */
  flex-direction: row-reverse; /* 头像在右侧，文本在左侧 */
}


.agent-msg {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start; /* 教师消息靠左 */
  gap: 10px;
  text-align: left; /* 字体左对齐 */
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

/* 消息文本样式 */
.message-text {
  background-color: #f1f1f1;
  padding: 8px 12px;
  border-radius: 10px;
  max-width: 80%;
  word-wrap: break-word; /* 防止长文本溢出 */
}

/* 用户消息文本颜色 */
.user-msg .message-text {
  background-color: #007bff;
  color: white;
}

.chat-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.pro-header1{
  background-image: url('/header/1.png');
  text-align: center;
  line-height: 60px;
  height: 70px;
  font-size: 24px;
  border-radius: 5px;
  font-weight: 600;
  color: whitesmoke;
  letter-spacing: 0.5em;
}
.pro-header2{
  background-image: url('/header/2.png');
  text-align: center;
  line-height: 60px;
  height: 70px;
  font-size: 24px;
  border-radius: 5px;
  font-weight: 600;
  color: whitesmoke;
  letter-spacing: 0.5em;
}.pro-header3{
  background-image: url('/header/3.png');
  text-align: center;
  line-height: 60px;
  height: 70px;
  font-size: 24px;
  border-radius: 5px;
  font-weight: 600;
  color: whitesmoke;
  letter-spacing: 0.5em;
}
.body{
  display: flex;
  flex-direction: column;
  height: 322px;
}
.l-body,
.m-body,
.r-body{
  flex: 1;
  display: flex;
  justify-content: flex-start; /* 水平左对齐 */
  align-items: center; /* 垂直居中 */
  justify-content: space-between;
  font-size: 14px;
  margin-left: 5px;
}
.botton{
  padding: 5px 8px;
  margin-left:20px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    border-radius: 6px;
    border: 0.64px solid #6e7b8e;
    color: #6e7b8e;
    font-size: 10px;
    font-family: "PingFang SC";
    font-weight: 700;
    word-wrap: break-word;
}
.l-body:hover,
.m-body:hover,
.r-body:hover{
  color: #007bff;
  cursor: pointer;
}
.l-body .botton:hover{
  background-color: rgb(1, 204, 167);
}
.m-body .botton:hover{
  background-color: rgb(255, 152, 13);
}
.r-body .botton:hover{
  background-color: rgb(136,157,212);
}

@keyframes moveUpDown {
  0% { 
    transform: translateY(0); /* 初始位置 */
  }
  100% {
    transform: translateY(-20px); /* 向上移动20px */
  }
}
</style>