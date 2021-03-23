import request from '@/utils/request'

export function query(name, pageIndex, pageSize) {
  return request({
    url: `/api/roles?name=${name}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export function queryAll() {
  return request({
    url: `/api/roles/all`,
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: `/api/roles/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/api/roles',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: `/api/roles/${id}`,
    method: 'put',
    data: data
  })
}

export function setPermission(id, data) {
  return request({
    url: `/api/roles/${id}/setPermission`,
    method: 'put',
    data: data
  })
}

export function del(id) {
  return request({
    url: `/api/roles/${id}`,
    method: 'delete'
  })
}