import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const InputData = ({ openModal, setOpenModal, updateData, setUpdateData }) => {
  const [data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    setData({ title: updateData.title, desc: updateData.desc });
  }, [updateData]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const onSubmit = async () => {
    if (data.title === "" || data.desc === "") {
      toast.error("All fields are required");
    } else {
      await axios.post(`http://localhost:1000/api/v2/create-task`, data, {
        headers,
      });
      setData({ title: "", desc: "" });
      setOpenModal(false);
    }
  };
  const onUpdate = async (id) => {
    if (data.title === "" || data.desc === "") {
      toast.error("All Fields are required");
    } else {
      await axios.put(
        `http://localhost:1000/api/v2/update-task/${updateData.id}`,
        data,
        {
          headers,
        }
      );
      setUpdateData({
        id: "",
        title: "",
        desc: "",
      });
      setData({ title: "", desc: "" });
      setOpenModal(false);
    }
  };
  return (
    <>
      <div
        className={`fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full ${
          openModal ? "" : "hidden"
        }`}
      ></div>
      <div
        className={`fixed top-0 left-0 flex items-center justify-center h-screen w-full ${
          openModal ? "" : "hidden"
        }`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button
              className=" text-2xl"
              onClick={() => {
                setOpenModal(false);
                setData({
                  title: "",
                  desc: "",
                });
                setUpdateData({
                  id: "",
                  title: "",
                  desc: "",
                });
              }}
            >
              <RxCross2 />
            </button>
          </div>

          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={data.title}
            onChange={onChange}
          />
          <textarea
            name="desc"
            id=""
            cols={30}
            rows={10}
            placeholder="Description.."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={data.desc}
            onChange={onChange}
          ></textarea>
          {updateData.id === "" ? (
            <button
              className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
              onClick={onSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
              onClick={onUpdate}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
