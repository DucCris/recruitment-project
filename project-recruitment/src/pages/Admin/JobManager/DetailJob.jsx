import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobDetail } from "../../../services/jobService/jobService";
import GoBack from "../../../components/GoBack";
import { Col, Row, Tag } from "antd";

function DetailJobAdmin() {
  const params = useParams();
  const [data, setData] = useState();

  const fetchApi = async () => {
    const result = await getJobDetail(params.id);
    if (result) {
      setData(result);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  console.log(data);
  return (
    <>
      <GoBack />
      {data && (
        <>
          <h3>{data.name}</h3>
          <Row gutter={[20, 20]}>
            <Col span={24} className="mt-2">
              <span>Status: </span>
              {data.status ? (
                <Tag color="green">Online</Tag>
              ) : (
                <Tag color="red">Offline</Tag>
              )}
            </Col>
            <Col span={24}>
              <span>Tags: </span>
              {data.tags.map((item, index) => (
                <Tag color="blue" key={index}>
                  {item}
                </Tag>
              ))}
            </Col>
            <Col span={24}>
              Salary: <strong>{data.salary}$</strong>
            </Col>
            <Col span={24}>
              Create At: <strong>{data.createAt}</strong>
            </Col>
            <Col span={24}>
              Update At: <strong>{data.updateAt}</strong>
            </Col>
            <Col span={24}>
              <span>City: </span>
              {data.city.map((item, index) => (
                <Tag color="volcano" key={index}>
                  {item}
                </Tag>
              ))}
            </Col>
            <Col span={24}>
              <Tag color="#87d068" className="fs-5">
                Description
              </Tag>
              <div className="fs-6 fw-semibold">{data.description}</div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
export default DetailJobAdmin;
