import { GET, POST, PUT, DELETE } from "@/utils/request";
// 获取统计数量
export const UserLogin = data => {
  return POST({
    url: "/api/user/login",
    data
  });
};

// 获取用户信息
export const UserInfo = data => {
  return GET({
    url: "/api/user/info",
    data
  });
};
