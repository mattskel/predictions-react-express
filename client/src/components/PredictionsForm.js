import React, { Component, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import _ from 'lodash';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

class PredictionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {team: '', brownlow: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({team: event.target.value});
  // }

  handleSubmit(event) {
    const team = this.state.team;
    alert(_.join(['Your', 'team', 'is', team], ' '))
    event.preventDefault();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({[name]: value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            AFL Premiers?
            <input type="text" name="team" value={this.state.team} onChange={this.handleChange} />
          </label><br/>
          <label>
            Brownlow?
            <input type="text" name="brownlow" value={this.state.brownlow} onChange={this.handleChange} />
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
        <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent />
        </Suspense>
      </div>
    )
  }
}

export default PredictionsForm;