import { ajax } from './basic'

export async function getList (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/api/inquirys'
  }, extra))
  return result
}

export async function addQuestion (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/api/inquirys/add'
  }, extra))
  return result
}