import React, { Component} from "react";

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
    alert('Your team is ' + this.state.team);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Team:
        <input type="text" name="team" value={this.state.team} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default PredictionForm;