<template>
  <div class="hot-companies">
    <!-- 标题 -->
    <h2 class="title">热门职业</h2>
    <!-- 企业列表 -->
    <div class="company-grid">
      <div v-for="company in companies" :key="company.id" class="company-card">
        <!-- 企业信息 -->
        <div class="company-header">
          <img :src="company.logo" alt="logo" class="company-logo" />
          <div>
            <h3 class="company-name">{{ company.name }}</h3>
            <p class="company-info">{{ company.info }}</p>
          </div>
        </div>
        <!-- 职位列表 -->
        <div class="job-list">
          <div v-for="job in company.jobs" :key="job.id" class="job-item">
            <div class="job-title-salary">
              <p class="job-title">{{ job.title }}</p>
              <p class="job-salary">{{ job.salary }}</p>
            </div>
            <p class="job-details">{{ job.details }}</p>
          </div>
        </div>
        <!-- 查看更多 -->
        <button class="more-jobs">查看更多职位</button>
      </div>
    </div>
  </div>
  <div class="hot-companies">
    <!-- 标题 -->
    <h2 class="title">热招企业</h2>
    <div class="container">
    <div class="item" v-for="(item, index) in items" :key="index">
      <img :src="item.img" alt="Image" class="item-img" />
      <div class="item-content">
        <h3 class="item-title">{{ item.title }}</h3>
        <p class="item-description">{{ item.description }}</p>
      </div>
    </div>
  </div>
  </div>
  <button class="more-jobs2">查看更多职位</button>
</template>

<script setup>
import { ref } from "vue";

const companies = ref([
  {
    id: 1,
    name: "字节跳动",
    logo: '/BOSS/1.jpg',
    info: "已上市 | 10000人以上 | 互联网",
    jobs: [
      { id: 1, title: "前端开发工程师", salary: "20-35K", details: "北京 | 3年以上 | 本科" },
      { id: 2, title: "产品经理", salary: "25-40K", details: "上海 | 5年以上 | 本科" },
      { id: 3, title: "算法工程师", salary: "30-50K", details: "北京 | 3年以上 | 硕士" },
    ],
  },
  {
    id: 2,
    name: "腾讯",
    logo: '/BOSS/2.jpg',
    info: "已上市 | 10000人以上 | 互联网",
    jobs: [
      { id: 1, title: "后端开发工程师", salary: "25-40K", details: "深圳 | 3年以上 | 本科" },
      { id: 2, title: "运营专员", salary: "15-25K", details: "广州 | 2年以上 | 本科" },
      { id: 3, title: "测试开发工程师", salary: "20-30K", details: "北京 | 2年以上 | 本科" },
    ],
  },
  {
    id: 3,
    name: "阿里巴巴",
    logo: '/BOSS/3.jpg',
    info: "已上市 | 10000人以上 | 互联网",
    jobs: [
      { id: 1, title: "数据分析师", salary: "20-30K", details: "杭州 | 3年以上 | 本科" },
      { id: 2, title: "业务发展经理", salary: "30-50K", details: "杭州 | 5年以上 | 硕士" },
      { id: 3, title: "Java开发工程师", salary: "25-40K", details: "杭州 | 3年以上 | 本科" },
    ],
  },
  {
    id: 4,
    name: "美团",
    logo: '/BOSS/4.webp',
    info: "已上市 | 10000人以上 | 互联网",
    jobs: [
      { id: 1, title: "算法工程师", salary: "30-50K", details: "北京 | 3年以上 | 硕士" },
      { id: 2, title: "测试开发工程师", salary: "15-25K", details: "北京 | 2年以上 | 本科" },
      { id: 3, title: "大数据工程师", salary: "25-40K", details: "上海 | 3年以上 | 硕士" },
    ],
  },
  {
    id: 5,
    name: "京东",
    logo: '/BOSS/5.jpg',
    info: "已上市 | 10000人以上 | 互联网",
    jobs: [
      { id: 1, title: "物流运营经理", salary: "20-30K", details: "北京 | 3年以上 | 本科" },
      { id: 2, title: "前端开发工程师", salary: "20-35K", details: "上海 | 3年以上 | 本科" },
      { id: 3, title: "供应链专员", salary: "15-25K", details: "广州 | 2年以上 | 本科" },
    ],
  },
  {
    id: 6,
    name: "百度",
    logo: '/BOSS/6.jpg',
    info: "已上市 | 10000人以上 | 互联网",
    jobs: [
      { id: 1, title: "深度学习工程师", salary: "35-60K", details: "北京 | 3年以上 | 硕士" },
      { id: 2, title: "自然语言处理工程师", salary: "30-50K", details: "北京 | 5年以上 | 硕士" },
      { id: 3, title: "数据库开发工程师", salary: "25-40K", details: "深圳 | 3年以上 | 本科" },
    ],
  },
  {
    id: 7,
    name: "字节跳动",
    logo: '/BOSS/1.jpg',
    info: "已上市 | 10000人以上 | 互联网",
    jobs: [
      { id: 1, title: "前端开发工程师", salary: "20-35K", details: "北京 | 3年以上 | 本科" },
      { id: 2, title: "产品经理", salary: "25-40K", details: "上海 | 5年以上 | 本科" },
      { id: 3, title: "算法工程师", salary: "30-50K", details: "北京 | 3年以上 | 硕士" },
    ],
  },
  {
    id: 8,
    name: "京东",
    logo: '/BOSS/5.jpg',
    info: "已上市 | 10000人以上 | 互联网",
    jobs: [
      { id: 1, title: "物流运营经理", salary: "20-30K", details: "北京 | 3年以上 | 本科" },
      { id: 2, title: "前端开发工程师", salary: "20-35K", details: "上海 | 3年以上 | 本科" },
      { id: 3, title: "供应链专员", salary: "15-25K", details: "广州 | 2年以上 | 本科" },
    ],
  },
]);
const items = ref([
  {
    img: "/avatars/3.png",
    title: "Item 1",
    description: "Description for item 1."
  },
  {
    img: "/avatars/2.png",
    title: "Item 2",
    description: "Description for item 2."
  },
  {
    img: "/BOSS/1.jpg",
    title: "Item 3",
    description: "Description for item 3."
  },
  {
    img: "/header/2.png",
    title: "Item 4",
    description: "Description for item 4."
  },
  {
    img: "/header/3.png",
    title: "Item 5",
    description: "Description for item 5."
  },
  {
    img: "/header/1.png",
    title: "Item 6",
    description: "Description for item 6."
  }
]);
</script>

