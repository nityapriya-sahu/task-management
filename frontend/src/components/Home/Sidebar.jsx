import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
const iconData = [
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

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [data, setData] = useState();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/login");
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-all-tasks",
        { headers }
      );
      // console.log(response.data.data, "RRRRRRR");
      setData(response.data.data);
    };
    fetchData();
  }, []);
  return (
    <>
      {data && (
        <div className="gap-2 text-center md:text-left">
          <h2 className="font-bold">TASK MANAGEMENT</h2>
          <h4 className="text-gray-400">{data.email}</h4>
          <hr />
        </div>
      )}
      <div className="mt-4">
        {iconData.map((item, ind) => {
          return (
            <Link
              to={item.link}
              key={ind}
              className="flex flex-row gap-2 items-center hover:bg-gray-600 p-2 rounded transition-all duration-300 font-medium "
            >
              {item.icons}
              {item.title}
            </Link>
          );
        })}
      </div>
      <div className="mt-6">
        <button className="bg-gray-400 p-2 w-full rounded-lg" onClick={logout}>
          Log out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
