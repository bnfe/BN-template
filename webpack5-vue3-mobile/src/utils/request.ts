import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { showLoadingToast, closeToast, showToast } from "vant";
import { SIGN_HEADER } from "./md5";
import pkg from "~/package.json";

interface RequestOptions extends AxiosRequestConfig {
  isLoad?: boolean;
}

// 显示加载框
const showLoad = () => {
  showLoadingToast({
    message: "加载中",
    forbidClick: true,
    duration: 0,
  });
};

// 隐藏加载框
const hideLoad = () => closeToast();

const _headers: Record<string, any> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

const request: AxiosInstance = axios.create({
  baseURL: process.env.BN_ENV === "prod" ? process.env.PROD_URL : process.env.BASE_URL,
  headers: _headers,
  timeout: 15000, //超时设置
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers["version"] = pkg.version;
    config.headers["tenancy_id"] = process.env.BN_ENV === "prod" ? "banu" : "banutest";
    const SIGN = SIGN_HEADER();
    for (const key in SIGN) {
      config.headers[key] = SIGN[key];
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  (error: AxiosError) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401 未登录
        case 401:
          showToast({
            message: "未登录，请先登录",
            duration: 1000,
            forbidClick: true,
          });
          break;
        // 403 登录过期
        case 403:
          showToast({
            message: "登录过期，请重新登录",
            duration: 1000,
            forbidClick: true,
          });
          break;
        // 404 请求不存在
        case 404:
          showToast({
            message: "请求不存在",
            duration: 1000,
            forbidClick: true,
          });
          break;
        // 其他错误
        default:
          showToast({
            message: "未知错误",
            duration: 1000,
            forbidClick: true,
          });
      }
    }
    return Promise.reject(error);
  },
);

/**

@method 请求get方法
@param {Sting} url
@param {Object} data
*/
const GET = (opt: RequestOptions = {}) => {
  const option: RequestOptions = {
    method: "get",
    url: opt.url,
    params: opt.data,
    isLoad: opt.isLoad !== undefined ? opt.isLoad : true,
  };
  return REQUEST(option);
};
/**
  @method 请求post方法
  @param {Sting} url
  @param {Object} data
  */

const POST = (opt: RequestOptions = {}) => {
  const option: RequestOptions = {
    method: "post",
    url: opt.url,
    data: opt.data,
    isLoad: opt.isLoad !== undefined ? opt.isLoad : true,
  };
  return REQUEST(option);
};

/**
  @method 请求put方法
  @param {Sting} url
  @param {Object} data
  */
const PUT = (opt: RequestOptions = {}) => {
  const option: RequestOptions = {
    method: "put",
    url: opt.url,
    data: opt.data,
    isLoad: opt.isLoad !== undefined ? opt.isLoad : true,
  };
  return REQUEST(option);
};

/**
  @method 请求delete方法
  @param {Sting} url
  @param {Object} data
  */
const DELETE = (opt: RequestOptions = {}) => {
  const option: RequestOptions = {
    method: "delete",
    url: opt.url,
    data: opt.data,
    isLoad: opt.isLoad !== undefined ? opt.isLoad : true,
  };
  return REQUEST(option);
};

/**
  @method 上传文件方法
  @param {Sting} url
  @param {Object} data
  */
const UPLOAD = (opt: RequestOptions = {}) => {
  const data = opt.data || {};
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  const option: RequestOptions = {
    method: "post",
    url: opt.url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    isLoad: opt.isLoad !== undefined ? opt.isLoad : true,
  };
  return REQUEST(option);
};

const REQUEST = ({ isLoad, ...option }: RequestOptions) => {
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
      .then((res: AxiosResponse) => {
        isLoad && hideLoad();
        if (res.status === 200) {
          if (res.data.code === 200 && res.data.success) {
            resolve(res.data);
          } else {
            reject(res.data);
            showToast(res.data.message);
          }
        } else {
          showToast("服务器跟毛肚私奔了");
          reject({
            status: res.status,
          });
        }
      })
      .catch((error: AxiosError) => {
        showToast("服务器跟毛肚私奔了");
        reject({ error });
      });
  });
};

export { GET, POST, PUT, DELETE, UPLOAD };
