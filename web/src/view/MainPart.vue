<script setup>
import { ref, onMounted} from 'vue'
import content from '../components/content.vue'
import request from '../util/request';
const selectLight = ref(0)


    const itemList = ref([]); // 数据列表
    const page = ref(1); // 当前页
    const limit = ref(5); // 每页数据条数
    const loading = ref(false); // 加载状态
    const hasMore = ref(true); // 是否还有更多数据



 // 获取数据
const fetchItems = async () => {
      if (loading.value || !hasMore.value) return;
  loading.value = true;
      
      try {
        const response = await request.get('/mainPart/mid', {
          params: {
            page: page.value,
            limit: limit.value,
          },
        });
        const { data, hasMore: more } = response.data;
        itemList.value.push(...data);
        hasMore.value = more;
        page.value++;
        // console.log(itemList.value);
        // console.log(hasMore.value);
        // console.log(page.value);
        
      } catch (error) {
        console.error('数据加载失败:', error);
      } finally {
        loading.value = false;
      }
};

//节流函数
const handleScroll=throttle(()=>{ 
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = document.documentElement.scrollTop;
const clientHeight = document.documentElement.clientHeight;
  // console.log(scrollHeight,scrollTop,clientHeight);
  
  // console.log(scrollTop);
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    fetchItems();
}
},300)
// 节流函数
function throttle(fn, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now(); // 使用 Date.now 更简洁
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}


const rigData = ref([])
const axios1 = async() => {
  try{
    const res = await request.get('http://localhost:3007/mainPart/titbang')
    rigData.value = res.data
    // console.log(rigData.value);
    
    // console.log(rigData.value.bang2);
    
  } catch (error) {
    console.error('获取数据失败',error);
  }
}
onMounted(() => {
  axios1()
  fetchItems()
  window.addEventListener("scroll", handleScroll);
})

const selectedItem = ref('1')
const selectItem=(item)=>{
  selectedItem.value = item
}
</script>

