export const uuid = (len: number = 16, radix: number = 36): string => {
  const chars: string[] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    "",
  );
  const value: string[] = [];
  let i: number = 0;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) value[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r: number;

    // rfc4122 requires these characters
    /* eslint-disable-next-line */
    value[8] = value[13] = value[18] = value[23] = "-";
    value[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!value[i]) {
        r = 0 | (Math.random() * 16);
        value[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return value.join("");
};

/**
 * @method 存取session
 * @param {string} key 键
 * @param {*} val 值
 */
export const session = (key: string, val?: any): any => {
  if (typeof key !== "string") throw new Error("key must be a string!");
  if (val === undefined) {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (err) {
      return sessionStorage.getItem(key);
    }
  } else {
    val = typeof val === "string" ? val : JSON.stringify(val);
    sessionStorage.setItem(key, val);
  }
};

/**
 * @method 清除session
 * @param {string} key 键
 */
export const removeSession = (key?: string): void => {
  if (!key) {
    sessionStorage.clear();
    return;
  }
  if (typeof key !== "string") throw new Error("key must be a string!");
  sessionStorage.getItem(key) && sessionStorage.removeItem(key);
};

/**
 * @method 存取local
 * @param {string} key 键
 * @param {*} val 值
 */
export const local = (key: string, val?: any): any => {
  if (typeof key !== "string") throw new Error("key must be a string!");
  if (val === undefined) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return localStorage.getItem(key);
    }
  } else {
    val = typeof val === "string" ? val : JSON.stringify(val);
    localStorage.setItem(key, val);
  }
};

/**
 * @method 清除local
 * @param {string} key 键
 */
export const removeLocal = (key?: string): void => {
  if (!key) {
    localStorage.clear();
    return;
  }
  if (typeof key !== "string") throw new Error("key must be a string!");
  localStorage.getItem(key) && localStorage.removeItem(key);
};

/**
 * @method 获取地址栏参数
 */
export const getQuery = (name: string): string | null => {
  const reg = new RegExp("([&,?])" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.match(reg) || window.location.hash.match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
};
