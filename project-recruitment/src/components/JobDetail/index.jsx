import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobDetail } from "../../services/jobService/jobService";
import { getCompanyDetail } from "../../services/companyService/companyService";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
  Tag,
} from "antd";
import GoBack from "../GoBack";
import TextArea from "antd/es/input/TextArea";
import { getTimeCurrent } from "../../helper/getTime";
import { createCV } from "../../services/cvService/cvService";

const { Option } = Select;
function JobDetail() {
  const param = useParams();
  const [jobDetail, setJobDetail] = useState();
  const [noti, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const rules = [
    {
      required: true,
      message: "Not empty!",
    },
  ];
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getJobDetail(param.id);
      const infoCompany = await getCompanyDetail(result.idCompany);
      const dataFinal = {
        ...result,
        infoCompany,
      };
      setJobDetail(dataFinal);
    };
    fetchApi();
  }, []);
  console.log(jobDetail);
  //   console.log(param);

  const handleFinish = async (values) => {
    // values. kia là để thêm object, để sau truy vấn cho dễ là biết CV này là của job và company nào
    values.idJob = jobDetail.id;
    values.idCompany = jobDetail.infoCompany.id;
    values.createAt = getTimeCurrent();
    const result = await createCV(values);

    if (result) {
      form.resetFields();
      noti.success({
        message: "Successfully",
        description: "The employer will contact you as soon as possible.",
      });
    } else {
      noti.error({
        message: "Request send failed!",
        description:
          "The system is having an error.Try again in a few minutes.",
      });
    }

    // console.log(values);
  };
  return (
    <>
      {contextHolder}
      <div
        className="mx-auto p-4"
        style={{ width: "1400px", marginTop: "50px", marginBottom: "100px" }}
      >
        <GoBack />
        {jobDetail && (
          <>
            <h1 className="mb-4">{jobDetail.name}</h1>
            <Button
              href="#formApply"
              type="primary"
              size="large"
              className="text-decoration-none mb-3"
            >
              ỨNG TUYỂN NGAY
            </Button>

            <div className="mb-3">
              Language:{" "}
              {(jobDetail || []).tags.map((tag, index) => (
                <Tag key={index} color="blue">
                  {tag}
                </Tag>
              ))}
            </div>
            <div className="mb-3">
              City:{" "}
              {(jobDetail || []).city.map((item, index) => (
                <Tag key={index} color="gold">
                  {item}
                </Tag>
              ))}
            </div>
            <div className="mb-2">
              Salary: <strong>{jobDetail.salary}$</strong>
            </div>
            <div className="mb-2">
              Address: <strong>{jobDetail.infoCompany.address}</strong>
            </div>
            <div className="mb-2">
              Post time: <strong>{jobDetail.createAt}</strong>
            </div>
            <Row>
              <Col xxl={20} xl={20} lg={12} md={12} sm={8} xs={8}>
                {" "}
                <div className="mb-2">
                  <Tag color="#f50" className="fs-6">
                    Job description
                  </Tag>
                  :{" "}
                  <div className="fs-6 fw-semibold">
                    {jobDetail.description}
                  </div>
                </div>
              </Col>
            </Row>

            {/* ------Form ứng tuyển------- */}
            <Card title="Ứng tuyển ngay" id="formApply" className="mt-5">
              <Form
                form={form}
                name="form_apply"
                layout="vertical"
                onFinish={handleFinish}
              >
                <Row gutter={20}>
                  <Col span={6}>
                    <Form.Item label="Fullname" name="name" rules={rules}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Phone number" name="phone" rules={rules}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Email" name="email" rules={rules}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="City" name="city" rules={rules}>
                      <Select>
                        {jobDetail.city.map((item, index) => (
                          <Option
                            value={item}
                            label={item}
                            key={index}
                          ></Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Introduce yourself"
                      name="introduce"
                      rules={rules}
                    >
                      <TextArea rows={10} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Link project list"
                      name="project"
                      rules={rules}
                    >
                      <TextArea rows={10} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Send
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
export default JobDetail;
