import { useEffect, useState } from "react";
import { getCookie } from "../../../helper/cookie";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { getListJob } from "../../../services/jobService/jobService";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";
function JobList() {
  const idCompany = getCookie("id");
  const [job, setJob] = useState([]);
  const fetchApi = async () => {
    const result = await getListJob(idCompany);
    if (result) {
      setJob(result.reverse());
    }
  };

  const handleReload = () => {
    fetchApi();
  };
  useEffect(() => {
    fetchApi();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, record) => (
        <>
          {(record.tags || []).map((item, index) => (
            <Tag key={index} color="blue" className="mt-1">
              {item}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Salary($)",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Time",
      key: "time",
      render: (_, record) => (
        <>
          <small>Create at:{record.createAt}</small>
          <br />
          <small>Update at:{record.updateAt}</small>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {record.status ? (
            <Tag color="green">Online</Tag>
          ) : (
            <Tag color="red">Offline</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/detail-job/${record.id}`}>
            <Tooltip title="See detail?">
              <Button icon={<EyeOutlined />} />
            </Tooltip>
          </Link>
          {/* record là duy nhất cho mỗi dòng: Ant Design tự động cung cấp đúng record 
          cho mỗi dòng khi bạn thiết lập rowKey hoặc khi sử dụng bảng mặc định.
            Tính năng render của Ant Design: Mỗi khi bạn tương tác với dòng trong bảng, hàm render 
            sẽ được gọi lại, giúp đảm bảo bạn đang làm việc với đúng record. */}

          <EditJob record={record} onReload={handleReload} />
          <DeleteJob record={record} onReload={handleReload} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="mt-3">
        <Table dataSource={job} columns={columns} rowKey="id" />
      </div>
    </>
  );
}
export default JobList;
