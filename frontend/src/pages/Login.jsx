import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-[98vh] flex justify-center items-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Login</div>
        <input
          type="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          placeholder="username"
          name="username"
        />

        <input
          type="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          placeholder="password"
          name="password"
          required
        />
        <div className="w-full flex justify-between items-center">
          <button className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold">
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
