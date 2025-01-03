import { get } from "../../Utils/request";

export const getListCity = async () => {
  const result = await get("city");
  return result;
};
