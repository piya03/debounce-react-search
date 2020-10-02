import React, { useState, useEffect } from "react";
import "./styles.css";
import SearchBox from "./Component/SearchBox";
import TableData from "./Component/TableData";
import JsonData from "./Component/JsonData";
import Pagination from "./Component/Pagination";

function debounce(fun, delay) {
  let timer;
  return function (...rest) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fun(...rest);
    }, delay);
  };
}

export default function App() {
  const [inputVal, setInputVal] = useState("");
  const [serverData, setServerData] = useState([...JsonData]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);

  //get current data

  function paginate(anyPageNum) {
    setCurrentPage(anyPageNum);
  }

  const [debouncedvalue, setDebouncedValue] = useState("");

  function changeDebounceValue(val) {
    setDebouncedValue(val);
  }

  const debouncedFn = debounce(changeDebounceValue, 500);

  useEffect(() => {
    debouncedFn(inputVal);
  }, [inputVal]);

  const resultBasedOnSearch = React.useMemo(() => {
    return serverData.filter((each) => {
      if (!debouncedvalue?.trim()) {
        return each;
      }
      return (
        each.name
          ?.toLowerCase()
          .indexOf(debouncedvalue.toLowerCase().trim()) !== -1
      );
    });
  }, [debouncedvalue]);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const currentPost = resultBasedOnSearch.slice(
    indexOfFirstData,
    indexOfLastData
  );
  return (
    <div className="App">
      <h2 style={{ textAlign: "center" }}>Search Module</h2>
      <SearchBox
        inputValue={inputVal}
        onChange={(e) => {
          setInputVal(e.target.value);
          setCurrentPage(1);
        }}
      />
      <TableData serverData={currentPost} />
      <Pagination
        dataPerPage={dataPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalData={resultBasedOnSearch.length}
        paginate={paginate}
        indexOfLastData={indexOfLastData}
        indexOfFirstData={indexOfFirstData}
      />
    </div>
  );
}
