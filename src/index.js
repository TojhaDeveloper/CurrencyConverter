import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import RateRecommender from "./components/rateRecommender";
import { Ring } from "./components/spinners/spinner";
import { API_DEFAULT } from "./constants";

const App = () => {
  const [payload, setPayload] = useState({});

  useEffect(() => {
    //XHR call here this acts as a ComponentDidMount
    fetch(API_DEFAULT)
      .then(response => response.json())
      .then(data => setPayload(data));
  }, []);

  if (Object.keys(payload).length > 0) {
    return <RateRecommender payload={payload} />;
  }
  return <Ring />;
};

ReactDOM.render(<App />, document.getElementById("root"));
