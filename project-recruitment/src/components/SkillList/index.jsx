import { useEffect, useState } from "react";
import { getTagService } from "../../services/tagService/tagService";
import { Col, Row, Tag } from "antd";
import { Link } from "react-router-dom";

function SkillList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTagService();
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
          <Row
            className="mx-auto p-3"
            style={{
              width: "1200px",
              marginBottom: "20px",
            }}
          >
            <Col xxl={24} xl={24} lg={16} md={16} sm={12} xs={10}>
              {data.map((item) => (
                <Link to={`/search?keyword=${item.value || ""}`} key={item.key}>
                  <Tag className="mb-2" color="blue">
                    {item.value}
                  </Tag>
                </Link>
              ))}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
export default SkillList;
