import React from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-[98vh] gap-4">
      {/* Sidebar */}
      <div className="w-full md:w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between">
        <Sidebar />
      </div>

      {/* Outlet: This section will scroll when content overflows */}
      <div className="w-full md:w-5/6 border border-gray-500 rounded-xl  overflow-y-auto h-[98vh]">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
