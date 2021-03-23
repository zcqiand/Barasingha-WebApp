import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: `/api/users/login?username=${username}&password=${password}`,
    method: 'get'
  })
}

export function query(nickName, pageIndex, pageSize) {
  return request({
    url: `/api/users?nickName=${nickName}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export function queryAll() {
  return request({
    url: `/api/users/all`,
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: `/api/users/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/api/users',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: `/api/users/${id}`,
    method: 'put',
    data: data
  })
}

export function del(id) {
  return request({
    url: `/api/users/${id}`,
    method: 'delete'
  })
}
