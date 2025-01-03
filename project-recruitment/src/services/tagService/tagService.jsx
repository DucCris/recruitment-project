import { get } from "../../Utils/request";

export const getTagService = async () => {
  const result = await get("tags");
  return result;
};
