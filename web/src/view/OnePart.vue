<script setup>
import image1 from '../assets/ban1.png'
import image2 from '../assets/ban2.png'
import image3 from '../assets/ban3.png'
import image4 from '../assets/ban4.png'
const images = [image1,image2,image3,image4]
</script>
<template>
    <!-- <el-empty :image-size="500" /> -->
    <!-- 轮播图 -->
    <div class="block text-center">
    <!-- <span class="demonstration">Motion blur the switch (default)</span> -->
    <el-carousel height="500px" motion-blur>
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="image" class="car-image">
      </el-carousel-item>
    </el-carousel>
  </div >
    <div class="content">
        <el-row :gutter="30">
            <el-col class="title">政策与资讯</el-col>
        </el-row>
        <el-row :gutter="40">
            <el-col class="f-box" :span="8">
                <div>
                    <p>国家政策</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.63em" height="1em" viewBox="0 0 640 1024"><path fill="#0284c7" d="m608 577l-434 426q-21 21-51 21t-51-21l-51-51Q0 931 0 901t21-51l338-338L21 174Q0 153 0 123t21-51l51-51Q93 0 123 0t51 21l434 428q32 32 32 63.5T608 577"/></svg>
                </div>
                <a href="" >教育部关于印发《2025年全国硕士研究生招生工作管理规定》的通知</a>
                <a href=''>以评价改革为牵引 全面提升工程博士培养质量</a>
                <a href="" >关于转发工程类博士专业学位研究生学位论文与申请学位实践成果基</a>
                <a href="" ></a>
                <a href="" ></a>
                <a href="" ></a>
            </el-col>
            <el-col class="f-box" :span="8"></el-col>
            <el-col class="f-box" :span="8"></el-col>
        </el-row>
        <el-row :gutter="40">
            <el-col class="f-box" :span="8"></el-col>
            <el-col class="f-box" :span="8"></el-col>
            <el-col class="f-box" :span="8"></el-col>
        </el-row>
    </div>
</template>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  border-radius: 8px
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  border-radius: 8px
}
.car-image {
  width: 100%; /* 图片宽度自适应 */
  height: 500px; /* 固定高度 */
  object-fit: cover; /* 裁剪图片以适应框架 */
  border-radius: 8px; /* 可选：添加圆角效果 */
}
.content{
    width: 90vw;
    margin: 0 auto;
}
.title{
    font-size: 35px;
    font-weight: bold;
    height: 50px;
    text-align: left;
    margin-top: 20px;
    margin-left: 30px;
}
.f-box{
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.f-box a{
    flex: 1;
    overflow: hidden;         /* 超出隐藏 */
    white-space: nowrap;     /* 强制内容不换行 */
    text-overflow: ellipsis;  /* 超出部分用省略号显示 */
    color: #000;
    margin-left: 30px;
}
.f-box a:hover{
    color: deepskyblue;
}
.f-box div{
    text-align: left;
    margin-top: 15px;
    /* margin-left: px; */
    font-size: 23px;
   margin-bottom: 10px;
   width: 500px;
   position: relative;
}
.f-box div p{
    /* display: inline-block;  */
    font-weight: bold;
    margin-bottom: 5px;
}
.f-box div svg{
    position: absolute;
    right: 15px;
    top: 10px;
}
.f-box div svg:hover{
    cursor: pointer;
}

.f-box p{
    margin-left: 30px;
}

</style>