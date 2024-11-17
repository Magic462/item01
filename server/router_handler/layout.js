<<<<<<< HEAD
// const axios = require('axios');
// const crypto = require('crypto');
// require('dotenv').config();

// const APP_ID = process.env.XF_APP_ID; // 你的 App ID
// const API_KEY = process.env.XF_API_KEY; // 你的 API Key

// exports.ai = async (ctx) => {
//     // 解构请求体中的内容
//     let { messages } = ctx.request.body; // 假设 messages 是用户的对话信息

//     // 检查 messages 是否存在
//     if (!messages || messages.length === 0) {
//         ctx.response.body = { status: 400, error: 'Messages are required' };
//         return;
//     }

//     try {
//         const url = 'wss://spark-api.xf-yun.com/v1.1/chat?authorization=YXBpX2tleT0iYWRkZDIyNzJiNmQ4YjdjOGFiZGQ3OTUzMTQyMGNhM2IiLCBhbGdvcml0aG09ImhtYWMtc2hhMjU2IiwgaGVhZGVycz0iaG9zdCBkYXRlIHJlcXVlc3QtbGluZSIsIHNpZ25hdHVyZT0iSDV1R1BRSlkwaUlRTHB6N0Z1WmFzSDhPbUlvcUp2Q1VEUDB3ZzNWUHRUaz0i&date=Mon%2C%2011%20Nov%202024%2014%3A51%3A17%20GMT&host=spark-api.xf-yun.com'; // 你的接口地址

//         const currentTime = Math.floor(Date.now() / 1000).toString();

//         // 构造请求参数
//         const requestData = {
//             header: {
//                 app_id: APP_ID,
//                 uid: "12345" // 可以自定义用户 ID
//             },
//             parameter: {
//                 chat: {
//                     domain: "generalv3.5",
//                     temperature: 0.5,
//                     max_tokens: 1024
//                 }
//             },
//             payload: {
//                 message: {
//                     text: messages // 用户的历史对话信息
//                 }
//             }
//         };

//         const param = Buffer.from(JSON.stringify(requestData)).toString('base64');

//         const checkSum = crypto.createHash('md5').update(`${API_KEY}${currentTime}${param}`).digest('hex');

//         const headers = {
//             'Content-Type': 'application/json; charset=utf-8',
//             'X-Appid': APP_ID,
//             'X-CurTime': currentTime,
//             'X-Param': param,
//             'X-CheckSum': checkSum
//         };

//         // 发送请求
//         const response = await axios.post(url, requestData, { headers });

//         // 成功获取数据，返回状态码200
//         ctx.response.body = {
//             status: 200,
//             result: response.data // 返回生成的内容
//         };
//     } catch (err) {
//         console.error('Error details:', err.response ? err.response.data : err.message);
//         ctx.response.body = {
//             status: 500,
//             error: err.message
//         };
//     }
// };
=======

const db = require('../db/index');

exports.titbang = async (ctx) => {
  // ctx.body = 'hello,Koa2'
  try {
    const [rows] = await db.query('SELECT bang1, bang2, bang3 FROM layoutlist')
    console.log(rows);

    const result = {
      bang1: rows.map(row => row.bang1).filter(value => value !== null),
      bang2: rows.map(row => row.bang2).filter(value => value !== null),
      bang3: rows.map(row => row.bang3).filter(value => value !== null)
    }
    ctx.status = 200
    ctx.body = result
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '数据库查询失败', error: error.message }
  }
}
>>>>>>> d8e6586d244baf905e7e4369d6b5c03ff5204d69
