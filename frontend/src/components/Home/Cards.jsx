import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import InputData from "./InputData";
import axios from "axios";

const Cards = ({ home, setOpenModal, data, setUpdateData }) => {
  // const data = [
  //   {
  //     title: "Projects",
  //     desc: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
  //     status: "Incomplete",
  //   },
  //   {
  //     title: "Projects",
  //     desc: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
  //     status: "Incomplete",
  //   },
  //   {
  //     title: "Projects",
  //     desc: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
  //     status: "Complete",
  //   },
  //   {
  //     title: "Projects",
  //     desc: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
  //     status: "Incomplete",
  //   },
  //   {
  //     title: "Projects",
  //     desc: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
  //     status: "Complete",
  //   },
  //   {
  //     title: "Projects",
  //     desc: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
  //     status: "Incomplete",
  //   },
  // ];

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handleCompleteTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImportant = async (id) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      // alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (id, title, desc) => {
    setOpenModal(true);
    setUpdateData({ id: id, title: title, desc: desc });
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v2/delete-task/${id}`,
        { headers }
      );
      // console.log(response, "HJHJHJ");
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((item, ind) => (
          <>
            <div className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
              <div className="">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-300 my-2">{item.desc}</p>
              </div>
              <div className="mt-4 w-full flex items-center justify-between">
                <button
                  className={`${
                    item.complete === false ? "bg-red-400" : "bg-green-400"
                  }  p-2 rounded`}
                  onClick={() => handleCompleteTask(item._id)}
                >
                  {item.complete === true ? "Complete" : "In-Complete"}
                </button>
                <div className="p-2 w-3/6 text-2xl flex justify-around">
                  <button onClick={() => handleImportant(item._id)}>
                    {item.important === false ? (
                      <CiHeart />
                    ) : (
                      <FaHeart className="text-red-500" />
                    )}
                  </button>
                  {home !== false && (
                    <button
                      onClick={() =>
                        handleUpdate(item._id, item.title, item.desc)
                      }
                    >
                      <FaEdit />
                    </button>
                  )}

                  <button onClick={() => handleDelete(item._id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      {home === true && (
        <div
          className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 cursor-pointer transition-all duration-300 "
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Tasks</h2>
        </div>
      )}
    </div>
  );
};

export default Cards;
