import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteJob } from "../../../../services/jobService/jobService";
function DeleteJob(props) {
  const { record, onReload } = props;
  const handleConfirm = async () => {
    console.log("ok");
    const result = await deleteJob(record.id);
    if (result) {
      onReload();
    }
  };

  return (
    <>
      <Popconfirm
        placement="topRight"
        title="Are you sure to delete?"
        onConfirm={handleConfirm}
      >
        <Button
          icon={<DeleteOutlined />}
          style={{ background: "#FF0000", color: "#fff" }}
        />
      </Popconfirm>
    </>
  );
}
export default DeleteJob;
