import React, { Component, Suspense } from "react";
import _ from 'lodash';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

class PredictionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {team: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({team: event.target.value});
  }

  handleSubmit(event) {
    const team = this.state.team;
    alert(_.join(['Your', 'team', 'is', team], ' '))
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Team:
          <input type="text" name="team" value={this.state.team} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
        <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent />
        </Suspense>
      </div>
    )
  }
}

export default PredictionForm;