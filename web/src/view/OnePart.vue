<script setup>
import image1 from '../assets/ban1.png'

</script>
<template>
    <!-- <el-empty :image-size="500" /> -->
    <div class="block text-center">
    <!-- <span class="demonstration">Motion blur the switch (default)</span> -->
    <el-carousel height="500px" motion-blur>
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="image1" class="car-image">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 500px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.car-image {
  width: 100%; /* 图片宽度自适应 */
  height: 500px; /* 固定高度 */
  object-fit: cover; /* 裁剪图片以适应框架 */
  border-radius: 8px; /* 可选：添加圆角效果 */
}
</style>