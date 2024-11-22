<script setup>
import { ref,onMounted } from 'vue';
import { ai,getChatHistory } from '../api/AiPart'

const inputText = ref('');
const messages = ref([]);
const isSending = ref(false);

const loadChatHistory = async (userID) => {
  try {
    const response = await getChatHistory({userID});
    if (response.status === 200) {
      messages.value = response.data.messages || []; // 设置消息记录
      console.log(response.data.messages);
      console.log(messages.value);
      
    }
  } catch (error) {
    console.error('加载聊天记录错误:', error);
  }
};

onMounted(() => {
  const userID = localStorage.getItem('userID');
  loadChatHistory(userID);
});

const sendMessage = async () => {
  const value = inputText.value.trim();
  if (value === '') return;
  console.log(messages.value);
  
  if (!Array.isArray(messages.value)) {
    console.error('messages.value 不是数组！');
    return;
  }

  messages.value.push({ type: 'user', text: value });
  inputText.value = '';
  isSending.value = true;

  try {
    const userID=localStorage.getItem('userID')
    const response = await ai({ content: value,userID });

    // 检查响应是否正常
    if (response.status !== 200) { // Axios 中的状态码在 response 对象中
      const errorData = response.data;
      messages.value.push({ type: 'ai', text: errorData.error || '服务器错误，请稍后重试！' });
      // await saveMessage(userID, 'ai', aiErrorMessage); // 保存错误消息
      return;
    }

    // 直接从响应中提取数据
    // const aiMessage = response.data.res.choices[0].message.content;
    const aiMessage=response.data.res
    messages.value.push({ type: 'ai', text: aiMessage });
  } catch (error) {
    console.error('请求错误:', error); // 输出错误信息到控制台
    messages.value.push({ type: 'ai', text: '对不起，无法访问服务器' });
  } finally {
    isSending.value = false;
  }
};
</script>
<template>
  <div class="chat-container">
    <div class="chat-box" id="chatBox">
      <div class="messages" id="chatContainer">
        <div v-for="(msg, index) in messages" :key="index" class="chat-message">
          <div :class="msg.message_type === 'user' ? 'user-message' : 'ai-message'">
            <p>{{ msg.message }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="input-area">
      <input
        type="text"
        class="input-field"
        v-model="inputText"
        placeholder="请发消息~您的小助手已上线"
        @keyup.enter="sendMessage"
        :disabled="isSending"
      />
      <button class="send-button" @click="sendMessage" :disabled="isSending">发送</button>
    </div>
  </div>
</template>


<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 85vh;
  max-width: 600px;
  margin: auto;
  border-radius: 8px;
  overflow: hidden;
}

.chat-box {
  flex: 1;
  overflow-y: auto; /*允许垂直滚动*/
  padding: 10px;
}

.messages {
  display: flex;
  flex-direction: column;
}

.chat-message {
  margin: 5px 0;
  display: flex;
}

.user-message {
  background-color: #d8dad9;
  padding: 10px;
  border-radius: 10px;
  align-self: flex-end;
  margin-left: auto; /* 向左的外边距自动填充，从而靠右 */
}

.ai-message {
  padding: 10px;
  border-radius: 10px;
  align-self: flex-start;
  margin-right: auto; /* 向右的外边距自动填充，从而靠左 */
}

.input-area {
  display: flex;
  padding: 10px 25px;
  background-color: rgb(242, 243, 245);
  border-radius: 20px;
  border:1px solid #ccc;
  /* box-shadow: 0 6px 10px 0 rgba(42, 60, 79, .1); */
}

.input-field {
  flex: 1;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: rgb(242, 243, 245);
  font-size: 15px;
}

.send-button {
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  background-color: #28a745; /* 发送按钮颜色 */
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:disabled {
  background-color: #ccc; /* 禁用状态颜色 */
}
</style>
