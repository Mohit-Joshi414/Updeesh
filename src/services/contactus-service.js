import { myAxios } from "./helper";

export const createContactUs = (postData) => {
  return myAxios
    .post(`/api/contactUs/`, postData)
    .then((response) => response.data);
};

export const loadAllContactUs = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/api/contactUs/all?pageNumber=${pageNumber}&pageSize=${pageSize}&sortDir=desc`
    )
    .then((response) => response.data);
};
