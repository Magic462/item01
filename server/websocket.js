const WebSocket = require('ws')
const db = require('./db/index')

const users = new Map()

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

    ws.on('message', async (message) => {
      const { senderId, receiverId, content } = JSON.parse(message);

      // 保存消息到数据库
      await db.query(
        'INSERT INTO message (sender_id, receiver_id, content) VALUES (?, ?, ?)',
        [senderId, receiverId, content]
      );
      console.log(users);
      
      // 转发消息
<<<<<<< HEAD
      if (users.has(String(receiverId))) {
        console.log(1);
        users.get(String(receiverId)).send(
        JSON.stringify({ senderId, content, createdAt: new Date().toISOString() })
=======
      if (users.has(receiverId)) {

        users.get(receiverId).send(
          JSON.stringify({ senderId, content, createdAt: new Date().toISOString() })
>>>>>>> 1698eb906d315ab3b49e597c09687ed64948854c
        );
      }
      // else {
      //   console.warn(`User ${receiverId} is not connected`); // 确认用户是否连接
      // }
    });

    ws.on('close', () => {
      users.delete(userId);
      // console.log(`User ${userId} removed from users map`);
    });
  });
};
console.log('WebSocket server is running on ws://localhost:3007');
module.exports = initWebSocket;