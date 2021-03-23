import request from '@/utils/request'

export function query(name, pageIndex, pageSize) {
  return request({
    url: `/api/mainCategories?name=${name}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export function queryAll() {
  return request({
    url: `/api/mainCategories/all`,
    method: 'get'
  })
}

export function querySelect() {
  return request({
    url: `/api/mainCategories/select`,
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: `/api/mainCategories/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/api/mainCategories',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: `/api/mainCategories/${id}`,
    method: 'put',
    data: data
  })
}

export function del(id) {
  return request({
    url: `/api/mainCategories/${id}`,
    method: 'delete'
  })
}