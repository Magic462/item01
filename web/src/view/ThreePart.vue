<template>
  <div class="container" ref="container" @scroll="onScroll">
    <!-- 内容区域 -->
    <div class="content" :style="{  transform: `translateY(${translateY}px)` }">
      <!-- 渲染的列表项 -->
      <div v-for="item in visibleItems" :key="item.index" class="item">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const container = ref(null);  // 用来引用容器
const totalItems = 1000;      // 假设总共有1000条数据
const itemHeight = 50;        // 每个item的高度
const buffer = 5;             // 增加一些缓冲区，以提前加载一些元素

// 计算出总高度
const totalHeight = totalItems * itemHeight;

// 定义响应式变量
const visibleItems = ref([]);   // 当前显示的列表项
const translateY = ref(0);       // 内容区域偏移量

// 计算可见的列表项数量
const visibleCount = ref(Math.floor(window.innerHeight / itemHeight));

// 渲染可见的项目
const renderItems = () => {
  // 获取滚动的位置
  const scrollTop = container.value.scrollTop;

  // 计算开始和结束的索引
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer); // 起始索引
  const endIndex = Math.min(totalItems - 1, Math.floor((scrollTop + container.value.clientHeight) / itemHeight) + buffer); // 结束索引

  // 生成当前需要显示的项
  const itemsToRender = [];
  for (let i = startIndex; i <= endIndex; i++) {
    itemsToRender.push({
      index: i,
      text: `Item ${i + 1}`,
    });
  }

  // 更新可见的项目
  visibleItems.value = itemsToRender;

  // 更新内容区域的位置
  translateY.value = startIndex * itemHeight;
};

// 滚动事件处理函数
const onScroll = () => {
  renderItems();
};

// 页面加载时进行一次渲染
onMounted(() => {
  renderItems();
});

// 监听窗口变化，重新计算可见项数量
watch(() => window.innerHeight, () => {
  visibleCount.value = Math.floor(window.innerHeight / itemHeight);
  renderItems();
});

</script>

<style scoped>
.container {
  height: 300px;
  overflow-y: auto;
  position: relative;
  border: 1px solid #ccc;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  margin: 2px 0;
}
</style>
