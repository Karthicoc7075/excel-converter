import React, { useState } from "react";
import "./salary.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import closeImage from "../../assets/images/close.png";
import fileImage from "../../assets/images/file.png";
import infoIcon from "../../assets/Info icon.png";


function Salary() {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
    const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthNumber = month < 10 ? `0${month}` : month;
  const dayNumber = day < 10 ? `0${day}` : day;

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return alert("No file selected");

    setFile(selectedFile);

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        range: 1,
      });

      const filteredData = [];
      let totalDataCount = 0;
      let totalSuccessCount = 0;
      let totalSalary = 0;


      const year = date.getFullYear();
      const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      const monthName = prevMonthDate.toLocaleString("default", { month: "long" });
      const formattedDate = `${dayNumber}/${monthNumber}/${year}`;
      const monthNameShort = monthName.slice(0, 3);

      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];

        totalDataCount = totalDataCount + 1;

        if (row[15] == null || row[15] === "") {
          break;
        }

        totalSuccessCount = totalSuccessCount + 1;
        totalSalary = totalSalary + row[8];

        filteredData.push(
          [
            "N,",
            String(row[15]).trim(""),
            String(Math.floor(row[8])).trim(""),
            String(row[1])?.trim(""),
            ",,,,,,,",
            `${monthNameShort}Salary`,
            ",,,,,,,",
            `${formattedDate}`,
            "",
            row[16]?.trim(""),
            row[17]?.trim(""),
            row[2]?.trim(""),
            "accounts@platos.in",
          ].join(",")
        );
        filteredData.push("\n");
      }
      setTotalCount(totalDataCount - 1);
      setSuccessCount(totalSuccessCount);
      setTotalSalary(Math.floor(totalSalary));
      setFileData(filteredData);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  console.log(fileData);

  const saveAsTextFile = () => {
    if (!fileData) return alert("No data to save");

    const isTrue = window.confirm(
        "Do you want to save this data ?"
    );

    if (isTrue) {
      const textData = fileData.join("");
      const blob = new Blob([textData], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `Plato SCX ${dayNumber}${monthNumber}.4.txt`);
      alert("File downloaded successfully");
    }
  };

  const handelFileClose = () => {
    setFile(null);
    setFileData(null);
    setTotalCount(0);
    setSuccessCount(0);
    setTotalSalary(0);
  };
  return (
 <div className="salary-page">
      <div className="card">
        <div className="card-content">
          <h1>Salary File Converter</h1>
          {
            !file ? <div>
              <div className="upload-file-container" >
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={(e) => handleFileUpload(e)}
              />
             <div className="file-icon-container">
                <img className="file-icon" src={fileImage} alt="File Icon" />
              </div>
              <p>Drop & Drop or</p>
              <p><span>click to choose</span> your file.</p>
            </div>
           <div className='info-container' >
             <img className="info-icon" src={infoIcon} alt="Info" />
              <p>Support file: .xlsx and .xls</p>
            </div>
            </div>:
             <div className="file-info-container"> 
               <div className="file-info" >
                <h3>{file.name}</h3>
                <p>{(file.size / 1024).toFixed(2)} KB</p>
                <img className="icon close" src={closeImage} alt="Close" onClick={handelFileClose} />
                
              </div>
              <span></span>
              <div className="file-data-info">
                <h3>File Data Information</h3>
                <p>File Name: Plato SCX {dayNumber}{monthNumber}.4.txt</p>
                <p>Total sheet data count: {totalCount}</p>
                <p>Total success data count: {successCount}</p>
                <p>Total Salary: {totalSalary}</p>
              </div>
            </div>
          }


          
            {fileData && (
              <div className="buttons-container">
              <button onClick={saveAsTextFile}>Save as text file</button>
               </div>
            )}
         

        </div>
      </div>
    </div>
  );
}

export default Salary;
