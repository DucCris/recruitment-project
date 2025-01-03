import { Card, Tag } from "antd";
import { Link } from "react-router-dom";
function JobItem(props) {
  const { item, infoCompany } = props;
  console.log(item);
  return (
    <>
      {" "}
      <Card
        title={
          <Link to={`/job/${item.id}`} className="text-decoration-none">
            {item.name}
          </Link>
        }
        style={{ height: "340px" }}
      >
        <p>
          Languages :{" "}
          {item.tags.map((tag, index) => (
            <Tag className="mb-1" color="processing" key={index}>
              {tag}
            </Tag>
          ))}
        </p>
        <p>
          Citys:{" "}
          {item.city.map((itemCity, index) => (
            <Tag className="mb-1" color="gold" key={index}>
              {itemCity}
            </Tag>
          ))}
        </p>
        <p>
          Salary: <strong>{item.salary}$</strong>
        </p>
        <p>
          Company: <strong>{infoCompany?.companyName}</strong>
        </p>
        <p>
          Create At: <strong>{item.createAt}</strong>
        </p>
      </Card>
    </>
  );
}
export default JobItem;
