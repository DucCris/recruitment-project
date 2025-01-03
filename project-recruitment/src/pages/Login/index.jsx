import { Button, Form, Input, notification } from "antd";
import "./style.css";
import { login } from "../../services/userService/userService";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helper/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../action/actionReducer";

function Login() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const handleFinish = async (values) => {
    console.log(values.password);
    const email = values.email;
    const password = values.password;
    const result = await login(email, password);

    // Kiểm tra mật  khẩu gốc và mật khẩu đã hash
    // bcrypt sử dụng lại salt và số vòng băm từ result[0].password để băm lại mật khẩu người dùng nhập vào.
    // Sau đó, nó so sánh kết quả băm mới với result[0].password.
    // Nếu khớp, trả về true; nếu không, trả về false.

    // console.log(passwordMatch);
    // console.log(result);
    if (result.length > 0) {
      setCookie("id", result[0].id, 1);
      setCookie("email", result[0].email, 1);
      setCookie("companyName", result[0].companyName, 1);
      setCookie("token", result[0].token, 1);
      dispatch(checkLogin(true));
      api["success"]({
        message: "Login success!",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      api["error"]({
        message: "Login failed!",
        description: "Account doesn't exist!",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div
        className="wrapper mx-auto p-4"
        style={{ width: "460px", marginTop: "100px" }}
      >
        <h2>Login</h2>
        <Form
          onFinish={handleFinish}
          className="p-5"
          style={{ marginLeft: "50px" }}
          layout="vertical"
          labelCol={{
            span: 20,
          }}
          wrapperCol={{
            span: 20,
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Login;
