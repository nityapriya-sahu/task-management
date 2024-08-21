import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Signup = () => {
  const history = useNavigate();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = async () => {
    if (data.username === "" || data.email === "" || data.password === "") {
      alert("All fields are required");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-in",
          data
        );
        console.log(response, "RSRSRSR");
        setData({ username: "", email: "", password: "" });
        history("/login");
        alert(response.data.message);
      } catch (error) {
        console.log(error.response.data);
        setData({ username: "", email: "", password: "" });
        alert(error.response.data.message);
      }
    }
  };
  return (
    <div className="h-[98vh] flex justify-center items-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Signup</div>
        <input
          type="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          placeholder="username"
          name="username"
          onChange={onChange}
          value={data.username}
        />
        <input
          type="email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          placeholder="email"
          name="email"
          onChange={onChange}
          value={data.email}
          required
        />
        <input
          type="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          placeholder="password"
          name="password"
          onChange={onChange}
          value={data.password}
          required
        />
        <div className="w-full flex justify-between items-center">
          <button
            className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
            onClick={onSubmit}
          >
            Signup
          </button>
          <Link to={"/login"} className="text-gray-400 hover:text-gray-200">
            Already have an account? Login Here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
