import React from "react";
import styles from "./style.module.css";

function SearchBox(props) {
  const { input_container } = styles;

  const { inputValue, onChange } = props;
  return (
    <div>
      <div className={`${input_container}`}>
        <input
          placeholder="Search By Name"
          value={inputValue}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default SearchBox;
