import React from "react";
import styles from "./style.module.css";

function TableData(props) {
  const { tableStyle } = styles;
  const { serverData } = props;
  return (
    <div
      style={{
        width: "100%",
        minHeight: "460px",
        borderBottom: "1px solid #69bce1"
      }}
    >
      {!(serverData?.length > 0) && (
        <p
          style={{
            textAlign: "center"
          }}
        >
          No data available based on current search
        </p>
      )}
      {serverData?.length ? (
        <table className={`${tableStyle}`}>
          <thead>
            <tr>
              <th>SN</th>
              <th>NAME</th>
              <th>TYPE</th>
              <th>COMPANY</th>
            </tr>
          </thead>
          <tbody>
            {serverData.map((each) => {
              return (
                <tr key={each?.name}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td style={{ color: "teal" }}>{each?.name}</td>
                  <td>{each?.type}</td>
                  <td>{each?.company}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default TableData;
