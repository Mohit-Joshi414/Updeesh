import { myAxios } from "./helper";

export const signup = (user) => {
  return myAxios
    .post("/api/auth/register", user)
    .then((response) => response.data);
};

export const login = (user) => {
  return myAxios
    .post("/api/auth/login", user)
    .then((response) => response.data);
};

export const getUserById = (userId) => {
  return myAxios.get(`/api/users/${userId}`).then((response) => response.data);
};
