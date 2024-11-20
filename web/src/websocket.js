
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
<<<<<<< HEAD
    const message = JSON.parse(event.data);
    console.log('Received message:', message); // 确认收到的消息
=======


    const message = event.data;

>>>>>>> 1698eb906d315ab3b49e597c09687ed64948854c
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
