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
                <a href=''>以评价改革为牵引 全面提升工程博士培养质量专业学位研究生学位论文</a>
                <a href="" >关于转发工程类博士专业学位研究生学位论文与申请学位实践成果基</a>
                <a href="" >关于调整高等教育阶段和高中阶段国家奖助学金政策的通知</a>
                <a href="" >中共中央办公厅 国务院办公厅印发《关于加快推动博士研究生教育高质量发展的意见》</a>
                <a href="" >教育部办公厅关于深入推进实施国家优秀中小学教师培养计划的通知</a>
            </el-col>
            <el-col class="f-box" :span="8">
                <div>
                    <p>院校政策</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.63em" height="1em" viewBox="0 0 640 1024"><path fill="#0284c7" d="m608 577l-434 426q-21 21-51 21t-51-21l-51-51Q0 931 0 901t21-51l338-338L21 174Q0 153 0 123t21-51l51-51Q93 0 123 0t51 21l434 428q32 32 32 63.5T608 577"/></svg>
                </div>
                <a href="" >博士招生 | 宁波诺丁汉大学2025年秋季入学博士申请指南</a>
                <a href=''>杭州师范大学2025年博士研究生招生日程安排</a>
                <a href="" >2025年深圳大学中外合作办学项目金融科技与风险控制硕士招生简章</a>
                <a href="" >香港大学经济管理学院2025年硕士课程</a>
                <a href="" >通知 | 华南理工大学EMBA项目奖学金规定发布！</a>
                <a href="" >温州肯恩大学2025年研究生招生简章</a>
            </el-col><el-col class="f-box" :span="8">
                <div>
                    <p>专研咨询</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.63em" height="1em" viewBox="0 0 640 1024"><path fill="#0284c7" d="m608 577l-434 426q-21 21-51 21t-51-21l-51-51Q0 931 0 901t21-51l338-338L21 174Q0 153 0 123t21-51l51-51Q93 0 123 0t51 21l434 428q32 32 32 63.5T608 577"/></svg>
                </div>
                <a href="" >重庆理工大学会计学院2025年硕士研究生招生简章</a>
                <a href=''>2025年研考学情调研</a>
                <a href="" >2025研考日程表</a>
                <a href="" >跟着学姐走进WKU之BIOTECH姚雅琪</a>
                <a href="" >内蒙古：延长2025年研考网上确认时间的公告</a>
                <a href="" >关于延长青海省2025年全国硕士研究生招生考试网上确认时间的公告</a>
            </el-col>
            
        </el-row>
        <el-row :gutter="40">
            <el-col class="f-box" :span="8">
                <div>
                    <p>研招访谈</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.63em" height="1em" viewBox="0 0 640 1024"><path fill="#0284c7" d="m608 577l-434 426q-21 21-51 21t-51-21l-51-51Q0 931 0 901t21-51l338-338L21 174Q0 153 0 123t21-51l51-51Q93 0 123 0t51 21l434 428q32 32 32 63.5T608 577"/></svg>
                </div>
                <a href="" >[访谈]西北师范大学：应用伦理、新闻与传播两个专业学位类别首次招生</a>
                <a href=''>[访谈]西北农林科技大学：2025年拟招专硕2540名，学硕1674名</a>
                <a href="" >[访谈]河南理工大学：2025年招生政策有6点变化</a>
                <a href="" >[访谈]哈尔滨音乐学院：新增音乐美学方向招生</a>
                <a href="" >[访谈]长春工程学院：2025年拟招收硕士研究生243人</a>
                <a href="" >[访谈]榆林学院：2025年新增6个硕士点</a>
            </el-col><el-col class="f-box" :span="8">
                <div>
                    <p>专硕巡展</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.63em" height="1em" viewBox="0 0 640 1024"><path fill="#0284c7" d="m608 577l-434 426q-21 21-51 21t-51-21l-51-51Q0 931 0 901t21-51l338-338L21 174Q0 153 0 123t21-51l51-51Q93 0 123 0t51 21l434 428q32 32 32 63.5T608 577"/></svg>
                </div>
                <a href="" >【专硕巡展】工程管理：搭建工程技术与商业管理的桥梁</a>
                <a href=''>【专硕巡展】建设美丽绿色中国，资源与环境专硕人才不可或缺</a>
                <a href="" >【专硕巡展】生物与医药：年轻专业助力生物技术走上快车道</a>
                <a href="" >【专硕巡展】中医专硕有大学问，这些“关键”谁考都得问</a>
                <a href="" >【专硕巡展】公共管理专硕：推动社会和国家管理现代化的专业人才</a>
                <a href="" >【专硕巡展】林业专硕：新时代“美丽中国”建设者</a>
            </el-col><el-col class="f-box" :span="8">
                <div>
                    <p>推荐免试</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.63em" height="1em" viewBox="0 0 640 1024"><path fill="#0284c7" d="m608 577l-434 426q-21 21-51 21t-51-21l-51-51Q0 931 0 901t21-51l338-338L21 174Q0 153 0 123t21-51l51-51Q93 0 123 0t51 21l434 428q32 32 32 63.5T608 577"/></svg>
                </div>
                <a href="" >中国矿业大学关于做好2025年接收优秀应届本科毕业生免试攻读研究生（含直博生）工作的通知</a>
                <a href=''>天津工业大学：2025年接收优秀应届本科毕业生免试攻读硕士研究生和直接攻读博士研究生办法</a>
                <a href="" >扬州大学：关于做好2025年接收优秀应届本科毕业生免试攻读研究生工作的通知</a>
                <a href="" >上海海事大学：2025年接收推荐免试硕士研究生办法</a>
                <a href="" >哈尔滨理工大学：接收2025年推荐免试研究生预报名通知</a>
                <a href="" >太原理工大学：接收2025届优秀本科毕业生免试攻读研究生工作安排</a>
            </el-col>
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
    /* align-items: flex-start; */

}
.f-box a{
    flex: 1;
     overflow: hidden;         /* 超出隐藏  */
     white-space: nowrap;      /*强制内容不换行  */
      text-overflow: ellipsis;  /*超出部分用省略号显示  */
      text-align: left;
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
    color: rgb(24, 135, 224);
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