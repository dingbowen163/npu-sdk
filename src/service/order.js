import { ajax } from './basic'

export async function getUserList (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/v1/api/orders'
  }, extra))
  return result
}

export async function setUserExpired (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/v1/api/orders/auth/extend'
  }, extra))
  return result
}

export async function getCSList (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/v1/api/orders_ex'
  }, extra))
  return result
}