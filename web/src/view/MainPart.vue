<script setup>
import { ref } from 'vue'
import content from '../components/content.vue'
const selectLight = ref(0)
console.log(selectLight.value);

const leftData=[
  '人工智能',
  '关注',
  'Web前端',
  'Server后台',
  'iOS',
  'Android'
]
const midData = [
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  },
  {
    title: '字节hr面',
    cont: '字节hr面的内容是xxxxxxxxx',
    like: 1000,
    view: '26k',
    user: '移动应用开发实验室',
    picUrl: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
  }
]
const rigData = [
  '#字节跳动秋招面试题#',
  '#校招大牛七战字节成功收割SSP#',
  '#我的Java后端之旅#',
  '#校招大牛七战字节成功收割SSP#',
  '#校招大牛七战字节成功收割SSP#',
]
</script>

<template>
  <el-row :gutter="6">
    <el-col :lg="3" class="left-col">
      <ul class="grid-content ep-bg-purple" style="padding: 0;
      padding-top: 10px;">
        <li  v-for="(item,index) in leftData" :key="index" class="l-child">{{ item}}</li>
      </ul>
    </el-col>
    <el-col :lg="11" class="mid-col">
      <ul class="grid-content ep-bg-purple-light" style="padding: 0;">
        <li class="first">
          <div class="one" :class=" {'light':selectLight==0}" @click="selectLight=0">推荐</div>
           
          <div class="two" :class="{'light':selectLight==1}" @click="selectLight=1">最新</div>
        </li>
        <content class="m-child" v-for="(item,index) in midData" :key="index" :title="item.title" :cont="item.cont" :picUrl="item.picUrl" :like="item.like" :view="item.view" :user="item.user"></content>
      </ul>
    </el-col>
    <el-col  :lg="4" class="rig-col">
      <div class="grid-content ep-bg-purple">
        <ul class="rig-1">
          <li class="r-first1"><svg class="svg1" xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="#db2777" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm3-4h5q.425 0 .713-.288T14 16t-.288-.712T13 15H8q-.425 0-.712.288T7 16t.288.713T8 17m0-4h8q.425 0 .713-.288T17 12t-.288-.712T16 11H8q-.425 0-.712.288T7 12t.288.713T8 13m0-4h8q.425 0 .713-.288T17 8t-.288-.712T16 7H8q-.425 0-.712.288T7 8t.288.713T8 9"/></svg>
          <p>文章榜</p>
          
        <div ><svg class="svg2" xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="#999999" d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4t.713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10t.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"/></svg>换一换</div></li>
          <li class="r-child1"></li>
          <li class="r-child1"></li>
          <li class="r-child1"></li>
          <li class="r-child1"></li>
          <li class="r-child1"></li>
          <li class="r-first2">
            <p>查看更多></p>
          </li>
        </ul>
        <ul class="rig-2">
          <li class="r-first3">
            <svg class="svg3"  xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24"><path fill="#db2777" d="M21 21V5H3v7q0 .425-.288.713T2 13t-.712-.288T1 12V5q0-.825.588-1.412T3 3h18q.825 0 1.413.588T23 5v14q0 .825-.587 1.413T21 21M9 14q-1.65 0-2.825-1.175T5 10t1.175-2.825T9 6t2.825 1.175T13 10t-1.175 2.825T9 14m-6 8q-.825 0-1.412-.587T1 20v-.8q0-.85.438-1.562T2.6 16.55q1.55-.775 3.15-1.162T9 15t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 19.2v.8q0 .825-.587 1.413T15 22z"/></svg>
            <p>作者榜</p>
          </li>
          <li class="r-child2"></li>
          <li class="r-child2"></li>
          <li class="r-child2"></li>
          <li class="r-child2"></li>
          <li class="r-child2"></li>
          <li class="r-first4">
            <p>查看更多></p>
          </li>
        </ul>
        <ul class="rig-3">
          <li class="r-first5"><p>推荐话题</p><div ><svg class="svg2" xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="#999999" d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4t.713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10t.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"/></svg>换一换</div></li>
          <li class="r-child2" v-for="(item,index) in rigData" :key="index" ><svg class="fire" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="red" d="m11.514 2.142l-1.26-.755l-.24 1.449C9.632 5.124 8.069 7.25 6.345 8.744C2.97 11.67 2.231 14.85 3.276 17.475c1 2.512 3.538 4.232 6.114 4.519l.596.066c-1.474-.901-2.42-3.006-2.09-4.579c.326-1.546 1.438-2.994 3.574-4.33l1.077-.672l.402 1.205c.237.712.647 1.284 1.064 1.865c.2.28.403.563.589.864c.643 1.045.813 2.207.398 3.36c-.378 1.048-1.001 1.872-1.86 2.329l.97-.108c2.418-.269 4.193-1.096 5.346-2.479C20.599 18.144 21 16.379 21 14.5c0-1.75-.719-3.554-1.567-5.055c-.994-1.758-2.291-3.218-3.707-4.633c-.245.49-.226.688-.73 1.475a8.15 8.15 0 0 0-3.482-4.145"/></g></svg><p class="per">{{ item }}</p></li>
          
        </ul>
      </div>
    </el-col>
  </el-row>

