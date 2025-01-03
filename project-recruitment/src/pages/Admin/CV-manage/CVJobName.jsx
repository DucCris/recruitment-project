import { useEffect, useState } from "react";
import { getCookie } from "../../../helper/cookie";
import { getListJob } from "../../../services/jobService/jobService";

function CVJobName(props) {
  const { record } = props;

  const idCompany = getCookie("id");
  const [jobName, setJobName] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListJob(idCompany);
      if (result) {
        const infoJob = result.find((itemJob) => itemJob.id === record.idJob);
        // console.log(result);
        setJobName(infoJob);
      }
    };
    fetchApi();
  }, []);
  //   useEffect(() => {
  //     // console.log(jobName);
  //     // console.log(record);
  //   }, []);
  return <>{jobName && <>{jobName.name}</>}</>;
}
export default CVJobName;
