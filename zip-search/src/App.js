import React, { useState } from "react";
import "./App.css";

const City = ({ result }) => {
  return (
    <div className="center">
      <div className="box">
        <div className="title">
          <h3>{result.LocationText}</h3>
        </div>
        <div>
          <ul className="content">
            <li>State: {result.State}</li>
            <li>
              Location: ({result.Lat},{result.Long})
            </li>
            <li>Population: (estimated) {result.EstimatedPopulation}</li>
            <li>Total Wages: {result.TotalWages}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ZipSearchField = ({ handleChange }) => {
  return (
    <div className="center">
      <h3>Zip Code:</h3>
      <input type="text" onChange={handleChange}></input>
    </div>
  );
};

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
    console.log(userInput);
    if (e.target.value.length === 5) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${e.target.value}`)
        .then((response) => response.json())
        .then((data) => setData(data));
      setUserInput("");
    }
    console.log(data);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2>Zip Code Search</h2>
      </div>
      <ZipSearchField handleChange={handleChange} />
      {/* If we have data from the api call, render the results, else render nothing */}
      {data.length > 1 ? (
        <div>
          {data.map((result, index) => {
            return <City key={index} result={result} />;
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default App;
