import CompanyList from "../../components/CompanyList";
import SearchForm from "../../components/SearchForm";
import SkillList from "../../components/SkillList";

function Home() {
  // const cookies = document.cookie;
  // console.log("Cookie hien tai : ", cookies);
  return (
    <>
      <SearchForm />
      <SkillList />
      <CompanyList />
    </>
  );
}

export default Home;
