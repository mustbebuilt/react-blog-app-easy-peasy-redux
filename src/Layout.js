import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import DataContext from "./context/DataContext";
import { useContext } from 'react';

const Layout = () => {
  const {search, setSearch} = useContext(DataContext);
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <Header />
      <Nav search={search} setSearch={setSearch} />

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
