import { GET, POST, PUT, DELETE } from "@/utils/request";

export const PropertyList = data => {
  return GET({
    url: "/api/property",
    data
  });
};

export const AddProperty = data => {
  return POST({
    url: "/api/property",
    data
  });
};

export const EditProperty = data => {
  let { id, ...args } = data;
  return PUT({
    url: `/api/property/${id}`,
    data: {
      ...args
    }
  });
};

export const DeleteProperty = data => {
  let { id, ...args } = data;
  return DELETE({
    url: `/api/property/${id}`,
    data: {
      ...args
    }
  });
};

export const PropertyType = data => {
  return GET({
    url: "/api/property/property-type",
    data
  });
};
