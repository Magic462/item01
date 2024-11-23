const WebSocket = require('ws')
const db = require('./db/index')

const users = new Map()

//给前端广播所有在线用户
function broadcastOnlineUsers() {
  // 获取所有在线用户的 ID
  const onlineUsers = Array.from(users.keys());

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
function broadcastToReceivers(receiverIds, message) {
  receiverIds.forEach((receiverId) => {
    const client = users.get(String(receiverId));
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}


const initWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    const userId = req.url.split('?userId=')[1];
    if (!userId) {
      ws.close();
      return;
    }
    // console.log(`User ${userId} connected`); // 确认连接成功
    users.set(userId, ws);

    //有用户加入时,广播在线用户列表
    broadcastOnlineUsers()

    ws.on('message', async (message) => {
      let { senderId, receiverIds, content } = JSON.parse(message);
      // 保存消息到数据库
      await db.query(
        'INSERT INTO message (sender_id, receiver_id, content) VALUES (?, ?, ?)',
        // [senderId, receiverId, content]
        [senderId, receiverIds || null, content]
      );
      receiverIds = Array.isArray(receiverIds) ? receiverIds : [receiverIds]
      // console.log(users);
      broadcastToReceivers(receiverIds, { senderId, content, createdAt: new Date().toISOString() })
      // 转发消息
      // if (users.has(receiverId)) {
      //   users.get(receiverId).send(
      //     JSON.stringify({ senderId, content, createdAt: new Date().toISOString() })
      //   );
      // }
      // if (receiverId && users.has(receiverId)) {
      //   users.get(receiverId).send(
      //     JSON.stringify({ senderId, content, createdAt: new Date().toISOString() })
      //   );
      // } else {
      //   // 广播给所有连接的用户,client是WebSocket实例
      //   users.forEach((client, id) => {
      //     if (client.readyState === WebSocket.OPEN && id !== senderId) {
      //       client.send(
      //         JSON.stringify({ senderId, content, createdAt: new Date().toISOString() })
      //       );
      //     }
      //   });
      // }
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