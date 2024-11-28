<script setup>
import { ref,onMounted } from 'vue';
import { ai,getChatHistory,clearChatHistory } from '../api/AiPart'

const inputText = ref('');
const messages = ref([]);
const isSending = ref(false);
const isLoading = ref(false)
const userID = localStorage.getItem('userID');

//加载历史记录函数
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

//霓虹灯
const text = ref('小智为你答疑解惑'); // 初始文本
const characters = ref(text.value.split('')); // 存储分割后的字符
const checkedItems = ref(new Array(characters.value.length).fill(false)); // 用于存储复选框的状态
  
const toggleGlow = (index) => {
  checkedItems.value[index] = !checkedItems.value[index]; // 切换复选框状态
};

//加载历史记录函数调用
onMounted(() => {
  // const userID = localStorage.getItem('userID');
  loadChatHistory(userID);
});

//发送ai请求
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
    // const userID=localStorage.getItem('userID')
    const response = await ai({ content: value,userID });

    // 检查响应是否正常
    if (response.status !== 200) { // Axios 中的状态码在 response 对象中
      const errorData = response.data;
      messages.value.push({ type: 'ai', text: errorData.error || '服务器错误，请稍后重试！' });
      //错误时用户、ai信息不保存
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

//清除聊天记录
const clear = async() => {
  // isLoading=true;
  try {
    await clearChatHistory({userID});
    messages.value=[];
  }catch {
    console.error('清除聊天记录错误:', error);
  } finally {
    // isLoading.value=false;
  }
}
</script>
<template>
  <div class="title">
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
  <div class="chat-container">
    <div class="chat-box" id="chatBox">
      <div class="messages" id="chatContainer">
        <div v-for="(msg, index) in messages" :key="index" class="chat-message">
          <div :class="msg.type === 'user' ? 'user-message' : 'ai-message'">
            <p>{{ msg.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="input-area">
      <div class="clear" @click="clear">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024"><path fill="#0891b2" d="m899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-.3 1.5-.4 3-.4 4.4c0 14.4 11.6 26 26 26h723c1.5 0 3-.1 4.4-.4c14.2-2.4 23.7-15.9 21.2-30M204 390h272V182h72v208h272v104H204zm468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260z"/></svg>
      </div>
      <input
        type="text"
        class="input-field"
        v-model="inputText"
        placeholder="请发消息~您的小助手已上线"
        @keyup.enter="sendMessage"
        :disabled="isSending"
      />
      <button class="send-button" @click="sendMessage" :disabled="isSending">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#ffffff" d="M20.25 3.532a1 1 0 0 1 1.183 1.329l-6 15.5a1 1 0 0 1-1.624.362l-3.382-3.235l-1.203 1.202c-.636.636-1.724.186-1.724-.714v-3.288L2.309 9.723a1 1 0 0 1 .442-1.691l17.5-4.5Zm-2.114 4.305l-7.998 6.607l3.97 3.798zm-1.578-1.29L4.991 9.52l3.692 3.53l7.875-6.505Z"/></g></svg>
      </button>
    </div>      
  </div>
</template>


<style>
.title {
  position: relative;
  width: 380px;
}

#box {
  /* position: relative; */
  position: absolute;
  display: flex;
  flex-wrap: wrap;
}
  
.child {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
  
.item {
  position: relative;
  height: 80px;
  width: 80px;
  background: #cbcbce;
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
  color: rgb(233, 233, 112);
  text-shadow: 0 0 15px rgb(233, 233, 112), 0 0 25px rgb(233, 233, 112);
  animation: glow 2s ease-in-out infinite;
}
  
@keyframes glow {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

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
  padding: 10px 28px;
  background-color: rgb(242, 243, 245);
  border-radius: 20px;
  border:1px solid #ccc;
  position: relative;
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
  /* width: 50px; */
  border: none;
  background-color: #46af5d; /* 发送按钮颜色 */
  border-radius: 10px;
  cursor: pointer;
}

.clear {
  cursor: pointer;
  position: absolute;
  left: 1px;
  top: 17px;
}

.send-button:disabled {
  background-color: #99c4a2; /* 禁用状态颜色 */
}
</style>
