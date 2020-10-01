import React, { useState } from "react";
import styles from "./style.module.css";

function Pagination(props) {
  const { numbers, prevBtn, nextBtn, pagination_container } = styles;
  const {
    dataPerPage,
    currentPage,
    setCurrentPage,
    indexOfFirstData,
    indexOfLastData,
    totalData,
    paginate
  } = props;
  let pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumber.push(i);
  }

  const paginationItem = React.useMemo(() => {
    const arr = [];
    for (let item = 0; item < Math.ceil(totalData / dataPerPage); item++) {
      arr.push(item + 1);
    }
    return arr;
  }, [totalData]);

  //arr.splice(2, 0, "Lene");
  return (
    <div className={`${pagination_container}`}>
      <button
        className={`${prevBtn}`}
        onClick={() => {
          if (currentPage - 1 > 0) {
            setCurrentPage((pre) => {
              return pre - 1;
            });
          }
        }}
      >
        {`<`}
      </button>

      <div style={{ display: "flex" }}>
        {paginationItem.map((each) => {
          return (
            <span
              style={{
                background: currentPage === each ? "teal" : "white",
                color: currentPage === each ? "white" : "black"
              }}
              onClick={() => {
                paginate(each);
              }}
              className={`${numbers}`}
              key={each}
            >
              {each}
            </span>
          );
        })}
      </div>
      <button
        className={`${nextBtn}`}
        onClick={() => {
          if (!(currentPage + 1 > paginationItem.length)) {
            setCurrentPage((pre) => {
              return pre + 1;
            });
          }
        }}
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
