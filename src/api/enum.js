import request from '@/utils/request'

export function query(name) {
  return request({
    url: `/api/enums?name=${name}`,
    method: 'get'
  })
}
