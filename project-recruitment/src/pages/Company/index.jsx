import { useEffect, useState } from "react";
import { getCompanyService } from "../../services/companyService/companyService";
import { Card, Col, Row, Tag } from "antd";
import { Link } from "react-router-dom";

function Company() {
  // Check cookies hiện tại
  // const cookies = document.cookie;
  // console.log("Cookie hien tai : ", cookies);

  // Xoá cookies theo path
  document.cookie =
    "status=false; path=/company; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

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

  console.log(data);
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
                      Website: <strong>{item.website}</strong>
                    </p>
                    <p>
                      <Tag color="error">Hotline</Tag>{" "}
                      <strong>{item.phone}</strong>
                    </p>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

export default Company;
