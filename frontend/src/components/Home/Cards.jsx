import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "./InputData";

const Cards = ({ home, setOpenModal }) => {
  const data = [
    {
      title: "Projects",
      desc: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      status: "Incomplete",
    },
    {
      title: "Projects",
      desc: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      status: "Incomplete",
    },
    {
      title: "Projects",
      desc: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      status: "Complete",
    },
    {
      title: "Projects",
      desc: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      status: "Incomplete",
    },
    {
      title: "Projects",
      desc: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      status: "Complete",
    },
    {
      title: "Projects",
      desc: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      status: "Incomplete",
    },
  ];

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
                    item.status === "Incomplete" ? "bg-red-400" : "bg-green-400"
                  }  p-2 rounded`}
                >
                  {item.status}
                </button>
                <div className="p-2 w-3/6 text-2xl flex justify-around">
                  <button>
                    <CiHeart />
                  </button>
                  <button>
                    <FaEdit />
                  </button>
                  <button>
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
