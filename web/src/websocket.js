
let socket;
const listeners = new Set();

export const connectWebSocket = (userId) => {
  socket = new WebSocket(`ws://localhost:3007?userId=${userId}`);

  // 连接成功
  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  // 收到消息
  socket.onmessage = (event) => {
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
  const message = JSON.stringify({ senderId, receiverId, content });
  socket.send(message);
};

export const addMessageListener = (listener) => {
  listeners.add(listener);
};

export const removeMessageListener = (listener) => {
  listeners.delete(listener);
};