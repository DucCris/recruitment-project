import { useEffect, useState } from "react";
import { getCookie } from "../../../helper/cookie";
import { Button, Col, Form, Input, message, Row, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getTagService } from "../../../services/tagService/tagService";
import { getListCity } from "../../../services/cityService/getListCity";
import { getTimeCurrent } from "../../../helper/getTime";
import { createJob } from "../../../services/jobService/jobService";
import GoBack from "../../../components/GoBack";

function CreateJob() {
  const idCompany = getCookie("id");
  const [form] = Form.useForm();
  const [tag, setTag] = useState([]);
  const [city, setCity] = useState([]);
  const [mess, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTagService();
      if (result) {
        setTag(result);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListCity();
      if (result) {
        setCity(result);
      }
    };
    fetchApi();
  }, []);

  const handleFinish = async (values) => {
    values.idCompany = parseInt(idCompany);
    values.createAt = getTimeCurrent();
    const result = await createJob(values);
    console.log(result);

    if (result) {
      form.resetFields();
      mess.open({
        type: "success",
        content: "Create success!",
        duration: 5,
      });
    } else {
      mess.open({
        type: "error",
        content: "Failed.Please try again!...",
        duration: 3,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <GoBack />
      <h3>Create new job</h3>
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Form.Item
              label="Job name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your job name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="Tags"
              name="tags"
              rules={[
                {
                  required: true,
                  message: "Please input tags!",
                },
              ]}
            >
              <Select options={tag} mode="multiple" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[
                {
                  required: true,
                  message: "Please input salary!",
                },
              ]}
            >
              <Input addonAfter="$" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input city!",
                },
              ]}
            >
              <Select options={city} mode="multiple" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Description" name="description">
              <TextArea rows={16} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Status" name="status">
              <Switch
                checkedChildren="On"
                unCheckedChildren="Off"
                defaultChecked
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default CreateJob;
