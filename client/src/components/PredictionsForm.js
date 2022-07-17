import React, { Component, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { setPredictions } from "../services/predictions";
// import * as styles from "./PredictionsForm.css";
import "./PredictionsForm.css";
import _ from 'lodash';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

// Simple validation check value exists
const validate = (value) => {
  return !!value;
}

class PredictionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: '', 
      brownlow: '', 
      isSubmitting: false, 
      isValidating: false,
      isValid: false,
      teamInputTouched: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({isSubmitting: true})  
    const team = this.state.team;
    const brownlow = this.state.brownlow;
    // alert(_.join(['Your', 'team', 'is', team], ' '))
    const isValid = [team, brownlow].every(validate);
    setPredictions({team, brownlow})
      .then(() => {
        alert('Success.')
      });

    
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({[name]: value})
  }

  handleBlur() {
    console.log('handleBlur');
    this.setState({teamInputTouched: true})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>AFL Premiers?</label>
          <input 
            type="text" 
            name="team" 
            value={this.state.team} 
            onChange={this.handleChange} 
            touched={this.state.teamInputTouched.toString()} 
            onBlur={this.handleBlur}
            required
          />
          <span>This value must be filled in</span>
          <br/>
          <label className="bigblue">Brownlow?</label>
          <input type="text" name="brownlow" value={this.state.brownlow} onChange={this.handleChange} />
          <br/>
          <input type="submit" value="Submit" disabled={this.state.isSubmitting}/>
        </form>
        <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent />
        </Suspense>
      </div>
    )
  }
}

export default PredictionsForm;