import { GET, POST } from "@/utils/request";

interface UserInfoParams {
  mobile: string;
}

export const UserInfo = (data: UserInfoParams): Promise<any> => {
  return GET({
    url: "/api/member/basic",
    data,
  });
};
