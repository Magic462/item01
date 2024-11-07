import request from '../util/request'

//POST请求示例
export function commentAcquire(data) {
  return request({
    url: '/comment',
    method: 'post',
    data: data,
  })
}