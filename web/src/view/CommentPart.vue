<script setup>
import { ref, reactive,onMounted } from 'vue'
import comment from '../components/comment.vue'
import { commentAcquire } from '../api/CommentPart'
// import Twikoo from 'twikoo';

// 定义响应式状态
const commentData = ref([]);
const error = ref(null);

// const commentData = ref([
//   { id: 1, time: Date.now(), userName: '用户1', like: 10, content: '评论内容1' },
//   { id: 2, time: Date.now(), userName: '用户2', like: 5, content: '评论内容2' }
// ]);

// 使用 onMounted 钩子
onMounted(async () => {
  try {
    const response = await commentAcquire({userName: 'aq1'}); // 调用 API 请求
    commentData.value = response.data; // 更新数据列表
    // console.log(commentData.value[0].time);
  } catch (err) {
    error.value = '获取数据失败: ' + err.message; // 处理错误
  }
});


// onMounted(() => {
//   // 监听新增评论（假设是通过 WebSocket）
//   const socket = new WebSocket('wss://example.com/comments');

//   socket.onmessage = (event) => {
//     const newComment = JSON.parse(event.data);
//     commentData.value.push(newComment); // 仅添加新评论
//   };

//   // 获取初始评论列表
//   commentAcquire().then(response => {
//     commentData.value = response.data;
//   });
// });
console.log(Date.now());



//nav固定
const isFixed=ref(false)
addEventListener('scroll',()=>{
    const scrollTop = document.documentElement.scrollTop
    if(scrollTop>300){
        isFixed.value=true
    }else {
        isFixed.value=false
    }
})


//评论tab跳转
const selectLight = ref(0)
</script>

<template>
<el-row :gutter="6">
    <el-col :lg="14" class="left-col">
        <div class="nav" :class="{ fixed:isFixed }">
            <span class="one" :class=" {'light':selectLight==0}" @click="selectLight=0">热门</span>
            <span class="two" :class="{'light':selectLight==1}" @click="selectLight=1">最新</span>
        </div>
        <div class="content" >
            <comment class="comment" v-for="(item,index) in commentData" :key="item.id" :time="item.time" :userName="item.userName" :like="item.like" :content="item.content" ></comment>
        </div>
    </el-col>
    <el-col :lg="4" class="right-col">
        <ul class="side">
            <p>公告栏</p>
            <div class="side1"></div>
        </ul>
        <ul class="side">
            <p>智小圈</p>
            <div class="side2"></div>
        </ul>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-col {
  border-radius: 4px;
  height: 1500px;
}

.el-col.left-col{
  margin-left: 7vw;
}

.nav {
  display: flex;
  flex-direction: row;
  height: 48px;
  justify-content: left; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  border-bottom: 1px solid  hsl(0, 0%, 84%);
  transition: top .2s;
  z-index:10;
  background-color: #fff;
}

.nav.fixed {
    position: fixed;
    top:0;
    width: 57.5%;
}

.one{
  color: #a9a9a9;
  display: inline-block;
  font-size: 18px;
  margin-left: 25px;
  margin-right: 40px;
}

.two{
  display: inline-block;
  font-size: 18px;
  color: #a9a9a9;
} 

.one,
.two{
    float:left;
    transition: color 0.3s ease;
    cursor: default;
    font-weight: 500;
}

.light{
    color: rgb(30,128,255);
    position: relative;
    padding-bottom: 4px;
}

.light::after{
    content: "";
    position: absolute;
    bottom: 0.5px;
    left: 50%;
    margin-left: -7px;
    width: 14px; /* 蓝色条的宽度 */
    height: 2px; /* 蓝色条的高度 */
    background-color: rgb(30,128,255); /* 蓝色条的颜色 */
}

.comment{
  background-color: #fff;
  margin-top:10px;
}

.el-col.right-col{
  margin-left: 1.5vw;
}

.side {
    min-height: 320px;
    background-color: #fff;
    flex: 1;
    padding: 0;
    margin-bottom: 70px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}   

p {
    font-weight: 500;
    font-size: 1.34rem;
    padding: 1rem;
}

.side1,
.side2 {
    border-top:1px solid rgba(0, 0, 0, .2);
}
</style>