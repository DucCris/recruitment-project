import { Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import JobList from "./JobList";
function JobManager() {
  return (
    <>
      <h2>Job list</h2>
      <Link to="/create-job">
        <Button icon={<PlusOutlined />}>Create a new job</Button>
      </Link>
      <div className="mt-4">
        <JobList />
      </div>
    </>
  );
}
export default JobManager;
