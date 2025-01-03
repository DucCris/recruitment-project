import Footer from "./Footer";
import Header from "./Header";
import "./LayoutDefault.scss";
import Main from "./Main";
import { useSelector } from "react-redux";
function LayoutDefault() {
  const isLogin = useSelector((state) => state.loginReducer);
  console.log(isLogin);
  return (
    <>
      <div className="layoutDefault">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}
export default LayoutDefault;
