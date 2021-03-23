import request from '@/utils/request'

export function query(novelId,pageIndex,pageSize) {
  return request({
    url: `/api/segments?novelId=${novelId}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: `/api/segments/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/api/segments',
    method: 'post',
    data:data
  })
}

export function update(id,data) {
  return request({
    url: `/api/segments/${id}`,
    method: 'put',
    data: data
  })
}

export function del(id) {
  return request({
    url: `/api/segments/${id}`,
    method: 'delete'
  })
}