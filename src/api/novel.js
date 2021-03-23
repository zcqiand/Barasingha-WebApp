import request from '@/utils/request'

export function query(param) {
  return request({
    url: `/api/novels/query`,
    method: 'post',
    data: param
  })
}

export function get(id) {
  return request({
    url: `/api/novels/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/api/novels',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: `/api/novels/${id}`,
    method: 'put',
    data: data
  })
}

export function del(id) {
  return request({
    url: `/api/novels/${id}`,
    method: 'delete'
  })
}