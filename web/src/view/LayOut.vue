<script setup>
import { ElContainer,ElHeader,ElMain,ElButton } from "element-plus"
import { ref,watch,computed,onMounted,onUnmounted } from "vue"
import { useRouter, useRoute } from 'vue-router';//路由跳转
import { useUserStore } from "../stores";

const userStore = useUserStore()
const activePath = ref('');
const route = useRoute(); 
const isLight=ref(false)
// 侦听路由变化  
watch(  
  () => route.path,  
  (toPath) => {  
    // isLight.value=true
    activePath.value=toPath;
    // console.log(keypath);
    
    // isLight.value=false
    // console.log(activePath.value);
  },  
  { immediate: true } // 立即执行一次回调，以处理初始路由  
);

// const handleMenuItemClick = async (index) => {
//   console.log('Clicked menu item index:', index); // 打印点击的 index
//   if (index !== activePath.value) {
//     console.log(index);
//     console.log(activePath.value);
    
//     isLight.value = true;
//   } 
// };

//搜索框部分

//控制搜索框高亮
const isActive = ref(false);
//控制创作者中心的隐藏
const isHidden = ref(false);
// 控制搜索列表的显示
const showList = ref(false); 
//定义响应式placeholder值
const content=ref('大学智学网')
// 定义响应式的搜索查询和项目列表
const inputValue = ref('');
const items = ref([
  { id: 1, name: 'Apple' },
  { id: 2, name: 'ab' },
  { id: 3, name: 'acskj' },
  { id: 4, name: 'jdsva' },
  { id: 5, name: 'aknvv' },
  { id: 6, name: 'nkdjsvacd' },
]);

// 更新 placeholder 的函数、搜索列表的显示
const handleClick = e =>{
  isActive.value = true;
  isHidden.value = true;
  content.value ='搜索你感兴趣的任何事'
}
//搜索列表的隐藏
const handleBlur = e =>{
  isActive.value = false;
  isHidden.value = false;
  content.value ='大学智学网'
    // 使用 setTimeout 防止 blur 事件在点击列表项时触发
    setTimeout(() => {
    showList.value = false;
  }, 100);
}
// 模糊搜索
const filteredItems = computed(() => {
  if (!inputValue.value) return [];
  return items.value.filter(item =>
    item.name.toLowerCase().includes(inputValue.value.toLowerCase())
    //includes() 方法用于判断一个字符串是否包含另一个字符串
    //toLowerCase属性：转换为小写字母
  );
});
const handleInput= e =>{
  // listHidden.value = true;
}
const highlightText = (text, search) => {
  if (!search) return text; // 如果没有搜索内容，返回原始文本
  const regex = new RegExp(`(${search})`, 'gi'); // 创建正则表达式，支持大小写匹配
  return text.replace(regex, '<span style="color: blue; font-weight: bold;">$1</span>'); // 用高亮的 span 包裹匹配部分
};
//监听滚动条


// Nav导航栏是否隐藏
const isFixed = ref(true)
// 回到顶部按钮
const isBack= ref(true)
//回到顶部、nav导航栏
const handleScroll=()=>{
  // 获取滚动条位置  
  const scrollTop = document.documentElement.scrollTop
  // console.log(scrollTop);
  if(scrollTop>=300){
    isFixed.value=false
    isBack.value=false
  }else {
    isFixed.value=true
    isBack.value=true
  }
}
//自定义防抖函数
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
// 使用防抖包装滚动处理函数
const debouncedHandleScroll = debounce(handleScroll, 500);
onMounted(()=>{
  window.addEventListener('scroll',debouncedHandleScroll);
})
// 组件卸载时移除事件监听器  
onUnmounted(() => {  
  window.removeEventListener('scroll', debouncedHandleScroll);  
});  

//用户设置
const router = useRouter();
// const userClick = (userId) => {
//   router.push({ path: `/SettingPart/${userId}` }); // 使用路径参数
//   // const userId = route.params.userId; // 获取路径参数 userId
//   console.log(userId);
// }

