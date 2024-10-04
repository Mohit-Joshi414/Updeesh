import { myAxios, privateAxios } from "./helper";

export const createPost = (postData) => {
  return privateAxios
    .post(
      `/api/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data);
};

export const loadAllPost = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortDir=desc`
    )
    .then((response) => response.data);
};

export const loadPostById = (postId) => {
  return myAxios.get("/api/post/" + postId).then((response) => response.data);
};

export const createComment = (comment, postId, userId) => {
  return privateAxios
    .post(`/api/comments/user/${userId}/post/${postId}`, comment)
    .then((response) => response.data);
};

export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);

  return privateAxios
    .post(`/api/post/image-upload/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export const getPostsByCategory = (categoryId, pageNumber, pageSize) => {
  return myAxios(
    `/api/category/${categoryId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortDir=desc`
  ).then((response) => response.data);
};

export const getPostsTitleByCategory = () => {
  return myAxios(`/api/category/postsList`).then((response) => response.data);
};
export const getPostsByUserId = (userId, pageNumber, pageSize) => {
  return myAxios(
    `/api/user/${userId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortDir=desc`
  ).then((response) => response.data);
};

export const deletePostById = (postId) => {
  return privateAxios
    .delete(`/api/post/${postId}`)
    .then((response) => response.data);
};

export const updatePost = (postData) => {
  return privateAxios
    .put(`/api/post/${postData.id}`, postData)
    .then((response) => response.data);
};
