import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteCV } from "../../../../services/cvService/cvService";
function DeleteCV(props) {
  const { record, onReload } = props;
  const [mess, contextHolder] = message.useMessage();
  const handleConfirm = async () => {
    const result = await deleteCV(record.id);
    if (result) {
      mess.open({
        type: "success",
        content: "Delete success!",
        duration: 3,
      });
      onReload();
    }
  };

  return (
    <>
      {contextHolder}
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
export default DeleteCV;
