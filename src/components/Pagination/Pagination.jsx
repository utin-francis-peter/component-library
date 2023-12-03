import React, { useEffect, useState } from "react";

const Pagination = ({ data, itemsPerPage, setItemsPerPage }) => {
  // const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  // console.log("groupedData:", groupedData);

  // const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [lastItemIndex, setLastItemIndex] = useState(itemsPerPage);

  // console.log(
  //   "logging MIN and MAX item index: ",
  //   firstItemIndex,
  //   lastItemIndexconsole.log("CURRENT PAGE:", currentPage);
  // );

  // since an array holds page number, create a new structure that groups current pages in view together.
  // also create another structure that groups data based on current page in view

  // create a loop that runs data length number of times and increments based on itemsPerPage. Within the loop, slice and push into the new structure

  const pageNumbers = [];
  if (data?.length > 0 && itemsPerPage) {
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  useEffect(() => {
    if (data?.length > 0 && itemsPerPage) {
      const newData = [];
      for (let i = 0; i < data.length; i += itemsPerPage) {
        const slicedData = data.slice(i, i + itemsPerPage);
        newData.push(slicedData);
      }
      setGroupedData(newData);
    }
  }, [data, itemsPerPage]);

  // create a useEffect function that fires when pageNo and itemsPerPage state changes
  useEffect(() => {
    const calculateIndexes = () => {
      const newFirstItemIndex = (currentPage - 1) * itemsPerPage + 1;
      const newLastItemIndex = Math.min(
        currentPage * itemsPerPage,
        data.length
      );

      setFirstItemIndex(newFirstItemIndex);
      setLastItemIndex(newLastItemIndex);
    };

    data?.length > 0 && calculateIndexes();
  }, [itemsPerPage, currentPage, data?.length]);
  return (
    <div>
      {groupedData?.length > 0 &&
        groupedData[currentPage - 1]?.map((d, i) => <p key={i}>{d.title}</p>)}

      {/* pagination UI below */}
      <div className="bg-gray-200 flex items-center gap-10  text-gray-600 mt-5">
        <div className="flex items-center border-r-[1px] border-gray-300 p-2">
          {/* user selects items to render per page */}
          <p>Items per page:</p>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              // then check if currentPage value is greater than the last item in pageNumbers array. If true, reset currentPage to 1
              if (currentPage > pageNumbers?.length) {
                setCurrentPage(1);
              }
            }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </div>

        <p className="border-r-[1px] border-gray-300 flex-1 p-2">
          {firstItemIndex + 1} - {lastItemIndex} of {data?.length} items
        </p>

        <div className="flex items-center border-r-[1px] border-gray-300 p-2">
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}>
            {pageNumbers.map((pageNo, i) => (
              <option key={i} value={pageNo}>
                {pageNo}
              </option>
            ))}
          </select>
          <p>of {pageNumbers?.length} pages</p>
        </div>

        <div className="flex items-center">
          {/* prev btn */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="border-r-[1px] border-gray-300 p-2 disabled:cursor-not-allowed disabled:text-gray-300">
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* next btn */}

          {/* {console.log("current page is:", currentPage)}
          {console.log("page numbers:", pageNumbers)} */}

          <button
            disabled={currentPage == pageNumbers[pageNumbers?.length - 1]}
            onClick={() => {
              setCurrentPage(currentPage + 1);
              // check if the next currentPage would be greater than current maxItemIndex
              setFirstItemIndex(firstItemIndex + itemsPerPage);
              setLastItemIndex(lastItemIndex + itemsPerPage);
            }}
            className="border-r-[1px] border-gray-300 p-2 disabled:cursor-not-allowed disabled:text-gray-300">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
