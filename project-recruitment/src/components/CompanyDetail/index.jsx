import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyDetail } from "../../services/companyService/companyService";
import { Col, Row, Tag } from "antd";
import { getListJob } from "../../services/jobService/jobService";
import GoBack from "../GoBack";
import { UnorderedListOutlined } from "@ant-design/icons";
import JobItem from "../JobItem";

function CompanyDetail() {
  const param = useParams();
  const [infoCompany, setInfoCompany] = useState([]);
  const [job, setJob] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCompanyDetail(param.id);
      setInfoCompany(result);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListJob(param.id);
      setJob(result);
    };
    fetchApi();
  }, []);

  return (
    <>
      {infoCompany && (
        <div className="mx-auto p-4" style={{ width: "1200px" }}>
          <GoBack />
          <h1 className="mb-4">{infoCompany.companyName}</h1>
          <div className="mb-2">
            Address :<strong> {infoCompany.address}</strong>
          </div>
          <div className="mb-2">
            Number of employees : <strong>{infoCompany.quantityPeople}</strong>
          </div>
          <div className="mb-2">
            Working time: <strong>{infoCompany.workingTime}</strong>
          </div>
          <div className="mb-2">
            Website: <strong>{infoCompany.website}</strong>
          </div>
          <Row gutter={[20, 20]}>
            <Col xxl={18} xl={16} lg={12} md={12} sm={8} xs={8}>
              <div className="mb-2">
                <Tag className="mb-2 fs-6" color="blue">
                  Short description
                </Tag>{" "}
                :
                <div className="fw-semibold fs-6">
                  {infoCompany.description}
                </div>
              </div>
              <div className="mb-2">
                <Tag className="mb-2 fs-6" color="orange">
                  Detail description{" "}
                </Tag>
                :<div className="fw-semibold fs-6">{infoCompany.detail}</div>
              </div>
            </Col>
          </Row>

          <div className="fs-5 fw-semibold mt-5 mb-2">
            <span>
              <UnorderedListOutlined />
            </span>{" "}
            List Job:
          </div>
          {job.length > 0 && (
            <Row gutter={[20, 20]}>
              {job.map((item) => (
                <Col span={6} key={item.id}>
                  <JobItem item={item} infoCompany={infoCompany} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </>
  );
}
export default CompanyDetail;
