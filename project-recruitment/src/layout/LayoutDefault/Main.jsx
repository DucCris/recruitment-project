import { Outlet } from "react-router-dom";
function Main() {
  return (
    <>
      <main className="layoutDefault__main">
        <Outlet />
      </main>
    </>
  );
}
export default Main;
