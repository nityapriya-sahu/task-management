import React, { useState } from "react";
import Cards from "../components/Home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/Home/InputData";

const AllTasks = (home) => {
  const [openModal, setOpenModal] = useState(false);

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
        <Cards home={true} setOpenModal={setOpenModal} />
      </div>
      {openModal && (
        <InputData openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
};

export default AllTasks;
