import { ajax } from './basic'

export async function getUserList (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/api/orders'
  }, extra))
  return result
}

export async function setUserExpired (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/api/orders/auth/extend'
  }, extra))
  return result
}

export async function getCSList (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/api/orders_ex'
  }, extra))
  return result
}