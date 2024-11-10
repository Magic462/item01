import request from "../util/request";

export const login = (username, password) => {
  return request.post('/user/login', { username, password })
}

export const register = (username, phone, password) => {
  return request.post('/user/register', { username, phone, password })
}