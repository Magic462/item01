
const db = require('../db/index');
const OpenAI = require('openai')
// 实例化 
const client = new OpenAI({
  apiKey: 'sk-mqNoLflSJnm4VM7n3tM8jecr5e0wyOZlZ9gbU4ZWx06KIKMG', // xxx为GitHub授权的每个账号的key值
  baseURL: 'https://api.chatanywhere.tech/v1'
})
//排行榜接口
exports.titbang = async (ctx) => {
  // ctx.body = 'hello,Koa2'
  try {
    const [rows] = await db.query('SELECT bang1, bang2, bang3 FROM layoutlist')

    const result = {
      bang1: rows.map(row => row.bang1).filter(value => value !== null),
      bang2: rows.map(row => row.bang2).filter(value => value !== null),
      bang3: rows.map(row => row.bang3).filter(value => value !== null)
    }
    // console.log(result);

    ctx.status = 200
    ctx.body = result
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: '数据库查询失败', error: error.message }
  }
}

//ai接口
exports.ai = async (ctx) => {
  const { content } = ctx.request.body; // 从请求体中提取 content
  try {
    const response = await client.chat.completions.create(
      {
        messages: [{ role: 'user', content }],
        model: 'gpt-3.5-turbo',
        //只生成一条信息
        n: 1,
        max_tokens: 100,
        // stream: true, // stream
      }
    )
    console.log(response.choices[0].message.content);
    // 成功拿到数据就返回状态码200
    ctx.response.body = {
      status: 200,
      res: response
    }
  } catch (error) {
    // 失败就返回状态码500
    ctx.response.body = {
      status: 500,
      error: err.message
    }
  }
}


//文章接口
exports.mid = async (ctx) => {
  const { page, limit } = ctx.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit, 10);
  const [row] = await db.query('SELECT * FROM recommendlist')
  const data = row.slice(startIndex, endIndex);
  ctx.body = {
    data,
    hasMore: endIndex < row.length,
  };
}