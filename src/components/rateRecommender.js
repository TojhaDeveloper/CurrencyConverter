import React, { useState } from "react";
import { HOST_URL } from "../constants";
import SideNote from "./sideNote";
import styles from "./styles.css";

//Using functional programming paradigm with React Hooks feature

const RateRecommender = ({ payload }) => {
  const { rates, date } = payload;
  const [selectBaseCurrency, setSelectBaseCurrency] = useState("USD");
  const [selectSpecificCurrency, setSelectSpecificCurrency] = useState("CAD");
  const [userInput, setUserInput] = useState("1");
  const [finalValue, setFinalValue] = useState(0.0);

  //Helper Function to render list
  const renderList = () => {
    const options = Object.keys(rates).map((el, index) => (
      <option key={index} value={el}>
        {el}
      </option>
    ));
    return options;
  };

  const filteredRenderList = () => {
    const filteredKeys = Object.keys(rates).filter(
      el => el !== selectBaseCurrency
    );
    const filteredOptions = filteredKeys.map((el, index) => (
      <option key={index} value={el}>
        {el}
      </option>
    ));
    return filteredOptions;
  };

  const handleChange = e => {
    setSelectBaseCurrency(e.target.value);
  };

  const handleChange2 = e => {
    setSelectSpecificCurrency(e.target.value);
  };

  const handleClick = (a, b) => {
    var URL = `${HOST_URL}?base=${a}&symbols=${a},${b}`;
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        var result = data.rates;
        setFinalValue(parseFloat(userInput) * result[b]);
      });
  };

  const handleInput = e => {
    setUserInput(e.target.value);
  };

  //Side effect to parse userInput value and multiple with the value from the API

  // useEffect(() => {
  //   console.log("User value is", userInput);
  //   let integerValue = finalValue * parseFloat(userInput);

  //   //on convert button submit
  // }, [finalValue]);

  return (
    <>
      <style>{`${styles}`}</style>
      <div className="container">
        <div className="header">
          Currency Converter{" "}
          <img
            src={process.env.PUBLIC_URL + `/Logo.jpg`}
            style={{ width: "80px", height: "80px" }}
            alt="Logo"
          />
        </div>
        <div className="input-container">
          <input
            className="text-input"
            defaultValue="1"
            onChange={handleInput}
          />
          <select
            className="select-currency"
            defaultValue={selectBaseCurrency}
            onChange={e => handleChange(e)}
          >
            {renderList()}
          </select>
          <select
            className="select-currency"
            defaultValue={selectSpecificCurrency}
            onChange={e => handleChange2(e)}
          >
            {filteredRenderList()}
          </select>
          <button
            className="curr-btn"
            onClick={() =>
              handleClick(selectBaseCurrency, selectSpecificCurrency)
            }
          >
            Convert
          </button>
        </div>
        <div className="final-conversion">{finalValue}</div>
        <SideNote className="side-note" date={date} base={selectBaseCurrency} />
      </div>
    </>
  );
};

export default RateRecommender;
