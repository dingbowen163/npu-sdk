import axios from 'axios'

import {
  Message,
  Notification,
  MessageBox
} from 'element-ui'

class CustomError extends Error {
  constructor (name, options) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(name)

    this.data = options
  }

  toString () {
    // console.log(JSON.stringify(this.data))
    return JSON.stringify(this.data);
  }
}

//跳转登录页
function goToLogin(){
  window.location.href = `${window.location.protocol}//${window.location.host}/protal/#/login`
}

const CancelToken = axios.CancelToken

/*
 * url 服务器 api地址
 * params 参数
 * opts {
 *   headers: 请求头设置
 *   success: 请求成功回调
 *   failed: 请求失败回调
 * }
 */

class Http {
  constructor (opts = {}) {
    const {
      timeout = 30000,
      baseUrl = '/api',
      contentType = 'application/json',
      withCredentials = true,
      cancelToken = undefined
    } = opts

    this.timeout = timeout
    this.baseUrl = baseUrl
    this.contentType = contentType
    this.withCredentials = withCredentials
    this.cancelToken = cancelToken
  }

  get (url, params = {}, opts = {}) {
    return this.ajax('get', url, {
      params
    }, opts)
  }

  post (url, data = {}, opts = {}) {
    return this.ajax('post', url, {
      data
    }, opts)
  }

  async ajax (method, url, params, opts = {}) {
    const ajaxRequest = axios({
      method,
      url: opts.baseUrl ? opts.baseUrl + url : this.baseUrl + url,
      headers: {
        'Content-Type': this.contentType,
        ...opts.headers
      },
      timeout: opts.timeout ? opts.timeout : this.timeout,
      onUploadProgress: opts.uploading,
      onDownloadProgress: opts.download,
      withCredentials: opts.withCredentials !== undefined ? opts.withCredentials : this.withCredentials,
      cancelToken: opts.cancelToken ? opts.cancelToken : this.cancelToken,
      ...params
    })

    try {
      const res = await ajaxRequest

      const {
        data = {
          code: 10001,
          message: '服务器返回数据错误',
          data: null
        }
      } = res || {}

      let ret = null
      if (opts.getRaw) {
        ret = data
      }else{
        if (data.code === 0) {
          if (opts.success) {
            opts.success(data.result)
          }
          ret = data.result
        } else if (data.code === 401) {
          goToLogin();
        } else {
          ret = this.errorHandler(data, opts)
          throw new CustomError('error', data)
        }  
      }

      return ret
    } catch (err) {
      if (err instanceof CustomError) {
        throw err
      }
      if (!(err instanceof axios.Cancel)) {
        const {
          data = {
            code: 10500,
            message: '服务器链接错误，请稍后再试！',
            data: null
          }
        } = err.response || {}

        return (this.errorHandler(data, opts))
      }
      return new Error('Request cancel!')
    };
  }
  
  errorHandler (data, opts) {
    if (opts.failed && typeof opts.failed === 'function') {
      opts.failed(data)
    }
    Message({
        message: data.message,
        center: true,
        type: 'error'
    })
    if(data.code == 100000005){
      setTimeout(()=>{
        goToLogin();
      }, 1500)
    }

    return data.data
  }
}

export const http = new Http()
export const mkCancel = function () {
  let cancel
  const token = new CancelToken((c) => {
    cancel = c
  })
  return {
    token,
    cancel
  }
}
export async function ajax (config, otherOption = {}) {
  let result = null
  try {
    const http = new Http(config)
    result = await http.ajax(config.method, config.url, config, otherOption)
  } catch (e) {
    result = e
  }
  if (result instanceof Error) {
    throw result
  }

  return result
}