<template>
  <el-row :gutter="6" >
    <el-col :lg="3" class="left-col">
      <ul class="grid-content ep-bg-purple" style="padding: 0;
      padding-top: 10px;">
        <li  :class="['l-child', {active: selectedItem === '1'}]" @click="selectItem('1')"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#999999" d="M5.5 17.5q-2.3 0-3.9-1.6T0 12t1.6-3.9t3.9-1.6q.925 0 1.775.325T8.8 7.75l1.7 1.55L9 10.65l-1.55-1.4q-.4-.35-.9-.55T5.5 8.5q-1.45 0-2.475 1.025T2 12t1.025 2.475T5.5 15.5q.55 0 1.05-.2t.9-.55l7.75-7q.675-.6 1.525-.925T18.5 6.5q2.3 0 3.9 1.6T24 12t-1.6 3.9t-3.9 1.6q-.925 0-1.775-.325T15.2 16.25l-1.7-1.55l1.5-1.35l1.55 1.4q.4.35.9.55t1.05.2q1.45 0 2.475-1.025T22 12t-1.025-2.475T18.5 8.5q-.55 0-1.05.2t-.9.55l-7.75 7q-.675.6-1.525.925T5.5 17.5"/></svg>全部动态</li>
        <li  :class="['l-child', {active: selectedItem === '2'}]" @click="selectItem('2')"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="#999999"><path stroke-linecap="round" stroke-width="4" d="M10.858 9.858A19.94 19.94 0 0 0 5 24a19.94 19.94 0 0 0 5.858 14.142m28.284 0A19.94 19.94 0 0 0 45 24a19.94 19.94 0 0 0-5.858-14.142M34.9 33.9A13.96 13.96 0 0 0 39 24a13.96 13.96 0 0 0-4.1-9.9m-19.8 0A13.96 13.96 0 0 0 11 24a13.96 13.96 0 0 0 4.1 9.9"/><path fill="#999999" stroke-linejoin="round" stroke-width="3.5" d="M28.182 20C30.29 20 32 21.612 32 23.6c0 2.588-2.546 4.8-3.818 6Q26.908 30.8 25 32q-1.909-1.2-3.182-2.4C20.545 28.4 18 26.188 18 23.6c0-1.988 1.71-3.6 3.818-3.6c1.328 0 2.498.64 3.182 1.61c.684-.97 1.854-1.61 3.182-1.61Z"/></g></svg>关注</li>
        <li  :class="['l-child', {active: selectedItem === '3'}]" @click="selectItem('3')"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#999999" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1.41 16.09v.58c0 .73-.6 1.33-1.33 1.33h-.01c-.73 0-1.33-.6-1.33-1.33v-.6c-1.33-.28-2.51-1.01-3.01-2.24c-.23-.55.2-1.16.8-1.16h.24c.37 0 .67.25.81.6c.29.75 1.05 1.27 2.51 1.27c1.96 0 2.4-.98 2.4-1.59c0-.83-.44-1.61-2.67-2.14c-2.48-.6-4.18-1.62-4.18-3.67c0-1.72 1.39-2.84 3.11-3.21v-.6c0-.73.6-1.33 1.33-1.33h.01c.73 0 1.33.6 1.33 1.33v.62c1.38.34 2.25 1.2 2.63 2.26c.2.55-.22 1.13-.81 1.13h-.26c-.37 0-.67-.26-.77-.62c-.23-.76-.86-1.25-2.12-1.25c-1.5 0-2.4.68-2.4 1.64c0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.02 1.83-1.39 2.83-3.13 3.16"/></svg>校招就业</li>
        <li  :class="['l-child', {active: selectedItem === '4'}]" @click="selectItem('4')"><svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512"><path fill="#999999" d="M219.3.5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9V160c0 70.7-57.3 128-128 128S96 230.7 96 160v-57.1l-48-9.6v65.1l15.7 78.4c.9 4.7-.3 9.6-3.3 13.3S52.8 256 48 256H16c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4V86.6C6.5 83.3 0 74.3 0 64c0-11.4 8.1-21.3 19.3-23.5zM111.9 327.7c10.5-3.4 21.8.4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5c65 20.9 112 81.7 112 153.6c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6"/></svg>考研考公</li>
        <li  :class="['l-child', {active: selectedItem === '5'}]" @click="selectItem('5')"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#999999" d="m13 21l2-1l2 1v-7h-4m4-5V7l-2 1l-2-1v2l-2 1l2 1v2l2-1l2 1v-2l2-1m1-7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7v-2H4V5h16v10h-1v2h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-9 5H5V6h6m-2 5H5V9h4m2 5H5v-2h6Z"/></svg>考级考证</li>
        <li  :class="['l-child', {active: selectedItem === '6'}]" @click="selectItem('6')"><svg xmlns="http://www.w3.org/2000/svg" width="1.01em" height="1em" viewBox="0 0 1025 1024"><path fill="#999999" d="M1024.488 704q-8-8-23-17q-1-1-7-4q-11-6-22-11q-6-3-8-3q-31-13-68-21V515q73 10 128 61zm-204-192q-23 0-52 3V387q29-3 52-3q50 0 76 3v128q-25-3-76-3m-52-253V131q29-3 52-3q51 0 76 3v128q-25-3-76-3q-23 0-52 3m-256 79V210q95-39 128-50v128q-31 10-128 50m-177 46q-38 0-79-8V248q41 8 79 8q22 0 49-5v128q-27 5-49 5m-207-64q43 39 128 56v128q-86-17-128-56v128q43 39 128 56v133q-14-2-29-6q-2 0-5-1t-3-2q-11-3-21-7q-6-2-10-4q-10-5-21-12q-8-5-9-5q-17-12-30-24v256q0 26-19 45t-45.5 19t-45-19t-18.5-45V64q0-27 18.5-45.5t45-18.5t45.5 18.5t19 45.5q9 9 24 18q1 0 2.5 1l3 2l2.5 1q10 6 21 11q5 2 8 4q15 5 28 9l3 1q17 5 36 9v128q-85-17-128-56zm207 192q22 0 49-5v128q-27 5-49 5q-38 0-79-8V504q41 8 79 8m305-96v128q-32 11-128 50V466q95-39 128-50m0-128q67-22 128-29v128q-61 7-128 29zm-256 219V379q48-8 128-41v128q-80 33-128 41m384 136q-62 6-128 28V544q67-22 128-29zm-256 78q-15 6-28 11q-3 1-7 3q-11 4-25 9l-6 2q-17 6-30 9q-17 5-32 8V635q48-8 128-41zm-128-598q40-7 95-28l1-.5l2-.5q16-6 30-12v128q-80 33-128 41zm256-91q67-22 128-29v128q-61 7-128 29zm285-23q2 0 4.5 1t3.5 1q11 3 22 8q4 2 9 4q10 5 21 12q8 5 9 5q17 12 30 24v128q-55-51-128-61V3q14 2 29 6m99 311v128q-55-51-128-61V259q73 10 128 61m-204-320h2z"/></svg>学生竞赛</li>
        <li  :class="['l-child', {active: selectedItem === '7'}]" @click="selectItem('7')"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#999999" d="M6 22v-4.3q-1.425-1.3-2.212-3.037T3 11q0-3.75 2.625-6.375T12 2q3.125 0 5.538 1.838t3.137 4.787l1.3 5.125q.125.475-.175.863T21 15h-2v3q0 .825-.587 1.413T17 20h-2v2h-3.9l.625-6H15v-2h-3.075l.125-1.1q.05-.375.325-.638t.65-.262H17v-2h-3.95q-1.175 0-2.025.775T10.05 12.7L9.1 22z"/></svg>创新创业</li>
      </ul>
    </el-col>
    <el-col :lg="11" :offset="5"  class="mid-col">
      <ul class="grid-content ep-bg-purple-light" style="padding: 0;" >
        <li class="first">
          <div class="one" :class=" {'light':selectLight==0}" @click="selectLight = 0;">推荐</div>
           
          <div class="two" :class="{'light':selectLight==1}" @click="selectLight = 1;">最新</div>
        </li>
        <el-skeleton v-if="loading" :rows="5" animated />
        <content v-else class="m-child" v-for="(item,index) in itemList" :key="index" :title="item.title" :cont="item.cont" :picUrl="item.picUrl" :like="item.like" :view="item.view" :user="item.user"></content>
      </ul>
    <!-- 没有更多数据 -->
    <p v-if="!hasMore && !loading">没有更多数据了</p>
    </el-col>
    <el-col  :lg="4" class="rig-col">
      <div class="grid-content ep-bg-purple">
        <ul class="rig-1">
          <li class="r-first1"><svg class="svg1" xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="#db2777" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm3-4h5q.425 0 .713-.288T14 16t-.288-.712T13 15H8q-.425 0-.712.288T7 16t.288.713T8 17m0-4h8q.425 0 .713-.288T17 12t-.288-.712T16 11H8q-.425 0-.712.288T7 12t.288.713T8 13m0-4h8q.425 0 .713-.288T17 8t-.288-.712T16 7H8q-.425 0-.712.288T7 8t.288.713T8 9"/></svg>
          <p>文章榜</p>
          
        <div ><svg class="svg2" xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="#999999" d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4t.713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10t.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"/></svg>换一换</div></li>
          <li class="r-child1" v-for="(item,index) in rigData.bang1">
           {{ index+1 }}. {{ item }}
          </li>
          
          <li class="r-first2">
            <p>查看更多></p>
          </li>
        </ul>
        <ul class="rig-2">
          <li class="r-first3">
            <svg class="svg3"  xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24"><path fill="#db2777" d="M21 21V5H3v7q0 .425-.288.713T2 13t-.712-.288T1 12V5q0-.825.588-1.412T3 3h18q.825 0 1.413.588T23 5v14q0 .825-.587 1.413T21 21M9 14q-1.65 0-2.825-1.175T5 10t1.175-2.825T9 6t2.825 1.175T13 10t-1.175 2.825T9 14m-6 8q-.825 0-1.412-.587T1 20v-.8q0-.85.438-1.562T2.6 16.55q1.55-.775 3.15-1.162T9 15t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 19.2v.8q0 .825-.587 1.413T15 22z"/></svg>
            <p>作者榜</p>
          </li>
          <li class="r-child2" v-for="(item,index) in rigData.bang2">{{ item }}</li>
          <li class="r-first4">
            <p>查看更多></p>
          </li>
        </ul>
        <ul class="rig-3">
          <li class="r-first5"><p>推荐话题</p><div ><svg class="svg2" xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="#999999" d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4t.713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10t.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"/></svg>换一换</div></li>
          <li class="r-child2" v-for="(item,index) in rigData.bang3" :key="index" ><svg class="fire" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="red" d="m11.514 2.142l-1.26-.755l-.24 1.449C9.632 5.124 8.069 7.25 6.345 8.744C2.97 11.67 2.231 14.85 3.276 17.475c1 2.512 3.538 4.232 6.114 4.519l.596.066c-1.474-.901-2.42-3.006-2.09-4.579c.326-1.546 1.438-2.994 3.574-4.33l1.077-.672l.402 1.205c.237.712.647 1.284 1.064 1.865c.2.28.403.563.589.864c.643 1.045.813 2.207.398 3.36c-.378 1.048-1.001 1.872-1.86 2.329l.97-.108c2.418-.269 4.193-1.096 5.346-2.479C20.599 18.144 21 16.379 21 14.5c0-1.75-.719-3.554-1.567-5.055c-.994-1.758-2.291-3.218-3.707-4.633c-.245.49-.226.688-.73 1.475a8.15 8.15 0 0 0-3.482-4.145"/></g></svg><p class="per">{{ item }}</p></li>
          
        </ul>
      </div>
    </el-col>
  </el-row>

</template>

<style scoped>
.skeleton-item {
  height: 20px;
  width: 100%;
  background-color: #f2f2f2;
  margin-bottom: 10px;
  border-radius: 4px;
}
.el-skeleton__row {
  width: 100% !important; /* 或者设置为固定值，比如 80% */
  margin: 8px 0; /* 设置每条间距 */
}
.el-row{
  width: 100vw;
  flex: wrap;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
   /* min-height: 90vh;//////////////////////最后删除掉///////////////// */
  /* background-color: aqua; */
  background-color: white;
}

.el-col.left-col{
  margin-left: 7vw;
  margin-right: 1.5vw;
  /* min-height: 50vh; */
  position: fixed;
  z-index: 1000;
}
.left-col.grid-content,
.mid-col.grid-content,
.rig-col.grid-content{
  display: flex;
  flex-direction: column;
}
.left-col ul{
  width: 180px;
  margin-top: 60px;
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
  font-size: 17px;
  margin:3px  8px;
  border-radius: 5px;
  /* margin-left: 40px; */
  color: #7e7e7e;
}
.l-child.active{
color: rgb(30,128,255);
}
.l-child svg{
  margin-right: 13px;
  margin-left: 27px;
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