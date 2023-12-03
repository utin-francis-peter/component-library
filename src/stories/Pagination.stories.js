import { useState, useEffect } from "react";
import Pagination from "../components/Pagination/Pagination";

export default {
  title: "Pagination",
  component: Pagination,
};

export const Default = () => {
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const _data = await res.json();
      setData(_data);
    };
    fetchTodo();
  }, []);
  return (
    <Pagination itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
  );
};
