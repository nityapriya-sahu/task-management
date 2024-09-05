import React, { useEffect } from "react";
import Home from "./pages/Home";
import "./index.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompleteTasks from "./pages/CompleteTasks";
import IncompleteTasks from "./pages/IncompleteTasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn, "ISISSI");
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login);
    }
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="/importanttasks" element={<ImportantTasks />} />
          <Route path="/completetasks" element={<CompleteTasks />} />
          <Route path="/incompletetasks" element={<IncompleteTasks />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