//comment
const commentClick = (commentId) => {
  router.push({ path: `/CommentPart/${commentId}` }); // 使用路径参数
  // const userId = route.params.userId; // 获取路径参数 userId
  // console.log(userId);
}

//ai
const aiClick=()=>{
  router.push({ path: '/AiPart' });
}

//回到顶部
const backtopClick = () => {
  window.scrollTo({
        top: 0,
        behavior: 'smooth', // 平滑滚动
      });
}
//编辑文章
const createText = () => {
  router.push({path:`/create`})
}
//用户是否注册，检查token
// console.log(userStore.islogin);

const Islogin = ref(userStore.islogin) 
const gologin = () => {
  router.push({path:'/login'})
}

//退出登录提示框
const dialogOverflowVisible = ref(false)
//退出登录
const useOut = () => {
  setTimeout(() => {
    userStore.clearToken();
    userStore.clearID();
    
    router.push({ path: '/login' });
  }, 1500);
}


</script>

<template>
  <el-container>
      <el-header :class="{ fixed:isFixed }">
      <span class="logo"><img src="../assets/Logo.png" alt="大学智学网"></span>
        <el-menu
    :default-active="activePath"
    :ellipsis="false"
    class="el-menu-vertical-demo"
    :class="{ active:isLight }"
    active-text-color="#1f2b6b"
    mode="horizontal"
    style="max-width: 600px"
    router
  >
    <el-menu-item index="/MainPart">首页动态</el-menu-item>
    <el-menu-item index="/OnePart">升学速递</el-menu-item>
    <el-menu-item index="/TwoPart">实习就业</el-menu-item>
    <el-menu-item index="/ThreePart">创业立项</el-menu-item>
    <el-menu-item index="/FourPart">名师咨询</el-menu-item>
        </el-menu>
        <div class="search"
        :class="{ active: isActive }"
        >
        <input 
          type="text" 
          :placeholder="content" 
          class="search-content"
          @blur="handleBlur"
          @click="handleClick"
          @input="handleInput"
          @focus="showList = true"
          v-model="inputValue"
          >
          <ul v-if="showList && filteredItems.length > 0" class="search-list" :class="{ hidden:listHidden }">
            <li v-for="item in filteredItems" :key="item.id" v-html="highlightText(item.name, inputValue)"></li>
          </ul>
          <div class="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="none" stroke="#666666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/></svg>
          </div>
        </div>
        <div class="creat" :class="{ hidden:isHidden }" @click="createText" >创作者中心 </div>
        
        <a plain @click="dialogOverflowVisible = true" v-if="Islogin" ><el-avatar :src="`/avatars/${userStore.userID}.png`" /></a>
        <a class="user" v-else @click="gologin">登录</a>
      </el-header>
      <el-container >
        <el-dialog
    v-model="dialogOverflowVisible"
    title="温馨提示"
    width="400"
    draggable
    overflow
  >
    <span>您是否要退出登录？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogOverflowVisible = false">取消</el-button>
        <el-button type="danger" @click="dialogOverflowVisible = false; useOut()">
          确定退出
        </el-button>
      </div>
    </template>
  </el-dialog>
        <el-main>
          <router-view></router-view>
          <div class="module">
            <div class="comment" @click="commentClick(1)">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="none" stroke="#db2777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 6h8m-4-4v8M6.099 19.5q-1.949-.192-2.927-1.172C2 17.157 2 15.271 2 11.5V11c0-3.771 0-5.657 1.172-6.828S6.229 3 10 3h1.5m-5 15c-.205 1.002-1.122 3.166-.184 3.865c.49.357 1.271-.024 2.834-.786c1.096-.535 2.206-1.148 3.405-1.424c.438-.1.885-.143 1.445-.155c3.771 0 5.657 0 6.828-1.172C21.947 17.21 21.998 15.44 22 12M8 14h6M8 9h3" color="#db2777"/></svg>
            </div>
            <div class="ai" @click="aiClick">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><g fill="none" stroke="#db2777" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="#db2777"><path d="M5.143 14A7.8 7.8 0 0 1 4 9.919C4 5.545 7.582 2 12 2s8 3.545 8 7.919A7.8 7.8 0 0 1 18.857 14M7.383 17.098c-.092-.276-.138-.415-.133-.527a.6.6 0 0 1 .382-.53c.104-.041.25-.041.54-.041h7.656c.291 0 .436 0 .54.04a.6.6 0 0 1 .382.531c.005.112-.041.25-.133.527c-.17.511-.255.767-.386.974a2 2 0 0 1-1.2.869c-.238.059-.506.059-1.043.059h-3.976c-.537 0-.806 0-1.043-.06a2 2 0 0 1-1.2-.868c-.131-.207-.216-.463-.386-.974M15 19l-.13.647c-.14.707-.211 1.06-.37 1.34a2 2 0 0 1-1.113.912C13.082 22 12.72 22 12 22s-1.082 0-1.387-.1a2 2 0 0 1-1.113-.913c-.159-.28-.23-.633-.37-1.34L9 19"/><path d="m12.308 12l-1.461-4.521A.72.72 0 0 0 10.154 7a.72.72 0 0 0-.693.479L8 12m7-5v5m-6.462-1.5h3.231"/></g></svg>
            </div>
            <div 
            class="backtop" 
            @click="backtopClick"
            :class="{fixed:isBack}"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="#db2777" d="M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20z"/></svg>
          </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
