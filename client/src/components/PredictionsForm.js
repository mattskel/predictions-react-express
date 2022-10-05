import React, { Component, Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Routes, Route } from "react-router-dom";
import { setPredictions, getQuestions } from "../services/predictions";
import "./PredictionsForm.css";
import FormInput from "./FormInput";
import _ from 'lodash';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const PredictionsForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [values, setValues] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions()
      .then((response) => {
        const {values: [questions] = []} = JSON.parse(response) || {};
        setQuestions(questions);
        questions.forEach(question => {
          values[question] = "";
          setValues({ ...values });
        });
      });
  }, [])

  const onSubmit = data => {
    const predictions = questions.map((question) => data[question]);
    setPredictions(predictions)
      .then((response) => {
        console.log('response', JSON.stringify(response));
        const {statusCode, error} = JSON.parse(response) || {};
        if (error) return alert('🤬 Server error.');
 
        if (statusCode !== 200) {
          return alert('Something went wrong. Server returned status code ' + statusCode + '. 🫠');
        }

        return alert('✅ Form submitted. Good luck with your tips 🤞');

      });
  }

  return (
    <div className="highlights">
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(values).map((question, index) => (
          <FormInput
            key={index}
            label={question}
            register={register}
            error={errors[question]}
          />
        ))}
        {/* <input type="submit" value="Submit"/> */}
        <button className="mdc-button foo-button">
          <div className="mdc-button__ripple"></div>
          {/* <span className="mdc-button__label"></span> */}
          Button
        </button>
      </form>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  )
}

export default PredictionsForm;