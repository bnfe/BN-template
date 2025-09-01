import MD5 from "crypto-js/md5";
import { uuid } from "@/utils/util";
import qs from "qs";

export const md5 = (string: string): string => MD5(string).toString().toLocaleLowerCase();

const baseParams: Record<string, any> = {
  app_key: "5lOrfCGW",
  app_secret: "6dfzNDNkyi",
};

const SIGN_HEADER = (): Record<string, string> => {
  const params: Record<string, any> = {
    t: Math.floor(new Date().getTime() / 1000).toString(),
    n: uuid(),
    ...baseParams,
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { app_secret, ...data } = params;
  return {
    ...data,
    sign: md5(md5(Object.values(params).join("")))
      .split("")
      .reverse()
      .join(""),
  };
};

const CODE_HEADER = (data: Record<string, any>): Record<string, string> => {
  // 参数排序
  const asciiParams = Object.entries(data).sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));
  const object: Record<string, any> = {};
  for (const [key, value] of asciiParams) {
    object[key] = value;
  }
  return {
    code: md5(md5(qs.stringify({ ...baseParams, ...object })))
      .split("")
      .reverse()
      .join(""),
  };
};

export { SIGN_HEADER, CODE_HEADER };