</template>

<style scoped>
.el-row{
  width: 100vw;
  flex: wrap;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
   min-height: 90vh;/*//////////////////////最后删除掉///////////////// */
  /* background-color: aqua; */
  background-color: white;
}

.el-col.left-col{
  margin-left: 7vw;
  margin-right: 1.5vw;
  /* min-height: 50vh; */
}
.left-col.grid-content,
.mid-col.grid-content,
.rig-col.grid-content{
  display: flex;
  flex-direction: column;
}
.rig-col .grid-content{
  background-color: rgb(242, 243, 245);
}

.l-child{
  /* background-color: red; */
  height: 60px;
  flex: 1;
  padding: 0.5vh;
  display: flex;
  justify-content: left; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  font-size: 18px;
  margin:3px  8px;
  border-radius: 5px;
}
.l-child:hover{
  background-color: hsl(0, 0%, 96%);
  cursor: pointer;
}
.rig-col{
  margin-left: 1.5vw;
}
.first{
  display: flex;
  flex-direction: row;
  height: 48px;
  justify-content: left; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  border-bottom: 1px solid  hsl(0, 0%, 84%);
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
 .one:hover,
 .two:hover{
  cursor: pointer;
  color:rgb(30,128,255);
 }
.m-child{
  /* background-color: green; */
  height: 100px;
}
.m-child:hover{
  cursor: pointer;
  background-color: hsl(0, 0%, 96%) ;
}
.rig-1,
.rig-2,
.rig-3{
  /* background-color: green; */
  min-height: 320px;
  background-color: white;
  flex: 1;
  padding: 0;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}
.r-child1{
  flex: 1;
  height: 20px;
  display: flex;
  border-radius: 4px;
  margin: 2px 5px;
}
.r-child1:hover{
  background-color: hsl(0, 0%, 96%);
  cursor: pointer;
}
.r-first1,
.r-first5{
  border-radius: 0px;
  height: 55px;
  border-bottom: 1px solid  hsl(0, 0%, 84%);
  position: relative;

}
.r-first3{
  position: relative;
}
.svg1{
  position: absolute;
  left: 15px;
  top: 15px;
}

 .svg2{
  margin-top: 2.8px;
 }
.svg3{
  position: absolute;
  left: 18px;
  top: 12px;
}
.r-first1 p{
  display: inline-block;
  position: absolute;
  left: 50px;
  top: 13px;
  font-size: 18px;
}
.r-first1 div{
  display: inline-block;
  position: absolute;
  right: 20px;
  top: 18px;
  display: flex;
  flex-direction: row;
  margin-top: 2px;
  font-size: 14px;
  color: hsl(0, 0%, 51%);
}
.r-first5 p{
  display: inline-block;
  position: absolute;
  left: 15px;
  top: 12px;
  font-size: 17px;
}
.r-first5 div{
  display: inline-block;
  position: absolute;
  right: 10px;
  top: 17px;
  font-size: 14px;
  color: hsl(0, 0%, 51%);
  display: flex;
}
.r-first5 div:hover,
.r-first5 div:hover .svg2 path,
.r-first1 div:hover,
.r-first1 div:hover .svg2 path{
  cursor: pointer;
  color:rgb(30,128,255);
  fill: rgb(30,128,255);
}
.r-first2{
  height: 45px;
  border-top: 1px solid hsl(0, 0%, 84%);
  /* cursor: pointer; */
}
.r-first2 p,
.r-first4 p{
  line-height: 45px;
  margin: 0;
  color: hsl(0, 0%, 51%);
  cursor: pointer;
}
.r-first3 p{
  display: inline-block;
  position: absolute;
  left: 55px;
  top: 11px;
  font-size: 17px;
}
.r-child2{
  display: flex;
  flex: 1;
  border-radius: 4px;
  margin: 2px 5px;
  align-items: center; /* 垂直居中 */
}
.r-child2:hover{
  background-color: hsl(0, 0%, 96%);
  cursor: pointer;
}
.r-first3{
  height: 50px;
  border-bottom: 1px solid  hsl(0, 0%, 84%);
}
.r-first4{
  height: 45px;
  border-top: 1px solid hsl(0, 0%, 84%);
}

.one,
.two{
  transition: color 0.3s ease;
}
.light{
 color: rgb(30,128,255);
 position: relative;
 padding-bottom: 8px;
}
.light::after{
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%; /* 蓝色条的宽度 */
  height: 2px; /* 蓝色条的高度 */
  background-color: rgb(30,128,255); /* 蓝色条的颜色 */
}
.per{
  margin-left: 2px;
}
.per:hover{
  color: rgb(30,128,255);
}
.rig-3 .r-child2:hover{
  background-color: white;
}
</style>