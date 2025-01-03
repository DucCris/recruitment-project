import { get } from "../../Utils/request";

// export const login = async (email) => {
//   const result = await get(`company?email=${email}`);
//   return result;
// };
export const login = async (email, password) => {
  const result = await get(`company?email=${email}&password=${password}`);
  return result;
};
// export const register = async (options) => {
//   const result = await post(`company`, options);
//   return result;
// };

export const checkExist = async (key, value) => {
  const result = await get(`company?${key}=${value}`);
  return result;
};
