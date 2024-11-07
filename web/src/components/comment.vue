<script setup>
import {defineProps} from 'vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  time: String,
  userName: String,
  like: Number,
  content: String,
});

// 二级评论的展开
const isActive=ref(false)
const isHidden=ref(false)
const commentId=ref(0)
const commentToggle = (commentId)=>{
  isActive.value=true;
  isHidden.value=!isHidden.value;
}

const time=ref(Number(props.time))
// 避免多次渲染
const timeAgo = computed(() => {
  return formatTimeAgo(time.value);
});

// 格式化时间的函数
function formatTimeAgo(ts) {
  const now = Date.now();
  const seconds = Math.floor((now - ts) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days}天前`;
  } else if (hours > 0) {
    return `${hours}小时前`;
  } else if (minutes > 0) {
    return `${minutes}分钟前`;
  } else {
    return `刚刚`;
  }
}
// 定时器用于模拟时间流逝
let interval;
onMounted(() => {
  interval = setInterval(() => {
    time.value += 1000;
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});

</script>

<template>
  <div class="con">
    <div class="header">
        <div class="pic">头像</div>
        <div class="header-content">
            <div class="name">{{ userName }}</div>
            <div class="time">{{ timeAgo }}</div>
        </div>
    </div>
    <div class="content">{{ content }}</div>
    <div class="footer">
        <div class="share"><svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="#999999" d="m13.576 17.271l-5.11-2.787a3.5 3.5 0 1 1 0-4.968l5.11-2.787a3.5 3.5 0 1 1 .958 1.755l-5.11 2.787a3.5 3.5 0 0 1 0 1.457l5.11 2.788a3.5 3.5 0 1 1-.958 1.755"/></svg></div>
        <div class="comment" @click="commentToggle(commentId)" :class="{ active:isActive }">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="#999999" d="M12 23a1 1 0 0 1-1-1v-3H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4.1l-3.7 3.71c-.2.18-.44.29-.7.29zm1-6v3.08L16.08 17H21V7H7v10zM3 15H1V3a2 2 0 0 1 2-2h16v2H3zm6-6h10v2H9zm0 4h8v2H9z"/></svg>
          <span class="number"></span>
        </div>
        <div class="like"><svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="#999999" d="M7.24 11v9H5.63c-.9 0-1.62-.72-1.62-1.61v-5.77c0-.89.73-1.62 1.62-1.62zM18.5 9.5h-4.78V6c0-1.1-.9-2-1.99-2h-.09c-.4 0-.76.24-.92.61L7.99 11v9h9.2c.73 0 1.35-.52 1.48-1.24l1.32-7.5c.16-.92-.54-1.76-1.48-1.76Z"/></svg>
            <span class="number">{{ like }}</span>
        </div>
    </div>
    <div class="comment-list" :class="{ hidden:isHidden }">
      <p>评论 1</p>
      <div class="creat">
        <div class="pic">头像</div>
        <div class="creat-content"></div>
      </div>
      <div class="replies">
        <div class="pic">头像</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.con {
    background-color: #fff;
    margin-top:10px;
    position: relative;
}
.header {
    display: flex;
    align-items: center;
}

.header-content {
    margin-left:12px;
}
.pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ccc;
    cursor: pointer;
}

.name {
    font-weight: 500;
    font-size:18px;
}

.time {
    color:#ccc;
    font-size:14px;
    float:left;
}

.content {
    margin-top:10px;
    margin-bottom:15px;
    margin-left:35px;
    font-size:14px;
}

.footer {
    border-top:1px solid rgba(0, 0, 0, .1);
    display: flex;
    height: 36px;
    align-items: flex-end;
    justify-content: center;
    cursor: pointer;
    /* position: relative; */
}

.share,
.comment,
.like {
    flex-grow: 1;
}

.comment-list {
  border-top:1px solid rgba(0, 0, 0, .1);
  height: 30px;
  /* width: 500px; */
  display: none;
  background-color: #fbf5f5;
}

.comment-list.hidden {
  display:block;
}

.footer .number {
    position: absolute;
    font-size:14px;
    color:#807e7e;
}
</style>