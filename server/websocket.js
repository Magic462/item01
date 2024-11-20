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

    users.set(userId, ws);

    ws.on('message', async (message) => {
      const { senderId, receiverId, content } = JSON.parse(message);

      // 保存消息到数据库
      await db.query(
        'INSERT INTO message (sender_id, receiver_id, content) VALUES (?, ?, ?)',
        [senderId, receiverId, content]
      );

      // 转发消息
      if (users.has(receiverId)) {
        console.log(1);

        users.get(receiverId).send(
          JSON.stringify({ senderId, content, createdAt: new Date() })
        );
      }
    });

    ws.on('close', () => {
      users.delete(userId);
    });
  });
};

module.exports = initWebSocket;