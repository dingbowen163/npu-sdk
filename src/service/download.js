import { ajax } from './basic'

export async function getList (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: 'api/products'
  }, extra))
  return result
}