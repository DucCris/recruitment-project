import { useEffect, useState } from "react";
import { getCookie } from "../../../helper/cookie";
import { getListCV } from "../../../services/cvService/cvService";
import { Badge, Card } from "antd";

function CVStatistic() {
  const idCompany = getCookie("id");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListCV(idCompany);
      if (result) {
        let obj = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0,
        };
        obj.total = result.length;
        result.forEach((item) => {
          item.statusRead ? obj.statusTrue++ : obj.statusFalse++;
        });
        setData(obj);
      }
    };
    fetchApi();
  }, []);
  console.log(data);
  return (
    <>
      {data && (
        <Card title="CV">
          <p>
            Number of CV: <strong>{data.total}</strong>
          </p>
          <p>
            <Badge status="success" /> CV was read:{" "}
            <strong>{data.statusTrue}</strong>
          </p>
          <p>
            <Badge status="error" /> CV unread:{" "}
            <strong>{data.statusFalse}</strong>
          </p>
        </Card>
      )}
    </>
  );
}
export default CVStatistic;
