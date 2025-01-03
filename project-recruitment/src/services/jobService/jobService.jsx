import { del, get, patch, post } from "../../Utils/request";

export const getAllJob = async () => {
  const result = await get("job");
  return result;
};
export const getJobDetail = async (id) => {
  const result = await get(`job/${id}`);
  return result;
};
export const createJob = async (options) => {
  const result = await post(`job`, options);
  return result;
};

export const getListJob = async (id) => {
  const result = await get(`job?idCompany=${id}`);
  return result;
};
export const updateJob = async (id, options) => {
  const result = await patch(`job/${id}`, options);
  return result;
};
export const deleteJob = async (id) => {
  const result = await del(`job/${id}`);
  return result;
};
