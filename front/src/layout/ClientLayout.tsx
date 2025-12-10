import { Outlet } from "react-router-dom";
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";
import ScrollToTop from "../components/ScrollToTop";

const ClientLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
