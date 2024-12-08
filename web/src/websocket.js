
let socket;
const listeners = new Set();
let onlineUsers = []
export const getOnlineUsers = () => onlineUsers;
export const connectWebSocket = (userId) => {
  socket = new WebSocket(`ws://192.168.1.163:3007?userId=${userId}`);
  //192.168.1.163
  //localhost
  // 连接成功
  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  // 收到消息
  socket.onmessage = (event) => {
    // const message = event.data;
    const message = JSON.parse(event.data);

    if (message.type === 'onlineUsers') {
      onlineUsers = message.users
      console.log('Online users:', onlineUsers);
      //页面内去操作
    }

    // console.log(`Message from ${message.senderId}: ${message.content}`);
    listeners.forEach((listener) => listener(message));
  };

  // 连接关闭
  socket.onclose = () => {
    console.log('WebSocket disconnected');
    socket = null;
  };
};

export const sendMessage = (senderId, receiverIds, content) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.error('WebSocket is not connected');
    return;
  }
  const message = JSON.stringify({ senderId, receiverIds, content });
  // console.log(message);

  socket.send(message);
};

export const addMessageListener = (listener) => {
  listeners.add(listener);
};

export const removeMessageListener = (listener) => {
  listeners.delete(listener);
};