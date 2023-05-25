import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="px-8 py-4 flex flex-col min-h-screen">
      <Header></Header>
      <Outlet></Outlet>

    </div>
  );
}

export default Layout;