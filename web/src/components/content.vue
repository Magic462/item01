<script setup>
  import {defineProps} from 'vue'
const props = defineProps({
  title: String,
  cont: String,
  like: Number,
  view: String,
  picUrl: String,
  user: String
})


</script>

<template>
  <div class="con">
    <div class="else"><h2>{{ title }}</h2>
    <p class="cont">{{ cont }}</p>
    <div class="footer"> <p class="user">{{ user }}</p><div class="like" ><svg class="svg1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#999999" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>{{ view }}</div>
    <div class="view"><svg class="svg2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#999999" fill-rule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232s.532.374.717.645a2.11 2.11 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355c-2.072 0-4.276-.677-6.157-1.256c-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.5 25.5 0 0 0 4.238-5.514a1.8 1.8 0 0 1 .901-.83a1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757c.225.36.32.788.269 1.211zM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clip-rule="evenodd"/></svg>{{ like }}</div></div></div>
   <div class="img"> <img :src='picUrl' ></div>
  </div>
</template>

<style scoped>
  .con{
    position: relative;
  }
  h2{
    position: absolute;
    top: 5px;
    left: 20px;
    font-size: 17px;
    font-weight: bold;
  }
  .cont{
    position: absolute;
    top: 35px;
    left: 23px;
    color: #a3a3a3;
    font-size: 14px;
  }
  .user,
  .like,
  .view{
    display: inline-block;

  }
  .footer{
    position: absolute;
    bottom: 10px;
    left: 21px;
    font-size: 14px;
    color: #a3a3a3;
  }
  .user{
    margin-right: 20px;
    padding-right: 15px;
    position: relative;
  }
  .user::after{
  content: "";
  position: absolute;
  right: 0;
  top: 4px;
  height: 60%; /* 控制边框高度 */
  width: 1px; /* 边框宽度 */
  background-color:#a3a3a3; /* 边框颜色 */
  /* 控制边框的长度 */
  /* height: 20px; 设置为你想要的具体长度 */
  }
  .like{
    margin-right: 10px;
  }
  .view:hover svg path{
    fill: rgb(30,128,255);
  }
  .view:hover{
    color: rgb(30,128,255);
  }
  .img{
   position: absolute;
   right: 10px;
   top: 34px;
  }


</style>