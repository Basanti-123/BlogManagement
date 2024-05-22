import instance from "../utils/api";
import { URLS } from "../constants/index";

const createUser = (payload) => {
  return instance.post(URLS.BLOGS, payload, {
    headers: { access_token: localStorage.getItem("access_token") },
  });
};

const List = (limit, page, name = "", role = "") => {
  // console.log(limit, page);[]
  return instance.get(
    URLS.USERS + `?page=${page}&limit=${limit}&name=${name}`,
    {
      headers: { access_token: localStorage.getItem("access_token") },
    }
  );
};

const updateUserDetails = (payload) => {
  return instance.put(URLS.USERS + `/update-profile`, payload, {
    headers: {
      access_token: localStorage.getItem("access_token"),
      "Content-Type": "multipart/form-data",
    },
  });
};

const getById = (_id) => {
  return instance.get(URLS.USERS + `/${_id}`, {
    headers: { access_token: localStorage.getItem("access_token") },
  });
};

export { createUser, List, updateUserDetails, getById };
