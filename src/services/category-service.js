import { myAxios, privateAxios } from "./helper";

export const loadAllCategories = () => {
  return myAxios.get("/api/category/").then((response) => {
    return response.data;
  });
};

export const createCategory = (category) => {
  return privateAxios.post("/api/category/", category).then((response) => {
    return response.data;
  });
};

export const getCategoryById = (categoryId) => {
  return myAxios.get(`/api/category/${categoryId}`).then((response) => {
    return response.data;
  });
};

export const updateCategory = (categoryId, category) => {
  return privateAxios
    .put(`/api/category/${categoryId}`, category)
    .then((response) => {
      return response.data;
    });
};

export const deleteCategoryById = (categoryId) => {
  return privateAxios.delete(`/api/category/${categoryId}`).then((response) => {
    return response.data;
  });
};
