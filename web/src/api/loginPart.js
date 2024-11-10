import request from "../util/request";

export const login = (username, password) => {
  return request.post('/api/login', { username, password })
}

export const register = (username, phone, password) => {
  return request.post('/api/register', { username, phone, password })
}