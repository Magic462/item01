import request from "../util/request";

export const ai = ({ content,userID }) => {
  return request.post('/mainPart/ai', { content,userID });
}

export const getChatHistory = ({ userID }) => {
  return request.post('/mainPart/getChatHistory', { userID });
}

export const clearChatHistory = ({ userID }) => {
  return request.post('/mainPart/clearChatHistory', { userID });
}