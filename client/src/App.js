import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./app.scss";

import PredictionsForm from "./components/PredictionsForm";

class App extends Component{
  render(){
    return(
      <div className="App my-css-class">
        <h1> Hello, World! </h1>
        <button className="mdc-button foo-button">
          <div className="mdc-button__ripple"></div>
          Button
        </button>
        <BrowserRouter>
          <Routes>
            <Route path="/predictions/form" element={<PredictionsForm />}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;