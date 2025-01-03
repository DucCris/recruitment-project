import { useEffect, useState } from "react";
import { getCookie } from "../../../helper/cookie";
import {
  editCompany,
  getCompanyDetail,
} from "../../../services/companyService/companyService";
import { Button, Card, Col, Form, Input, message, Row } from "antd";
import TextArea from "antd/es/input/TextArea";

function InfoCompany() {
  const idCompany = getCookie("id");
  const [mess, contextHolder] = message.useMessage();
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);

  const fetchApi = async () => {
    const response = await getCompanyDetail(idCompany);
    if (response) {
      setData(response);
    }
  };
  const handleFinish = async (values) => {
    const result = await editCompany(idCompany, values);
    if (result) {
      console.log(result);
      mess.success("Update successful! ");
      fetchApi(); //Cập nhật lại dữ liệu mới
      setIsEdit(false);
    }
  };

  const handleEdit = async () => {
    setIsEdit(true);
  };
  const handleCancel = async () => {
    setIsEdit(false);
    form.resetFields();
  };
  useEffect(() => {
    fetchApi();
  }, []);
  //   console.log(data);
  return (
    <>
      {contextHolder}
      {data && (
        <>
          <Card
            title="INFORMATION COMPANY"
            extra={
              !isEdit ? (
                <Button type="primary" onClick={handleEdit}>
                  Edit
                </Button>
              ) : (
                <Button onClick={handleCancel}>Cancel</Button>
              )
            }
          >
            <Form
              layout="vertical"
              form={form}
              initialValues={data}
              onFinish={handleFinish}
              disabled={!isEdit}
            >
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Form.Item
                    label="Company name"
                    name="companyName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
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
                </Col>
                <Col span={8}>
                  <Form.Item label="Phone" name="phoneNumber">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Address" name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Number of employees" name="quantityPeople">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Working time" name="workingTime">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Link website" name="website">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Short description" name="description">
                    <TextArea rows={6} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Detail description" name="detail">
                    <TextArea rows={12} />
                  </Form.Item>
                </Col>
                {isEdit && (
                  <>
                    {" "}
                    <Col span={24}>
                      <Form.Item>
                        <Button htmlType="submit" type="primary">
                          Update
                        </Button>
                        <Button onClick={handleCancel} className="mx-3">
                          Cancel
                        </Button>
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>
            </Form>
          </Card>
        </>
      )}
    </>
  );
}
export default InfoCompany;
