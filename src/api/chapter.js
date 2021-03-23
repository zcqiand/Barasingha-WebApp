import request from '@/utils/request'

export function query(startUpdateTime,endUpdateTime,name,pageIndex,pageSize) {
  return request({
    url: `/api/chapters?startUpdateTime=${startUpdateTime}&endUpdateTime=${endUpdateTime}&name=${name}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: `/api/chapters/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/api/chapters',
    method: 'post',
    data:data
  })
}

export function update(id,data) {
  return request({
    url: `/api/chapters/${id}`,
    method: 'put',
    data: data
  })
}

export function del(id) {
  return request({
    url: `/api/chapters/${id}`,
    method: 'delete'
  })
}