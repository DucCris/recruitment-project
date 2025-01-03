import { useNavigate } from "react-router-dom";
import { checkExist } from "../../services/userService/userService";
import "./style.css";
import { Button, Form, Input, notification } from "antd";
import { generateToken } from "../../helper/generateToken";
import { createCompany } from "../../services/companyService/companyService";
function Register() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const handleFinish = async (values) => {
    // console.log(values.phoneNumber);
    // Hash mật khẩu trước khi gửi lên server
    // const salt = bcrypt.genSaltSync(10); //Tạo salt

    // const hashedPassword = bcrypt.hashSync(values.password, salt); // Hash mật khẩu

    values.token = generateToken();
    // values.password = hashedPassword;
    const checkExistEmail = await checkExist("email", values.email);
    const checkExistPhone = await checkExist("phone", values.phoneNumber);

    if (checkExistEmail.length > 0) {
      api["error"]({
        message: "Email already exists!",
      });
    } else if (checkExistPhone.length > 0) {
      api["error"]({
        message: "Phone number already exists!",
      });
    } else {
      const result = await createCompany(values);
      if (result) {
        console.log(result);
        navigate("/login");
      }
    }
  };
  return (
    <>
      {contextHolder}{" "}
      <div
        className="wrapper mx-auto p-4"
        style={{ width: "460px", marginTop: "100px" }}
      >
        <h2>Register</h2>
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
            label="Company name"
            name="companyName"
            rules={[
              {
                required: true,
                message: "Please input your Company name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Phone number" name="phoneNumber">
            <Input />
          </Form.Item>
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Register;
