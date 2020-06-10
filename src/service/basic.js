import axios from "axios";

import { Message, Notification, MessageBox } from "element-ui";

class Http {
  constructor(opts = {}) {
    const { withMsg = false } = opts;

    this.baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : '';
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
        "Content-Type": "application/json"
      },
      timeout: 30000,
      withCredentials: true,
      crossDomain: true,
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
