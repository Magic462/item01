import request from "../util/request";

export const upload = ({ content }) => {
  return request.post('/mainPart/upload', { content });
}