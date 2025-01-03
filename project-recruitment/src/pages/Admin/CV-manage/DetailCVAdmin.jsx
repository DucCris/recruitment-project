import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  changeStatusCV,
  getDetailCV,
} from "../../../services/cvService/cvService";
import { getJobDetail } from "../../../services/jobService/jobService";
import { Card, Col, Row, Tag } from "antd";
import GoBack from "../../../components/GoBack";

function DetailCVAmin() {
  const params = useParams();
  const [cv, setCV] = useState();
  const [job, setJob] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getDetailCV(params.id);
      if (result) {
        const resultJob = await getJobDetail(result.idJob);
        if (resultJob) {
          setCV(result);
          setJob(resultJob);
        }
      }
      //       getDetailCV và getJobDetail là các hàm bất đồng bộ (async), trả về một promise, vì vậy bạn phải sử dụng await để đợi chúng trả về kết quả trước khi tiếp tục thực hiện các bước tiếp theo.

      // changeStatusCV có thể chỉ là một hành động để:

      // Cập nhật trạng thái của CV trong backend hoặc thực hiện một thay đổi nào đó, nhưng không cần phải đợi kết quả từ nó.
      // Nếu changeStatusCV chỉ đơn giản là gửi một yêu cầu API mà không cần kết quả trả về ngay lập tức, bạn có thể gọi nó mà không cần dùng await.
      changeStatusCV(params.id, { statusRead: true });
    };
    fetchApi();
  }, []);
  console.log(cv);
  console.log(job);
  return (
    <>
      <GoBack />
      <Row gutter={[20, 20]}>
        {cv && (
          <>
            <Col span={24}>
              {" "}
              <Card title={cv.name} bordered={false}>
                <p>
                  Date send: <strong>{cv.createAt}</strong>
                </p>
                <p>
                  Phone: <strong>{cv.phoneNum}</strong>
                </p>
                <p>
                  Email: <strong>{cv.email}</strong>
                </p>
                <p>
                  City apply: <Tag color="volcano">{cv.city}</Tag>
                </p>
                <div className="fs-6">
                  <Tag color="#f50" className="fs-6">
                    Introduce myself
                  </Tag>
                  :<div>{cv.introduce}</div>
                </div>
                <p>
                  Link project: <strong>{cv.project}</strong>
                </p>
              </Card>
            </Col>
          </>
        )}
        {job && (
          <>
            <Col span={24}>
              {" "}
              <Card title={job.name} bordered={false}>
                <p>
                  Tags:{" "}
                  {(job.tags || []).map((item, index) => (
                    <Tag color="blue" key={index}>
                      {item}
                    </Tag>
                  ))}
                </p>
                <p>
                  Salary: <strong>{job.salary}$</strong>
                </p>
                <div className="fs-6">
                  <Tag color="#f50" className="fs-6">
                    Description
                  </Tag>
                  : <div>{job.description}</div>
                </div>
                <p>
                  Create at: <strong>{job.createAt}</strong>
                </p>
                <p>
                  Status:{" "}
                  <strong>
                    {job.status ? (
                      <Tag color="green">Online</Tag>
                    ) : (
                      <Tag color="red">Offline</Tag>
                    )}
                  </strong>
                </p>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </>
  );
}
export default DetailCVAmin;
