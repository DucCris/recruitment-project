import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../image/banner.webp";
import "./searchform.scss";
import { getListCity } from "../../services/cityService/getListCity";

function SearchForm() {
  const navigate = useNavigate();
  const [city, setCity] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListCity();
      if (result) {
        const objAll = {
          key: 0,
          value: "All",
        };
        setCity([objAll, ...result]);
      }
    };
    fetchApi();
  }, []);
  const handleFinish = async (values) => {
    let city = values.city || "";
    city = values.city === "All" ? "" : city;
    navigate(`search?city=${city}&keyword=${values.keyword || ""}`);
  };
  return (
    <>
      <header className="header">
        <h1 className="header__title ">
          <span>9999+ IT for Applicant over the world </span>
        </h1>
        <img src={banner} alt="banner" className="header__banner" />
      </header>
      <div className="container">
        <Form onFinish={handleFinish}>
          <Row gutter={12}>
            <Col xxl={6} xl={6} lg={6}>
              <Form.Item name="city">
                <Select options={city} placeholder="Select city" />
              </Form.Item>
            </Col>
            <Col xxl={15} xl={15} lg={15}>
              <Form.Item name="keyword">
                <Input placeholder="Enter your keyword" />
              </Form.Item>
            </Col>
            <Col xxl={3} xl={3} lg={3}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
export default SearchForm;
