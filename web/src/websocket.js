
let socket;
const listeners = new Set();

export const connectWebSocket = (userId) => {
  socket = new WebSocket(`ws://192.168.1.163:3007?userId=${userId}`);

  // 连接成功
  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  // 收到消息
  socket.onmessage = (event) => {
    // const message = event.data;
    const message = JSON.parse(event.data);
    listeners.forEach((listener) => listener(message));
  };

  // 连接关闭
  socket.onclose = () => {
    console.log('WebSocket disconnected');
    socket = null;
  };
};

export const sendMessage = (senderId, receiverId, content) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.error('WebSocket is not connected');
    return;
  }
  // const message = JSON.stringify({ senderId, receiverId, content });
    // 构建消息对象
    const message = JSON.stringify({
      senderId,
      receiverId,
      content,
    });
    
    // 如果 receiverId 存在，将其添加到消息中
    // if (receiverId) {
    //   messagepart.receiverId = receiverId;
    // }
    
    // 将对象序列化为 JSON 字符串
    // const message = JSON.stringify(message);
  socket.send(message);
};

export const addMessageListener = (listener) => {
  listeners.add(listener);
};

export const removeMessageListener = (listener) => {
  listeners.delete(listener);
};
