import axios from 'axios'
import { useUserStore } from '../stores/index';
const userStore = useUserStore()
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
request.interceptors.request.use(
    (config) => {
        // 在发送请求前做些什么
        const token = userStore.token; // 从 localStorage 获取 token
        if (token) {
            config.headers.Authorization = token; // 将 token 添加到请求头
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);


// 响应拦截器
request.interceptors.response.use(
    // (res) => {
    //     // 对响应数据做些什么
    //     return res;
    // },
    // (error) => {
    //     // 对响应错误做些什么
    //     if (error.response) {
    //         // 根据状态码进行错误提示或处理
    //         if (error.response.status === 401) {
    //             // 例如：401 未授权，可能需要重新登录
    //             console.error('身份过期，请重新登录');
    //             localStorage.removeItem('token'); // 移除过期的 token
    //             router.push('/login')
    //         } else if (error.response.status === 403) {
    //             // 例如：403 禁止访问
    //             console.error('403禁止访问!');
    //         }
    //     }
    //     return Promise.reject(error);
    // }
);


export default request
