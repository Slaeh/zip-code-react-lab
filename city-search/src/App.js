import React, { useState } from "react";
import "./App.css";

const Zip = ({ result }) => {
  return (
    <div className="center">
      <div className="box">
        <div className="title">
          <h3>{result}</h3>
        </div>
      </div>
    </div>
  );
};

const CitySearchField = ({ handleChange, handleSubmit }) => {
  return (
    <div className="center">
      <h3>City:</h3>
      <input type="text" onChange={handleChange}></input>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    let val = e.target.value.toUpperCase();
    setUserInput(val);
    //console.log(val);
  };

  const handleSubmit = (e) => {
    console.log(userInput);
    fetch(`http://ctp-zip-api.herokuapp.com/city/${userInput}`)
      .then((response) => response.json())
      .then((data) => setData(data));
    console.log(data);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2>City Search</h2>
      </div>
      <CitySearchField
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {/* If we have data from the api call, render the results, else render nothing */}
      {data.length > 1 ? (
        <div>
          <h2 className="center">All zip codes for {userInput}</h2>
          {data.map((result, index) => {
            return <Zip key={index} result={result} />;
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default App;
