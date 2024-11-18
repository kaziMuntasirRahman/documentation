import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <>
      <div className="px-12 xl:px-[150px]">
        <NavBar />
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Root;