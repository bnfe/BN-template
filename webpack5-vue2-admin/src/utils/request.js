import axios from "axios";
import router from "@/router";
import { Message } from "element-ui";
import util from "@/utils/util";
import pkg from "~/package.json";

const _headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8"
};

let request = axios.create({
  baseURL: process.env.BN_ENV === "prod" ? process.env.PROD_URL : process.env.BASE_URL,
  headers: _headers,
  timeout: 8000 //超时设置
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    config.headers = Object.assign(
      {},
      {
        token: util.local("token"),
        version: pkg.version,
        ...config.headers
      }
    );
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  res => {
    // res.status >= 200 && res.status < 300
    return Promise.resolve(res);
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        // 401 未登录
        case 401:
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        // 403 token过期
        case 403:
          Message.error("登录过期，请重新登录");
          util.removeLocal("token");
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;
        // 404 请求不存在
        case 404:
          Message.error("请求不存在");
          break;
        // 其他错误，直接抛出错误提示
        default:
          Message.error(error.response?.data?.message || "未知错误");
      }
    } else {
      Message.error("服务器跟毛肚私奔了");
    }
    return Promise.reject(error);
  }
);

/**
 * @method 请求get方法
 * @param {Sting} url
 * @param {Object} data
 */
const GET = (opt = {}) => {
  let option = {
    method: "get",
    url: opt.url,
    params: opt.data
  };
  return REQUEST(option);
};

/**
 * @method 请求post方法
 * @param {Sting} url
 * @param {Object} data
 */
const POST = (opt = {}) => {
  let option = {
    method: "post",
    url: opt.url,
    data: opt.data
  };
  return REQUEST(option);
};

/**
 * @method 请求put方法
 * @param {Sting} url
 * @param {Object} data
 */
const PUT = (opt = {}) => {
  let option = {
    method: "put",
    url: opt.url,
    data: opt.data
  };
  return REQUEST(option);
};

/**
 * @method 请求delete方法
 * @param {Sting} url
 * @param {Object} data
 */
const DELETE = (opt = {}) => {
  let option = {
    method: "delete",
    url: opt.url,
    data: opt.data
  };
  return REQUEST(option);
};

/**
 * @method 上传文件方法
 * @param {Sting} url
 * @param {Object} data
 */
const UPLOAD = (opt = {}) => {
  const data = opt.data || {};
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  let option = {
    method: "post",
    url: opt.url,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: formData
  };
  return REQUEST(option);
};

const REQUEST = option => {
  return new Promise((resolve, reject) => {
    request({
      ...option
    })
      .then(res => {
        if (res.data.code === 200 && res.data.success) {
          if (res.headers.token) {
            res.data.data.token = res.headers.token;
            resolve(res.data);
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.data);
          Message.error(res.data.message || "未知错误");
        }
      })
      .catch(error => {
        // Message.error("服务器跟毛肚私奔了");
        reject(error);
      });
  });
};

export { GET, POST, PUT, DELETE, UPLOAD };
