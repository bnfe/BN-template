import axios from "axios";
import router from "@/router";
import { Toast } from "vant";
import store from "@/store";

// 显示加载框
const showLoad = (message = "加载中") => {
  if (message && typeof message === "string") {
    Toast.loading({
      message,
      forbidClick: true,
      duration: 0,
    });
  }
};

// 隐藏加载框
const hideLoad = () => Toast.clear();

const _headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

let request = axios.create({
  baseURL: "",
  headers: _headers,
  timeout: 5000, //超时设置
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // let {
    //   login: { token },
    // } = store.state;
    // config.headers["token"] = token || "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    if (error.status) {
      switch (error.status) {
        // 401 未登录
        case 401:
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
          break;
        // 403 token过期
        case 403:
          Toast({
            message: "登录过期，请重新登录",
            duration: 1000,
            forbidClick: true,
          });
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
          }, 1000);
          break;
        // 404 请求不存在
        case 404:
          Toast({
            message: "请求不存在",
            duration: 1000,
            forbidClick: true,
          });
          break;
        // 其他错误
        default:
          Toast({
            message: "未知错误",
            duration: 1000,
            forbidClick: true,
          });
      }
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
    // url: `${opt.url}?${qs.stringify(opt.data)}`,
    params: opt.data,
    isLoad: opt.isLoad != undefined ? opt.isLoad : true,
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
    data: opt.data,
    isLoad: opt.isLoad != undefined ? opt.isLoad : true,
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
    data: opt.data,
    isLoad: opt.isLoad != undefined ? opt.isLoad : true,
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
    data: opt.data,
    isLoad: opt.isLoad != undefined ? opt.isLoad : true,
  };
  return REQUEST(option);
};

const REQUEST = ({ isLoad, ...option }) => {
  if (process.env.NODE_ENV === "development") {
    console.table({
      url: option.url,
      method: option.method,
      ...option.params,
      ...option.data,
    });
  }
  isLoad && showLoad();
  return new Promise((resolve, reject) => {
    request({ ...option })
      .then((res) => {
        isLoad && hideLoad();
        if (res.status == 200) {
          if (res.data.code == 200 && res.data.success) {
            resolve(res.data);
          } else {
            reject(res.data);
            Toast(res.data.message);
          }
        } else {
          Toast("服务器跟毛肚私奔了");
          reject({
            status: res.status,
          });
        }
      })
      .catch((error) => {
        Toast("服务器跟毛肚私奔了");
        reject({ error });
      });
  });
};

export { GET, POST, PUT, DELETE };
