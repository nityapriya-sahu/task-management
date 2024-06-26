import React from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const data = [
    { title: "All Tasks", icons: <CgNotes />, link: "/" },
    {
      title: "Important Tasks",
      icons: <MdLabelImportant />,
      link: "/importanttasks",
    },
    {
      title: "Complete Tasks",
      icons: <FaCheckDouble />,
      link: "/completetasks",
    },
    {
      title: "Incomplete Tasks",
      icons: <TbNotebookOff />,
      link: "/incompletetasks",
    },
  ];
  return (
    <>
      <div className="gap-2">
        <h2 className="font-bold">TASK MANAGEMENT</h2>
        <h4 className="text-gray-400">sahunityapriya@gmail.com</h4>
        <hr />
      </div>
      <div>
        {data.map((item, ind) => {
          return (
            <>
              <Link
                to={item.link}
                key={ind}
                className="flex flex-row gap-2 items-center hover:bg-gray-600 p-2 rounded transition-all duration-300 font-medium "
              >
                {item.icons}
                {item.title}
              </Link>
            </>
          );
        })}
      </div>
      <div className="">
        <button className="bg-gray-400 p-2 w-full rounded-lg">Log out</button>
      </div>
    </>
  );
};

export default Sidebar;
