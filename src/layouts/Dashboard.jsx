import { Outlet } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="">
        <Sidebar></Sidebar>
      </div>
      <div className="md:ml-64 lg:ml-52 2xl:ml-2 p-6 md:p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
