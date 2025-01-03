import { useEffect, useState } from "react";
import { getListCV } from "../../../services/cvService/cvService";
import { getCookie } from "../../../helper/cookie";
import CVJobName from "./CVJobName";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DeleteCV from "./DeleteCV";
function CVList() {
  const idCompany = getCookie("id");
  const [data, setData] = useState([]);

  const fetchApi = async () => {
    const result = await getListCV(idCompany);
    if (result) {
      //   console.log(result);
      setData(result);
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
      dataIndex: "idJob",
      key: "idJob",
      render: (_, record) => <CVJobName record={record} />,
    },
    {
      title: "Candidate name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date send",
      key: "date",
      dataIndex: "createAt",
    },
    {
      title: "Status",
      key: "statusRead",
      dataIndex: "statusRead",
      render: (_, record) => (
        <>
          {record.statusRead ? (
            <Tag color="green">Sent</Tag>
          ) : (
            <Tag>Unread</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Link to={`/detail-cv/${record.id}`}>
              <Tooltip title="See detail?">
                <Button icon={<EyeOutlined />} />
              </Tooltip>
            </Link>
            <DeleteCV record={record} onReload={handleReload} />
          </Space>
        </>
      ),
    },
  ];
  return (
    <>
      <Table dataSource={data} columns={columns} rowKey="id" />;
    </>
  );
}
export default CVList;
