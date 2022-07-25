import React, { Component, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { setPredictions, getQuestions } from "../services/predictions";
import "./PredictionsForm.css";
import FormInput from "./FormInput";
import _ from 'lodash';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

class _PredictionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: '', 
      brownlow: '', 
      isSubmitting: false,
      questions: []

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getQuestions()
      .then((response) => {
        const {values: [questions] = []} = JSON.parse(response) || {};
        this.setState({questions: questions})
      });

  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isSubmitting: true})  
    const team = this.state.team;
    const brownlow = this.state.brownlow;
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

  render() {
    return (
      <div className="highlights">
        <form onSubmit={this.handleSubmit}>
          {this.state.questions.map((question, index) => (
            <FormInput
              key={index}
              label={question}
              onChange={this.handleChange}
            />
          ))}
          <input type="submit" value="Submit" disabled={this.state.isSubmitting}/>
        </form>
        <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent />
        </Suspense>
      </div>
    )
  }
}

const PredictionsForm = () => {


  const [values, setValues] = useState({
    // username: "",
    // email: "",
    // birthday: "",
    // password: "",
    // confirmPassword: "",
  });

  useEffect(() => {
    getQuestions()
      .then((response) => {
        const {values: [questions] = []} = JSON.parse(response) || {};
        questions.forEach(question => {
          values[question] = "";
          setValues({ ...values });
        });
      });
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();
    // this.setState({isSubmitting: true})  
    // const team = this.state.team;
    // const brownlow = this.state.brownlow;
    // setPredictions({team, brownlow})
    //   .then(() => {
    //     alert('Success.')
    //   });
    alert('Success.')
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="highlights">
      <form onSubmit={onSubmit}>
        {Object.keys(values).map((question, index) => (
          <FormInput
            key={index}
            label={question}
            onChange={onChange}
            name={question}
          />
        ))}
        <input type="submit" value="Submit"/>
      </form>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  )
}

export default PredictionsForm;