import { getCookie, setCookie } from "../helper/cookie";
// Khi chưa đăng nhập:
// Cookies Status không tồn tại → initialState là false.
// Khi đã đăng nhập:
// Sau khi thực hiện action CHECK__LOGIN, cookies Status được đặt là "true".
// Lần reload tiếp theo, initialState sẽ lấy giá trị từ cookies và khởi tạo đúng.
const initialState = getCookie("status") === "true";
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK__LOGIN":
      setCookie("status", action.status, 1);
      return action.status;
    default:
      return state;
  }
};
