import request from '@/utils/request'

export function query(pageIndex,pageSize) {
  return request({
    url: `/api/menus?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export function gettree() {
  return request({
    url: '/api/menus/tree',
    method: 'get'
  })
}

export function getselect() {
  return request({
    url: '/api/menus/select',
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: `/api/menus/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/api/menus',
    method: 'post',
    data:data
  })
}

export function update(id,data) {
  return request({
    url: `/api/menus/${id}`,
    method: 'put',
    data: data
  })
}

export function del(id) {
  return request({
    url: `/api/menus/${id}`,
    method: 'delete'
  })
}