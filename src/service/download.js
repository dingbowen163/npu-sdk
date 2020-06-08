import { ajax } from './basic'

export async function getList (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/v1/api/products'
  }, extra))
  return result
}