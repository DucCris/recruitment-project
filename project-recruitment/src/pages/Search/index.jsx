import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllJob } from "../../services/jobService/jobService";
import { Tag } from "antd";
import SearchList from "../../components/SearchList";

function Search() {
  const [searchParam] = useSearchParams();
  const [data, setData] = useState();
  const citySearch = searchParam.get("city") || ""; // dấu || "" để gán rỗng tránh undefined gây lỗi
  const keywordSearch = searchParam.get("keyword") || "";

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllJob();
      if (result) {
        const newData = result.filter((item) => {
          const city = citySearch ? item.city?.includes(citySearch) : true; //"" là một giá trị falsy trong JavaScript.
          // Vì vậy, nhánh bên phải của dấu : sẽ được thực thi, tức là true.
          const keyword = keywordSearch
            ? item.tags?.includes(keywordSearch)
            : true;
          const status = item.status;
          return city && keyword && status;
          // 3 ,TH:
          // 1, lọc ra gia trị trả ra true
          // 2,Do "" nên trả thẳng ra true ko lọc , mặc định đúng tất cả các item thoả mãn hết
          // 3,Duyệt từng item nếu ko item.city ko chứa citySearch thì trả thẳng false và loại luôn object đó
          // nếu không item.city nào chứa giá trị đó thì trả ra [];
        });

        setData(newData.reverse());
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <h3 className="text-primary px-4 mt-4 ">
        Result search:
        {citySearch && <Tag className="m-2">{citySearch}</Tag>}
        {keywordSearch && <Tag className="m-2">{keywordSearch}</Tag>}
      </h3>

      {data && <SearchList data={data} />}
    </>
  );
}
export default Search;
