import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import PredictionsForm from "./PredictionsForm";

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Hello, World! </h1>
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