import { getCookie } from "../../../helper/cookie";
import { useEffect, useState } from "react";
import { getListJob } from "../../../services/jobService/jobService";
import { Badge, Card } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
function JobStatistic() {
  const idCompany = getCookie("id");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListJob(idCompany);
      if (result) {
        let obj = {
          total: 0,
          StatusTrue: 0,
          StatusFalse: 0,
        };
        obj.total = result.length;
        result.forEach((item) => {
          item.status ? obj.StatusTrue++ : obj.StatusFalse++;
        });
        setData(obj);
      }
    };
    fetchApi();
  }, []);
  //   console.log(data);
  return (
    <>
      {data && (
        <>
          <Card title="Job">
            <p>
              Number of jobs: <strong>{data.total}</strong>{" "}
            </p>
            <p>
              <Badge status="success" /> Jobs on:{" "}
              <strong>{data.StatusTrue}</strong>
            </p>
            <p>
              <Badge status="error" /> Jobs off:
              <strong>{data.StatusFalse}</strong>
            </p>
          </Card>
        </>
      )}
    </>
  );
}
export default JobStatistic;
