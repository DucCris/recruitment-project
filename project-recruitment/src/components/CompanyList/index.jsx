import { useEffect, useState } from "react";
import { getCompanyService } from "../../services/companyService/companyService";
import { Button, Card, Col, Row, Tag } from "antd";
import { Link } from "react-router-dom";

function CompanyList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCompanyService();
      if (result) {
        setData(result);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      {data && (
        <>
          <Row gutter={[20, 20]} className="m-4">
            {data.map((item) => (
              <Col xxl={6} xl={6} lg={10} md={10} sm={12} xs={24} key={item.id}>
                <Link to={`/company/${item.id}`}>
                  <Card title={item.companyName}>
                    <p>
                      Address: <strong>{item.address}</strong>
                    </p>
                    <p>
                      Number of employees:{" "}
                      <strong>{item.quantityPeople}</strong>
                    </p>
                    <p>
                      <Tag color="red">Hotline</Tag>{" "}
                      <strong>{item.phoneNumber}</strong>
                    </p>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <Link to="/company">
            <Button className="mx-4">More</Button>
          </Link>
        </>
      )}
    </>
  );
}

export default CompanyList;
