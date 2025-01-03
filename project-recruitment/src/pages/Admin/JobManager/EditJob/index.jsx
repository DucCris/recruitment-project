import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Switch,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { getListCity } from "../../../../services/cityService/getListCity";
import { getTagService } from "../../../../services/tagService/tagService";
import { getTimeCurrent } from "../../../../helper/getTime";
import { updateJob } from "../../../../services/jobService/jobService";
function EditJob(props) {
  const { record, onReload } = props;
  const [form] = Form.useForm();
  const [city, setCity] = useState([]);
  const [tag, setTag] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mess, contextHolder] = message.useMessage();

  const rules = [
    {
      required: true,
      message: "Not empty!",
    },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListCity();
      if (result) {
        setCity(result);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTagService();
      if (result) {
        setTag(result);
      }
    };
    fetchApi();
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const handleFinish = async (values) => {
    values.updateAt = getTimeCurrent();
    const response = await updateJob(record.id, values);
    if (response) {
      console.log(response);
      setIsModalOpen(false);
      onReload();
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
      <Tooltip title="Edit job">
        <Button
          style={{ background: "#FFD700" }}
          onClick={showModal}
          icon={<EditOutlined />}
        />
      </Tooltip>
      <Modal
        title="Edit"
        open={isModalOpen}
        width={1000}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          initialValues={record}
        >
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item label="Job name" name="name" rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Tags" name="tags" rules={rules}>
                <Select options={tag} mode="multiple" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Salary" name="salary" rules={rules}>
                <Input addonAfter="$" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="City" name="city" rules={rules}>
                <Select options={city} mode="multiple" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Description" name="description">
                <TextArea rows={14} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Status" name="status">
                {record.status ? (
                  <Switch checkedChildren="On" defaultChecked />
                ) : (
                  <Switch unCheckedChildren="Off" />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
export default EditJob;
