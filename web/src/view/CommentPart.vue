<script setup>
import { ref, reactive } from 'vue'
import comment from '../components/comment.vue'

//评论tab跳转
const selectLight = ref(0)
// console.log(selectLight.value);

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
console.log(Date.now());

//渲染comment
const comments= reactive([
    {
      id:1,
      replies: [
        {
          id: 2,
          content: '这是第一个评论的回复',
          replies: []
        }
      ],
      time: Date.now()-3*24*60*60*1000,
      content: '你邮真是顶呱呱，不得了啊你邮真是顶呱呱，不得了啊你邮真是顶呱呱，不得了啊你邮真是顶呱呱，不得了啊',
      like: 1000,
      commentSum: 500,
      userName: '移动应用开发实验室aq',
      picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
    },
    {
      id:3,
      replies: [
        {
          id: 4,
          content: '这是第二个评论的回复',
          replies: []
        }
      ],
      time: Date.now()-3*24*60*60*1000,
      content: '你邮真是顶呱呱，不得了啊你邮真是顶呱呱，不得了啊你邮真是顶呱呱，不得了啊你邮真是顶呱呱，不得了啊',
      like: 1000,
      commentSum: 500,
      userName: '移动应用开发实验室aq',
      picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
    },
])
</script>

<template>
<el-row :gutter="6">
    <el-col :lg="14" class="left-col">
        <div class="nav" :class="{ fixed:isFixed }">
            <span class="one" :class=" {'light':selectLight==0}" @click="selectLight=0">热门</span>
            <span class="two" :class="{'light':selectLight==1}" @click="selectLight=1">最新</span>
        </div>
        <div class="content" >
            <comment class="comment" :comments="comments" v-for="(item,index) in comments" :key="item.id"></comment>
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