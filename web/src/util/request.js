import axios from 'axios'

// 封装 Axios 实例
const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_API, // 使用 Vite 的环境变量
    timeout: 5000, // 请求超时时间
    headers: {
        // 全局请求-请求头
        'Content-Type': 'application/json',
    },
})

// 请求拦截器


// 响应拦截器


export default request
