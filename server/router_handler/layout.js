
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

// 保存消息到数据库
const saveMessage = async (userID, type, text) => {
  const query = 'INSERT INTO chatmessages (user_id, type, text) VALUES (?, ?, ?)';
  const values = [userID, type, text];

  try {
    await db.execute(query, values);
  } catch (error) {
    console.error('保存消息错误:', error);
  }
};

// 获取聊天记录
const getMessages = async (userID) => {
  const query = 'SELECT * FROM chatmessages WHERE user_id = ? ORDER BY timestamp ASC';
  const values = [userID];
  
  try {
    const [rows] = await db.execute(query, values);
    return rows; // 返回聊天记录
  } catch (error) {
    console.error('获取消息错误:', error);
    return [];
  }
};

//ai接口
exports.ai = async (ctx) => {
  const { content,userID } = ctx.request.body; // 从请求体中提取 content
  
  try {
    // 保存用户消息
    await saveMessage(userID, 'user', content);
    const response = await client.chat.completions.create(
      {
        messages: [{ role: 'user', content }],
        model: 'gpt-3.5-turbo',
        //只生成一条信息
        n: 1,
        max_tokens: 200,
        // stream: true, // stream
      }
    )
    // console.log(response.choices[0].message.content);
    const aiMessage=response.choices[0].message.content;
    await saveMessage(userID, 'ai', aiMessage);
    // await saveMessage(userId,'ai',aimessage)
    // 成功拿到数据就返回状态码200
    ctx.response.body = {
      status: 200,
      res: aiMessage
    }
  } catch (error) {
    // 失败就返回状态码500
    ctx.response.body = {
      status: 500,
      error: err.message
    }
  }
}
// 获取聊天记录的 API
exports.getChatHistory = async (ctx) => {
  const { userID } = ctx.request.body; // 从请求体获取 userID
  // console.log('获取的 userID:', userID);
  
  if (!userID) {
    ctx.response.status = 400;
    ctx.response.body = { error: '缺少 userID' };
    return;
  }

  const messages = await getMessages(userID);

  if (!messages || messages.length === 0) {
    ctx.response.body = {
      status: 204,
      messages: [],
    };
    return;
  }

  ctx.response.body = {
    status: 200,
    messages,
  };
};
// 清除聊天记录的 API
exports.clearChatHistory = async (ctx) => {
  const { userID } = ctx.request.body; // 从请求体获取 userID
  console.log('获取的 userID:', userID);
  
  if (!userID) {
    ctx.response.status = 400;
    ctx.response.body = { error: '缺少 userID' };
    return;
  }

  const query = 'DELETE FROM chatmessages WHERE user_id = ?';
  const values = [userID];

  try {
    const result = await db.execute(query, values);
    const affectedRows = result[0].affectedRows; // 假设使用的数据库库支持这样获取影响的行数

    if (affectedRows === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: '未找到聊天记录' };
      return;
    }

    console.log(`用户 ID ${userID} 的聊天记录已被清除`);
    ctx.response.body = {
      status: 200,
      message: `用户 ID ${userID} 的聊天记录已成功删除`,
    };
  } catch (error) {
    console.error('清除消息错误:', error);
    ctx.response.status = 500; // 内部服务器错误
    ctx.response.body = { error: '清除消息时发生错误' };
  }
};

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