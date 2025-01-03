import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getCompanyService } from "../../services/companyService/companyService";
import JobItem from "../JobItem";
function SearchList(props) {
  const { data = [] } = props;
  const [dataCompany, setDataCompany] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCompanyService();
      if (result) {
        const newData = data.map((item) => {
          const infoCompany = result.find(
            (itemCompany) => itemCompany.id === item.idCompany
          );
          return {
            infoCompany,
            ...item,
          };
        });
        setDataCompany(newData);
      }
    };
    fetchApi();
  }, []);
  //   console.log(data);
  console.log(dataCompany);

  //   ở đây ý là muốn lấy ra cái dữ liệU data cuối cùng là (dataCompany)
  // nên đã ghép dữ liệU cũ là (data) vs (infoCompany) để lúc vẽ dữ liệU ra màn hình
  // thì chỉ cần dùng item để trỏ vào

  //   "?." là option chaining để  Nếu dữ liệu của bạn có thể không đầy đủ hoặc cần xử lý an toàn khi có giá trị null hoặc undefined

  return (
    <>
      {dataCompany.length > 0 ? (
        <div style={{ margin: "30px" }}>
          <Row gutter={["20", "20"]}>
            {dataCompany.map((item) => (
              <Col xxl={4} xl={4} lg={8} md={12} ms={24} xs={24} key={item.id}>
                <JobItem item={item} />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="p-4">Empty Job</div>
      )}
    </>
  );
}
export default SearchList;
