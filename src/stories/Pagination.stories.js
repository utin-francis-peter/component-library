import { useState, useEffect } from "react";
import Pagination from "../components/Pagination/index";

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
    <Pagination
      data={data}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
    />
  );
};
