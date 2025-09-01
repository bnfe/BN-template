import { GET, POST, PUT, DELETE } from "@/utils/request";

export const PointList = data => {
  return GET({
    url: "/api/point",
    data
  });
};

export const AddPoint = data => {
  return POST({
    url: "/api/point",
    data
  });
};

export const EditPoint = data => {
  let { id, ...args } = data;
  return PUT({
    url: `/api/point/${id}`,
    data: {
      ...args
    }
  });
};

export const DeletePoint = data => {
  let { id, ...args } = data;
  return DELETE({
    url: `/api/point/${id}`,
    data: {
      ...args
    }
  });
};

export const PointPlatForm = data => {
  return GET({
    url: "/api/point/plat-form",
    data
  });
};
