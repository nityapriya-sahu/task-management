import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const CompleteTasks = () => {
  const [data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v2/get-complete-tasks`,
        { headers }
      );
      setData(response.data.data);
    };
    fetchData();
  });
  return (
    <div>
      <Cards home={false} data={data} />
    </div>
  );
};

export default CompleteTasks;
