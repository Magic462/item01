const WebSocket = require('ws')
const db = require('./db/index')
//构造用户Map快速查找
const users = new Map()
let userId
//给前端广播所有在线用户
function broadcastOnlineUsers() {
  // 获取所有在线用户的 ID
  // const onlineUsers = Array.from(users.keys()).filter((id) => id !== userId);
  const onlineUsers = Array.from(users.keys())
  // 构造广播消息
  const message = JSON.stringify({
    type: 'onlineUsers',
    users: onlineUsers, // 只包含用户 ID
  });

  // 广播给每个在线客户端
 users.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

//广播给每个用户
function broadcastToReceivers(senderId, receiverIds, message) {
  // console.log(receiverIds);
  receiverIds.forEach((receiverId) => {
    // 确保不向发送者自己发送消息
    if (String(receiverId) !== String(senderId)) {
      const client = users.get(String(receiverId));
      // 检查客户端是否存在且连接状态为开放
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    }
  });
}

const initWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    userId = req.url.split('?userId=')[1];
    if (!userId) {
      ws.close();
      return;
    }
    // console.log(`User ${userId} connected`); // 确认连接成功
    users.set(userId, ws);
    // ws.send({
    //   type: 'onlineUsers',
    //   users: onlineUsers, // 只包含用户 ID
    // });
    //有用户加入时,广播在线用户列表
    broadcastOnlineUsers()

    ws.on('message', async (message) => {
      let { senderId, receiverIds, content } = JSON.parse(message);
      //由receiver是数组或个人决定发送给所有人还是1v1,只要进入聊天室的人
      // 获取当前时间并格式化为 MySQL DATETIME 格式
      const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
      await db.query(
        'INSERT INTO message (sender_id, receiver_id, content, created_at) VALUES (?, ?, ?, ?)',
        // [senderId, receiverId, content]
        [senderId, Array.isArray(receiverIds) ? 1 : receiverIds, content, createdAt]
      );
      // console.log(receiverIds);

      // receiverIds = Array.isArray(receiverIds) ? receiverIds : [receiverIds]

      // console.log(users);
      // console.log(receiverIds);
      broadcastToReceivers(senderId, receiverIds, { senderId, content, createdAt: new Date().toISOString() })
    });

    ws.on('close', () => {
      users.delete(userId);
      //用户断开连接时广播一下用户列表
      // console.log(`User ${userId} removed from users map`);
      broadcastOnlineUsers()
    });
  });
};
// console.log('WebSocket server is running on ws://localhost:3007');
module.exports = initWebSocket;