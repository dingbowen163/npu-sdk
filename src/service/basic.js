import axios from "axios";

import { Message, Notification, MessageBox } from "element-ui";

//跳转登录页
function goToLogin() {
  window.location.href = `${window.location.protocol}//${window.location.host}/#/login`;
}

const CancelToken = axios.CancelToken;

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
  constructor(opts = {}) {
    const {
      timeout = 30000,
      baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : '',
      contentType = "application/json",
      withCredentials = true,
      cancelToken = undefined,
      withMsg = false
    } = opts;

    this.timeout = timeout;
    this.baseUrl = baseUrl;
    this.contentType = contentType;
    this.withCredentials = withCredentials;
    this.cancelToken = cancelToken;
    this.withMsg = withMsg;
  }

  get(url, params = {}, opts = {}) {
    return this.ajax("get", url, { params }, opts);
  }

  post(url, data = {}, opts = {}) {
    return this.ajax("post", url, { data }, opts);
  }

  async ajax(method, url, params, opts = {}) {
    const ajaxRequest = axios({
      method,
      url,
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": this.contentType,
        ...opts.headers
      },
      timeout: opts.timeout ? opts.timeout : this.timeout,
      onUploadProgress: opts.uploading,
      onDownloadProgress: opts.download,
      withCredentials:
        opts.withCredentials !== undefined
          ? opts.withCredentials
          : this.withCredentials,
      cancelToken: opts.cancelToken ? opts.cancelToken : this.cancelToken,
      ...params
    });

    try {
      const res = await ajaxRequest;

      const { data } = res || {};

      let ret = null;
      if (data.msg === "ok") {
        if (opts.success) {
          opts.success(data.result);
        }
        ret = this.withMsg ? data : data.data;
      } else if (data.code === 401) {
        goToLogin();
      } else {
        if (this.withMsg) {
          Message({
            message: data.msg,
            center: true,
            type: "error"
          });
          ret = data;
        } else {
          let errData = {
            code: 10001,
            message: data.msg,
            data: data.msg
          };
          ret = this.errorHandler(errData, opts);
          throw new Error(ret);
        }
      }
      return ret;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      return new Error("Request cancel!");
    }
  }

  errorHandler(data, opts) {
    if (opts.failed && typeof opts.failed === "function") {
      opts.failed(data);
    }
    Message({
      message: data.message,
      center: true,
      type: "error"
    });

    return data.data;
  }
}

export const http = new Http();
export const mkCancel = function() {
  let cancel;
  const token = new CancelToken(c => {
    cancel = c;
  });
  return {
    token,
    cancel
  };
};
export async function ajax(config, otherOption = {}) {
  let result = null;
  try {
    const http = new Http(config);
    result = await http.ajax(config.method, config.url, config, otherOption);
  } catch (e) {
    result = e;
  }
  if (result instanceof Error) {
    throw result;
  }

  return result;
}
