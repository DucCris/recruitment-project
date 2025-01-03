import { Col, Row } from "antd";
import JobStatistic from "./JobStatistic";
import CVStatistic from "./CVStatistic";
import InfoCompany from "./infoCompany";

function DashBoard() {
  return (
    <>
      <h2>DASHBOARD</h2>
      <p>Welcome to your dashboard</p>
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <JobStatistic />
        </Col>
        <Col span={8}>
          <CVStatistic />
        </Col>
        <Col span={8}>
          <InfoCompany />
        </Col>
      </Row>
    </>
  );
}
export default DashBoard;
