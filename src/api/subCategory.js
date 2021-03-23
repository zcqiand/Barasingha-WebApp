import request from '@/utils/request'

export function query(mainCategoryId, name, pageIndex, pageSize) {
  return request({
    url: `/api/subCategories?mainCategoryId=${mainCategoryId}&name=${name}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export function queryAll() {
  return request({
    url: `/api/subCategories/all`,
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: `/api/subCategories/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/api/subCategories',
    method: 'post',
    data: data
  })
}

export function update(id, data) {
  return request({
    url: `/api/subCategories/${id}`,
    method: 'put',
    data: data
  })
}

export function del(id) {
  return request({
    url: `/api/subCategories/${id}`,
    method: 'delete'
  })
}