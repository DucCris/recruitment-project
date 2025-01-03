import { useEffect, useState } from "react";
import { getCookie } from "../../../helper/cookie";
import { getCompanyDetail } from "../../../services/companyService/companyService";
import { Card } from "antd";

function InfoCompany() {
  const idCompany = getCookie("id");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCompanyDetail(idCompany);
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
          <Card title="Information Company">
            <p>
              Company name: <strong>{data.companyName}</strong>
            </p>
            <p>
              Email: <strong>{data.email}</strong>
            </p>
            <p>
              Phone: <strong>{data.phoneNumber}</strong>
            </p>
            <p>
              Number of employee: <strong>{data.quantityPeople}</strong>
            </p>
          </Card>
        </>
      )}
    </>
  );
}
export default InfoCompany;
