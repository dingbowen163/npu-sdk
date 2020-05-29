import { ajax } from './basic'

export async function testLogin (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/api/collect/user/query/info'
  }, extra))
  return result
}
