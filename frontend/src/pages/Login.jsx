import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const history = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }
  const [data, setData] = useState({ username: "", password: "" });
  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const onSubmit = async () => {
    try {
      if (data.username === "" || data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/login",
          data
        );
        console.log(response, "NHNHNH");
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-[98vh] flex justify-center items-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Login</div>
        <input
          type="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          placeholder="username"
          name="username"
          onChange={onChange}
          value={data.username}
        />

        <input
          type="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          placeholder="password"
          name="password"
          required
          onChange={onChange}
          value={data.password}
        />
        <div className="w-full flex justify-between items-center">
          <button
            className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
            onClick={onSubmit}
          >
            Login
          </button>
          <Link to={"/signup"} className="text-gray-400 hover:text-gray-200">
            Not having an account? Signup Here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