<style scoped>
.hot-companies {
  padding: 16px;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 40px;
  font-weight: bold;
  width: 100vw;
  margin-bottom: 24px;
  text-align: center;
}

.company-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 16px;
}

.company-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease; /* 添加过渡效果 */
}

.company-card:hover {
  transform: translateY(-10px); /* 悬停时上移 10px */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 更明显的阴影 */
  background: linear-gradient(to bottom, #e0f7ff, #fff); /* 微蓝渐变背景 */
}

/* 职位列表样式 */
.job-title {
  font-weight: bold;
  color: #333;
  transition: color 0.3s ease; /* 添加过渡效果 */
}

.job-title:hover {
  color: #007bff; /* 悬停时变为蓝色 */
  cursor: pointer;
}

/* 悬停效果的平滑过渡 */
.job-item {
  border-top: 1px dashed #e0e0e0;
  padding: 8px 0;
  transition: all 0.3s ease; /* 添加动画过渡 */
}


.job-title-salary {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.job-title {
  font-weight: bold;
  color: #333;
}

.job-salary {
  color: #f56c6c;
  font-size: 14px;
}

.job-details {
  font-size: 12px;
  color: #666;
}

.more-jobs {
  display: block;
  width: 40%; /* 设置按钮宽度为 40% */
  margin: 0 auto; /* 水平居中 */
  padding: 8px;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: #fff;
  color: #007bff;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

.more-jobs:hover,
.more-jobs2:hover{
  background-color: #007bff;
  color: white;
}
/* 使用 CSS Grid 布局 */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); /* 自适应列宽 */
  gap: 40px; /* 项目之间的间距 */
  padding: 40px;
}


.item {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: transform 0.3s ease;
}

.item:hover {
  transform: translateY(-5px); /* 鼠标悬停效果 */
}

.item-img {
  width: 100%;
  height: 200px; /* 固定图片高度 */
  object-fit: cover;
}

.item-content {
  padding: 16px;
  text-align: center;
}

.item-title {
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
}

.item-description {
  font-size: 14px;
  color: #666;
}
.more-jobs2{
  display: block;
  width: 20%;
  margin: 40px auto; /* 水平居中 */
  padding: 6px;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: #fff;
  color: #007bff;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}
</style>