</template>

<style scoped>
:deep(.el-container){
  width: 100vw;
}

:deep(.el-header) {
    width: 100vw;
    height: 55px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 200px;
    position: fixed;
    top:0;
    z-index:1000;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    transition: transform .1s;
    transform: translate3d(0, -100%, 0);
}

:deep(.el-header).fixed {
  transform: translateZ(0);
  /* transform: translate3d(0, -100%, 0); */
}

:deep(.el-main) {
    width: 100vw;
    margin-top:50px;
}

.logo {
  height: 100%;
  overflow: hidden;
  width: 212px;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index:100;
}

:deep(.el-menu) {
  height: 100%;
  position: relative;
  /* --el-menu-hover-text-color: #000; */
  /* --el-menu-item-hover-fill: #b32929; */
  /* --el-menu-hover-bg-color: #b32929; */
}

:deep(.el-menu).active {
    --el-menu-hover-bg-color: #fff;
    --el-menu-hover-text-color: #000;
}

.search {
  position: relative;
  border:1px solid #ccced6;
  width: 240px;
  border-radius: 4px;
}

.search-content {
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  padding-left:8px;
}

.search.active {
  border:2px solid rgb(30,128,255);
  transition:ease .4s;
  width: 360px;
}

.search input:focus {
  outline: none;
}

.search-icon {
  position: absolute;
  top:3px;
  right:3px;
}

.search-list {
  list-style: none;
  padding: 0;
  border:2px solid #ccced6;
  border-radius: 4px;
  width: 360px;
  max-width: 360px;
  background: white;
  position: absolute;
  top:30px;
  z-index: 100;
}

.search-list li {
  padding: 8px;
  cursor: pointer;
}

.search-list li:hover {
  background-color: #f0f0f0;
}

.creat {
  border-radius: 4px;
  background-color:rgba(30, 114, 246,0.9);
  flex-basis: 130px;
  color: #ffffff;
}
.creat:hover{
  cursor: pointer;
  background-color: rgba(30, 114, 246,1);
}
.overlay{
  position: fixed; /* 固定位置 */
   top: 0;
   left: 0;
   width: 100%; /* 占满整个页面 */
   height: 100%;
   background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
   display: none; /* 初始状态隐藏 */
   z-index: 1000; /* 确保在最上层 */
}
.content{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001; /* 比蒙层更高的层级 */
}
.creat.hidden {
  display:none;
}

.user {
  background-color: #5a4141;
  border-radius: 50%;
  cursor: pointer;
  color:#fff;
}

.module {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 1000;
}

.module div {
    width: 35px;
    height: 35px;
    margin-top:5px;
    border-radius: 50%;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #fff;
}

.comment {
  background-color: #000;

}

.ai {
  background-color: #ca5252;
}

.backtop {
  background-color: #3c9521;
}

.backtop.fixed {
  display: none;
}
</style>