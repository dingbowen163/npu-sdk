import { ajax } from './basic'

export async function getVerifyCode (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/api/verify-img'
  }, extra))
  return result
}

export async function checkemail (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/api/user/login/checkemail'
  }, extra))
  return result
}

export async function checkid (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/api/user/login/checkid'
  }, extra))
  return result
}

export async function checkCode (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/api/check-img'
  }, extra))
  return result
}

export async function register (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/api/user/register'
  }, extra))
  return result
}

export async function login (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/api/user/login'
  }, extra, {withMsg: true}))
  return result
}

export async function getSelfInfo (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/api/user/info'
  }, extra))
  return result
}

export async function logout (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/api/user/logout'
  }, extra))
  return result
}

export async function editPersionalInfo (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/api/user/edit'
  }, extra, {withMsg: true}))
  return result
}

export async function editPwd (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'post',
    url: '/api/user/password'
  }, extra, {withMsg: true}))
  return result
}

export async function sendemail (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/api/reset/sendemail'
  }, extra))
  return result
}

export async function resetpassword (extra) {
  const result = await ajax(Object.assign({}, {
    method: 'get',
    url: '/api/reset/resetpassword'
  }, extra))
  return result
}