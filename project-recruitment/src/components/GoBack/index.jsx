import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";
function GoBack() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <>
      <Button
        className="mb-4"
        icon={<RollbackOutlined />}
        onClick={handleClick}
      >
        Back
      </Button>
    </>
  );
}

export default GoBack;
