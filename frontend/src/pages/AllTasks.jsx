import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/Home/InputData";
import axios from "axios";

const AllTasks = (home) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState();
  const [updateData, setUpdateData] = useState({
    id: "",
    title: "",
    desc: "",
  });

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
      setData(response.data.data);
    };
    fetchData();
  });
  // {
  //   data && console.log(data.tasks);
  // }
  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 hover:scale-105  transition-all duration-300" />
          </button>
        </div>
        {data && (
          <Cards
            home={true}
            setOpenModal={setOpenModal}
            data={data.tasks}
            setUpdateData={setUpdateData}
          />
        )}
      </div>
      {openModal && (
        <InputData
          openModal={openModal}
          setOpenModal={setOpenModal}
          updateData={updateData}
          setUpdateData={setUpdateData}
        />
      )}
    </>
  );
};

export default AllTasks;
