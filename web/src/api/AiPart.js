import request from "../util/request";

export const ai = ({ content }) => {
  return request.post('/mainPart/ai', { content });
}