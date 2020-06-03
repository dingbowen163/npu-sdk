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

export async function getMessageDetail (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/api/inquirys_resp'
  }, extra))
  return result
}
// 提交回复
export async function addReply (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/api/inquirys_resp/add'
  }, extra))
  return result
}