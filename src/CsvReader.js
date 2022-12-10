import { useState, useEffect, useLayoutEffect, useRef } from "react";
import "./CsvReader.css";
import sortIcon from "./down-chevron.png";
export default function CsvReader() {
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);
  const [order, setOrder] = useState("ASC");

  const handleSorting = (col) => {
    if (order == "ASC") {
      const sorted = [...csvArray].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setCsvArray(sorted);
      setOrder("DSC");
    }
    if (order == "DSC") {
      const sorted = [...csvArray].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setCsvArray(sorted);
      setOrder("ASC");
    }
  };
  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    setCsvArray(newArray);
  };

  const submit = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      console.log(text);
      processCSV(text);
    };

    reader.readAsText(file);
  };

  return (
    <form id="csv-form">
      <input
        type="file"
        accept=".csv"
        id="csvFile"
        onChange={(e) => {
          setCsvFile(e.target.files[0]);
        }}
      ></input>
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          if (csvFile) submit();
        }}
      >
        Submit
      </button>
      <br />
      <br />
      {csvArray.length > 0 ? (
        <>
          <div className="table-main">
            <table className="table">
              <thead>
                <th>id</th>
                <th>
                  first_name
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "0 5px",
                      margin: "2px",
                      display: "inline",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSorting("first_name")}
                  >
                    ^
                  </div>
                </th>
                <th>
                  last_name
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "0 5px",
                      margin: "2px",
                      display: "inline",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSorting("last_name")}
                  >
                    ^
                  </div>
                </th>
                <th>email</th>
                <th>gender</th>
                <th>ip_address</th>
                <th>airport_code</th>
                <th>time</th>
                <th>status</th>
                <th>mobile</th>
                <th>area</th>
                {/* <th>edit</th> */}
                <th>show</th>
              </thead>
              {/* {console.log(csvArray)} */}

              <tbody>
                {csvArray.map((item) =>
                  item.status == "TRUE" ? (
                    <tr className="bg-success" key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.email}</td>
                      <td>{item.gender}</td>
                      <td>{item.ip_address}</td>
                      <td>{item.airport_code}</td>
                      <td>{item.time}</td>
                      <td>{item.status}</td>
                      <td>{item.mobile}</td>
                      <td>{item.area}</td>
                      {/* <td>{item.edit}</td> */}
                      <td>{item.show}</td>
                    </tr>
                  ) : (
                    <tr className="bg-danger" key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.email}</td>
                      <td>{item.gender}</td>
                      <td>{item.ip_address}</td>
                      <td>{item.airport_code}</td>
                      <td>{item.time}</td>
                      <td>{item.status}</td>
                      <td>{item.mobile}</td>
                      <td>{item.area}</td>
                      {/* <td>{item.edit}</td> */}
                      <td>{item.show}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
      {}
    </form>
  );
}
